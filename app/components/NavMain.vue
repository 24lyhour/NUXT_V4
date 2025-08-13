<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next"
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

const props = defineProps<{
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
    }[]
  }[]
}>()

// Create reactive states object
const itemStates = reactive<Record<string, boolean>>({})

// Initialize all items to false first
props.items.forEach(item => {
  if (item.items && item.items.length > 0) {
    itemStates[item.title] = false
  }
})

// Load from localStorage and set up watchers on mounted
onMounted(() => {
  props.items.forEach(item => {
    if (item.items && item.items.length > 0) {
      const storageKey = `nav-${item.title}-open`
      
      // Load boolean from localStorage (parse JSON for true boolean)
      const saved = localStorage.getItem(storageKey)
      if (saved !== null) {
        try {
          itemStates[item.title] = JSON.parse(saved) // true/false as boolean
        } catch {
          itemStates[item.title] = false
        }
      }
      
      // Watch for changes and save boolean to localStorage  
      watch(() => itemStates[item.title], (newValue: boolean) => {
        localStorage.setItem(storageKey, JSON.stringify(newValue)) // Store as boolean
        console.log(`Saved ${item.title}: ${newValue}`)
      })
    }
  })
})
</script>

<template>
  <SidebarGroup>
    <SidebarGroupLabel>Platform</SidebarGroupLabel>
    <SidebarMenu>
      <SidebarMenuItem v-for="item in items" :key="item.title">
        <Collapsible v-if="item.items && item.items.length > 0" 
          v-model:open="itemStates[item.title]"
          class="group/collapsible">
          <CollapsibleTrigger as-child>
            <SidebarMenuButton :tooltip="item.title">
              <component :is="item.icon" v-if="item.icon" />
              <span>{{ item.title }}</span>
              <ChevronRight
                class="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
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
