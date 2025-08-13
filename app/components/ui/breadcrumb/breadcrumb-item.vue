<template>
  <li
    :class="cn('inline-flex items-center gap-1.5', $attrs.class ?? '')"
    v-bind="$attrs"
  >
    <slot />
  </li>
</template>

<script setup lang="ts">
import { cn } from '@/app/lib/utils'
</script>