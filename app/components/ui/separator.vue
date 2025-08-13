<template>
  <SeparatorRoot
    :class="cn('shrink-0 bg-border', orientation === 'horizontal' ? 'h-[1px] w-full' : 'h-full w-[1px]', props.class)"
    v-bind="{ ...props, class: undefined }"
  />
</template>

<script setup lang="ts">
import { SeparatorRoot } from 'radix-vue'
import type { SeparatorRootProps } from 'radix-vue'
import { cn } from '~/lib/utils'

const props = withDefaults(defineProps<SeparatorRootProps & { class?: string }>(), {
  orientation: 'horizontal',
})
</script>