<script setup lang="ts">
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
}

onMounted(() => {
    obterDadosConfiguracoesHistorico();
})
</script>

<template>
    <div class="tw-w-4/5">
        <h1 class="tw-text-3xl tw-text-left tw-mb-4">Configurações</h1>
        <section class="tw-relative tw-p-4 tw-border-2 tw-border-neutral-200 tw-rounded-lg dark:tw-border-white/10">
            <h3 class="tw-absolute tw-top-[-15px] tw-bg-inherit">Configurações Historico</h3>
            <fieldset class="mb-[15px] w-full flex flex-col justify-start">
                <label class="text-[13px] leading-none mb-2.5 text-green12 block" for="formatacaoPadrao"> Formatação
                    Padrão </label>
                <FormsInputText id="formatacaoPadrao" name="formatacaoPadrao" placeholder="Formatação Padrão"
                    v-model="formatacaoPadrao" />
            </fieldset>
            <fieldset class="mb-[15px] w-full flex flex-col justify-start">
                <label class="text-[13px] leading-none mb-2.5 text-green12 block" for="tempoAlmoco">
                    Tempo de almoço
                </label>
                <FormsInputHours v-model="tempoAlmoco" id="tempoAlmoco" name="tempoAlmoco" placeholder="tempo almoço" />
            </fieldset>
            <FormsSwitch v-model="subtrairHorasAlmoco" label="Subtrair horas de almoco" />
            <div>
                <Btn v-model="formatacaoPadrao" text="Salvar" @click="salvarConfiguracoesHistorico()" />
            </div>
        </section>
    </div>
</template>