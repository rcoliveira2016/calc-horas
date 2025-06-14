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
                <span v-if="variant !== 'icon'" class="tw-ml-2">Carregando...</span>
            </slot>
        </template>
        <template v-else>
            <slot>
                <template v-if="variant === 'icon'">
                    <Icon v-if="icon" :icon="icon" class="tw-w-5 tw-h-5" />
                </template>
                <template v-else>
                    <span>{{ text }}</span>
                    <Icon v-if="icon" :icon="icon" class="tw-w-5 tw-h-5 tw-ml-2" />
                </template>
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
    variant?: 'primary' | 'secondary' | 'flat' | 'icon';
    disabled?: boolean;
    loading?: boolean;
    space?: 'small' | 'medium' | 'large';
}

const props = defineProps<Props>();
const emits = defineEmits(['click']);

const computedClasses = computed(() => {
    const baseClasses = [
        'tw-border',
        'tw-max-h-[50px]',
        'tw-border-neutral-200',
        'dark:tw-border-white/10',
        'tw-inline-flex',
        'tw-items-center',
        'tw-justify-center',
        'tw-rounded',
        'tw-font-semibold',
        'tw-focus:outline-none',
        'tw-focus:ring',
        'tw-transition-colors',
        'tw-duration-200',
    ];

    const variantClasses = {
        primary: 'tw-bg-indigo-900 tw-text-white dark:tw-border-indigo/50 hover:tw-bg-indigo-950 focus:tw-ring-blue-300',
        secondary: 'tw-bg-gray-500 tw-text-white hover:tw-bg-gray-600 focus:tw-ring-gray-300',
        flat: 'tw-border-none tw-bg-transparent tw-text-gray-900 dark:tw-text-white hover:tw-bg-gray-50 hover:tw-bg-opacity-30 focus:tw-ring-gray-300',
        icon: 'tw-border-none tw-bg-transparent tw-text-gray-900 dark:tw-text-white hover:tw-bg-gray-50 hover:tw-bg-opacity-30 focus:tw-ring-gray-300 tw-rounded-full',
    };

    const spaceClasses = {
        small: props.variant === 'icon' ? 'tw-p-1.5' : 'tw-px-2 tw-py-1',
        medium: props.variant === 'icon' ? 'tw-p-2' : 'tw-px-4 tw-py-2',
        large: props.variant === 'icon' ? 'tw-p-3' : 'tw-px-6 tw-py-3',
    };

    const disabledClasses = 'disabled:tw-opacity-50 disabled:tw-cursor-not-allowed disabled:tw-pointer-events-none';

    // Para a variante icon, garantir que seja quadrado
    const iconSizeClasses = props.variant === 'icon' ? {
        small: 'tw-w-8 tw-h-8',
        medium: 'tw-w-10 tw-h-10',
        large: 'tw-w-12 tw-h-12',
    } : {};

    return [
        ...baseClasses,
        variantClasses[props.variant || 'primary'],
        spaceClasses[props.space || 'medium'],
        props.variant === 'icon' ? iconSizeClasses[props.space || 'medium'] : '',
        (props.disabled || props.loading) ? disabledClasses : '',
    ]
});

const handleClick = () => {
    if (!props.loading) {
        emits('click');
    }
};
</script>