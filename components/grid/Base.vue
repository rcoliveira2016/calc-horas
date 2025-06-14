<template>
    <div
        class="flex flex-col tw-border tw-border-neutral-200 dark:tw-border-white/10 tw-p-2 tw-rounded-lg tw-bg-gray-800 tw-shadow-md">
        <div class="tw-overflow-hidden">
            <table
                class="tw-table-fixed tw-border-spacing-10 tw-text-left tw-w-full tw-text-sm tw-font-light tw-text-surface max-sm:tw-text-xs dark:tw-text-white">
                <colgroup>
                    <col v-for="column in columns" :key="column.name"
                        :style="{ width: column.width, minWidth: column.minWidth, maxWidth: column.maxWidth }" />
                </colgroup>
                <thead class="tw-border-b tw-border-neutral-200 tw-font-medium dark:tw-border-white/10">
                    <tr>
                        <th scope="col" class="tw-px-2 tw-py-3 tw-text-base max-sm:tw-text-xs max-sm:tw-p-1"
                            v-for="column in columns" :key="column.name">
                            <span class="tw-text-surface dark:tw-text-white/50">| </span>
                            <span>
                                {{ column.label }}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="tw-border-b tw-border-neutral-200 dark:tw-border-white/10" v-for="(item, index) in data"
                        :key="index">
                        <td class="tw-h-[72px] tw-px-1 tw-py-3 tw-pl-4 focus-within:tw-outline focus-within:tw-outline-1 focus-within:tw-outline-offset-[-2px] max-sm:tw-text-xs max-sm:tw-p-1"
                            tabindex="0" v-for="column in columns" :key="column.name"
                            @dblclick="$emit('dblclick-cell', $event, item, column)">
                            <slot v-if="slots['td-name-' + column.name]" :name="'td-name-' + column.name" :item="item"
                                :column="column" />
                            <template v-else>
                                {{ item[column.name] }}
                            </template>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script lang="ts" setup generic="TGridDataItem extends GridDataItem">
import type { GridColumnProps, GridDataItem } from './types';

const { columns, data } = defineProps<{
    columns: GridColumnProps[]
    data: TGridDataItem[]
}>()
const emit = defineEmits<{
    (e: 'dblclick-cell', event: Event, item: TGridDataItem, column: GridColumnProps): void
}>();
const slots = useSlots();
</script>