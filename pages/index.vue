<template>
    <div class="tw-flex tw-gap-3">
        <div class="tw-flex tw-flex-col tw-gap-3">
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
    <div class="tw-w-[58rem] tw-mt-1">
        <div role="toolbar" class="tw-py-2 tw-gap-2 tw-flex tw-items-center">
            <Btn text="Resetar" variant="secondary" space="small" icon="radix-icons:symbol"
                @click="store.limparHistorico()" />
            <span class="tw-text-xl">
                Total Horas: <span class="tw-font-bold"> {{ decimalToFormatHoursMinutos(store.totalHistorico) }}</span>
            </span>
        </div>
        <HistoricoHorasGrid />
    </div>
</template>
<script setup lang="ts">
import { useHistoricoHorasStore } from '~/stores/historico-horas/store';
import { TipoCalculo } from '~/stores/historico-horas/types';

const store = useHistoricoHorasStore();
onBeforeMount(() => {
    store.inicializar();
});

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