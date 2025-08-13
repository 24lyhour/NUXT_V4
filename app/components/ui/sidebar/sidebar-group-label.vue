<template>
  <div :class="cn('px-2 text-xs font-medium text-muted-foreground', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  className?: string
}

const { className } = defineProps<Props>()
</script>