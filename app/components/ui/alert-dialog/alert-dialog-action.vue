<template>
  <AlertDialogAction
    v-bind="props"
    :class="cn(buttonVariants(), $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogAction>
</template>

<script setup lang="ts">
import { AlertDialogAction } from 'radix-vue'
import type { AlertDialogActionProps } from 'radix-vue'
import { buttonVariants } from '@/app/components/ui/button'
import { cn } from '~/lib/utils'

const props = defineProps<AlertDialogActionProps>()
</script>