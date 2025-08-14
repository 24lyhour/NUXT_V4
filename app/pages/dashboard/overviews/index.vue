<template>
  <div class="flex-1 space-y-4 p-4 md:p-6 lg:p-8">
    <div class="flex items-center justify-between space-y-2">
      <h2 class="text-2xl font-bold tracking-tight">Dashboard</h2>
      <div class="flex items-center space-x-2">
        <div class="hidden items-center space-x-2 md:flex">
          <Button variant="outline" size="sm">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" x2="16" y1="2" y2="6"/><line x1="8" x2="8" y1="2" y2="6"/><line x1="3" x2="21" y1="10" y2="10"/></svg>
            Jan 20, 2023 - Feb 09, 2023
          </Button>
        </div>
        <Button size="sm">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-4 w-4"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
          Download
        </Button>
      </div>
    </div>
    
    <!-- Tabs -->
    <Tabs default-value="overview" class="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">
          Overview
        </TabsTrigger>
        <TabsTrigger value="analytics">
          Analytics
        </TabsTrigger>
        <TabsTrigger value="reports">
          Reports
        </TabsTrigger>
        <TabsTrigger value="notifications">
          Notifications
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" class="space-y-4">
    
    <!-- Stats Cards -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-xs font-medium">Total Revenue</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground"><line x1="12" x2="12" y1="2" y2="22"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold">$45,231.89</div>
          <p class="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-xs font-medium">Subscriptions</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold">+2350</div>
          <p class="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-xs font-medium">Sales</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold">+12,234</div>
          <p class="text-xs text-muted-foreground">
            +19% from last month
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle class="text-xs font-medium">Active Now</CardTitle>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-4 w-4 text-muted-foreground"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
        </CardHeader>
        <CardContent>
          <div class="text-xl font-bold">+573</div>
          <p class="text-xs text-muted-foreground">
            +201 since last hour
          </p>
        </CardContent>
      </Card>
    </div>
    
    <!-- Overview Chart -->
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <Card class="col-span-4">
        <CardHeader class="flex flex-row items-center justify-between">
          <CardTitle class="text-base">Overview</CardTitle>
          <div class="flex items-center space-x-1">
            <Button
              :variant="chartType === 'bar' ? 'default' : 'outline'"
              size="sm"
              @click="chartType = 'bar'"
              class="h-7 px-2 text-xs"
            >
              Bar
            </Button>
            <Button
              :variant="chartType === 'area' ? 'default' : 'outline'"
              size="sm"
              @click="chartType = 'area'"
              class="h-7 px-2 text-xs"
            >
              Area
            </Button>
            <Button
              :variant="chartType === 'line' ? 'default' : 'outline'"
              size="sm"
              @click="chartType = 'line'"
              class="h-7 px-2 text-xs"
            >
              Line
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div class="h-[350px]">
            <!-- Bar Chart -->
            <BarChart
              v-if="chartType === 'bar'"
              :data="overviewChartData"
              :categories="['revenue']"
              index="month"
              :y-formatter="(value) => `$${(value / 1000).toFixed(0)}k`"
              class="h-full"
            />
            
            <!-- Area Chart -->
            <AreaChart
              v-else-if="chartType === 'area'"
              :data="overviewChartData"
              :categories="['revenue']"
              index="month"
              :y-formatter="(value) => `$${(value / 1000).toFixed(0)}k`"
              class="h-full"
            />
            
            <!-- Line Chart -->
            <LineChart
              v-else-if="chartType === 'line'"
              :data="overviewChartData"
              :categories="['revenue']"
              index="month"
              :y-formatter="(value) => `$${(value / 1000).toFixed(0)}k`"
              class="h-full"
            />
          </div>
        </CardContent>
      </Card>
      <Card class="col-span-3">
        <CardHeader>
          <CardTitle class="text-base">Recent Sales</CardTitle>
          <CardDescription class="text-xs">
            You made 265 sales this month.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div class="space-y-8">
            <div v-for="sale in recentSales" :key="sale.email" class="flex items-center">
              <Avatar class="h-8 w-8">
                <AvatarFallback class="text-xs">{{ sale.initials }}</AvatarFallback>
              </Avatar>
              <div class="ml-4 space-y-1">
                <p class="text-xs font-medium leading-none">{{ sale.name }}</p>
                <p class="text-xs text-muted-foreground">
                  {{ sale.email }}
                </p>
              </div>
              <div class="ml-auto font-medium text-sm">
                {{ sale.amount }}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
      </TabsContent>
    </Tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BarChart } from "~/components/ui/chart-bar"
import { AreaChart } from "~/components/ui/chart-area"
import { LineChart } from "~/components/ui/chart-line"

const chartType = ref<'bar' | 'area' | 'line'>('bar')

// Data formatted for chart components
const overviewChartData = ref([
  { month: 'Jan', revenue: 26000 },
  { month: 'Feb', revenue: 32000 },
  { month: 'Mar', revenue: 18000 },
  { month: 'Apr', revenue: 28000 },
  { month: 'May', revenue: 36000 },
  { month: 'Jun', revenue: 22000 },
  { month: 'Jul', revenue: 30000 },
  { month: 'Aug', revenue: 34000 },
  { month: 'Sep', revenue: 24000 },
  { month: 'Oct', revenue: 31200 },
  { month: 'Nov', revenue: 36800 },
  { month: 'Dec', revenue: 35200 }
])

const recentSales = ref([
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    initials: "OM",
    amount: "+$1,999.00"
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    initials: "JL",
    amount: "+$39.00"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    initials: "IN",
    amount: "+$299.00"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    initials: "WK",
    amount: "+$99.00"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    initials: "SD",
    amount: "+$39.00"
  }
])
</script>