<template>
  <AccordionItem v-bind="props" :class="cn('border-b', $attrs.class ?? '')">
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
import { AccordionItem } from 'radix-vue'
import type { AccordionItemProps } from 'radix-vue'
import { cn } from '~/lib/utils'

const props = defineProps<AccordionItemProps>()
</script>