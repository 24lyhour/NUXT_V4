<script setup lang="ts">
import type { LucideIcon } from "lucide-vue-next"
import { ChevronRight } from "lucide-vue-next"
import { ref, watch, computed } from "vue"
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

// Simple reactive states for each item
const getItemState = (itemTitle: string) => {
  const storageKey = `nav-${itemTitle}-open`
  
  // Initialize from localStorage or default to false
  const initialValue = typeof window !== 'undefined' 
    ? localStorage.getItem(storageKey) === 'true' 
    : false
    
  const state = ref(initialValue)
  
  // Watch for changes and save to localStorage
  watch(state, (newValue) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, String(newValue))
    }
  })
  
  return state
}

// Create reactive states for each menu item
const itemStates = computed(() => {
  const states: Record<string, any> = {}
  props.items.forEach(item => {
    if (item.items && item.items.length > 0) {
      states[item.title] = getItemState(item.title)
    }
  })
  return states
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
