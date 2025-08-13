<template>
  <div
    :class="cn('rounded-lg border bg-card text-card-foreground shadow-sm', props.class)"
    v-bind="{ ...props, class: undefined }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/app/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>