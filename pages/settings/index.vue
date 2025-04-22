<script setup lang="ts">
import { useLogInGitHub, useLogOutGitHub } from '~/composables/auth/github/log-in';
import { useNotificationSuccess } from '~/composables/notifications/use-notification';
import type { ProfileGithubApi } from '~/shared/types/server/api/profile/github-profile';
export type Configuracoes = {
    subtrairHorasAlmoco: boolean
    tempoAlmoco: number
    formatacaoPadrao?: string
}

const configuracoes = ref<Configuracoes>({
    subtrairHorasAlmoco: false,
    tempoAlmoco: 0,
    formatacaoPadrao: ''
});
const user = ref<{ name: string; avatar: string } | null>(null);
const loading = ref(false);
const headers = useRequestHeaders(['cookie'])

const dataProfile = await useAsyncData<ProfileGithubApi>('profile', () =>
    $fetch('/api/profile/github', {
        method: 'GET',
        credentials: 'include',
        headers
    })
)

const setarUser = () => {
    if (!dataProfile.data.value) return;
    if (dataProfile.status.value !== 'success') return;
    user.value = {
        name: dataProfile.data.value?.name || '',
        avatar: dataProfile.data.value?.urlAvatar || ''
    }
}

const loginWithGithub = async () => {
    useLogInGitHub();
    await dataProfile.refresh();
    setarUser();
};

const obterDadosConfiguracoesHistorico = async () => {
    const { $configuracoesHistoricoStorage } = useNuxtApp();

    const configuracoesHistorico = await $configuracoesHistoricoStorage.get();
    configuracoes.value.formatacaoPadrao = configuracoesHistorico.formatacaoPadrao || '';
    configuracoes.value.subtrairHorasAlmoco = configuracoesHistorico.subtrairHorasAlmoco || false;
    configuracoes.value.tempoAlmoco = configuracoesHistorico.tempoAlmoco || 0;
}

const salvarConfiguracoesHistorico = async () => {
    const { $configuracoesHistoricoStorage } = useNuxtApp();

    await $configuracoesHistoricoStorage.set({
        subtrairHorasAlmoco: configuracoes.value.subtrairHorasAlmoco,
        tempoAlmoco: configuracoes.value.tempoAlmoco,
        formatacaoPadrao: configuracoes.value.formatacaoPadrao
    });

    useNotificationSuccess('sucesso', 'Configurações salvas com sucesso');
}
setarUser();
onMounted(() => {
    obterDadosConfiguracoesHistorico();
})
const onImportar = async () => {
    const data = await $fetch<{ config: Record<string, any> }>('/api/profile/gist/importar', {
        method: 'POST',
        onResponse() {
            loading.value = false;
        },
        onRequest() {
            loading.value = true;
        },
        onResponseError() {
            loading.value = false;
        },
    })

    if (data?.config) {
        configuracoes.value = {
            formatacaoPadrao: data.config.formatacaoPadrao || configuracoes.value.formatacaoPadrao,
            subtrairHorasAlmoco: data.config.subtrairHorasAlmoco || configuracoes.value.subtrairHorasAlmoco,
            tempoAlmoco: data.config.tempoAlmoco || configuracoes.value.tempoAlmoco
        }

        salvarConfiguracoesHistorico();
    }
}
const onExportar = async () => {
    await $fetch('/api/profile/gist/exportar', {
        method: 'POST',
        body: {
            id: null,
            payload: {
                formatacaoPadrao: configuracoes.value.formatacaoPadrao,
                subtrairHorasAlmoco: configuracoes.value.subtrairHorasAlmoco,
                tempoAlmoco: configuracoes.value.tempoAlmoco
            }
        },
        onResponse() {
            loading.value = false;
        },
        onRequest() {
            loading.value = true;
        },
        onResponseError() {
            loading.value = false;
        },
    });
    useNotificationSuccess('sucesso', 'Exportado com sucesso');
}
const onExit = async () => {
    useLogOutGitHub();
    user.value = null;
}
</script>

<template>
    <div class="tw-min-w-[50vw]">
        <h1 class="tw-text-3xl tw-text-left tw-mb-4">Configurações</h1>
        <section class="tw-relative tw-p-4 tw-border-2 tw-border-neutral-200 tw-rounded-lg dark:tw-border-white/10">
            <h3 class="tw-absolute tw-top-[-15px] tw-bg-inherit">Configurações Historico</h3>
            <section class="tw-grid tw-grid-cols-3">
                <FormsFieldSet label="Formatação Padrão" idField="formatacaoPadrao" v-slot="slotProps">
                    <FormsInputText v-bind="slotProps" v-model="configuracoes.formatacaoPadrao" />
                </FormsFieldSet>
                <FormsFieldSet label="Tempo de almoço" idField="tempoAlmoco" v-slot="slotProps">
                    <FormsInputHours v-bind="slotProps" v-model="configuracoes.tempoAlmoco" />
                </FormsFieldSet>
                <FormsFieldSet label="Subtrair horas de almoço" idField="subtrairHorasAlmoco" v-slot="slotProps">
                    <FormsSwitch v-bind="slotProps" v-model="configuracoes.subtrairHorasAlmoco" label="" />
                </FormsFieldSet>
            </section>
            <div>
                <Btn text="Salvar" @click="salvarConfiguracoesHistorico()" />
            </div>
        </section>
        <section
            class="tw-relative tw-mt-6 tw-p-4 tw-border-2 tw-border-neutral-200 tw-rounded-lg dark:tw-border-white/10">
            <h3 class="tw-absolute tw-top-[-15px] tw-bg-inherit">Sincronizar Configurações</h3>
            <div class="tw-flex tw-gap-4">
                <template v-if="user">
                    <div class="tw-flex tw-gap-2 tw-flex-col">
                        <div class="tw-flex tw-flex-row tw-gap-2 tw-items-center">
                            <img :src="user.avatar" alt="Avatar" class="tw-w-16 tw-h-16 tw-rounded-full" />
                            <span class="tw-text-lg tw-font-semibold">{{ user.name }}</span>
                            <btn text="Sair" space="small" variant="secondary" icon="radix-icons:exit"
                                @click="onExit" />
                        </div>
                        <div class="tw-flex tw-gap-2 tw-mt-2">
                            <btn text="Importar" variant="flat" icon="radix-icons:arrow-down" @click="onImportar"
                                :loading="loading" />
                            <btn text="Exportar" variant="flat" icon="radix-icons:upload" @click="onExportar"
                                :loading="loading" />
                        </div>
                    </div>
                </template>
                <template v-else>
                    <Btn text="Sincronizar com github" icon="radix-icons:github-logo" @click="loginWithGithub" />
                </template>
            </div>
        </section>
    </div>
</template>