<template>
  <ui-sidebar-sidebar :className="cn('border-r', className)">
    <ui-sidebar-sidebar-header>
      <ui-sidebar-sidebar-menu-button size="lg" asChild>
        <a href="/">
          <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package class="size-4" />
          </div>
          <div class="flex flex-col gap-0.5 leading-none">
            <span class="font-semibold">Dashboard</span>
            <span class="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </a>
      </ui-sidebar-sidebar-menu-button>
    </ui-sidebar-sidebar-header>
    
    <ui-sidebar-sidebar-content>
      <ui-sidebar-sidebar-group>
        <ui-sidebar-sidebar-group-label>Application</ui-sidebar-sidebar-group-label>
        <ui-sidebar-sidebar-group-content>
          <ui-sidebar-sidebar-menu>
            <ui-sidebar-sidebar-menu-item v-for="item in applicationItems" :key="item.title">
              <ui-sidebar-sidebar-menu-button asChild :isActive="route.path === item.url">
                <NuxtLink :to="item.url">
                  <component :is="item.icon" class="size-4" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </ui-sidebar-sidebar-menu-button>
            </ui-sidebar-sidebar-menu-item>
          </ui-sidebar-sidebar-menu>
        </ui-sidebar-sidebar-group-content>
      </ui-sidebar-sidebar-group>

      <ui-sidebar-sidebar-group>
        <ui-sidebar-sidebar-group-label>Analytics</ui-sidebar-sidebar-group-label>
        <ui-sidebar-sidebar-group-content>
          <ui-sidebar-sidebar-menu>
            <ui-collapsible-collapsible v-for="item in analyticsItems" :key="item.title" class="group/collapsible">
              <ui-sidebar-sidebar-menu-item>
                <ui-collapsible-collapsible-trigger asChild>
                  <ui-sidebar-sidebar-menu-button>
                    <component :is="item.icon" class="size-4" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </ui-sidebar-sidebar-menu-button>
                </ui-collapsible-collapsible-trigger>
                <ui-collapsible-collapsible-content>
                  <ui-sidebar-sidebar-menu class="ml-4 mt-1">
                    <ui-sidebar-sidebar-menu-item v-for="subItem in item.items" :key="subItem.title">
                      <ui-sidebar-sidebar-menu-button asChild :isActive="route.path === subItem.url">
                        <NuxtLink :to="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </NuxtLink>
                      </ui-sidebar-sidebar-menu-button>
                    </ui-sidebar-sidebar-menu-item>
                  </ui-sidebar-sidebar-menu>
                </ui-collapsible-collapsible-content>
              </ui-sidebar-sidebar-menu-item>
            </ui-collapsible-collapsible>
          </ui-sidebar-sidebar-menu>
        </ui-sidebar-sidebar-group-content>
      </ui-sidebar-sidebar-group>

      <ui-sidebar-sidebar-group>
        <ui-sidebar-sidebar-group-label>Settings</ui-sidebar-sidebar-group-label>
        <ui-sidebar-sidebar-group-content>
          <ui-sidebar-sidebar-menu>
            <ui-sidebar-sidebar-menu-item v-for="item in settingsItems" :key="item.title">
              <ui-sidebar-sidebar-menu-button asChild :isActive="route.path === item.url">
                <NuxtLink :to="item.url">
                  <component :is="item.icon" class="size-4" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </ui-sidebar-sidebar-menu-button>
            </ui-sidebar-sidebar-menu-item>
          </ui-sidebar-sidebar-menu>
        </ui-sidebar-sidebar-group-content>
      </ui-sidebar-sidebar-group>
    </ui-sidebar-sidebar-content>

    <div class="mt-auto p-4">
      <ui-card-card>
        <ui-card-card-header class="p-3">
          <ui-card-card-title class="text-sm">Upgrade to Pro</ui-card-card-title>
        </ui-card-card-header>
        <ui-card-card-content class="p-3 pt-0">
          <p class="text-xs text-muted-foreground mb-3">
            Unlock all features and get unlimited access to our support team.
          </p>
          <ui-button size="sm" class="w-full">
            Upgrade
          </ui-button>
        </ui-card-card-content>
      </ui-card-card>
    </div>
  </ui-sidebar-sidebar>
</template>

<script setup lang="ts">
import { 
  Package, 
  Home, 
  Users, 
  ShoppingCart, 
  Package2,
  BarChart3,
  TrendingUp,
  FileText,
  ChevronRight,
  Settings,
  HelpCircle,
  CreditCard
} from 'lucide-vue-next'
import { cn } from '../lib/utils'

const route = useRoute()

interface Props {
  className?: string
}

const { className } = defineProps<Props>()

const applicationItems = [
  {
    title: 'Dashboard',
    url: '/',
    icon: Home,
  },
  {
    title: 'Customers',
    url: '/customers',
    icon: Users,
  },
  {
    title: 'Products',
    url: '/products',
    icon: Package2,
  },
  {
    title: 'Orders',
    url: '/orders',
    icon: ShoppingCart,
  },
]

const analyticsItems = [
  {
    title: 'Analytics',
    icon: BarChart3,
    items: [
      {
        title: 'Overview',
        url: '/analytics/overview',
      },
      {
        title: 'Sales',
        url: '/analytics/sales',
      },
      {
        title: 'Traffic',
        url: '/analytics/traffic',
      },
    ],
  },
  {
    title: 'Reports',
    icon: FileText,
    items: [
      {
        title: 'Revenue',
        url: '/reports/revenue',
      },
      {
        title: 'Expenses',
        url: '/reports/expenses',
      },
    ],
  },
]

const settingsItems = [
  {
    title: 'General',
    url: '/settings',
    icon: Settings,
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: CreditCard,
  },
  {
    title: 'Support',
    url: '/support',
    icon: HelpCircle,
  },
]
</script>