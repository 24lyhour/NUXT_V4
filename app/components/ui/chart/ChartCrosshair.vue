<template>
  <VisCrosshair
    :template="customTooltip || defaultTemplate"
  />
</template>

<script setup lang="ts">
import { VisCrosshair } from '@unovis/vue'

const props = defineProps<{
  colors?: string[]
  items?: any[]
  index?: string
  customTooltip?: any
}>()

// Default tooltip template with proper card styling
const defaultTemplate = (data: any) => {
  if (!data) return null
  
  // Handle different data structures
  const datum = data.data || data
  const value = datum.revenue || datum.value || 0
  const label = datum.month || datum.label || ''
  const formattedValue = value.toLocaleString()
  
  // Return HTML string for the tooltip
  return `
    <div class="rounded-lg border bg-popover p-3 text-popover-foreground shadow-md" style="min-width: 150px">
      <div class="flex flex-col space-y-1.5">
        <p class="text-sm font-semibold">${label}</p>
        <p class="text-xs text-muted-foreground">Total Revenue</p>
      </div>
      <div class="my-2 h-px bg-border"></div>
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="h-2.5 w-2.5 rounded-full" style="background-color: ${props.colors?.[0] || 'rgb(59, 130, 246)'}"></div>
          <span class="text-xs font-medium">Revenue</span>
        </div>
        <p class="text-sm font-bold">$${formattedValue}</p>
      </div>
    </div>
  `
}
</script>