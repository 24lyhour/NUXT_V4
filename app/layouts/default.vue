<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <!-- Sidebar -->
    <div class="hidden md:flex">
      <AppSidebar />
    </div>
    
    <!-- Main content -->
    <div class="flex flex-1 flex-col">
      <!-- Header -->
      <header class="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
        <ui-sheet-sheet>
          <ui-sheet-sheet-trigger asChild>
            <ui-button variant="outline" size="icon" class="md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle menu</span>
            </ui-button>
          </ui-sheet-sheet-trigger>
          <ui-sheet-sheet-content side="left" class="p-0 w-72">
            <AppSidebar />
          </ui-sheet-sheet-content>
        </ui-sheet-sheet>
        
        <div class="flex flex-1 items-center justify-between">
          <h1 class="text-lg font-semibold md:text-xl">{{ pageTitle }}</h1>
          
          <div class="flex items-center gap-4">
            <ui-button variant="ghost" size="icon">
              <Bell class="h-5 w-5" />
              <span class="sr-only">Notifications</span>
            </ui-button>
            
            <ui-dropdown-menu-dropdown-menu>
              <ui-dropdown-menu-dropdown-menu-trigger asChild>
                <ui-button variant="ghost" class="relative h-8 w-8 rounded-full">
                  <ui-avatar-avatar class="h-8 w-8">
                    <ui-avatar-avatar-image src="/avatars/01.png" alt="@user" />
                    <ui-avatar-avatar-fallback>U</ui-avatar-avatar-fallback>
                  </ui-avatar-avatar>
                </ui-button>
              </ui-dropdown-menu-dropdown-menu-trigger>
              <ui-dropdown-menu-dropdown-menu-content class="w-56" align="end" forceMount>
                <ui-dropdown-menu-dropdown-menu-item class="font-normal">
                  <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">user@example.com</p>
                    <p class="text-xs leading-none text-muted-foreground">
                      Admin User
                    </p>
                  </div>
                </ui-dropdown-menu-dropdown-menu-item>
                <ui-dropdown-menu-dropdown-menu-separator />
                <ui-dropdown-menu-dropdown-menu-item>
                  <User class="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </ui-dropdown-menu-dropdown-menu-item>
                <ui-dropdown-menu-dropdown-menu-item>
                  <CreditCard class="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </ui-dropdown-menu-dropdown-menu-item>
                <ui-dropdown-menu-dropdown-menu-item>
                  <Settings class="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </ui-dropdown-menu-dropdown-menu-item>
                <ui-dropdown-menu-dropdown-menu-separator />
                <ui-dropdown-menu-dropdown-menu-item>
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </ui-dropdown-menu-dropdown-menu-item>
              </ui-dropdown-menu-dropdown-menu-content>
            </ui-dropdown-menu-dropdown-menu>
          </div>
        </div>
      </header>
      
      <!-- Page content -->
      <main class="flex-1 overflow-y-auto">
        <div class="container py-6">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Menu, Bell, User, CreditCard, Settings, LogOut } from 'lucide-vue-next'
import AppSidebar from '../components/app-sidebar.vue'

const route = useRoute()

const pageTitle = computed(() => {
  const path = route.path
  if (path === '/') return 'Dashboard'
  if (path === '/customers') return 'Customers'
  if (path === '/products') return 'Products'
  if (path === '/orders') return 'Orders'
  if (path === '/analytics') return 'Analytics'
  if (path === '/settings') return 'Settings'
  return 'Dashboard'
})
</script>