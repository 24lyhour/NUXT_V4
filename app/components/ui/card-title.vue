<template>
  <h3
    :class="cn('text-2xl font-semibold leading-none tracking-tight', props.class)"
    v-bind="{ ...props, class: undefined }"
  >
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { cn } from '~/app/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>