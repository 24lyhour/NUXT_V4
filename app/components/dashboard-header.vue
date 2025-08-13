<template>
  <header class="sticky top-0 z-40 border-b bg-background">
    <div class="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
      <div class="flex gap-6 md:gap-10">
        <div class="flex items-center space-x-2 md:hidden">
          <UiSheet>
            <UiSheetTrigger asChild>
              <UiButton variant="ghost" size="icon" class="md:hidden">
                <Menu class="h-5 w-5" />
                <span class="sr-only">Toggle menu</span>
              </UiButton>
            </UiSheetTrigger>
            <UiSheetContent side="left" class="w-[300px] sm:w-[400px]">
              <nav class="flex flex-col space-y-4">
                <NuxtLink
                  v-for="item in navItems"
                  :key="item.href"
                  :to="item.href"
                  class="block px-2 py-1 text-lg"
                  @click="() => {}"
                >
                  {{ item.title }}
                </NuxtLink>
              </nav>
            </UiSheetContent>
          </UiSheet>
        </div>
        <NuxtLink to="/" class="flex items-center space-x-2">
          <Package2 class="h-6 w-6" />
          <span class="inline-block font-bold">Dashboard</span>
        </NuxtLink>
      </div>
      <div class="flex flex-1 items-center justify-end space-x-4">
        <nav class="flex items-center space-x-1">
          <UiButton variant="ghost" size="icon" class="h-9 w-9">
            <Bell class="h-4 w-4" />
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
        </nav>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu, Package2, Bell, User, CreditCard, Settings, LogOut } from 'lucide-vue-next'

const navItems = [
  { title: 'Dashboard', href: '/' },
  { title: 'Customers', href: '/customers' },
  { title: 'Products', href: '/products' },
  { title: 'Orders', href: '/orders' },
  { title: 'Analytics', href: '/analytics' },
  { title: 'Reports', href: '/reports' },
  { title: 'Settings', href: '/settings' },
]
</script>