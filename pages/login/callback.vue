<script setup>
import { useCallbackLogInGitHub } from '~/composables/auth/github/log-in';

useCallbackLogInGitHub();
</script>

<template>
  <p>Autenticando...</p>
</template>