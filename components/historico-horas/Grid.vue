<template>
    <GridBase :columns="columns" :data="store.historico">
        <template #td-name-acoes="{ item }">
            <BtnIcon class="tw-text-red-700" icon="ic:baseline-delete" @click="deletarIcone(item.uid)" />
        </template>
        <template #td-name-inicio="{ item }">
            {{ decimalToFormatHoursMinutos(item.tempoInicial) }}
        </template>
        <template #td-name-final="{ item }">
            {{ decimalToFormatHoursMinutos(item.tempoFinal) }}
        </template>
        <template #td-name-total="{ item }">
            {{ decimalToFormatHoursMinutos(somarTotal(item)) }}
        </template>
        <template #td-name-formatoDecimal="{ item }">
            {{ somarTotal(item) }}
        </template>
        <template #td-name-formatoCustomizado="{ item }">
            {{ formatCustomHours(somarTotal(item), item.formato) }}
        </template>
    </GridBase>
</template>
<script setup lang="ts">
import type { GridColumnProps } from '~/components/grid/types';
import { useHistoricoHorasStore } from '~/stores/historico-horas/store';
import { TipoCalculo, type HistoricoItem } from '~/stores/historico-horas/types';

const store = useHistoricoHorasStore();


const somarTotal = (item: HistoricoItem) => {
    if (item.tipoCalculo === TipoCalculo.somar) {
        return Math.abs(item.tempoInicial + item.tempoFinal);
    }
    if (item.tipoCalculo === TipoCalculo.subtrair) {
        return Math.abs(item.tempoInicial - item.tempoFinal);
    }

    return 0;
}

const deletarIcone = (uid: string) => {
    store.removerItem(uid);
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
        name: 'formatoCustomizado',
        label: 'f. customizado'
    },
    {
        name: 'formatoDecimal',
        label: 'f. decimal'
    },
    {
        name: 'tag',
        label: 'tag'
    }
];
</script>