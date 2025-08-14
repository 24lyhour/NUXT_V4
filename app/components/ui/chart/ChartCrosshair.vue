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
  if (!data || !data.data) return null
  
  const datum = data.data
  const value = datum.revenue || 0
  const formattedValue = value.toLocaleString()
  
  // Return HTML string for the tooltip
  return `
    <div class="rounded-lg border bg-background p-3 shadow-sm" style="min-width: 160px">
      <div class="flex flex-col space-y-1.5">
        <p class="text-sm font-semibold leading-none tracking-tight">${datum.month}</p>
        <p class="text-sm text-muted-foreground">Total Revenue</p>
      </div>
      <div class="my-2 h-px bg-border"></div>
      <div class="flex items-center gap-2">
        <div class="h-2.5 w-2.5 rounded-full" style="background-color: ${props.colors?.[0] || 'rgb(59, 130, 246)'}"></div>
        <p class="text-sm font-medium">$${formattedValue}</p>
      </div>
    </div>
  `
}
</script>