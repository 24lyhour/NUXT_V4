<template>
  <div ref="chartContainer" class="w-full h-full">
    <svg
      :width="width"
      :height="height"
      :viewBox="`0 0 ${width} ${height}`"
      class="w-full h-full"
    >
      <slot :width="width" :height="height" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const props = withDefaults(defineProps<{
  width?: number
  height?: number
}>(), {
  width: 400,
  height: 300
})

const chartContainer = ref<HTMLDivElement>()
const width = ref(props.width)
const height = ref(props.height)

const updateDimensions = () => {
  if (chartContainer.value) {
    const rect = chartContainer.value.getBoundingClientRect()
    width.value = rect.width || props.width
    height.value = rect.height || props.height
  }
}

onMounted(() => {
  updateDimensions()
  window.addEventListener('resize', updateDimensions)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateDimensions)
})
</script>