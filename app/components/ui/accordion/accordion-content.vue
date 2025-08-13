<template>
  <AccordionContent
    v-bind="props"
    :class="cn(
      'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      $attrs.class ?? ''
    )"
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
import { AccordionContent } from 'radix-vue'
import type { AccordionContentProps } from 'radix-vue'
import { cn } from '@/app/lib/utils'

const props = defineProps<AccordionContentProps>()
</script>