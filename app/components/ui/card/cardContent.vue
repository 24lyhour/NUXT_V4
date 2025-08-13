<template>
  <div :class="cn('p-6 pt-0', props.class)" v-bind="{ ...props, class: undefined }">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

const props = defineProps<{
  class?: string
}>()
</script>