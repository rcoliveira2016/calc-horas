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
                <fieldset class="tw-mb-[15px] tw-w-full tw-flex tw-flex-col tw-justify-start">
                    <label class="tw-leading-none tw-mb-2.5 tw-block" for="formatacaoPadrao">
                        Formatação
                        Padrão </label>
                    <FormsInputText id="formatacaoPadrao" name="formatacaoPadrao" placeholder="Formatação Padrão"
                        v-model="formatacaoPadrao" />
                </fieldset>
                <fieldset class="tw-mb-[15px] tw-w-full tw-flex tw-flex-col tw-justify-start">
                    <label class="tw-leading-none tw-mb-2.5 tw-block" for="tempoAlmoco">
                        Tempo de almoço
                    </label>
                    <FormsInputHours v-model="tempoAlmoco" id="tempoAlmoco" name="tempoAlmoco"
                        placeholder="tempo almoço" />
                </fieldset>
                <fieldset class="tw-mb-[15px] tw-w-full tw-flex tw-flex-col tw-justify-start">
                    <label class="tw-leading-none tw-mb-2.5 tw-block" for="subtrairHorasAlmoco">
                        Subtrair horas de almoço
                    </label>
                    <FormsSwitch v-model="subtrairHorasAlmoco" />
                </Fieldset>
            </section>
            <div>
                <Btn v-model="formatacaoPadrao" text="Salvar" @click="salvarConfiguracoesHistorico()" />
            </div>
        </section>
    </div>
</template>