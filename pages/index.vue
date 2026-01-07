<template>
    <div class="tw-flex tw-gap-3">
        <div class="tw-flex tw-flex-col tw-gap-3">
            <div class="tw-flex tw-gap-3 tw-items-center">
                <Btn variant="icon" space="small" icon="radix-icons:loop" @click="store.substituirHorario('invert')"
                    v-tooltip.bottom="'inverter valores de horas'" />
                <Btn variant="icon" space="small" icon="radix-icons:arrow-left"
                    v-tooltip.bottom="'subtituir pelo valor final'" @click="store.substituirHorario('right-left')" />
                <Btn variant="icon" space="small" icon="radix-icons:arrow-right"
                    v-tooltip.bottom="'subtituir pelo valor inicial'" @click="store.substituirHorario('left-right')" />
            </div>
            <div class="tw-flex tw-gap-3 tw-items-center">
                <FormsInputHours v-model="store.tempoInicial" />
                <FormsInputHours v-model="store.tempoFinal" />

                <FormsComboBox class="tw-w-[150px]" v-model="store.tipoCalculo" :options="options"
                    placeholder="Tipo de Ação" />
                <span>Horas: {{ decimalToFormatHoursMinutos(store.totalResultado) }} </span>
                <FormsInputText v-model="store.tag" placeholder="Tag" class="tw-w-28" />
                <Btn text="Adicionar" variant="flat" icon="radix-icons:paper-plane" @click="store.addHistorico()" />
            </div>
        </div>
    </div>
    <div class="tw-w-[58rem] max-sm:tw-w-[45rem] tw-mt-1">
        <div role="toolbar" class="tw-py-2 tw-gap-2 tw-flex tw-items-center">
            <Btn text="Resetar" variant="secondary" space="small" icon="radix-icons:symbol"
                @click="store.limparHistorico()" />
            <Btn text="Exportar CSV" variant="secondary" space="small" icon="radix-icons:download"
                @click="exportarCSV" />
            <span class="tw-text-xl">
                Total Horas: <span class="tw-font-bold"> {{ decimalToFormatHoursMinutos(store.totalHistorico) }}</span>
            </span>
        </div>
        <HistoricoHorasGrid />
    </div>
</template>
<script setup lang="ts">
import { useHistoricoHorasStore } from '~/stores/historico-horas/store';
import { HistoricoItemState, TipoCalculo } from '~/stores/historico-horas/types';
import { useNotificationSuccess } from '~/composables/notifications/use-notification';
import sumTotal from '~/utils/sum-total';

const store = useHistoricoHorasStore();
onBeforeMount(() => {
    store.inicializar();
});

const exportarCSV = () => {
    const historico = store.historico;
    const historicoAgrupado = agruparHistorico(historico);
    const csv = converterParaCSV(historicoAgrupado);
    navigator.clipboard.writeText(csv);
    useNotificationSuccess('sucesso', 'CSV copiado com sucesso');
}

const agruparHistorico = (historico: HistoricoItemState[]) => {
    return historico.reduce((acc, item) => {
        const tag = item.tag || 'outros';
        if (!acc[tag]) {
            acc[tag] = 0;
        }
        acc[tag] += sumTotal(item);
        return acc;
    }, {} as Record<string, number>);
}

const converterParaCSV = (historicoAgrupado: Record<string, number>) => {
    let csv = 'tag;horas_total\n';
    for (const tag in historicoAgrupado) {
        csv += `${tag};${decimalToFormatHoursMinutos(historicoAgrupado[tag])}\n`;
    }
    return csv;
}

const options = ref([
    {
        text: "Soma",
        value: TipoCalculo.somar
    },
    {
        text: "Subtrair",
        value: TipoCalculo.subtrair
    }
]);

</script>