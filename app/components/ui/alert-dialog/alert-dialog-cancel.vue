<template>
  <AlertDialogCancel
    v-bind="props"
    :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogCancel>
</template>

<script setup lang="ts">
import { AlertDialogCancel } from 'radix-vue'
import type { AlertDialogCancelProps } from 'radix-vue'
import { buttonVariants } from '@/app/components/ui/button'
import { cn } from '@/app/lib/utils'

const props = defineProps<AlertDialogCancelProps>()
</script>