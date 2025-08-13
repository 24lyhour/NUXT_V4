<template>
  <AvatarRoot
    :class="cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', props.class)"
    v-bind="{ ...props, class: undefined }"
  >
    <slot />
  </AvatarRoot>
</template>

<script setup lang="ts">
import { AvatarRoot } from 'radix-vue'
import type { AvatarRootProps } from 'radix-vue'
import { cn } from '~/app/lib/utils'

const props = defineProps<AvatarRootProps & { class?: string }>()
</script>