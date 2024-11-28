<template>
  <section class="tw-min-w-[50%]">
    <h1 class="tw-text-3xl tw-text-left tw-mb-4">Ultilitarios</h1>
    <div class="tw-flex tw-flex-col tw-gap-4">
      <div class="tw-flex tw-gap-3 tw-items-center">
        <span>Formatação Padrão:</span>
        <FormsInputText v-model="formato" placeholder="formatação customizada" />
      </div>
      <div class="tw-flex tw-gap-3 tw-items-center">
        <FormsInputHours v-model="tempoInicial" />
        <FormsInputHours v-model="tempoFinal" />
        <FormsComboBox class="tw-w-[150px]" v-model="tipoCalculo" :options="options" placeholder="Tipo de Ação" />
        <span><strong>Decimal:</strong> {{ totalResultado.toFixed(2) }} </span>
        <span><strong>Horas:</strong> {{ decimalToFormatHoursMinutos(totalResultado) }} </span>
        <span><strong>Formatado:</strong> {{ formatCustomHours(totalResultado, formato) }}</span>
      </div>
      <div class="tw-flex tw-gap-3 tw-items-center">
        Expressão:
        <FormsInputText v-model="expressao" placeholder="1.7+2.5*10" />
        <span><strong>Decimal:</strong> {{ resultadoExpressao.toFixed(2) }} </span>
        <span><strong>Horas:</strong> {{ decimalToFormatHoursMinutos(resultadoExpressao) }} </span>
        <span><strong>Formatado:</strong> {{ formatCustomHours(resultadoExpressao, formato) }}</span>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { evaluate } from 'mathjs';
import { TipoCalculo } from '~/stores/historico-horas/types';
const tempoInicial = ref(0);
const tempoFinal = ref(0);
const tipoCalculo = ref<TipoCalculo>();
const formato = ref('');
const expressao = ref('');
const resultadoExpressao = ref(0);
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

const totalResultado = computed(() => {
  return sumTotal({
    tempoInicial: tempoInicial.value,
    tempoFinal: tempoFinal.value,
    tipoCalculo: tipoCalculo.value || TipoCalculo.somar
  });
})

watch(expressao, () => {
  resultadoExpressao.value = evaluate(expressao.value);
});

</script>