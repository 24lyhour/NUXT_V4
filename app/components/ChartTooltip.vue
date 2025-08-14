<template>
  <div 
    v-if="data" 
    class="rounded-lg border bg-background p-3 shadow-sm"
    style="min-width: 160px"
  >
    <div class="flex flex-col space-y-1.5">
      <p class="text-sm font-semibold leading-none tracking-tight">
        {{ data.month }}
      </p>
      <p class="text-sm text-muted-foreground">
        Total Revenue
      </p>
    </div>
    <div class="my-2 h-px bg-border" />
    <div class="flex items-center gap-2">
      <div 
        class="h-2.5 w-2.5 rounded-full"
        :style="{ backgroundColor: color }"
      />
      <p class="text-sm font-medium">
        ${{ formatValue(data.revenue) }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data?: any
  color?: string
}>()

const formatValue = (value: number) => {
  return value.toLocaleString()
}
</script>