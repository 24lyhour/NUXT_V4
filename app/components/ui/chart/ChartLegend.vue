<template>
  <div v-if="showLegend && items.length > 0" class="flex gap-4 text-sm">
    <div
      v-for="(item, index) in items"
      :key="index"
      class="flex items-center gap-2"
      @click="$emit('legend-item-click', item, index)"
    >
      <div
        class="w-3 h-3 rounded"
        :style="{ backgroundColor: item.color }"
      />
      <span>{{ item.name }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
interface LegendItem {
  name: string
  color: string
  inactive?: boolean
}

withDefaults(defineProps<{
  items: LegendItem[]
  showLegend?: boolean
}>(), {
  showLegend: true
})

defineEmits<{
  'legend-item-click': [item: LegendItem, index: number]
}>()
</script>