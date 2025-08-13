<template>
  <ul :class="cn('flex flex-col gap-1', className)">
    <slot />
  </ul>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  className?: string
}

const { className } = defineProps<Props>()
</script>