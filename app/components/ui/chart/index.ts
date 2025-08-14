export { default as ChartCrosshair } from './ChartCrosshair.vue'
export { default as ChartLegend } from './ChartLegend.vue'
export { default as ChartBar } from './ChartBar.vue'
export { default as ChartContainer } from './ChartContainer.vue'
export { default as ChartSingleTooltip } from './ChartSingleTooltip.vue'

// Default color palette for charts
export const defaultColors = (count: number) => {
  const colors = [
    'rgb(59, 130, 246)',  // blue-500
    'rgb(16, 185, 129)',  // green-500
    'rgb(251, 146, 60)',  // orange-500
    'rgb(244, 63, 94)',   // rose-500
    'rgb(168, 85, 247)',  // purple-500
    'rgb(236, 72, 153)',  // pink-500
    'rgb(245, 158, 11)',  // amber-500
    'rgb(6, 182, 212)',   // cyan-500
  ]
  
  // Repeat colors if we need more than 8
  const result: string[] = []
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length])
  }
  return result
}