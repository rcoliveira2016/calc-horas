<template>
  <div v-if="shouldShow" class="tw-fixed tw-inset-0 tw-z-50">
    <!-- Backdrop -->
    <div class="tw-absolute tw-inset-0 tw-bg-black tw-bg-opacity-50" />

    <!-- Banner -->
    <div class="tw-absolute tw-bottom-0 tw-w-full tw-bg-white tw-text-gray-800 tw-px-4 tw-py-10 tw-shadow-xl">
      <div class="tw-max-w-4xl tw-mx-auto tw-flex tw-justify-between tw-items-center tw-gap-4">
        <p class="tw-text-lg">
          As informações são salvas apenas <strong>no seu navegador</strong> (<i>localStorage</i>). Ao trocar de
          dispositivo ou navegador, <strong>os dados não estarão disponíveis</strong>.
        </p>
        <button @click="accept" class="tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded hover:tw-bg-blue-700">
          Entendi
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCookie } from '#app'
import { ref } from 'vue'

const COOKIE_KEY = 'info_banner_ack'
const STORAGE_KEY = 'info_banner_ack'

const shouldShow = ref(false)

onNuxtReady(() => {
  const cookie = useCookie(COOKIE_KEY).value

  if (!cookie) {
    shouldShow.value = true
  }
})

function accept() {

  const cookie = useCookie(COOKIE_KEY, {
    maxAge: 60 * 60 * 24 * 30,
  })

  cookie.value = '1';

  shouldShow.value = false
}
</script>
