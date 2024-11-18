<template>
    <GridBase :columns="columns" :data="store.historico" @dblclick-cell="copiarValor">
        <template #td-name-acoes="{ item }">
            <BtnIcon class="tw-text-red-700" icon="ic:baseline-delete" @click="deletarIcone(item.uid)" />
        </template>
        <template #td-name-inicio="{ item }">
            <GridWrapperColEditor key-name="uid" name-column="inicio" :item="item"
                :name-column-edit="store.colunaEditando" :key-value="store.itemSelecionadoEditando"
                @focusin="abrirEdicao">
                {{ decimalToFormatHoursMinutos(item.tempoInicial) }}
                <template #editor="{ item }">
                    <FormsInputHours v-model="item.tempoInicial" focus @blur="focusout(item)" />
                </template>
            </GridWrapperColEditor>
        </template>
        <template #td-name-final="{ item }">
            <GridWrapperColEditor key-name="uid" name-column="final" :item="item"
                :name-column-edit="store.colunaEditando" :key-value="store.itemSelecionadoEditando"
                @focusin="abrirEdicao">
                {{ decimalToFormatHoursMinutos(item.tempoFinal) }}
                <template #editor="{ item }">
                    <FormsInputHours v-model="item.tempoFinal" focus @blur="focusout(item)" />
                </template>
            </GridWrapperColEditor>
        </template>
        <template #td-name-total="{ item }">
            {{ decimalToFormatHoursMinutos(somarTotal(item)) }}
        </template>
        <template #td-name-formatoDecimal="{ item }">
            {{ somarTotal(item).toFixed(2) }}
        </template>
        <template #td-name-formatoCustomizado="{ item }">
            {{ formatCustomHours(somarTotal(item), store.formato) }}
        </template>
        <template #td-name-tag="{ item }">
            <GridWrapperColEditor key-name="uid" name-column="tag" :item="item" :name-column-edit="store.colunaEditando"
                :key-value="store.itemSelecionadoEditando">
                {{ item.tag }}
                <template #editor="{ item }">
                    <FormsInputText v-model="item.tag" focus @blur="focusout(item)" />
                </template>
            </GridWrapperColEditor>
        </template>
        <template #td-name-tempoAjustado="{ item }">
            <GridWrapperColEditor key-name="uid" name-column="tempoAjustado" :item="item"
                :name-column-edit="store.colunaEditando" :key-value="store.itemSelecionadoEditando">
                {{ decimalToFormatHoursMinutos(item.tempoAjustado) }}
                <template v-if="itemEdicao" #editor="{ item }">
                    <FormsInputHours v-model="itemEdicao!.tempoAjustado" focus @blur="focusoutTempoAjustado(item)" />
                </template>
            </GridWrapperColEditor>
        </template>
    </GridBase>
</template>
<script setup lang="ts">
import type { GridColumnProps } from '~/components/grid/types';
import { useNotificationSuccess } from '~/composables/notifications/use-notification';
import { useHistoricoHorasStore } from '~/stores/historico-horas/store';
import { type HistoricoItemState } from '~/stores/historico-horas/types';
import sumTotal from '~/utils/sum-total';

const store = useHistoricoHorasStore();
const itemEdicao = ref<HistoricoItemState>();
onMounted(() => {
    store.inicializar();
})

const somarTotal = (item: HistoricoItemState) => {
    return sumTotal(item);
}

const deletarIcone = (uid: string) => {
    store.removerItem(uid);
}

const abrirEdicaoTempoAjustado = (uid: string | number, nameColumn: string) => {
    let item = store.historico.find((item) => item.uid === uid);
    if (item === undefined) return;
    itemEdicao.value = { ...item }
    itemEdicao.value.tempoAjustado = Math.abs(item.tempoAjustado);
    nextTick(() => {
        abrirEdicao(uid, nameColumn);
    })
}

const abrirEdicao = (uid: string | number | undefined, nameColumn: string) => {
    if (!uid) return;

    store.colunaEditando = nameColumn;
    store.itemSelecionadoEditando = uid as string;
}

const copiarValor = (_: Event, item: HistoricoItemState, column: GridColumnProps) => {
    switch (column.name) {
        case 'total':
            navigator.clipboard.writeText(decimalToFormatHoursMinutos(somarTotal(item)));
            useNotificationSuccess('sucesso', 'total copiado com sucesso');
            break;
        case 'formatoDecimal':
            navigator.clipboard.writeText(somarTotal(item).toFixed(2));
            useNotificationSuccess('sucesso', 'total copiado com sucesso');
            break;
        case 'formatoCustomizado':
            navigator.clipboard.writeText(formatCustomHours(somarTotal(item), item.formato));
            useNotificationSuccess('sucesso', 'total copiado com sucesso');
            break;
        case 'tempoAjustado':
            abrirEdicaoTempoAjustado(item.uid, column.name);
            break;
        case 'tag':
            abrirEdicao(item.uid, column.name);
            break;
    }
}

const focusoutTempoAjustado = (item: HistoricoItemState) => {
    item.tempoAjustado = itemEdicao.value!.tempoAjustado * - 1;
    itemEdicao.value = undefined;
    focusout(item);
}

const focusout = (item: HistoricoItemState) => {
    store.colunaEditando = "";
    store.itemSelecionadoEditando = "";
    store.alterarItem(item);
}

const columns: GridColumnProps[] = [
    {
        name: 'acoes',
        label: '',
        width: '50px'
    },
    {
        name: 'inicio',
        label: 'inicio',
        width: '120px'
    },
    {
        name: 'final',
        label: 'final',
        width: '120px'
    },
    {
        name: 'total',
        label: 'total',
        width: '120px'
    },
    {
        name: 'formatoDecimal',
        label: 'f. decimal',
        width: '120px'
    },
    {
        name: 'formatoCustomizado',
        label: 'f. customizado',
        width: '150px'
    },
    {
        name: 'tag',
        label: 'tag'
    },
    {
        name: 'tempoAjustado',
        label: 'tempo ajustado'
    }
];
</script>