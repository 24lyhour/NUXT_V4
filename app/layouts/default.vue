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
        <UiSheet>
          <UiSheetTrigger asChild>
            <UiButton variant="outline" size="icon" class="md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle menu</span>
            </UiButton>
          </UiSheetTrigger>
          <UiSheetContent side="left" class="p-0 w-72">
            <AppSidebar />
          </UiSheetContent>
        </UiSheet>
        
        <div class="flex flex-1 items-center justify-between">
          <h1 class="text-lg font-semibold md:text-xl">{{ pageTitle }}</h1>
          
          <div class="flex items-center gap-4">
            <UiButton variant="ghost" size="icon">
              <Bell class="h-5 w-5" />
              <span class="sr-only">Notifications</span>
            </UiButton>
            
            <UiDropdownMenu>
              <UiDropdownMenuTrigger asChild>
                <UiButton variant="ghost" class="relative h-8 w-8 rounded-full">
                  <UiAvatar class="h-8 w-8">
                    <UiAvatarImage src="/avatars/01.png" alt="@user" />
                    <UiAvatarFallback>U</UiAvatarFallback>
                  </UiAvatar>
                </UiButton>
              </UiDropdownMenuTrigger>
              <UiDropdownMenuContent class="w-56" align="end" forceMount>
                <UiDropdownMenuItem class="font-normal">
                  <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">user@example.com</p>
                    <p class="text-xs leading-none text-muted-foreground">
                      Admin User
                    </p>
                  </div>
                </UiDropdownMenuItem>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem>
                  <User class="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem>
                  <CreditCard class="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuItem>
                  <Settings class="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </UiDropdownMenuItem>
                <UiDropdownMenuSeparator />
                <UiDropdownMenuItem>
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </UiDropdownMenuItem>
              </UiDropdownMenuContent>
            </UiDropdownMenu>
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