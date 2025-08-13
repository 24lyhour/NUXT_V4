# SakalTable Component

A professional, reusable, and fully dynamic table component for Nuxt.js v4 projects.

## 📍 Location
- **Component**: `app/components/shared/SakalTable.vue`
- **Example**: `app/pages/table-example.vue`

## 🔥 Features

- ✅ **TypeScript** + Vue 3 Composition API
- ✅ **ShadCN UI** + TailwindCSS styling
- ✅ **Search** functionality (client-side)
- ✅ **Filter** by status and priority (multi-select)
- ✅ **Sort** columns (asc/desc with visual indicators)
- ✅ **Row selection** (individual + select all)
- ✅ **Pagination** with configurable rows per page
- ✅ **Actions menu** (view, edit, delete)
- ✅ **Loading states** with skeleton rows
- ✅ **Responsive design** with horizontal scrolling
- ✅ **Clean code** (no unnecessary comments)

## 🚀 Usage

```vue
<template>
  <SakalTable
    :columns="columns"
    :rows="data"
    :status-colors="statusColors"
    :priority-icons="priorityIcons"
    :page="currentPage"
    :rows-per-page="rowsPerPage"
    :total-rows="totalRows"
    :loading="loading"
    @page-change="handlePageChange"
    @rows-per-page-change="handleRowsPerPageChange"
    @view="handleView"
    @edit="handleEdit"
    @delete="handleDelete"
  />
</template>

<script setup lang="ts">
import SakalTable from '~/components/shared/SakalTable.vue'
import { ArrowUp, ArrowDown, Minus } from 'lucide-vue-next'

// Configuration
const columns = [
  { key: 'task', label: 'Task', sortable: true },
  { key: 'title', label: 'Title', sortable: true },
  { key: 'status', label: 'Status', sortable: true },
  { key: 'priority', label: 'Priority', sortable: true },
]

const statusColors = {
  'Todo': 'bg-gray-400',
  'In Progress': 'bg-blue-500',
  'Done': 'bg-green-500',
  'Backlog': 'bg-yellow-500',
  'Canceled': 'bg-red-500'
}

const priorityIcons = {
  'High': { icon: ArrowUp, color: 'text-red-500' },
  'Medium': { icon: Minus, color: 'text-yellow-500' },
  'Low': { icon: ArrowDown, color: 'text-green-500' }
}

// Data
const data = [
  {
    id: 1,
    task: 'TASK-8782',
    title: 'Example task title',
    type: 'Documentation', // Shows as badge
    status: 'In Progress',
    priority: 'Medium'
  }
  // ... more rows
]

// Event handlers
const handlePageChange = (page: number) => {
  currentPage.value = page
}

const handleRowsPerPageChange = (newRowsPerPage: number) => {
  rowsPerPage.value = newRowsPerPage
  currentPage.value = 1
}

const handleView = (row: any) => {
  console.log('View:', row)
}

const handleEdit = (row: any) => {
  console.log('Edit:', row)
}

const handleDelete = (row: any) => {
  console.log('Delete:', row)
}
</script>
```

## 📊 Props Interface

```typescript
interface Column {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

interface StatusColors {
  [key: string]: string // Tailwind color classes
}

interface PriorityIcon {
  icon: any // Lucide Vue icon
  color: string // Tailwind color class
}

interface PriorityIcons {
  [key: string]: PriorityIcon
}

interface Props {
  columns: Column[]
  rows: any[]
  statusColors?: StatusColors
  priorityIcons?: PriorityIcons
  page: number
  rowsPerPage: number
  totalRows: number
  loading?: boolean
}
```

## 🎯 Special Cell Types

The component automatically handles these special column keys:

### Title Column (`key: 'title'`)
```vue
<Badge>{{ row.type }}</Badge>
<span class="font-medium">{{ row.title }}</span>
```

### Status Column (`key: 'status'`)
```vue
<div class="h-2 w-2 rounded-full bg-[color]"></div>
<span>{{ row.status }}</span>
```

### Priority Column (`key: 'priority'`)
```vue
<Icon class="h-4 w-4 [color]" />
<span>{{ row.priority }}</span>
```

## 🔧 Event Emits

```typescript
const emit = defineEmits<{
  pageChange: [page: number]
  rowsPerPageChange: [rowsPerPage: number]
  view: [row: any]
  edit: [row: any]
  delete: [row: any]
}>()
```

## 🎨 Styling

- Uses **ShadCN UI** components
- **TailwindCSS** for styling
- **Lucide Vue** for icons
- **Responsive design** with mobile-first approach
- **Dark mode** support through CSS variables

## 📱 Responsive Behavior

- **Desktop**: Full table with all features
- **Tablet**: Horizontal scroll for overflow
- **Mobile**: Compact view with touch-friendly controls

## 🔍 Example Data Structure

```typescript
const mockData = [
  {
    id: 1,
    task: 'TASK-8782',
    title: 'Task description',
    type: 'Documentation', // Badge type
    status: 'In Progress',   // Colored dot
    priority: 'Medium'       // Icon + color
  }
]
```

## 💡 Best Practices

1. **Always provide `totalRows`** for proper pagination
2. **Use consistent data structure** across all rows
3. **Handle all emitted events** in parent component
4. **Configure `statusColors` and `priorityIcons`** for visual consistency
5. **Set `loading` state** during data fetching

## ✨ Production Ready

This component is:
- **Type-safe** with full TypeScript support
- **Performance optimized** with computed properties
- **Accessible** with proper ARIA labels
- **Tested** with comprehensive example page
- **Maintainable** with clean, modular code

---

**Created**: 2025-01-13  
**Status**: ✅ Production Ready  
**Tech Stack**: Nuxt 4 + Vue 3 + TypeScript + ShadCN UI + TailwindCSS