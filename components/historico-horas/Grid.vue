<template>
    <GridBase :columns="columns" :data="store.historico" @dblclick-cell="onClickDuplo">
        <template #td-name-acoes="{ item }">
            <BtnIcon class="tw-text-red-700" icon="ic:baseline-delete" @click="deletarIcone(item.uid)" />
        </template>
        <template #td-name-inicio="{ item }">
            <GridWrapperColEditor key-name="uid" name-column="inicio" :item="item"
                :name-column-edit="store.colunaEditando" :key-value="store.itemSelecionadoEditando"
                @focusin="editarCelula">
                {{ decimalToFormatHoursMinutos(item.tempoInicial) }}
                <template v-if="itemEdicao" #editor>
                    <FormsInputHours v-model="itemEdicao.tempoInicial" focus @blur="commitarItem(itemEdicao)" />
                </template>
            </GridWrapperColEditor>
        </template>
        <template #td-name-final="{ item }">
            <GridWrapperColEditor key-name="uid" name-column="final" :item="item"
                :name-column-edit="store.colunaEditando" :key-value="store.itemSelecionadoEditando"
                @focusin="editarCelula">
                {{ decimalToFormatHoursMinutos(item.tempoFinal) }}
                <template v-if="itemEdicao" #editor>
                    <FormsInputHours v-model="itemEdicao.tempoFinal" focus @blur="commitarItem(itemEdicao)" />
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
        <template #td-name-tag="{ item, column }">
            <GridWrapperColEditor key-name="uid" name-column="tag" :item="item" :name-column-edit="store.colunaEditando"
                :key-value="store.itemSelecionadoEditando" @focusin="editarCelula">
                <div :style="{ width: column.width, overflow: 'hidden' }">
                    {{ item.tag }}
                </div>
                <template v-if="itemEdicao" #editor>
                    <FormsInputText class="!tw-w-full tw-min-w-16" v-model="itemEdicao.tag" focus
                        @blur="commitarItem(itemEdicao)" />
                </template>
            </GridWrapperColEditor>
        </template>
        <template #td-name-tempoAjustado="{ item }">
            <GridWrapperColEditor key-name="uid" name-column="tempoAjustado" :item="item"
                :name-column-edit="store.colunaEditando" :key-value="store.itemSelecionadoEditando">
                {{ decimalToFormatHoursMinutos(item.tempoAjustado, { hideZero: true }) }}
                <template v-if="itemEdicao" #editor>
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

const somarTotal = (item: HistoricoItemState) => {
    return sumTotal(item);
}

const deletarIcone = (uid: string) => {
    store.removerItem(uid);
}

const abrirEdicaoTempoAjustado = (uid: string | number, nameColumn: string) => {
    const item = store.historico.find((item) => item.uid === uid);
    if (item === undefined) return;
    itemEdicao.value = { ...item }
    itemEdicao.value.tempoAjustado = Math.abs(item.tempoAjustado);
    nextTick(() => {
        abrirEdicaoCelula(uid, nameColumn);
    })
}

const editarCelula = (uid: string | number | undefined, nameColumn: string) => {
    const item = store.historico.find((item) => item.uid === uid);
    if (item === undefined) return;
    itemEdicao.value = { ...item }
    nextTick(() => {
        abrirEdicaoCelula(uid, nameColumn);
    })
}

const abrirEdicaoCelula = (uid: string | number | undefined, nameColumn: string) => {
    if (!uid) return;

    store.colunaEditando = nameColumn;
    store.itemSelecionadoEditando = uid as string;
}

const onClickDuplo = (_: Event, item: HistoricoItemState, column: GridColumnProps) => {
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
            navigator.clipboard.writeText(formatCustomHours(somarTotal(item), store.formato));
            useNotificationSuccess('sucesso', 'total copiado com sucesso');
            break;
        case 'tempoAjustado':
            abrirEdicaoTempoAjustado(item.uid, column.name);
            break;
    }
}

const focusoutTempoAjustado = (item: HistoricoItemState) => {
    item.tempoAjustado = itemEdicao.value!.tempoAjustado * - 1;
    itemEdicao.value = undefined;
    commitarItem(item);
}

const commitarItem = (item: HistoricoItemState) => {
    store.colunaEditando = "";
    store.itemSelecionadoEditando = "";
    store.alterarItem(item);
    itemEdicao.value = undefined;
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
        width: '100px'
    },
    {
        name: 'final',
        label: 'final',
        width: '100px'
    },
    {
        name: 'total',
        label: 'total',
        width: '100px'
    },
    {
        name: 'formatoDecimal',
        label: 'f. decimal',
        width: '100px'
    },
    {
        name: 'formatoCustomizado',
        label: 'f. customizado',
        width: '100px'
    },
    {
        name: 'tag',
        label: 'tag',
        width: '100px',
    },
    {
        name: 'tempoAjustado',
        label: 'tempo ajustado',
        width: '100px'
    }
];
</script>