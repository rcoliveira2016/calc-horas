<template>
    <div class="flex flex-col tw-border tw-border-neutral-200 dark:tw-border-white/10 tw-p-2 tw-rounded-lg">
        <div class="tw-overflow-hidden">
            <table class="tw-text-left tw-w-full tw-text-sm tw-font-light tw-text-surface dark:tw-text-white">
                <colgroup>
                    <col v-for="column in columns" :key="column.name" :style="{ width: column.width }" />
                </colgroup>
                <thead class="tw-border-b tw-border-neutral-200 tw-font-medium dark:tw-border-white/10">
                    <tr>
                        <th scope="col" class="tw-px-2 tw-py-3 tw-text-base" v-for="column in columns"
                            :key="column.name">
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
                        <td class="tw-h-[72px] tw-px-1 tw-py-3 tw-pl-4 focus:tw-border focus:tw-border-neutral-300 dark00 focus:dark:tw-border-white/20"
                            tabindex="0" v-for="column in columns" :key="column.name"
                            @dblclick="$emit('dblclick-cell', $event, item, column)">
                            <slot v-if="slots['td-name-' + column.name]" :name="'td-name-' + column.name"
                                :item="item" />
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