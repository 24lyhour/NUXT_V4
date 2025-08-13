<template>
  <div :class="cn('flex flex-col gap-1', className)">
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