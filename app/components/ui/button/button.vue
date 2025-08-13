<template>
  <button
    :class="cn(buttonVariants({ variant, size }), $attrs.class ?? '')"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
import type { VariantProps } from 'class-variance-authority'
import { cn } from '@/app/lib/utils'
import { buttonVariants } from './index'

type ButtonVariants = VariantProps<typeof buttonVariants>

defineProps<{
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
}>()
</script>