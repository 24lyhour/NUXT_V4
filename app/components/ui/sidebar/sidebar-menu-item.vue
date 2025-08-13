<template>
  <li :class="cn('relative', className)">
    <slot />
  </li>
</template>

<script setup lang="ts">
import { cn } from '~/lib/utils'

interface Props {
  className?: string
}

const { className } = defineProps<Props>()
</script>