<script setup lang="ts">
import { useNotificationSuccess } from '~/composables/notifications/use-notification';

const formatacaoPadrao = ref('');
const subtrairHorasAlmoco = ref(false);
const tempoAlmoco = ref(0);

const obterDadosConfiguracoesHistorico = async () => {
    const { $configuracoesHistoricoStorage } = useNuxtApp();

    const configuracoesHistorico = await $configuracoesHistoricoStorage.get();
    formatacaoPadrao.value = configuracoesHistorico.formatacaoPadrao || '';
    subtrairHorasAlmoco.value = configuracoesHistorico.subtrairHorasAlmoco || false;
    tempoAlmoco.value = configuracoesHistorico.tempoAlmoco || 0;
}

const salvarConfiguracoesHistorico = async () => {
    const { $configuracoesHistoricoStorage } = useNuxtApp();

    await $configuracoesHistoricoStorage.set({
        subtrairHorasAlmoco: subtrairHorasAlmoco.value,
        tempoAlmoco: tempoAlmoco.value,
        formatacaoPadrao: formatacaoPadrao.value
    });

    useNotificationSuccess('sucesso', 'Configurações salvas com sucesso');
}

onMounted(() => {
    obterDadosConfiguracoesHistorico();
})
</script>

<template>
    <div class="tw-min-w-[50%]">
        <h1 class="tw-text-3xl tw-text-left tw-mb-4">Configurações</h1>
        <section class="tw-relative tw-p-4 tw-border-2 tw-border-neutral-200 tw-rounded-lg dark:tw-border-white/10">
            <h3 class="tw-absolute tw-top-[-15px] tw-bg-inherit">Configurações Historico</h3>
            <section class="tw-grid tw-grid-cols-3">
                <FormsFieldSet label="Formatação Padrão" idField="formatacaoPadrao" v-slot="slotProps">
                    <FormsInputText v-bind="slotProps" v-model="formatacaoPadrao" />
                </FormsFieldSet>
                <FormsFieldSet label="Tempo de almoço" idField="tempoAlmoco" v-slot="slotProps">
                    <FormsInputHours v-bind="slotProps" v-model="tempoAlmoco" />
                </FormsFieldSet>
                <FormsFieldSet label="Subtrair horas de almoço" idField="subtrairHorasAlmoco" v-slot="slotProps">
                    <FormsSwitch v-bind="slotProps" v-model="subtrairHorasAlmoco" label="" />
                </FormsFieldSet>
            </section>
            <div>
                <Btn v-model="formatacaoPadrao" text="Salvar" @click="salvarConfiguracoesHistorico()" />
            </div>
        </section>
    </div>
</template>