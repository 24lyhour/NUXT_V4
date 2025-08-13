<template>
  <div
    :class="cn('flex flex-col space-y-1.5 p-6', props.class)"
    v-bind="{ ...props, class: undefined }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/app/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>