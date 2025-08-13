<template>
  <DropdownMenuTrigger v-bind="props">
    <slot />
  </DropdownMenuTrigger>
</template>

<script setup lang="ts">
import { DropdownMenuTrigger } from 'radix-vue'
import type { DropdownMenuTriggerProps } from 'radix-vue'

const props = defineProps<DropdownMenuTriggerProps>()
</script>