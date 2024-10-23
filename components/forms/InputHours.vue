<template>
    <span>
        <div ref="divContent" tabindex="0" @click.self="focusInput" @focus="focusDivContent"
            class="tw-flex tw-outline-1 tw-items-center tw-rounded-lg tw-border tw-border-neutral-200 dark:tw-border-white/10 tw-bg-gray-600 dark:tw-bg-gray-800 tw-p-3 tw-w-fit">

            <input ref="hoursInput" role="input-hours" maxlength="2" :value="hours" @input="inputHours"
                @keydown="keydownInputs" @keyup.up="acrescentHours" @keyup.down="decrementHours"
                @focus="focusEventInput" @blur="unfocusEventInput" @keyup="keyUpInputs"
                class="tw-border-none tw-bg-inherit tw-w-8 tw-text-center focus:tw-outline-none" />
            <span class="tw-px-none">:</span>
            <input ref="minutesInput" role="input-minutes" maxlength="2" :value="minutes" @input="inputMinutes"
                @keydown="keydownInputs" @keyup.up="acrescentMinutes" @keyup.down="decrementMinutes"
                @focus="focusEventInput" @blur="unfocusEventInput" @keyup="keyUpInputs"
                class="tw-border-none tw-bg-inherit tw-w-8 tw-text-center focus:tw-outline-none" />
        </div>
    </span>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
const divContent = ref<HTMLElement>();
const hours = ref("");
const minutes = ref("");

const hoursInput = ref<HTMLInputElement>();
const minutesInput = ref<HTMLInputElement>();


const props = defineProps<{
    modelValue: number;
    focus?: boolean;
}>();

const emits = defineEmits(['update:modelValue', 'focus', 'blur']);

onMounted(() => {
    if (props.focus) {
        focusInput();
        focusEventInput();
    }
})

const updateValue = () => {
    const valor = stringFormatHoursMinutesToDecimal(`${hours.value}:${minutes.value}`);
    emits('update:modelValue', valor);
}

const keydownInputs = (event: KeyboardEvent) => {
    if (
        event.key === "Backspace" || event.key === "Delete" || event.key === "Tab" || event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    )
        return;

    if (!/^[0-9]$/.test(event.key))
        event.preventDefault();
}

const keyUpInputs = (event: KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    const input = event.target as HTMLInputElement;
    const position = input.selectionStart;
    if(input.role === "input-hours"){
        if (position === 2) 
            minutesInput.value?.focus();
    }

    if (input.role === "input-minutes") { 
        if (position === 0) {
            hoursInput.value?.focus();
        }
    }
}

const inputMinutes = (event: Event) => {
    const el = event.target as HTMLInputElement;
    if (Number(el.value) > 59) el.value = '59';

    minutes.value = el.value;
    updateValue();
}
const inputHours = (event: Event) => {
    const el = event.target as HTMLInputElement;

    hours.value = el.value;
    updateValue();
}

const focusInput = () => {
    hoursInput.value?.focus();
}

const focusDivContent = () => {
    hoursInput.value?.focus();
}

onMounted(() => {
    atributeValueInputs(props.modelValue)
})

const atributeValueInputs = (value: number) => {
    const decimalTime = decimalToHoursMinutos(value);

    hours.value = decimalTime.hours.toString().padStart(2, '0');
    minutes.value = decimalTime.minutes.toString().padStart(2, '0');
    updateValue();
}
const decrementHours = () => {
    if (hours.value === "00") return;
    hours.value = (Number(hours.value) - 1).toString().padStart(2, '0');
    updateValue();
}
const acrescentHours = () => {
    hours.value = (Number(hours.value) + 1).toString().padStart(2, '0');
    updateValue();
}
const decrementMinutes = () => {
    if (minutes.value === "00") return;
    minutes.value = (Number(minutes.value) - 1).toString().padStart(2, '0');
    updateValue();
}
const acrescentMinutes = () => {
    minutes.value = (Number(minutes.value) + 1).toString().padStart(2, '0');
    updateValue();
}
const focusEventInput = () => {
    divContent.value?.classList.add('tw-outline');
}

const unfocusEventInput = () => {
    divContent.value?.classList.remove('tw-outline');
    emits('blur');
}
</script>