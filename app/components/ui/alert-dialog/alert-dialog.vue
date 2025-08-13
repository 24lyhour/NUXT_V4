<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot />
  </AlertDialogRoot>
</template>

<script setup lang="ts">
import { AlertDialogRoot, useForwardPropsEmits } from 'radix-vue'
import type { AlertDialogRootEmits, AlertDialogRootProps } from 'radix-vue'

const props = defineProps<AlertDialogRootProps>()
const emits = defineEmits<AlertDialogRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>