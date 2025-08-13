<template>
  <li role="presentation" aria-hidden="true" v-bind="$attrs">
    <slot>
      <ChevronRight class="h-3.5 w-3.5" />
    </slot>
  </li>
</template>

<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
</script>