<template>
  <AvatarImage
    :class="cn('aspect-square h-full w-full', props.class)"
    v-bind="{ ...props, class: undefined }"
  />
</template>

<script setup lang="ts">
import { AvatarImage } from 'radix-vue'
import type { AvatarImageProps } from 'radix-vue'
import { cn } from '@/app/lib/utils'

const props = defineProps<AvatarImageProps & { class?: string }>()
</script>