<template>
  <AvatarFallback
    :class="cn('flex h-full w-full items-center justify-center rounded-full bg-muted', props.class)"
    v-bind="{ ...props, class: undefined }"
  >
    <slot />
  </AvatarFallback>
</template>

<script setup lang="ts">
import { AvatarFallback } from 'radix-vue'
import type { AvatarFallbackProps } from 'radix-vue'
import { cn } from '@/app/lib/utils'

const props = defineProps<AvatarFallbackProps & { class?: string }>()
</script>