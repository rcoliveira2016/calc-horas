<template>
    <span>
        <div ref="divContent"
            class="tw-w-fit tw-flex tw-overflow-hidden tw-outline-1 tw-items-center tw-rounded-lg tw-border tw-border-neutral-200 dark:tw-border-white/10 tw-bg-gray-600 dark:tw-bg-gray-800">

            <input ref="hoursInput" role="input-hours" maxlength="2" :value="hours" @input="inputHours"
                @keydown="keydownInputs" @keyup.up="acrescentHours" @keyup.down="decrementHours"
                @focus="focusEventInput" @blur="unfocusEventInput" @keyup="keyUpInputs"
                class="tw-w-9 tw-pl-3 tw-py-3 tw-rounded-lg tw-border-none tw-bg-inherit tw-text-center focus:tw-outline-none" />
            <span class="tw-px-none">:</span>
            <input ref="minutesInput" role="input-minutes" maxlength="2" :value="minutes" @input="inputMinutes"
                @keydown="keydownInputs" @keyup.up="acrescentMinutes" @keyup.down="decrementMinutes"
                @focus="focusEventInput" @blur="unfocusEventInput" @keyup="keyUpInputs"
                class="tw-w-9 tw-pr-3 tw-py-3 tw-rounded-lg  tw-border-none tw-bg-inherit tw-text-center focus:tw-outline-none" />
        </div>
    </span>
</template>
<script lang="ts" setup>
import debounce from 'lodash.debounce';
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

const lastKeyPressArrowXDefault = {
    positipo: -1,
    roleInput: "",
};

let lastKeyPressArrowX = { ...lastKeyPressArrowXDefault };

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

const keydownInputs = async (event: KeyboardEvent) => {

    if (event.ctrlKey && event.key === 'c') {
        window.navigator.clipboard.writeText(`${hours.value}:${minutes.value}`);
    }
    if (event.ctrlKey && event.key === 'v') {
        const text = await window.navigator.clipboard.readText();
        const valor = stringFormatHoursMinutesToDecimal(text);
        emits('update:modelValue', valor);
    }

    if (
        event.key === "Backspace" || event.key === "Delete" || event.key === "Tab" || event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
    )
        return;

    if (!/^[0-9]$/.test(event.key))
        event.preventDefault();
}

const keyUpInputs = (event: KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") {
        lastKeyPressArrowX = { ...lastKeyPressArrowXDefault };
        return;
    };

    const input = event.target as HTMLInputElement;
    const position = input.selectionStart;
    if (input.role === "input-hours") {
        if (position !== 2) {
            lastKeyPressArrowX = { ...lastKeyPressArrowXDefault };
            return;
        }

        if (lastKeyPressArrowX.roleInput === "input-hours" && lastKeyPressArrowX.positipo === 2) {
            minutesInput.value?.focus();
            minutesInput.value?.setSelectionRange(0, 0, "none")
            lastKeyPressArrowX = { ...lastKeyPressArrowXDefault };
            return;
        }

        lastKeyPressArrowX.roleInput = "input-hours";
        lastKeyPressArrowX.positipo = 2;
        return;
    }

    if (input.role === "input-minutes") {
        if (position !== 0) {
            lastKeyPressArrowX = { ...lastKeyPressArrowXDefault };
            return;
        }
        if (lastKeyPressArrowX.roleInput === "input-minutes" && lastKeyPressArrowX.positipo === 0) {
            hoursInput.value?.focus();
            lastKeyPressArrowX = { ...lastKeyPressArrowXDefault };
            return;
        }
        lastKeyPressArrowX.roleInput = "input-minutes";
        lastKeyPressArrowX.positipo = 0;
        return;
    }

    lastKeyPressArrowX = { ...lastKeyPressArrowXDefault };
}
const timeoutDebounce = 800;
const inputMinutes = debounce((event: Event) => {
    const el = event.target as HTMLInputElement;
    if (Number(el.value) > 59) el.value = '59';
    minutes.value = el.value;
    updateValue();
}, timeoutDebounce)
const inputHours = debounce((event: Event) => {
    const el = event.target as HTMLInputElement;
    hours.value = el.value;
    updateValue();
}, timeoutDebounce)

const focusInput = () => {
    hoursInput.value?.focus();
}


onMounted(() => {
    atributeValueInputs(props.modelValue)
})
onUpdated(() => {
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

const unfocusEventInput = (event: FocusEvent) => {
    const elRelated = event.relatedTarget as HTMLElement;
    const el = event.target as HTMLElement;
    if (elRelated !== null && elRelated.tagName === "INPUT" && el !== null && el.tagName === "INPUT") {
        if (divContent.value?.contains(el) && divContent.value?.contains(elRelated)) return;
    }

    divContent.value?.classList.remove('tw-outline');
    emits('blur');
}
</script>