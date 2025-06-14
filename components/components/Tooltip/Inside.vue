<template>
  <transition name="fade">
    <div
      v-if="visible"
      ref="tooltip"
      :class="['tw-absolute tw-z-[1000] tw-pointer-events-none tw-text-sm tw-text-white tw-rounded tw-px-2 tw-py-1 tw-bg-black tw-bg-opacity-80', 'tooltip']"
      :style="tooltipStyle"
      role="tooltip"
      :aria-hidden="!visible"
    >
      <slot>{{ texto }}</slot>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import type { TooltipDirection } from '@/types/tooltip';
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';

const props = defineProps<{
  texto: string;
  direcao?: TooltipDirection;
  delay?: number;
  offset?: number;
}>();

const texto = ref(props.texto);
const visible = ref(false);
const tooltip = ref<HTMLElement | null>(null);
const tooltipStyle = ref<Record<string, string>>({});
const offset = props.offset ?? 8;

const calculatePosition = () => {
  const parent = tooltip.value?.parentElement;
  if (!parent || !tooltip.value) return;

  const parentRect = parent.getBoundingClientRect();
  const tooltipRect = tooltip.value.getBoundingClientRect();
  let top = 0, left = 0;

  const space = {
    top: parentRect.top,
    bottom: window.innerHeight - parentRect.bottom,
    left: parentRect.left,
    right: window.innerWidth - parentRect.right
  };

  const preferred = props.direcao || 'top';
  let direction = preferred;

  const fits = {
    top: space.top >= tooltipRect.height + offset,
    bottom: space.bottom >= tooltipRect.height + offset,
    left: space.left >= tooltipRect.width + offset,
    right: space.right >= tooltipRect.width + offset,
  };

  if (!fits[preferred]) {
    direction = (Object.keys(fits).find(d => fits[d as TooltipDirection]) || 'top') as TooltipDirection;
  }

  switch (direction) {
    case 'top':
      top = parentRect.top - tooltipRect.height - offset;
      left = parentRect.left + (parentRect.width - tooltipRect.width) / 2;
      break;
    case 'bottom':
      top = parentRect.bottom + offset;
      left = parentRect.left + (parentRect.width - tooltipRect.width) / 2;
      break;
    case 'left':
      top = parentRect.top + (parentRect.height - tooltipRect.height) / 2;
      left = parentRect.left - tooltipRect.width - offset;
      break;
    case 'right':
      top = parentRect.top + (parentRect.height - tooltipRect.height) / 2;
      left = parentRect.right + offset;
      break;
  }

  tooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
  };
};

const show = () => {
  visible.value = true;
  nextTick(() => calculatePosition());
};
const hide = () => (visible.value = false);

onMounted(() => {
  const parent = tooltip.value?.parentElement;
  if (!parent) return;
  parent.addEventListener('mouseenter', show);
  parent.addEventListener('focus', show);
  parent.addEventListener('mouseleave', hide);
  parent.addEventListener('blur', hide);
});

onBeforeUnmount(() => {
  const parent = tooltip.value?.parentElement;
  if (!parent) return;
  parent.removeEventListener('mouseenter', show);
  parent.removeEventListener('focus', show);
  parent.removeEventListener('mouseleave', hide);
  parent.removeEventListener('blur', hide);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>