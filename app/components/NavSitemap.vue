<script setup lang="ts">
import { 
  Home,
  Users,
  Settings,
  FileText,
  BarChart3,
  ShoppingCart,
  Package,
  Mail,
  ChevronRight
} from "lucide-vue-next"
import { watch, reactive, onMounted } from "vue"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "~/components/ui/sidebar"

// Sitemap navigation structure
const sitemapData = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: Home,
    items: [
      { title: "Overview", url: "/dashboard" },
      { title: "Analytics", url: "/dashboard/analytics" },
      { title: "Reports", url: "/dashboard/reports" },
      { title: "Statistics", url: "/dashboard/stats" },
    ]
  },
  {
    title: "Users & Accounts",
    url: "/users",
    icon: Users,
    items: [
      { title: "All Users", url: "/users" },
      { title: "User Profiles", url: "/users/profiles" },
      { title: "User Roles", url: "/users/roles" },
      { title: "Permissions", url: "/users/permissions" },
      { title: "Activity Log", url: "/users/activity" },
    ]
  },
  {
    title: "Content Management",
    url: "/content",
    icon: FileText,
    items: [
      { title: "Pages", url: "/content/pages" },
      { title: "Blog Posts", url: "/content/blog" },
      { title: "Media Library", url: "/content/media" },
      { title: "Categories", url: "/content/categories" },
      { title: "Tags", url: "/content/tags" },
    ]
  },
  {
    title: "E-commerce",
    url: "/shop",
    icon: ShoppingCart,
    items: [
      { title: "Products", url: "/shop/products" },
      { title: "Orders", url: "/shop/orders" },
      { title: "Customers", url: "/shop/customers" },
      { title: "Inventory", url: "/shop/inventory" },
      { title: "Discounts", url: "/shop/discounts" },
    ]
  },
  {
    title: "Analytics & Reports",
    url: "/analytics",
    icon: BarChart3,
    items: [
      { title: "Traffic Analytics", url: "/analytics/traffic" },
      { title: "Sales Reports", url: "/analytics/sales" },
      { title: "User Behavior", url: "/analytics/behavior" },
      { title: "Performance", url: "/analytics/performance" },
    ]
  },
  {
    title: "Communications",
    url: "/communications",
    icon: Mail,
    items: [
      { title: "Messages", url: "/communications/messages" },
      { title: "Email Templates", url: "/communications/emails" },
      { title: "Notifications", url: "/communications/notifications" },
      { title: "Newsletter", url: "/communications/newsletter" },
    ]
  },
  {
    title: "Tools & Utilities",
    url: "/tools",
    icon: Package,
    items: [
      { title: "File Manager", url: "/tools/files" },
      { title: "Backup & Export", url: "/tools/backup" },
      { title: "Database Tools", url: "/tools/database" },
      { title: "API Documentation", url: "/tools/api" },
    ]
  },
  {
    title: "System Settings",
    url: "/settings",
    icon: Settings,
    items: [
      { title: "General Settings", url: "/settings" },
      { title: "Security", url: "/settings/security" },
      { title: "Integrations", url: "/settings/integrations" },
      { title: "Appearance", url: "/settings/appearance" },
      { title: "Advanced", url: "/settings/advanced" },
    ]
  }
]

// Create reactive states object for sitemap persistence
const sitemapStates = reactive<Record<string, boolean>>({})

// Initialize all items to false (collapsed)
sitemapData.forEach(item => {
  if (item.items && item.items.length > 0) {
    sitemapStates[item.title] = false
  }
})

// Load from localStorage and set up watchers on mounted
onMounted(() => {
  sitemapData.forEach(item => {
    if (item.items && item.items.length > 0) {
      const storageKey = `sitemap-${item.title}-open`
      
      // Load boolean from localStorage
      const saved = localStorage.getItem(storageKey)
      if (saved !== null) {
        try {
          sitemapStates[item.title] = JSON.parse(saved)
        } catch {
          sitemapStates[item.title] = false
        }
      }
      
      // Watch for changes and save boolean to localStorage  
      watch(() => sitemapStates[item.title], (newValue) => {
        if (typeof newValue === 'boolean') {
          localStorage.setItem(storageKey, JSON.stringify(newValue))
          console.log(`Sitemap saved ${item.title}: ${newValue}`)
        }
      })
    }
  })
})
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Site Navigation</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in sitemapData" :key="item.title">
        <Collapsible v-if="item.items && item.items.length > 0" 
          v-model:open="sitemapStates[item.title]"
          class="group/collapsible">
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              <SidebarMenuSubItem v-for="subItem in item.items" :key="subItem.title">
                <SidebarMenuSubButton as-child>
                  <NuxtLink :to="subItem.url">
                    <span>{{ subItem.title }}</span>
                  </NuxtLink>
                </SidebarMenuSubButton>
              </SidebarMenuSubItem>
            </SidebarMenuSub>
          </CollapsibleContent>
        </Collapsible>
        <SidebarMenuButton v-else as-child>
          <NuxtLink :to="item.url">
            <component :is="item.icon" v-if="item.icon" />
            <span>{{ item.title }}</span>
          </NuxtLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>