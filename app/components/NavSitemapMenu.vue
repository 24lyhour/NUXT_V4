<script setup lang="ts">
import type { Component } from "vue"
import { ChevronRight } from "lucide-vue-next"
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

// Define interfaces for type safety
interface SitemapSubItem {
  title: string
  url: string
  badge?: string | number
  isNew?: boolean
  isDisabled?: boolean
}

interface SitemapItem {
  title: string
  url?: string
  icon?: Component
  badge?: string | number
  isActive?: boolean
  isDisabled?: boolean
  items?: SitemapSubItem[]
}

interface SitemapSection {
  label: string
  items: SitemapItem[]
}

// Props interface
interface Props {
  sections: SitemapSection[]
  storagePrefix?: string
  enablePersistence?: boolean
  defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  storagePrefix: 'sitemap',
  enablePersistence: true,
  defaultOpen: false,
})

// Create reactive states for persistence
const itemStates = reactive<Record<string, boolean>>({})

// Initialize states
const initializeStates = () => {
  props.sections.forEach(section => {
    section.items.forEach(item => {
      if (item.items && item.items.length > 0) {
        const key = `${section.label}-${item.title}`
        itemStates[key] = props.defaultOpen
      }
    })
  })
}

// Load states from localStorage and setup watchers
onMounted(() => {
  if (props.enablePersistence) {
    props.sections.forEach(section => {
      section.items.forEach(item => {
        if (item.items && item.items.length > 0) {
          const key = `${section.label}-${item.title}`
          const storageKey = `${props.storagePrefix}-${key}-open`
          
          // Load from localStorage
          const saved = localStorage.getItem(storageKey)
          if (saved !== null) {
            try {
              itemStates[key] = JSON.parse(saved)
            } catch {
              itemStates[key] = props.defaultOpen
            }
          }
          
          // Setup watcher for persistence
          watch(() => itemStates[key], (newValue) => {
            if (typeof newValue === 'boolean') {
              localStorage.setItem(storageKey, JSON.stringify(newValue))
              console.log(`Sitemap ${key}: ${newValue}`)
            }
          })
        }
      })
    })
  }
})

// Initialize states
initializeStates()

// Helper function to get item key
const getItemKey = (sectionLabel: string, itemTitle: string) => {
  return `${sectionLabel}-${itemTitle}`
}
</script>

<template>
  <div>
    <!-- Render each section -->
    <SidebarGroup v-for="section in sections" :key="section.label">
      <SidebarGroupLabel>{{ section.label }}</SidebarGroupLabel>
      
      <SidebarMenu>
        <SidebarMenuItem v-for="item in section.items" :key="item.title">
          <!-- Collapsible item with sub-items -->
          <Collapsible 
            v-if="item.items && item.items.length > 0" 
            v-model:open="itemStates[getItemKey(section.label, item.title)]"
            class="group/collapsible"
          >
            <CollapsibleTrigger as-child>
              <SidebarMenuButton 
                :tooltip="item.title"
                :data-active="item.isActive"
                :disabled="item.isDisabled"
                class="group/button"
              >
                <component :is="item.icon" v-if="item.icon" class="shrink-0" />
                <span class="truncate">{{ item.title }}</span>
                
                <!-- Badge for item -->
                <span 
                  v-if="item.badge" 
                  class="ml-auto rounded-md bg-primary px-1.5 py-0.5 text-xs text-primary-foreground"
                >
                  {{ item.badge }}
                </span>
                
                <!-- New indicator -->
                <span 
                  v-else-if="item.isNew" 
                  class="ml-auto rounded-full bg-blue-500 px-1.5 py-0.5 text-xs text-white"
                >
                  New
                </span>
                
                <ChevronRight 
                  class="ml-auto h-4 w-4 shrink-0 transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" 
                />
              </SidebarMenuButton>
            </CollapsibleTrigger>
            
            <CollapsibleContent>
              <SidebarMenuSub>
                <SidebarMenuSubItem 
                  v-for="subItem in item.items" 
                  :key="subItem.title"
                >
                  <SidebarMenuSubButton 
                    as-child
                    :disabled="subItem.isDisabled"
                  >
                    <NuxtLink 
                      :to="subItem.url"
                      class="flex items-center justify-between w-full"
                    >
                      <span class="truncate">{{ subItem.title }}</span>
                      
                      <!-- Sub-item badge -->
                      <span 
                        v-if="subItem.badge" 
                        class="ml-2 rounded-md bg-muted px-1.5 py-0.5 text-xs"
                      >
                        {{ subItem.badge }}
                      </span>
                      
                      <!-- New indicator for sub-item -->
                      <span 
                        v-else-if="subItem.isNew" 
                        class="ml-2 h-2 w-2 rounded-full bg-blue-500"
                        aria-label="New"
                      />
                    </NuxtLink>
                  </SidebarMenuSubButton>
                </SidebarMenuSubItem>
              </SidebarMenuSub>
            </CollapsibleContent>
          </Collapsible>
          
          <!-- Simple menu item without sub-items -->
          <SidebarMenuButton 
            v-else 
            as-child
            :data-active="item.isActive"
            :disabled="item.isDisabled"
          >
            <NuxtLink 
              v-if="item.url" 
              :to="item.url"
              class="flex items-center justify-between w-full"
            >
              <div class="flex items-center">
                <component :is="item.icon" v-if="item.icon" class="mr-2 h-4 w-4 shrink-0" />
                <span class="truncate">{{ item.title }}</span>
              </div>
              
              <!-- Badge for simple item -->
              <span 
                v-if="item.badge" 
                class="ml-auto rounded-md bg-primary px-1.5 py-0.5 text-xs text-primary-foreground"
              >
                {{ item.badge }}
              </span>
              
              <!-- New indicator -->
              <span 
                v-else-if="item.isNew" 
                class="ml-auto h-2 w-2 rounded-full bg-blue-500"
                aria-label="New"
              />
            </NuxtLink>
            
            <!-- Non-clickable item (header/divider) -->
            <div v-else class="flex items-center">
              <component :is="item.icon" v-if="item.icon" class="mr-2 h-4 w-4 shrink-0" />
              <span class="truncate font-medium">{{ item.title }}</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  </div>
</template>