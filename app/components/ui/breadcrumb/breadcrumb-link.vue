<template>
  <a
    :class="cn('transition-colors hover:text-foreground', $attrs.class ?? '')"
    v-bind="$attrs"
  >
    <slot />
  </a>
</template>

<script setup lang="ts">
import { cn } from '@/app/lib/utils'
</script>