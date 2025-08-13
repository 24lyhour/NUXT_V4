<template>
  <AlertDialogDescription
    v-bind="props"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogDescription>
</template>

<script setup lang="ts">
import { AlertDialogDescription } from 'radix-vue'
import type { AlertDialogDescriptionProps } from 'radix-vue'
import { cn } from '~/lib/utils'

const props = defineProps<AlertDialogDescriptionProps>()
</script>