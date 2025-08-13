<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'
import { buttonVariants, type ButtonVariants } from './index'

interface Props extends ButtonVariants {
  class?: HTMLAttributes["class"]
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'default'
})
</script>

<template>
  <button
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <slot />
  </button>
</template>
