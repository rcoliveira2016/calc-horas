<script setup lang="ts">
import { ToastAction, ToastDescription, ToastProvider, ToastRoot, ToastTitle, ToastViewport } from 'reka-ui';
import { useNotificationsStore, type NotificationsItemState } from '~/stores/ui/notifications/store';

const store = useNotificationsStore();

const cssTostRoot = (notification: NotificationsItemState) => {
  switch (notification.type) {
    case 'success':
      return 'tw-bg-green-800';
    case 'error':
      return 'tw-bg-red-700';
    case 'warning':
      return 'tw-bg-yellow-700';
    case 'info':
      return 'tw-bg-blue-700';
    default:
      return '';
  }
}
</script>

<template>
  <ToastProvider>
    <ToastRoot v-for="event in store.notificationsItens" v-model:open="event.open" :duration="event.duration"
      class=" tw-border tw-border-neutral-200 dark:tw-border-white/10 tw-rounded-lg tw-shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] tw-p-[15px] tw-grid [grid-template-areas:_'title_action'_'description_action'] tw-grid-cols-[auto_max-content] tw-gap-x-[15px] tw-items-center data-[state=open]:tw-animate-slideIn data-[state=closed]:tw-animate-hide data-[swipe=move]:tw-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=cancel]:tw-translate-x-0 data-[swipe=cancel]:tw-transition-[transform_200ms_ease-out] data-[swipe=end]:tw-animate-swipeOut"
      :class="cssTostRoot(event)">

      <ToastTitle class="[grid-area:_title] tw-mb-[5px] tw-font-medium tw-text-slate12 tw-text-[15px]">
        {{ event.title }}
      </ToastTitle>
      <ToastDescription>
        {{ event.description }}
      </ToastDescription>
      <ToastAction class="[grid-area:_action]" alt-text="Goto schedule to undo">
        <BtnIcon icon="ic:baseline-close" />
      </ToastAction>
    </ToastRoot>
    <ToastViewport
      class="[--viewport-padding:_25px] tw-fixed tw-bottom-0 tw-right-0 tw-flex tw-flex-col tw-p-[var(--viewport-padding)] tw-gap-[10px] tw-w-[390px] tw-max-w-[100vw] tw-m-0 tw-list-none tw-z-[2147483647] tw-outline-none" />
  </ToastProvider>

</template>