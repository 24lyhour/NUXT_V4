<template>
  <aside :class="cn('pb-12', className)">
    <div class="space-y-4 py-4">
      <div class="px-3 py-2">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
          Dashboard
        </h2>
        <div class="space-y-1">
          <NuxtLink
            v-for="item in mainNavItems"
            :key="item.href"
            :to="item.href"
            :class="cn(
              'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              route.path === item.href ? 'bg-accent text-accent-foreground' : 'transparent'
            )"
          >
            <component :is="item.icon" class="mr-2 h-4 w-4" />
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
      <div class="px-3 py-2">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
          Analytics
        </h2>
        <div class="space-y-1">
          <NuxtLink
            v-for="item in analyticsNavItems"
            :key="item.href"
            :to="item.href"
            :class="cn(
              'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              route.path === item.href ? 'bg-accent text-accent-foreground' : 'transparent'
            )"
          >
            <component :is="item.icon" class="mr-2 h-4 w-4" />
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
      <div class="px-3 py-2">
        <h2 class="mb-2 px-4 text-lg font-semibold tracking-tight">
          Settings
        </h2>
        <div class="space-y-1">
          <NuxtLink
            v-for="item in settingsNavItems"
            :key="item.href"
            :to="item.href"
            :class="cn(
              'flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
              route.path === item.href ? 'bg-accent text-accent-foreground' : 'transparent'
            )"
          >
            <component :is="item.icon" class="mr-2 h-4 w-4" />
            {{ item.title }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { Home, Users, Package, CreditCard, Settings, BarChart3, FileText, HelpCircle } from 'lucide-vue-next'
import { cn } from '~/app/lib/utils'

const route = useRoute()

interface Props {
  className?: string
}

const { className } = defineProps<Props>()

const mainNavItems = [
  {
    title: 'Dashboard',
    href: '/',
    icon: Home,
  },
  {
    title: 'Customers',
    href: '/customers',
    icon: Users,
  },
  {
    title: 'Products',
    href: '/products',
    icon: Package,
  },
  {
    title: 'Orders',
    href: '/orders',
    icon: CreditCard,
  },
]

const analyticsNavItems = [
  {
    title: 'Overview',
    href: '/analytics',
    icon: BarChart3,
  },
  {
    title: 'Reports',
    href: '/reports',
    icon: FileText,
  },
]

const settingsNavItems = [
  {
    title: 'General',
    href: '/settings',
    icon: Settings,
  },
  {
    title: 'Support',
    href: '/support',
    icon: HelpCircle,
  },
]
</script>