<template>
    <div class="tw-p-3.5">
        <div class="tw-flex tw-gap-3">
            <div class="tw-flex tw-flex-col tw-gap-3">
                <div class="tw-flex tw-gap-3 tw-items-center">
                    <FormsInputHours v-model="store.tempoInicial" />
                    <FormsInputHours v-model="store.tempoFinal" />
                    <FormsComboBox class="tw-w-[150px]" v-model="store.tipoCalculo" :options="options"
                        placeholder="Tipo de Ação" />
                    <span>Horas: {{ decimalToFormatHoursMinutos(store.totalResultado) }} </span>
                </div>
                <div class="tw-flex tw-gap-3 tw-items-center">
                    <FormsInputText v-model="store.tag" placeholder="Tag" />
                    <FormsInputText v-model="store.formato" placeholder="formatação" />
                    <span>Formato: {{ formatCustomHours(store.totalResultado, store.formato) }}</span>
                </div>
            </div>
            <div class="tw-flex tw-items-center tw-border-l-2 tw-border-neutral-200 dark:tw-border-white/10 tw-px-3">
                <Btn text="Adicionar" icon="radix-icons:paper-plane" @click="store.addHistorico()" />
            </div>
        </div>
        <div class="tw-w-[58rem] tw-mt-3">
            <div role="toolbar" class="tw-py-4">
                <Btn variant="secondary" text="Limpar" icon="radix-icons:eraser" @click="store.limparHistorico()" />
                <span class="tw-text-xl tw-font-bold">
                    Total Horas: {{ decimalToFormatHoursMinutos(store.totalHistorico) }}
                </span>
            </div>
            <HistoricoHorasGrid />
        </div>
    </div>
</template>
<script setup lang="ts">
import { useHistoricoHorasStore } from '~/stores/historico-horas/store';
import { TipoCalculo } from '~/stores/historico-horas/types';

const store = useHistoricoHorasStore();

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