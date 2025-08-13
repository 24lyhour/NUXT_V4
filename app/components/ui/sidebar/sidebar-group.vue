<template>
  <div :class="cn('relative flex w-full flex-col gap-2', className)">
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