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
          <div class="h-[350px] pl-8">
            <div class="h-full w-full">
              <!-- Bar Chart -->
              <div v-if="chartType === 'bar'" class="relative h-[280px] w-full">
                <div class="absolute inset-0 flex items-end justify-between px-2">
                  <div v-for="(bar, i) in chartData" :key="i" class="relative flex-1 mx-0.5">
                    <div 
                      :style="{ height: bar.height + '%' }" 
                      class="w-full bg-blue-500 dark:bg-blue-600 rounded-t transition-all duration-500 hover:bg-blue-600 dark:hover:bg-blue-700 relative group"
                    >
                      <div class="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-900 text-white px-2 py-1 rounded text-xs whitespace-nowrap">
                        ${{ bar.value }}
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Y-axis labels -->
                <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-muted-foreground pl-2">
                  <span>40k</span>
                  <span>30k</span>
                  <span>20k</span>
                  <span>10k</span>
                  <span>0</span>
                </div>
              </div>
              
              <!-- Area Chart -->
              <div v-else-if="chartType === 'area'" class="relative h-[280px] w-full">
                <div class="absolute inset-0 flex items-end justify-between px-2">
                  <svg class="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:rgb(59, 130, 246);stop-opacity:0.6" />
                        <stop offset="100%" style="stop-color:rgb(59, 130, 246);stop-opacity:0.05" />
                      </linearGradient>
                    </defs>
                    <path
                      :d="generateAreaPath()"
                      fill="url(#areaGradient)"
                      stroke="rgb(59, 130, 246)"
                      stroke-width="2"
                    />
                  </svg>
                </div>
                <!-- Y-axis labels -->
                <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-muted-foreground pl-2">
                  <span>40k</span>
                  <span>30k</span>
                  <span>20k</span>
                  <span>10k</span>
                  <span>0</span>
                </div>
              </div>
              
              <!-- Line Chart -->
              <div v-else-if="chartType === 'line'" class="relative h-[280px] w-full">
                <div class="absolute inset-0">
                  <svg class="w-full h-full" preserveAspectRatio="none">
                    <polyline
                      :points="generateLinePoints()"
                      fill="none"
                      stroke="rgb(59, 130, 246)"
                      stroke-width="2"
                    />
                    <g>
                      <circle
                        v-for="(point, i) in chartData"
                        :key="i"
                        :cx="getPointX(i) + '%'"
                        :cy="getPointY(point.height) + '%'"
                        r="4"
                        fill="white"
                        stroke="rgb(59, 130, 246)"
                        stroke-width="2"
                        class="cursor-pointer"
                      >
                        <title>${{ point.value }}</title>
                      </circle>
                    </g>
                  </svg>
                </div>
                <!-- Y-axis labels -->
                <div class="absolute left-0 top-0 h-full flex flex-col justify-between text-[10px] text-muted-foreground pl-2">
                  <span>40k</span>
                  <span>30k</span>
                  <span>20k</span>
                  <span>10k</span>
                  <span>0</span>
                </div>
              </div>
              
              <!-- X-axis labels -->
              <div class="flex justify-between px-2 mt-4">
                <div v-for="(bar, i) in chartData" :key="i" class="flex-1 text-center">
                  <p class="text-[10px] text-muted-foreground">{{ bar.label }}</p>
                </div>
              </div>
            </div>
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
import { ref, computed } from 'vue'

const chartType = ref<'bar' | 'area' | 'line'>('bar')

const chartData = ref([
  { label: 'Jan', height: 65, value: '26,000' },
  { label: 'Feb', height: 80, value: '32,000' },
  { label: 'Mar', height: 45, value: '18,000' },
  { label: 'Apr', height: 70, value: '28,000' },
  { label: 'May', height: 90, value: '36,000' },
  { label: 'Jun', height: 55, value: '22,000' },
  { label: 'Jul', height: 75, value: '30,000' },
  { label: 'Aug', height: 85, value: '34,000' },
  { label: 'Sep', height: 60, value: '24,000' },
  { label: 'Oct', height: 78, value: '31,200' },
  { label: 'Nov', height: 92, value: '36,800' },
  { label: 'Dec', height: 88, value: '35,200' }
])

// Chart helper functions
const getPointX = (index: number) => {
  return (index / (chartData.value.length - 1)) * 100
}

const getPointY = (height: number) => {
  return 100 - height
}

const generateAreaPath = () => {
  const points = chartData.value.map((point, i) => {
    const x = getPointX(i)
    const y = getPointY(point.height)
    return `${x},${y}`
  })
  return `M 0,100 L ${points.join(' L ')} L 100,100 Z`
}

const generateLinePoints = () => {
  return chartData.value.map((point, i) => {
    const x = getPointX(i)
    const y = getPointY(point.height)
    return `${x},${y}`
  }).join(' ')
}

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