<template>
  <div :class="cn('relative', className)">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { cn } from '@/app/lib/utils'

interface Props {
  className?: string
}

const { className } = defineProps<Props>()
</script>