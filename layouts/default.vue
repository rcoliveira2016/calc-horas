<template>
    <nav class="tw-bg-white tw-border-gray-200 dark:tw-bg-gray-900">
        <div class="tw-flex tw-flex-wrap tw-justify-between tw-items-center tw-mx-auto tw-p-4 tw-px-20">
            <div class="tw-flex tw-items-center ">
                <a href="/" class="tw-flex tw-items-center tw-space-x-3 rtl:tw-space-x-reverse">
                    <img src="/assets/img/logo.png" class="tw-h-8" alt="Flowbite Logo" />
                    <span
                        class="tw-self-center tw-text-2xl tw-font-semibold tw-whitespace-nowrap dark:tw-text-white">CalcHoras</span>
                </a>

                <div class="tw-ml-8 tw-flex tw-align-bottom" id="navbar-default">
                    <ul
                        class="dark:tw-text-white tw-font-medium tw-flex tw-flex-col tw-p-4 md:tw-p-0 tw-mt-4 tw-border tw-rounded-lg md:tw-flex-row md:tw-space-x-8 tw-rtl:tw-space-x-reverse md:tw-mt-0 md:tw-border-0 tw-dark:tw-bg-gray-800 md:tw-dark:tw-bg-gray-900 tw-dark:tw-border-gray-700">

                        <li>
                            <a href="#"
                                class="tw-block tw-py-2 tw-px-3 tw-rounded tw-hover:bg-gray-100 md:tw-hover:bg-transparent md:tw-border-0 md:tw-hover:text-blue-700 md:tw-p-0 dark:tw-text-white md:tw-dark:tw-hover:text-blue-500 dark:tw-hover:bg-gray-700 dark:tw-hover:text-white=">
                                Ultilitarios</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="tw-flex tw-items-center tw-space-x-6 rtl:tw-space-x-reverse">

            </div>
        </div>
    </nav>

    <div class="tw-flex tw-justify-center">
        <slot />
    </div>
</template>
<script setup lang="ts">
useHead({
    bodyAttrs: {
        class: 'tw-bg-slate-800 tw-text-white'
    }
})
</script>