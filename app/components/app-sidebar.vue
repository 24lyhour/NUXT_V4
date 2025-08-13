<template>
  <SidebarSidebar :className="cn('border-r', className)">
    <SidebarSidebarHeader>
      <SidebarSidebarMenuButton size="lg" asChild>
        <a href="/">
          <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package class="size-4" />
          </div>
          <div class="flex flex-col gap-0.5 leading-none">
            <span class="font-semibold">Dashboard</span>
            <span class="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </a>
      </SidebarSidebarMenuButton>
    </SidebarSidebarHeader>
    
    <SidebarSidebarContent>
      <SidebarSidebarGroup>
        <SidebarSidebarGroupLabel>Application</SidebarSidebarGroupLabel>
        <SidebarSidebarGroupContent>
          <SidebarSidebarMenu>
            <SidebarSidebarMenuItem v-for="item in applicationItems" :key="item.title">
              <SidebarSidebarMenuButton asChild :isActive="route.path === item.url">
                <NuxtLink :to="item.url">
                  <component :is="item.icon" class="size-4" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarSidebarMenuButton>
            </SidebarSidebarMenuItem>
          </SidebarSidebarMenu>
        </SidebarSidebarGroupContent>
      </SidebarSidebarGroup>

      <SidebarSidebarGroup>
        <SidebarSidebarGroupLabel>Analytics</SidebarSidebarGroupLabel>
        <SidebarSidebarGroupContent>
          <SidebarSidebarMenu>
            <CollapsibleCollapsible v-for="item in analyticsItems" :key="item.title" class="group/collapsible">
              <SidebarSidebarMenuItem>
                <CollapsibleCollapsibleTrigger asChild>
                  <SidebarSidebarMenuButton>
                    <component :is="item.icon" class="size-4" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarSidebarMenuButton>
                </CollapsibleCollapsibleTrigger>
                <CollapsibleCollapsibleContent>
                  <SidebarSidebarMenu class="ml-4 mt-1">
                    <SidebarSidebarMenuItem v-for="subItem in item.items" :key="subItem.title">
                      <SidebarSidebarMenuButton asChild :isActive="route.path === subItem.url">
                        <NuxtLink :to="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </NuxtLink>
                      </SidebarSidebarMenuButton>
                    </SidebarSidebarMenuItem>
                  </SidebarSidebarMenu>
                </CollapsibleCollapsibleContent>
              </SidebarSidebarMenuItem>
            </CollapsibleCollapsible>
          </SidebarSidebarMenu>
        </SidebarSidebarGroupContent>
      </SidebarSidebarGroup>

      <SidebarSidebarGroup>
        <SidebarSidebarGroupLabel>Settings</SidebarSidebarGroupLabel>
        <SidebarSidebarGroupContent>
          <SidebarSidebarMenu>
            <SidebarSidebarMenuItem v-for="item in settingsItems" :key="item.title">
              <SidebarSidebarMenuButton asChild :isActive="route.path === item.url">
                <NuxtLink :to="item.url">
                  <component :is="item.icon" class="size-4" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarSidebarMenuButton>
            </SidebarSidebarMenuItem>
          </SidebarSidebarMenu>
        </SidebarSidebarGroupContent>
      </SidebarSidebarGroup>
    </SidebarSidebarContent>

    <div class="mt-auto p-4">
      <CardCard>
        <CardCardHeader class="p-3">
          <CardCardTitle class="text-sm">Upgrade to Pro</CardCardTitle>
        </CardCardHeader>
        <CardCardContent class="p-3 pt-0">
          <p class="text-xs text-muted-foreground mb-3">
            Unlock all features and get unlimited access to our support team.
          </p>
          <Button size="sm" class="w-full">
            Upgrade
          </Button>
        </CardCardContent>
      </CardCard>
    </div>
  </SidebarSidebar>
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