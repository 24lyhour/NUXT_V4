<template>
  <AlertDialogPortal>
    <AlertDialogOverlay
      :class="cn(
        'fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        overlayClass
      )"
    />
    <AlertDialogContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="cn(
        'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg',
        $attrs.class ?? ''
      )"
    >
      <slot />
    </AlertDialogContent>
  </AlertDialogPortal>
</template>

<script setup lang="ts">
import {
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogPortal,
  useForwardPropsEmits,
} from 'radix-vue'
import type { AlertDialogContentEmits, AlertDialogContentProps } from 'radix-vue'
import { cn } from '@/app/lib/utils'

interface DialogContentProps extends AlertDialogContentProps {
  overlayClass?: string
}

const props = defineProps<DialogContentProps>()
const emits = defineEmits<AlertDialogContentEmits>()

const forwarded = useForwardPropsEmits(
  computed(() => {
    const { overlayClass, ...rest } = props
    return rest
  }),
  emits
)
</script>