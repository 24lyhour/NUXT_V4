# NavSitemapMenu Component Usage Guide

## Overview

The `NavSitemapMenu` is a **reusable** and **dynamic** sitemap navigation component following the original **ShadCN Vue patterns**. It supports persistent state, badges, new indicators, and complete customization.

## Features ✅

- 🔄 **Reusable** - Can be used in any sidebar or navigation context
- 🎯 **Dynamic** - Data-driven configuration from external files
- 💾 **Persistent State** - Remembers open/closed state with localStorage
- 🏷️ **Badges & Indicators** - Support for counters, "New" badges, and custom labels
- 🎨 **ShadCN Styling** - Follows original ShadCN Vue component patterns
- ♿ **Accessible** - Proper ARIA labels and keyboard navigation
- 🔧 **Configurable** - Multiple customization options

## Basic Usage

```vue
<template>
  <NavSitemapMenu
    :sections="sitemapData"
    storage-prefix="my-app"
    :enable-persistence="true"
    :default-open="false"
  />
</template>

<script setup>
import NavSitemapMenu from "~/components/NavSitemapMenu.vue";
import { sitemapConfig } from "~/config/sitemapConfig";

const sitemapData = sitemapConfig.sections;
</script>
```

## Props Configuration

| Prop                | Type               | Default     | Description                              |
| ------------------- | ------------------ | ----------- | ---------------------------------------- |
| `sections`          | `SitemapSection[]` | required    | Array of navigation sections             |
| `storagePrefix`     | `string`           | `'sitemap'` | Prefix for localStorage keys             |
| `enablePersistence` | `boolean`          | `true`      | Enable/disable state persistence         |
| `defaultOpen`       | `boolean`          | `false`     | Default open state for collapsible items |

## Data Structure

### Section Structure

```typescript
interface SitemapSection {
  label: string; // Section title (e.g., "Dashboard", "User Management")
  items: SitemapItem[]; // Navigation items in this section
}
```

### Item Structure

```typescript
interface SitemapItem {
  title: string; // Item title
  url?: string; // Optional URL for navigation
  icon?: Component; // Lucide icon component
  badge?: string | number; // Badge text/number (e.g., "5", "New", "Pro")
  isActive?: boolean; // Mark as active/current page
  isDisabled?: boolean; // Disable the item
  items?: SitemapSubItem[]; // Sub-items for collapsible menus
}
```

### Sub-Item Structure

```typescript
interface SitemapSubItem {
  title: string; // Sub-item title
  url: string; // Navigation URL
  badge?: string | number; // Badge for sub-item
  isNew?: boolean; // Show "New" indicator
  isDisabled?: boolean; // Disable the sub-item
}
```

## Example Configurations

### 1. Simple Navigation

```typescript
const simpleNav = {
  sections: [
    {
      label: "Main",
      items: [
        {
          title: "Dashboard",
          icon: Home,
          url: "/dashboard",
          isActive: true,
        },
        {
          title: "Settings",
          icon: Settings,
          url: "/settings",
        },
      ],
    },
  ],
};
```

### 2. Navigation with Badges

```typescript
const badgeNav = {
  sections: [
    {
      label: "Management",
      items: [
        {
          title: "Users",
          icon: Users,
          url: "/users",
          badge: "1,234", // User count
          items: [
            { title: "Active Users", url: "/users/active", badge: "890" },
            { title: "Pending", url: "/users/pending", badge: "12" },
            { title: "Blocked", url: "/users/blocked", badge: "5" },
          ],
        },
      ],
    },
  ],
};
```

### 3. Navigation with New Indicators

```typescript
const newFeatureNav = {
  sections: [
    {
      label: "Features",
      items: [
        {
          title: "Analytics",
          icon: BarChart3,
          items: [
            { title: "Reports", url: "/analytics/reports" },
            { title: "AI Insights", url: "/analytics/ai", isNew: true }, // New feature
            { title: "Real-time", url: "/analytics/realtime", badge: "Beta" },
          ],
        },
      ],
    },
  ],
};
```

### 4. Mixed Content Navigation

```typescript
const mixedNav = {
  sections: [
    {
      label: "E-commerce",
      items: [
        {
          title: "Products",
          icon: Package,
          badge: "456",
          items: [
            { title: "All Products", url: "/products" },
            { title: "Low Stock", url: "/products/low-stock", badge: "12" },
            { title: "New Arrivals", url: "/products/new", isNew: true },
          ],
        },
        {
          title: "Orders",
          icon: ShoppingCart,
          url: "/orders",
          badge: "23", // Pending orders
        },
      ],
    },
  ],
};
```

## Customization Examples

### 1. Different Storage Keys

```vue
<!-- Admin Panel -->
<NavSitemapMenu :sections="adminSections" storage-prefix="admin-nav" />

<!-- User Dashboard -->
<NavSitemapMenu :sections="userSections" storage-prefix="user-nav" />
```

### 2. Different Default States

```vue
<!-- Expanded by default -->
<NavSitemapMenu :sections="sections" :default-open="true" />

<!-- No persistence (session only) -->
<NavSitemapMenu :sections="sections" :enable-persistence="false" />
```

## Advanced Usage

### 1. Dynamic Badge Updates

```vue
<script setup>
const notificationCount = ref(0);

const dynamicSections = computed(() => [
  {
    label: "Communications",
    items: [
      {
        title: "Messages",
        icon: Mail,
        url: "/messages",
        badge:
          notificationCount.value > 0 ? notificationCount.value : undefined,
      },
    ],
  },
]);

// Update badge dynamically
onMounted(() => {
  // Simulate real-time updates
  setInterval(() => {
    notificationCount.value = Math.floor(Math.random() * 10);
  }, 5000);
});
</script>
```

### 2. Conditional Sections

```vue
<script setup>
const user = useCurrentUser();

const sections = computed(() => {
  const baseSections = [
    // Basic sections for all users
  ];

  // Add admin sections if user is admin
  if (user.value?.role === "admin") {
    baseSections.push({
      label: "Administration",
      items: [
        {
          title: "System Settings",
          icon: Settings,
          url: "/admin/system",
        },
      ],
    });
  }

  return baseSections;
});
</script>
```

### 3. Multi-Language Support

```vue
<script setup>
const { t } = useI18n();

const sections = computed(() => [
  {
    label: t("navigation.dashboard"),
    items: [
      {
        title: t("navigation.overview"),
        icon: Home,
        url: "/dashboard",
      },
    ],
  },
]);
</script>
```

## Styling & Theming

The component follows ShadCN Vue styling patterns and supports:

- **Dark/Light mode** - Automatic theme switching
- **Custom colors** - Via CSS variables
- **Badge styling** - Primary, muted, and custom badge styles
- **Hover states** - Consistent with ShadCN components
- **Active states** - Visual indication of current page

## Accessibility

- ✅ **Keyboard navigation** - Full keyboard support
- ✅ **Screen readers** - Proper ARIA labels
- ✅ **Focus management** - Visible focus indicators
- ✅ **Semantic HTML** - Proper heading structure

## Performance

- 🚀 **Lazy loading** - Only renders visible sections
- 💾 **Efficient persistence** - Individual localStorage keys
- ⚡ **Minimal re-renders** - Optimized with reactive data
- 🔄 **Smart updates** - Only updates changed states

This component provides a complete, reusable solution for dynamic navigation menus following ShadCN Vue patterns! 🎉

NavSitemapView - A complete visual sitemap component showing
the entire site structure in a tree format
Search functionality - Users can search through pages to
quickly find what they need
Collapsible sections - Each section can be expanded/collapsed
with persistent state
Status indicators - Color-coded dots showing active/draft/new
page status
Quick stats - Shows count of active vs draft pages
Interactive actions - Copy URLs and navigate to pages with
hover buttons
Comprehensive data - 7 major sections with realistic
navigation structure
