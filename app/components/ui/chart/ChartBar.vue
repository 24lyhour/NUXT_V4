<template>
  <div ref="container" class="w-full h-full" />
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { VisXYContainer, VisGroupedBar, VisAxis, VisTooltip } from '@unovis/vue'

const props = defineProps<{
  data: Array<Record<string, any>>
  categories: string[]
  index: string
}>()

const container = ref<HTMLElement>()

onMounted(() => {
  // Chart will be rendered after mount
})

// Watch for data changes
watch(() => props.data, () => {
  // Re-render chart on data change
}, { deep: true })
</script>