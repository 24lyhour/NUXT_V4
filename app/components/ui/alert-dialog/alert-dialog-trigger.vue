<template>
  <AlertDialogTrigger v-bind="props" as-child>
    <slot />
  </AlertDialogTrigger>
</template>

<script setup lang="ts">
import { AlertDialogTrigger } from 'radix-vue'
import type { AlertDialogTriggerProps } from 'radix-vue'

const props = defineProps<AlertDialogTriggerProps>()
</script>