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
        <SheetSheet>
          <SheetSheetTrigger asChild>
            <Button variant="outline" size="icon" class="md:hidden">
              <Menu class="h-5 w-5" />
              <span class="sr-only">Toggle menu</span>
            </Button>
          </SheetSheetTrigger>
          <SheetSheetContent side="left" class="p-0 w-72">
            <AppSidebar />
          </SheetSheetContent>
        </SheetSheet>
        
        <div class="flex flex-1 items-center justify-between">
          <h1 class="text-lg font-semibold md:text-xl">{{ pageTitle }}</h1>
          
          <div class="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Bell class="h-5 w-5" />
              <span class="sr-only">Notifications</span>
            </Button>
            
            <DropdownMenuDropdownMenu>
              <DropdownMenuDropdownMenuTrigger asChild>
                <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                  <AvatarAvatar class="h-8 w-8">
                    <AvatarAvatarImage src="/avatars/01.png" alt="@user" />
                    <AvatarAvatarFallback>U</AvatarAvatarFallback>
                  </AvatarAvatar>
                </Button>
              </DropdownMenuDropdownMenuTrigger>
              <DropdownMenuDropdownMenuContent class="w-56" align="end" forceMount>
                <DropdownMenuDropdownMenuItem class="font-normal">
                  <div class="flex flex-col space-y-1">
                    <p class="text-sm font-medium leading-none">user@example.com</p>
                    <p class="text-xs leading-none text-muted-foreground">
                      Admin User
                    </p>
                  </div>
                </DropdownMenuDropdownMenuItem>
                <DropdownMenuDropdownMenuSeparator />
                <DropdownMenuDropdownMenuItem>
                  <User class="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuDropdownMenuItem>
                <DropdownMenuDropdownMenuItem>
                  <CreditCard class="mr-2 h-4 w-4" />
                  <span>Billing</span>
                </DropdownMenuDropdownMenuItem>
                <DropdownMenuDropdownMenuItem>
                  <Settings class="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuDropdownMenuItem>
                <DropdownMenuDropdownMenuSeparator />
                <DropdownMenuDropdownMenuItem>
                  <LogOut class="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuDropdownMenuItem>
              </DropdownMenuDropdownMenuContent>
            </DropdownMenuDropdownMenu>
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