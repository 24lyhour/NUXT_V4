<template>
  <component
    :is="asChild ? 'div' : 'button'"
    :class="cn(
      'flex w-full items-center gap-2 rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
      size === 'sm' && 'px-2 py-1',
      size === 'lg' && 'px-3 py-2',
      (!size || size === 'default') && 'px-2 py-1.5',
      isActive && 'bg-accent text-accent-foreground',
      className
    )"
    v-bind="{ ...props, class: undefined, size: undefined }"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  className?: string
  asChild?: boolean
  isActive?: boolean
  size?: 'default' | 'sm' | 'lg'
}

const props = defineProps<Props>()
</script>