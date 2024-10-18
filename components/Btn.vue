<template>
    <button :class="computedClasses" @click="handleClick">
        <!-- O conteúdo do slot será renderizado aqui -->
        <slot>
            <span>{{ text }}</span>
            <Icon v-if="icon" :icon="icon" class="tw-w-5 tw-h-5 tw-ml-2" />
        </slot>
    </button>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed, defineProps } from 'vue';

interface Props {
    text?: string;
    icon?: string;
    variant?: 'primary' | 'secondary';
}

const props = defineProps<Props>();
const emits = defineEmits(['click']);
const computedClasses = computed(() => {
    const baseClasses = 'tw-border tw-border-neutral-200 dark:tw-border-white/10 tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded tw-tw-border tw-font-semibold tw-focus:outline-none tw-focus:ring';
    const variants = {
        primary: 'tw-bg-blue-500 tw-text-white hover:tw-bg-blue-600 focus:tw-ring-blue-300',
        secondary: 'tw-bg-gray-500 tw-text-white hover:tw-bg-gray-600 focus:tw-ring-gray-300',
    };
    return `${baseClasses} ${variants[props.variant || 'primary']}`;
});

const handleClick = () => {
    emits('click');
};
</script>

<style scoped>
/* Estilos adicionais, se necessário */
</style>
