<template>
  <div>
    <div class="flex items-center justify-between space-y-2 mb-8">
      <h2 class="text-3xl font-bold tracking-tight">Dashboard</h2>
      <div class="flex items-center space-x-2">
        <UiButton>Download Report</UiButton>
      </div>
    </div>
    
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <UiCardTitle class="text-sm font-medium">
            Total Revenue
          </UiCardTitle>
          <DollarSign class="h-4 w-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">$45,231.89</div>
          <p class="text-xs text-muted-foreground">
            +20.1% from last month
          </p>
        </UiCardContent>
      </UiCard>
      
      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <UiCardTitle class="text-sm font-medium">
            Subscriptions
          </UiCardTitle>
          <Users class="h-4 w-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+2350</div>
          <p class="text-xs text-muted-foreground">
            +180.1% from last month
          </p>
        </UiCardContent>
      </UiCard>
      
      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <UiCardTitle class="text-sm font-medium">
            Sales
          </UiCardTitle>
          <CreditCard class="h-4 w-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+12,234</div>
          <p class="text-xs text-muted-foreground">
            +19% from last month
          </p>
        </UiCardContent>
      </UiCard>
      
      <UiCard>
        <UiCardHeader class="flex flex-row items-center justify-between space-y-0 pb-2">
          <UiCardTitle class="text-sm font-medium">
            Active Now
          </UiCardTitle>
          <Activity class="h-4 w-4 text-muted-foreground" />
        </UiCardHeader>
        <UiCardContent>
          <div class="text-2xl font-bold">+573</div>
          <p class="text-xs text-muted-foreground">
            +201 since last hour
          </p>
        </UiCardContent>
      </UiCard>
    </div>
    
    <div class="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <UiCard class="col-span-4">
        <UiCardHeader>
          <UiCardTitle>Overview</UiCardTitle>
        </UiCardHeader>
        <UiCardContent class="pl-2">
          <div class="h-[350px] flex items-center justify-center text-muted-foreground">
            Chart will be displayed here
          </div>
        </UiCardContent>
      </UiCard>
      
      <UiCard class="col-span-3">
        <UiCardHeader>
          <UiCardTitle>Recent Sales</UiCardTitle>
          <p class="text-sm text-muted-foreground">
            You made 265 sales this month.
          </p>
        </UiCardHeader>
        <UiCardContent>
          <div class="space-y-8">
            <div v-for="sale in recentSales" :key="sale.email" class="flex items-center">
              <UiAvatar class="h-9 w-9">
                <UiAvatarImage :src="sale.avatar" :alt="sale.name" />
                <UiAvatarFallback>{{ sale.initials }}</UiAvatarFallback>
              </UiAvatar>
              <div class="ml-4 space-y-1">
                <p class="text-sm font-medium leading-none">{{ sale.name }}</p>
                <p class="text-sm text-muted-foreground">
                  {{ sale.email }}
                </p>
              </div>
              <div class="ml-auto font-medium">
                {{ sale.amount }}
              </div>
            </div>
          </div>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DollarSign, Users, CreditCard, Activity } from 'lucide-vue-next'

const recentSales = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    amount: '+$1,999.00',
    avatar: '/avatars/01.png',
    initials: 'OM'
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    amount: '+$39.00',
    avatar: '/avatars/02.png',
    initials: 'JL'
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    amount: '+$299.00',
    avatar: '/avatars/03.png',
    initials: 'IN'
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    amount: '+$99.00',
    avatar: '/avatars/04.png',
    initials: 'WK'
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    amount: '+$39.00',
    avatar: '/avatars/05.png',
    initials: 'SD'
  }
]
</script>