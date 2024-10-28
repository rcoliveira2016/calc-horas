<template>
    <slot v-if="showEditor" name="editor" :item="item" />
    <div v-else @click="emitFocusin" tabindex="0">
        <slot :item="item" />
    </div>
</template>
<script lang="ts" setup generic="TGridDataItem extends GridDataItem, TKeyName extends keyof TGridDataItem">
import type { GridDataItem } from './types';

const emit = defineEmits<{
    (e: 'focusin', value: string | number, nameColumn: string): void,
}>();

const { item, keyName, nameColumnEdit, nameColumn, keyValue } = defineProps<{
    item: TGridDataItem,
    keyName: TKeyName,
    keyValue: string | number,
    nameColumnEdit: string,
    nameColumn: string,
}>();

const emitFocusin = () => {
    emit('focusin', item[keyName], nameColumn);
}
const showEditor = computed(() => {
    return nameColumn === nameColumnEdit && keyValue === item[keyName]
});
</script>