<template>
    <button :class="computedClasses" :disabled="disabled || loading" @click="handleClick">
        <template v-if="loading">
            <slot name="loading">
                <svg class="tw-animate-spin tw-h-5 tw-w-5 tw-text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 24 24">
                    <circle class="tw-opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4">
                    </circle>
                    <path class="tw-opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                </svg>
                <span class="tw-ml-2">Carregando...</span>
            </slot>
        </template>
        <template v-else>
            <slot>
                <span>{{ text }}</span>
                <Icon v-if="icon" :icon="icon" class="tw-w-5 tw-h-5 tw-ml-2" />
            </slot>
        </template>
    </button>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { computed } from 'vue';

interface Props {
    text?: string;
    icon?: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
    loading?: boolean;
}

const props = defineProps<Props>();
const emits = defineEmits(['click']);

const computedClasses = computed(() => {
    const baseClasses = 'tw-border tw-max-h-[50px] tw-border-neutral-200 dark:tw-border-white/10 tw-inline-flex tw-items-center tw-px-4 tw-py-2 tw-rounded tw-font-semibold tw-focus:outline-none tw-focus:ring';
    const variants = {
        primary: 'tw-bg-indigo-900 tw-text-white dark:tw-border-indigo/50 hover:tw-bg-indigo-950 focus:tw-ring-blue-300',
        secondary: 'tw-bg-gray-500 tw-text-white hover:tw-bg-gray-600 focus:tw-ring-gray-300',
    };
    const disabledClasses = 'disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:tw-pointer-events-none';

    return `${baseClasses} ${variants[props.variant || 'primary']} ${props.disabled || props.loading ? disabledClasses : ''}`;
});

const handleClick = () => {
    if (!props.loading) {
        emits('click');
    }
};
</script>