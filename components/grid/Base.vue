<template>
    <div class="flex flex-col tw-border tw-border-neutral-200 dark:tw-border-white/10 tw-p-2 tw-rounded-lg">
        <div class="tw-overflow-hidden">
            <table class="tw-text-left tw-w-full tw-text-sm tw-font-light tw-text-surface dark:tw-text-white">
                <colgroup>
                    <col v-for="column in columns" :key="column.name" :style="{ width: column.width }" />
                </colgroup>
                <thead class="tw-border-b tw-border-neutral-200 tw-font-medium dark:tw-border-white/10">
                    <tr>
                        <th scope="col" class="tw-px-6 tw-py-3" v-for="column in columns" :key="column.name">
                            <span class="tw-text-surface dark:tw-text-white/50">| </span>
                            <span>
                                {{ column.label}}
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="tw-border-b tw-border-neutral-200 dark:tw-border-white/10" v-for="(item, index) in data"
                        :key="index">
                        <td class="tw-px-6 tw-py-4 tw-pl-7" v-for="column in columns" :key="column.name">
                            <slot v-if="slots['td-name-'+column.name]" :name="'td-name-'+column.name" :item="item" />
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

const slots = useSlots();
</script>