<template>
    <nav class="tw-bg-white tw-border-gray-200 dark:tw-bg-gray-900 tw-shadow-md">
        <div
            class="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-mx-auto tw-p-4 xl:tw-px-44 lg:tw-px-22 md:tw-px-4 sm:tw-px-2">
            <div class="tw-flex tw-items-center ">
                <NuxtLink to="/" class="tw-flex tw-items-center tw-space-x-3 rtl:tw-space-x-reverse">
                    <img src="/assets/img/logo.png" class="tw-h-8" alt="Flowbite Logo" />
                    <span
                        class="tw-self-center tw-text-2xl tw-font-semibold tw-whitespace-nowrap dark:tw-text-white">CalcHoras</span>
                </NuxtLink>

                <div class="tw-ml-8 tw-flex tw-align-bottom" id="navbar-default">
                    <ul
                        class="dark:tw-text-white tw-font-medium tw-flex tw-flex-col tw-p-4 md:tw-p-0 tw-mt-4 tw-rounded-lg md:tw-flex-row md:tw-space-x-8 tw-rtl:tw-space-x-reverse md:tw-mt-0 tw-dark:tw-bg-gray-800 md:tw-dark:tw-bg-gray-900">

                        <li>
                            <NuxtLink to="/ultis" class="tw-flex tw-items-center">
                                Ultilitarios
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tw-flex tw-items-center tw-space-x-6 rtl:tw-space-x-reverse">
                <div class="tw-ml-8 tw-flex tw-align-bottom" id="navbar-default">
                    <ul
                        class="dark:tw-text-white tw-font-medium tw-flex tw-flex-col tw-p-4 md:tw-p-0 tw-mt-4 md:tw-flex-row md:tw-space-x-8 tw-rtl:tw-space-x-reverse md:tw-mt-0 tw-dark:tw-bg-gray-800 md:tw-dark:tw-bg-gray-900">
                        <li>
                            <NuxtLink to="/settings" class="tw-flex tw-items-center">
                                Configurações
                            </NuxtLink>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>

    <div class=" tw-flex tw-flex-col tw-justify-center tw-items-center">
        <slot />
    </div>
    <UiNotificationsProvider />
</template>
<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: 'tw-bg-body-dark tw-text-body-light'
    }
})
</script>