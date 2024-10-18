<script setup lang="ts">
import { ref } from "vue";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxItemIndicator,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from "radix-vue";
import { Icon } from "@iconify/vue";
type OptionValueType = string | number | Record<string, unknown>
type OptionType = { text: string, value: OptionValueType };
const modelValue = defineModel<OptionValueType>();
const props = defineProps<{
    options: OptionType[],
    placeholder?: string
}>();
const valueComboBox = computed<OptionType|undefined>({
    get: () => {
        return props.options.find((option) => option.value === modelValue.value);
    },
    set: (value: OptionType | undefined) => {
        modelValue.value = value?.value
    }
})
</script>

<template>
  <ComboboxRoot v-model="valueComboBox" class="relative" :display-value="(opt: OptionType) => opt.text">
    <ComboboxAnchor
      class="tw-min-w-[160px] tw-inline-flex tw-items-center tw-justify-between tw-rounded tw-px-[15px] tw-text-[13px] tw-leading-none tw-h-[35px] tw-gap-[5px] tw-bg-gray-600 tw-text-white tw-shadow-[0_2px_10px] tw-shadow-black/10 hover:tw-bg-mauve3 focus:tw-shadow-[0_0_0_2px] focus:tw-shadow-black data-[placeholder]:tw-text-grass9"
    >
      <ComboboxInput
        class="!tw-bg-transparent tw-outline-none tw-text-white tw-h-full selection:tw-bg-gray-700 tw-placeholder-white tw-bg-gray-600"
        :placeholder="placeholder"
      />
      <ComboboxTrigger>
        <Icon
          icon="radix-icons:chevron-down"
          class="tw-h-4 tw-w-4 tw-text-white"
          tabindex="0"
        />
      </ComboboxTrigger>
    </ComboboxAnchor>
    <ComboboxContent
      class="tw-absolute tw-z-10 tw-bg-gray-600 tw-overflow-hidden tw-rounded tw-shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)] tw-will-change-[opacity,transform] data-[side=top]:tw-animate-slideDownAndFade data-[side=right]:tw-animate-slideLeftAndFade data-[side=bottom]:tw-animate-slideUpAndFade data-[side=left]:tw-animate-slideRightAndFade"
    >
      <ComboboxViewport class="p-[5px]">
        <ComboboxEmpty
          class="tw-text-white text-xs font-medium text-center py-2"
        />

        <ComboboxItem
          v-for="(option, index) in props.options"
          :key="index"
          class="tw-text-[13px] tw-leading-none tw-text-white tw-rounded-[3px] tw-flex tw-items-center tw-h-[25px] tw-pr-[35px] tw-pl-[25px] tw-relative tw-select-none data-[disabled]:tw-text-white data-[disabled]:tw-pointer-events-none data-[highlighted]:tw-outline-none data-[highlighted]:tw-bg-blue data-[highlighted]:tw-text-write"
          :value="option"
        >
          <ComboboxItemIndicator
            class="tw-absolute tw-left-0 tw-w-[25px] tw-inline-flex tw-items-center tw-justify-center"
          >
            <Icon icon="radix-icons:check" />
          </ComboboxItemIndicator>
          <span>
            {{ option.text }}
          </span>
        </ComboboxItem>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
