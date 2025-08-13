<template>
  <div class="w-full h-full relative">
    <!-- Bar Chart -->
    <div v-if="type === 'bar'" class="h-full w-full flex items-end justify-between gap-1 px-4">
      <div
        v-for="(item, i) in data"
        :key="i"
        class="flex-1 flex flex-col items-center justify-end"
      >
        <div class="relative w-full group">
          <div
            :style="{ height: `${item.height}%` }"
            class="w-full bg-blue-500 hover:bg-blue-600 rounded-t transition-all duration-300"
          >
            <div class="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
              ${{ item.value }}
            </div>
          </div>
        </div>
        <span class="text-[10px] text-muted-foreground mt-2">{{ item.label }}</span>
      </div>
    </div>

    <!-- Area Chart -->
    <div v-else-if="type === 'area'" class="h-full w-full">
      <svg class="w-full h-full" viewBox="0 0 400 300">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" class="text-blue-500" stop-opacity="0.8" />
            <stop offset="100%" class="text-blue-500" stop-opacity="0.1" />
          </linearGradient>
        </defs>
        <path
          :d="areaPath"
          fill="url(#gradient)"
          class="text-blue-500"
          stroke="currentColor"
          stroke-width="2"
        />
        <g>
          <text
            v-for="(item, i) in data"
            :key="i"
            :x="getX(i)"
            y="290"
            text-anchor="middle"
            class="text-[10px] fill-muted-foreground"
          >
            {{ item.label }}
          </text>
        </g>
      </svg>
    </div>

    <!-- Line Chart -->
    <div v-else-if="type === 'line'" class="h-full w-full">
      <svg class="w-full h-full" viewBox="0 0 400 300">
        <polyline
          :points="linePoints"
          fill="none"
          class="text-blue-500"
          stroke="currentColor"
          stroke-width="2"
        />
        <g>
          <circle
            v-for="(item, i) in data"
            :key="`circle-${i}`"
            :cx="getX(i)"
            :cy="getY(item.height)"
            r="4"
            class="text-blue-500 fill-current"
          />
        </g>
        <g>
          <text
            v-for="(item, i) in data"
            :key="`label-${i}`"
            :x="getX(i)"
            y="290"
            text-anchor="middle"
            class="text-[10px] fill-muted-foreground"
          >
            {{ item.label }}
          </text>
        </g>
      </svg>
    </div>

    <!-- Y-axis labels -->
    <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-muted-foreground">
      <span>40k</span>
      <span>30k</span>
      <span>20k</span>
      <span>10k</span>
      <span>0</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  type: 'bar' | 'area' | 'line'
  data: Array<{
    label: string
    height: number
    value: string
  }>
}>()

const getX = (index: number) => {
  const padding = 30
  const width = 400 - (padding * 2)
  return padding + (index / (props.data.length - 1)) * width
}

const getY = (height: number) => {
  const maxHeight = 250
  return maxHeight - (height / 100) * maxHeight
}

const areaPath = computed(() => {
  const points = props.data.map((item, i) => {
    return `${getX(i)},${getY(item.height)}`
  })
  return `M ${points[0]} L ${points.join(' L ')} L ${getX(props.data.length - 1)},250 L ${getX(0)},250 Z`
})

const linePoints = computed(() => {
  return props.data.map((item, i) => {
    return `${getX(i)},${getY(item.height)}`
  }).join(' ')
})
</script>