<script setup>
import { useCallbackLogInGitHub } from '~/composables/auth/github/log-in';
definePageMeta({
  layout: false,
});
useHead({
  bodyAttrs: {
    class: 'tw-bg-body-dark tw-text-body-light'
  }
})
useCallbackLogInGitHub('/settings');
</script>

<template>
  <p>Autenticando...</p>
</template>