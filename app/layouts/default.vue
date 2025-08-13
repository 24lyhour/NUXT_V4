<script setup lang="ts">
import { Menu, Bell, User, CreditCard, Settings, LogOut } from 'lucide-vue-next'
import AppSidebar from '../components/AppSidebar.vue'
import SidebarProvider from '../components/ui/sidebar/sidebarProvider.vue'
import SidebarTrigger from '../components/ui/sidebar/sidebarTrigger.vue'

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

<template>
  <SidebarProvider>
    <div class="flex h-screen overflow-hidden bg-background">
      <!-- Sidebar -->
      <AppSidebar />

      <!-- Main content -->
      <div class="flex flex-1 flex-col">
        <!-- Header -->
        <header class="sticky top-0 z-40 flex h-16 items-center gap-4 border-b bg-background px-6">
          <SidebarTrigger />

          <div class="flex flex-1 items-center justify-between">
            <h1 class="text-lg font-semibold md:text-xl">{{ pageTitle }}</h1>

            <div class="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Bell class="h-5 w-5" />
                <span class="sr-only">Notifications</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" class="relative h-8 w-8 rounded-full">
                    <Avatar class="h-8 w-8">
                      <AvatarImage src="/avatars/01.png" alt="@user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent class="w-56" align="end" forceMount>
                  <DropdownMenuItem class="font-normal">
                    <div class="flex flex-col space-y-1">
                      <p class="text-sm font-medium leading-none">user@example.com</p>
                      <p class="text-xs leading-none text-muted-foreground">
                        Admin User
                      </p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User class="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <CreditCard class="mr-2 h-4 w-4" />
                    <span>Billing</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings class="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut class="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
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
  </SidebarProvider>
</template>