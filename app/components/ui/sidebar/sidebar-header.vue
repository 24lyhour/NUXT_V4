<template>
  <div :class="cn('flex flex-col gap-2 p-2', className)">
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