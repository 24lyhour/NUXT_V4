<template>
  <div class="min-h-screen bg-background">
    <DashboardHeader />
    <div class="flex">
      <div class="hidden md:block">
        <div class="w-64 border-r bg-background">
          <DashboardSidebar />
        </div>
      </div>
      <main class="flex-1">
        <div class="container py-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
</script>