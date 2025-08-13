# ShadCN Vue + Nuxt 4 Setup Documentation

## Overview

This document outlines the setup and fixes applied to integrate ShadCN Vue components with Nuxt 4.

## Issues Encountered and Fixes

### 1. Import Alias Configuration

**Problem**: ShadCN Vue CLI couldn't find import aliases in tsconfig.json
**Solution**: Added path mappings to root tsconfig.json

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"],
      "~/*": ["./app/*"]
    }
  }
}
```

### 2. Component Import Paths

**Problem**: Components were importing utils with wrong paths (`@/app/lib/utils`)
**Solution**: Updated all imports to use Nuxt's `~` alias

- Changed: `import { cn } from '@/app/lib/utils'`
- To: `import { cn } from '~/lib/utils'`

### 3. Component Naming Issues

**Problem**: Duplicate component names (e.g., `SheetSheet`, `AvatarAvatar`, `CardCard`)
**Solution**: Fixed all component names to single form:

- `SheetSheet` → `Sheet`
- `SheetSheetTrigger` → `SheetTrigger`
- `AvatarAvatar` → `Avatar`
- `CardCard` → `Card`
- `SidebarSidebar` → `Sidebar`
- `CollapsibleCollapsible` → `Collapsible`

### 4. Components.json Configuration

**Problem**: ShadCN CLI generating components in wrong paths
**Solution**: Updated aliases in components.json

```json
{
  "aliases": {
    "components": "./app/components",
    "composables": "./app/composables",
    "utils": "./app/lib/utils",
    "ui": "./app/components/ui",
    "lib": "./app/lib"
  }
}
```

### 5. Nuxt Configuration

**Problem**: Component auto-import issues and hydration mismatches
**Solution**:

- Removed `shadcn-nuxt` module (was causing index file errors)
- Configured component directories properly:

```ts
components: {
  dirs: [
    {
      path: "./app/components",
      pathPrefix: false,
      global: true,
      extensions: ["vue"],
    },
  ];
}
```

## File Structure

```
my-nuxt4-app/
├── app/
│   ├── components/
│   │   ├── ui/           # All ShadCN components
│   │   │   ├── accordion/
│   │   │   ├── alert/
│   │   │   ├── avatar/
│   │   │   ├── button/
│   │   │   ├── card/
│   │   │   ├── dropdown-menu/
│   │   │   ├── sheet/
│   │   │   └── ...
│   │   └── app-sidebar.vue
│   ├── layouts/
│   │   └── default.vue
│   └── lib/
│       └── utils.ts
├── components.json       # ShadCN configuration
├── nuxt.config.ts
└── tsconfig.json
```

## Component Usage

Components should be used with PascalCase in templates:

```vue
<Sheet>
  <SheetTrigger>...</SheetTrigger>
  <SheetContent>...</SheetContent>
</Sheet>
```

## Installing New Components

To add new ShadCN components:

```bash
npx shadcn-vue@latest add [component-name]
```

## Important Notes

1. Always use `~/` alias for imports within the app directory
2. Components are auto-imported - no need to import them in scripts
3. Use PascalCase for component names in templates
4. File names are kebab-case but component names are PascalCase

## Troubleshooting

If you encounter hydration mismatches:

1. Clear Nuxt cache: `rm -rf .nuxt`
2. Restart dev server: `npm run dev`
3. Ensure all component names are correctly formatted (no duplicates)

- tsconfig.json - Added import aliases
- components.json - Fixed component paths
- nuxt.config.ts - Removed problematic module
- default.vue - Fixed component names
- app-sidebar.vue - Fixed component names
- UI component files - Fixed import paths
