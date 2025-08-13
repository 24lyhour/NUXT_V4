<template>
  <CollapsibleRoot v-bind="forwarded">
    <slot />
  </CollapsibleRoot>
</template>

<script setup lang="ts">
import { CollapsibleRoot, useForwardPropsEmits } from 'radix-vue'
import type { CollapsibleRootEmits, CollapsibleRootProps } from 'radix-vue'

const props = defineProps<CollapsibleRootProps>()
const emits = defineEmits<CollapsibleRootEmits>()

const forwarded = useForwardPropsEmits(props, emits)
</script>