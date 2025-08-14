<template>
  <VisTooltip
    :triggers="triggers"
  />
</template>

<script setup lang="ts">
import { VisTooltip } from '@unovis/vue'
import { computed } from 'vue'

const props = defineProps<{
  colors?: string[]
  index?: string
  customTooltip?: any
}>()

// Create triggers for the tooltip
const triggers = computed(() => {
  return {
    '.vis-donut-arc': (data: any) => {
      if (!data) return null
      
      const value = data.value || 0
      const label = data[props.index || 'label'] || data.status || 'Value'
      const formattedValue = value.toLocaleString()
      
      // Return HTML string directly
      return `
        <div class="rounded-lg border bg-background p-3 shadow-sm" style="min-width: 150px">
          <div class="flex flex-col space-y-1.5">
            <p class="text-sm font-semibold leading-none tracking-tight">${label}</p>
          </div>
          <div class="my-2 h-px bg-border"></div>
          <div class="flex items-center gap-2">
            <div class="h-2.5 w-2.5 rounded-full" style="background-color: ${data.color || props.colors?.[0] || 'rgb(59, 130, 246)'}"></div>
            <p class="text-sm font-medium">$${formattedValue}</p>
          </div>
        </div>
      `
    }
  }
})
</script>