<template>
  <Sidebar :className="cn('border-r', className)">
    <SidebarHeader>
      <SidebarMenuButton size="lg" asChild>
        <a href="/">
          <div class="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Package class="size-4" />
          </div>
          <div class="flex flex-col gap-0.5 leading-none">
            <span class="font-semibold">Dashboard</span>
            <span class="text-xs text-muted-foreground">v1.0.0</span>
          </div>
        </a>
      </SidebarMenuButton>
    </SidebarHeader>
    
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in applicationItems" :key="item.title">
              <SidebarMenuButton asChild :isActive="route.path === item.url">
                <NuxtLink :to="item.url">
                  <component :is="item.icon" class="size-4" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Analytics</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <Collapsible v-for="item in analyticsItems" :key="item.title" class="group/collapsible">
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton>
                    <component :is="item.icon" class="size-4" />
                    <span>{{ item.title }}</span>
                    <ChevronRight class="ml-auto size-4 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenu class="ml-4 mt-1">
                    <SidebarMenuItem v-for="subItem in item.items" :key="subItem.title">
                      <SidebarMenuButton asChild :isActive="route.path === subItem.url">
                        <NuxtLink :to="subItem.url">
                          <span>{{ subItem.title }}</span>
                        </NuxtLink>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </SidebarMenu>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>

      <SidebarGroup>
        <SidebarGroupLabel>Settings</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in settingsItems" :key="item.title">
              <SidebarMenuButton asChild :isActive="route.path === item.url">
                <NuxtLink :to="item.url">
                  <component :is="item.icon" class="size-4" />
                  <span>{{ item.title }}</span>
                </NuxtLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>

    <div class="mt-auto p-4">
      <Card>
        <CardHeader class="p-3">
          <CardTitle class="text-sm">Upgrade to Pro</CardTitle>
        </CardHeader>
        <CardContent class="p-3 pt-0">
          <p class="text-xs text-muted-foreground mb-3">
            Unlock all features and get unlimited access to our support team.
          </p>
          <Button size="sm" class="w-full">
            Upgrade
          </Button>
        </CardContent>
      </Card>
    </div>
  </Sidebar>
</template>

<script setup lang="ts">
import { 
  Package, 
  Home, 
  Users, 
  ShoppingCart, 
  Package2,
  BarChart3,
  FileText,
  ChevronRight,
  Settings,
  HelpCircle,
  CreditCard
} from 'lucide-vue-next'
import { cn } from '~/lib/utils'

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