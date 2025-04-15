<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script lang="ts" setup>
onMounted(() => {
  document.documentElement.classList.add('tw-dark')
})
</script>
