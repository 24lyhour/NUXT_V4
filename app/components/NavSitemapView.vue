<script setup lang="ts">
import { 
  Map, 
  ChevronRight,
  Globe,
  ExternalLink,
  Copy,
  Search,
  MoreHorizontal,
  FileText,
  Folder,
  FolderOpen
} from "lucide-vue-next"
import { ref, computed, watch, onMounted } from "vue"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "~/components/ui/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible"
import { Button } from "~/components/ui/button"
import { Input } from "~/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu"
import { Badge } from "~/components/ui/badge"

// Sitemap data structure
const sitemapData = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    url: '/dashboard',
    type: 'section',
    status: 'active',
    pages: [
      { title: 'Overview', url: '/dashboard/overview', status: 'active' },
      { title: 'Analytics', url: '/dashboard/analytics', status: 'active' },
      { title: 'Reports', url: '/dashboard/reports', status: 'active' },
      { title: 'Statistics', url: '/dashboard/stats', status: 'draft' },
    ]
  },
  {
    id: 'users',
    title: 'User Management',
    url: '/users',
    type: 'section',
    status: 'active',
    pages: [
      { title: 'All Users', url: '/users', status: 'active' },
      { title: 'User Profiles', url: '/users/profiles', status: 'active' },
      { title: 'User Roles', url: '/users/roles', status: 'active' },
      { title: 'Permissions', url: '/users/permissions', status: 'active' },
      { title: 'Activity Log', url: '/users/activity', status: 'active' },
    ]
  },
  {
    id: 'content',
    title: 'Content Management',
    url: '/content',
    type: 'section',
    status: 'active',
    pages: [
      { title: 'Pages', url: '/content/pages', status: 'active' },
      { title: 'Blog Posts', url: '/content/blog', status: 'active' },
      { title: 'Media Library', url: '/content/media', status: 'active' },
      { title: 'Categories', url: '/content/categories', status: 'active' },
      { title: 'Tags', url: '/content/tags', status: 'draft' },
    ]
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    url: '/shop',
    type: 'section',
    status: 'active',
    pages: [
      { title: 'Products', url: '/shop/products', status: 'active' },
      { title: 'Orders', url: '/shop/orders', status: 'active' },
      { title: 'Customers', url: '/shop/customers', status: 'active' },
      { title: 'Inventory', url: '/shop/inventory', status: 'active' },
      { title: 'Discounts', url: '/shop/discounts', status: 'draft' },
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    url: '/analytics',
    type: 'section',
    status: 'active',
    pages: [
      { title: 'Traffic Analytics', url: '/analytics/traffic', status: 'active' },
      { title: 'Sales Reports', url: '/analytics/sales', status: 'active' },
      { title: 'User Behavior', url: '/analytics/behavior', status: 'active' },
      { title: 'Performance', url: '/analytics/performance', status: 'new' },
    ]
  },
  {
    id: 'communications',
    title: 'Communications',
    url: '/communications',
    type: 'section',
    status: 'active',
    pages: [
      { title: 'Messages', url: '/communications/messages', status: 'active' },
      { title: 'Email Templates', url: '/communications/emails', status: 'active' },
      { title: 'Notifications', url: '/communications/notifications', status: 'active' },
      { title: 'Newsletter', url: '/communications/newsletter', status: 'draft' },
    ]
  },
  {
    id: 'settings',
    title: 'Settings',
    url: '/settings',
    type: 'section', 
    status: 'active',
    pages: [
      { title: 'General Settings', url: '/settings/general', status: 'active' },
      { title: 'Security', url: '/settings/security', status: 'active' },
      { title: 'Integrations', url: '/settings/integrations', status: 'active' },
      { title: 'Appearance', url: '/settings/appearance', status: 'draft' },
      { title: 'Advanced', url: '/settings/advanced', status: 'draft' },
    ]
  }
]

// State management
const searchQuery = ref('')
const expandedSections = ref<Set<string>>(new Set())
const selectedItem = ref<string | null>(null)

// Load expanded state from localStorage
onMounted(() => {
  const saved = localStorage.getItem('sitemap-expanded-sections')
  if (saved) {
    try {
      const parsed = JSON.parse(saved)
      expandedSections.value = new Set(parsed)
    } catch {
      expandedSections.value = new Set()
    }
  }
})

// Save expanded state to localStorage
watch(expandedSections, (newValue) => {
  localStorage.setItem('sitemap-expanded-sections', JSON.stringify([...newValue]))
}, { deep: true })

// Filtered data based on search
const filteredData = computed(() => {
  if (!searchQuery.value.trim()) return sitemapData
  
  const query = searchQuery.value.toLowerCase()
  
  return sitemapData.filter(section => {
    const sectionMatch = section.title.toLowerCase().includes(query)
    const pageMatch = section.pages.some(page => 
      page.title.toLowerCase().includes(query) || 
      page.url.toLowerCase().includes(query)
    )
    return sectionMatch || pageMatch
  })
})

// Statistics
const totalSections = computed(() => sitemapData.length)
const totalPages = computed(() => sitemapData.reduce((acc, section) => acc + section.pages.length, 0))
const activePages = computed(() => {
  return sitemapData.reduce((acc, section) => {
    return acc + section.pages.filter(page => page.status === 'active').length
  }, 0)
})
const draftPages = computed(() => {
  return sitemapData.reduce((acc, section) => {
    return acc + section.pages.filter(page => page.status === 'draft').length
  }, 0)
})

// Toggle section expansion
const toggleSection = (sectionId: string) => {
  if (expandedSections.value.has(sectionId)) {
    expandedSections.value.delete(sectionId)
  } else {
    expandedSections.value.add(sectionId)
  }
}

// Expand all sections
const expandAll = () => {
  sitemapData.forEach(section => expandedSections.value.add(section.id))
}

// Collapse all sections
const collapseAll = () => {
  expandedSections.value.clear()
}

// Get status badge variant
const getStatusVariant = (status: string) => {
  switch (status) {
    case 'active': return 'default'
    case 'draft': return 'secondary'
    case 'new': return 'destructive'
    default: return 'outline'
  }
}

// Copy URL to clipboard
const copyUrl = async (url: string) => {
  try {
    await navigator.clipboard.writeText(`${window.location.origin}${url}`)
    console.log('URL copied:', url)
  } catch (err) {
    console.error('Failed to copy URL:', err)
  }
}

// Navigate to page
const navigateToPage = (url: string) => {
  navigateTo(url)
}
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel class="flex items-center gap-2">
      <Map class="h-4 w-4" />
      Site Map
    </SidebarGroupLabel>
    
    <!-- Search and Controls -->
    <div class="px-2 pb-2 space-y-2">
      <!-- Search -->
      <div class="relative">
        <Search class="absolute left-2 top-1/2 h-3 w-3 -translate-y-1/2 text-muted-foreground" />
        <Input 
          v-model="searchQuery"
          placeholder="Search pages..."
          class="pl-7 h-7 text-xs"
        />
      </div>
      
      <!-- Stats and Controls -->
      <div class="flex items-center justify-between text-xs text-muted-foreground">
        <div class="flex items-center gap-2">
          <span>{{ totalSections }} sections</span>
          <span>•</span>
          <span>{{ totalPages }} pages</span>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" class="h-5 w-5 p-0">
              <MoreHorizontal class="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" class="w-36">
            <DropdownMenuItem @click="expandAll" class="text-xs">
              Expand All
            </DropdownMenuItem>
            <DropdownMenuItem @click="collapseAll" class="text-xs">
              Collapse All
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem class="text-xs">
              Export Map
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      <!-- Quick Stats -->
      <div class="flex items-center gap-2 text-xs">
        <div class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-green-500"></div>
          <span class="text-muted-foreground">{{ activePages }} active</span>
        </div>
        <div class="flex items-center gap-1">
          <div class="h-2 w-2 rounded-full bg-yellow-500"></div>
          <span class="text-muted-foreground">{{ draftPages }} draft</span>
        </div>
      </div>
    </div>

    <!-- Sitemap Tree -->
    <SidebarMenu class="gap-0">
      <SidebarMenuItem v-for="section in filteredData" :key="section.id">
        <Collapsible :open="expandedSections.has(section.id)">
          <!-- Section Header -->
          <CollapsibleTrigger asChild>
            <SidebarMenuButton
              class="group/section w-full justify-start hover:bg-accent"
              @click="toggleSection(section.id)"
            >
              <ChevronRight 
                :class="[
                  'h-3 w-3 transition-transform shrink-0',
                  expandedSections.has(section.id) ? 'rotate-90' : ''
                ]"
              />
              
              <component 
                :is="expandedSections.has(section.id) ? FolderOpen : Folder" 
                class="h-3 w-3 text-muted-foreground shrink-0" 
              />
              
              <span class="text-xs font-medium truncate">{{ section.title }}</span>
              
              <Badge 
                :variant="getStatusVariant(section.status)" 
                class="h-4 text-xs px-1 ml-auto"
              >
                {{ section.pages.length }}
              </Badge>
            </SidebarMenuButton>
          </CollapsibleTrigger>
          
          <!-- Section Pages -->
          <CollapsibleContent>
            <div class="ml-6 border-l border-border/40 pl-1">
              <div 
                v-for="page in section.pages" 
                :key="`${section.id}-${page.url}`"
                class="group/page flex items-center gap-2 rounded-md px-2 py-1 text-xs hover:bg-accent/50 cursor-pointer transition-colors"
                :class="selectedItem === page.url ? 'bg-accent' : ''"
                @click="selectedItem = page.url"
              >
                <div class="w-3 flex justify-center">
                  <FileText class="h-2 w-2 text-muted-foreground/70" />
                </div>
                
                <span class="truncate flex-1">{{ page.title }}</span>
                
                <!-- Status indicator -->
                <div 
                  :class="[
                    'h-1.5 w-1.5 rounded-full shrink-0',
                    page.status === 'active' ? 'bg-green-500' : 
                    page.status === 'draft' ? 'bg-yellow-500' : 
                    page.status === 'new' ? 'bg-blue-500' : 'bg-gray-400'
                  ]"
                />
                
                <!-- Actions (visible on hover) -->
                <div class="hidden group-hover/page:flex items-center gap-1 ml-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    class="h-4 w-4 p-0"
                    @click.stop="copyUrl(page.url)"
                    title="Copy URL"
                  >
                    <Copy class="h-2 w-2" />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm" 
                    class="h-4 w-4 p-0"
                    @click.stop="navigateToPage(page.url)"
                    title="Visit Page"
                  >
                    <ExternalLink class="h-2 w-2" />
                  </Button>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </SidebarMenuItem>
    </SidebarMenu>
  </SidebarGroup>
</template>