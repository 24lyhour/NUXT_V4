<template>
  <ol
    :class="cn(
      'flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5',
      $attrs.class ?? ''
    )"
    v-bind="$attrs"
  >
    <slot />
  </ol>
</template>

<script setup lang="ts">
import { cn } from '@/app/lib/utils'
</script>