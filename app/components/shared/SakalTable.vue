<template>
  <div class="sakal-table-container w-full">
    <!-- Table Header with Actions -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-900 dark:text-gray-100">
          {{ title }}
        </h2>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-1">
          {{ totalItems }} {{ totalItems === 1 ? 'item' : 'items' }} total
        </p>
      </div>

      <div class="flex items-center gap-2">
        <Button v-if="showAdd" @click="$emit('add')" size="sm">
          <Plus class="w-4 h-4 mr-2" />
          Add New
        </Button>

        <Button v-if="showRefresh" @click="refreshData" variant="outline" size="sm">
          <RefreshCw :class="['w-4 h-4', { 'animate-spin': isRefreshing }]" />
        </Button>

        <Button v-if="showExport" @click="exportData" variant="outline" size="sm">
          <Download class="w-4 h-4 mr-2" />
          Export
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings class="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem @click="toggleColumnVisibility">
              Toggle Columns
            </DropdownMenuItem>
            <DropdownMenuItem @click="resetTable">
              Reset Table
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Search and Filters -->
    <div class="flex items-center gap-4 mb-4" v-if="showSearch || showFilter">
      <!-- Global Search -->
      <div v-if="showSearch" class="relative flex-1 max-w-sm">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
        <Input v-model="searchQuery" placeholder="Search..." class="pl-10" />
      </div>

      <!-- Column Filters -->
      <div v-if="showFilter" class="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm">
              <Filter class="w-4 h-4 mr-2" />
              Filters
              <Badge v-if="activeFiltersCount > 0" class="ml-2" variant="secondary">
                {{ activeFiltersCount }}
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent class="w-80">
            <div class="p-4 space-y-4">
              <div v-for="column in filterableColumns" :key="column.key" class="space-y-2">
                <Label :for="column.key">{{ column.label }}</Label>
                <Select v-if="column.type === 'select'" v-model="filters[column.key]">
                  <SelectTrigger>
                    <SelectValue :placeholder="`Select ${column.label}`" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All</SelectItem>
                    <SelectItem v-for="option in getUniqueValues(column.key)" :key="option" :value="option">
                      {{ option }}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Input v-else :id="column.key" v-model="filters[column.key]"
                  :placeholder="`Filter by ${column.label}`" />
              </div>
              <div class="flex justify-end gap-2">
                <Button @click="clearFilters" variant="outline" size="sm">
                  Clear
                </Button>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>

    <!-- Table -->
    <div class="border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead v-if="showSelection" class="w-12">
              <Checkbox :checked="isAllSelected" @update:checked="toggleAllSelection" />
            </TableHead>

            <TableHead v-for="column in visibleColumns" :key="column.key" :class="['cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800', {
              'text-blue-600 dark:text-blue-400': sortBy === column.key
            }]" :style="{ width: column.width }" @click="handleSort(column.key)">
              <div class="flex items-center justify-between">
                <span>{{ column.label }}</span>
                <div v-if="column.sortable" class="flex flex-col">
                  <ChevronUp :class="['w-3 h-3 -mb-1', {
                    'text-blue-600 dark:text-blue-400': sortBy === column.key && sortOrder === 'asc'
                  }]" />
                  <ChevronDown :class="['w-3 h-3', {
                    'text-blue-600 dark:text-blue-400': sortBy === column.key && sortOrder === 'desc'
                  }]" />
                </div>
              </div>
            </TableHead>

            <TableHead v-if="showActions" class="w-32">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow v-for="(item, index) in paginatedData" :key="item[itemKey]" :class="['hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer', {
            'bg-blue-50 dark:bg-blue-950': selectedItems.includes(item[itemKey])
          }]" @click="handleRowClick(item, index)">
            <TableCell v-if="showSelection">
              <Checkbox :checked="selectedItems.includes(item[itemKey])"
                @update:checked="toggleSelection(item[itemKey])" @click.stop />
            </TableCell>

            <TableCell v-for="column in visibleColumns" :key="column.key" :class="column.cellClass">
              <component v-if="column.component" :is="column.component" :value="item[column.key]" :item="item"
                :column="column" />
              <template v-else>
                {{ formatCellValue(item[column.key], column) }}
              </template>
            </TableCell>

            <TableCell v-if="showActions">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" @click.stop>
                    <MoreHorizontal class="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem @click="$emit('view', item)">
                    <Eye class="w-4 h-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem @click="$emit('edit', item)">
                    <Edit class="w-4 h-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem @click="$emit('delete', item)" class="text-red-600 focus:text-red-600">
                    <Trash2 class="w-4 h-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>

          <TableRow v-if="paginatedData.length === 0">
            <TableCell :colspan="totalColumns" class="text-center py-8 text-gray-500">
              No data available
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Master-Detail View -->
    <div v-if="showDetail && selectedDetail" class="mt-6 border rounded-lg p-6 bg-gray-50 dark:bg-gray-900">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-lg font-semibold">Detail View</h3>
        <Button @click="closeDetail" variant="ghost" size="sm">
          ✕
        </Button>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div v-for="column in detailColumns" :key="column.key" class="space-y-1">
          <Label class="text-sm font-medium text-gray-600 dark:text-gray-400">
            {{ column.label }}
          </Label>
          <div class="text-sm">
            {{ formatCellValue(selectedDetail[column.key], column) }}
          </div>
        </div>
      </div>

      <!-- Custom Detail Slot -->
      <slot name="detail" :item="selectedDetail" />
    </div>

    <!-- Pagination -->
    <div v-if="showPagination && totalPages > 1" class="flex items-center justify-between mt-6">
      <div class="text-sm text-gray-600 dark:text-gray-400">
        Showing {{ startIndex + 1 }} to {{ endIndex }} of {{ totalItems }} results
      </div>

      <div class="flex items-center gap-2">
        <Button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1" variant="outline" size="sm">
          <ChevronLeft class="w-4 h-4" />
          Previous
        </Button>

        <div class="flex items-center gap-1">
          <Button v-for="page in visiblePageNumbers" :key="page" @click="goToPage(page)"
            :variant="currentPage === page ? 'default' : 'outline'" size="sm" class="w-10 h-8">
            {{ page }}
          </Button>
        </div>

        <Button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages" variant="outline" size="sm">
          Next
          <ChevronRight class="w-4 h-4" />
        </Button>
      </div>

      <Select v-model="pageSize">
        <SelectTrigger class="w-32">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem :value="10">10 per page</SelectItem>
          <SelectItem :value="25">25 per page</SelectItem>
          <SelectItem :value="50">50 per page</SelectItem>
          <SelectItem :value="100">100 per page</SelectItem>
        </SelectContent>
      </Select>
    </div>
  </div>
</template>

<script setup lang="ts">
// Import ShadCN Vue Components - Nuxt v4 Paths
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'
import { Badge } from '~/components/ui/badge'
import { Checkbox } from '~/components/ui/checkbox'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '~/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '~/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

// Lucide Vue Icons
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Download,
  RefreshCw,
  Settings,
  Plus
} from 'lucide-vue-next'

// Props Interface
interface Column {
  key: string
  label: string
  sortable?: boolean
  filterable?: boolean
  width?: string
  type?: 'string' | 'number' | 'date' | 'select'
  component?: any
  cellClass?: string
  format?: (value: any) => string
}

interface Props {
  data: any[]
  columns: Column[]
  title?: string
  itemKey?: string
  showSearch?: boolean
  showFilter?: booleanyo
  showPagination?: boolean
  showActions?: boolean
  showSelection?: boolean
  showExport?: boolean
  showRefresh?: boolean
  showAdd?: boolean
  showDetail?: boolean
  pageSize?: number
  initialSort?: { key: string; order: 'asc' | 'desc' }
}

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  title: 'Data Table',
  itemKey: 'id',
  showSearch: true,
  showFilter: true,
  showPagination: true,
  showActions: true,
  showSelection: false,
  showExport: true,
  showRefresh: true,
  showAdd: true,
  showDetail: true,
  pageSize: 10,
  initialSort: () => ({ key: '', order: 'asc' })
})

// Emits
const emit = defineEmits<{
  add: []
  edit: [item: any]
  delete: [item: any]
  view: [item: any]
  refresh: []
  export: [data: any[]]
  rowClick: [item: any, index: number]
  selectionChange: [selectedItems: any[]]
}>()

// Reactive State
const searchQuery = ref('')
const filters = ref<Record<string, string>>({})
const sortBy = ref(props.initialSort.key)
const sortOrder = ref<'asc' | 'desc'>(props.initialSort.order)
const currentPage = ref(1)
const pageSize = ref(props.pageSize)
const selectedItems = ref<any[]>([])
const selectedDetail = ref<any | null>(null)
const isRefreshing = ref(false)
const visibleColumns = ref([...props.columns])

// Computed Properties
const filterableColumns = computed(() =>
  props.columns.filter(col => col.filterable)
)

const detailColumns = computed(() => props.columns)

const activeFiltersCount = computed(() =>
  Object.values(filters.value).filter(value => value && value.trim()).length
)

const totalColumns = computed(() => {
  let count = visibleColumns.value.length
  if (props.showSelection) count++
  if (props.showActions) count++
  return count
})

// Data Processing
const filteredData = computed(() => {
  let result = [...props.data]

  // Global search
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(query)
      )
    )
  }

  // Column filters
  Object.entries(filters.value).forEach(([key, value]) => {
    if (value && value.trim()) {
      result = result.filter(item =>
        String(item[key]).toLowerCase().includes(value.toLowerCase())
      )
    }
  })

  return result
})

const sortedData = computed(() => {
  if (!sortBy.value) return filteredData.value

  return [...filteredData.value].sort((a, b) => {
    const aVal = a[sortBy.value]
    const bVal = b[sortBy.value]

    let comparison = 0
    if (aVal < bVal) comparison = -1
    if (aVal > bVal) comparison = 1

    return sortOrder.value === 'desc' ? -comparison : comparison
  })
})

const totalItems = computed(() => filteredData.value.length)
const totalPages = computed(() => Math.ceil(totalItems.value / pageSize.value))

const startIndex = computed(() => (currentPage.value - 1) * pageSize.value)
const endIndex = computed(() => Math.min(startIndex.value + pageSize.value, totalItems.value))

const paginatedData = computed(() =>
  sortedData.value.slice(startIndex.value, endIndex.value)
)

const visiblePageNumbers = computed(() => {
  const pages = []
  const maxVisible = 5
  let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages.value, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const isAllSelected = computed(() =>
  paginatedData.value.length > 0 &&
  paginatedData.value.every(item => selectedItems.value.includes(item[props.itemKey]))
)

// Methods
const handleSort = (key: string) => {
  if (sortBy.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortBy.value = key
    sortOrder.value = 'asc'
  }
}

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
  }
}

const handleRowClick = (item: any, index: number) => {
  if (props.showDetail) {
    selectedDetail.value = item
  }
  emit('rowClick', item, index)
}

const closeDetail = () => {
  selectedDetail.value = null
}

const toggleSelection = (itemId: any) => {
  const index = selectedItems.value.indexOf(itemId)
  if (index > -1) {
    selectedItems.value.splice(index, 1)
  } else {
    selectedItems.value.push(itemId)
  }
  emit('selectionChange', selectedItems.value)
}

const toggleAllSelection = (checked: boolean) => {
  if (checked) {
    selectedItems.value = paginatedData.value.map(item => item[props.itemKey])
  } else {
    selectedItems.value = []
  }
  emit('selectionChange', selectedItems.value)
}

const clearFilters = () => {
  filters.value = {}
  searchQuery.value = ''
  currentPage.value = 1
}

const resetTable = () => {
  clearFilters()
  sortBy.value = ''
  sortOrder.value = 'asc'
  selectedItems.value = []
  selectedDetail.value = null
}

const refreshData = async () => {
  isRefreshing.value = true
  emit('refresh')
  setTimeout(() => {
    isRefreshing.value = false
  }, 1000)
}

const exportData = () => {
  emit('export', sortedData.value)
}

const getUniqueValues = (key: string) => {
  return [...new Set(props.data.map(item => item[key]))]
    .filter(Boolean)
    .sort()
}

const formatCellValue = (value: any, column: Column) => {
  if (column.format) {
    return column.format(value)
  }

  if (column.type === 'date' && value) {
    return new Date(value).toLocaleDateString()
  }

  if (column.type === 'number' && typeof value === 'number') {
    return value.toLocaleString()
  }

  return value
}

const toggleColumnVisibility = () => {
  // Implementation for column visibility toggle
  console.log('Toggle column visibility')
}

// Watch for page size changes
watch(pageSize, () => {
  currentPage.value = 1
})

// Watch for data changes
watch(() => props.data, () => {
  currentPage.value = 1
  selectedItems.value = []
  selectedDetail.value = null
})
</script>

<style scoped>
.sakal-table-container {
  @apply min-h-0;
}

.table-wrapper {
  @apply overflow-auto;
}

/* Custom scrollbar */
.table-wrapper::-webkit-scrollbar {
  @apply h-2 w-2;
}

.table-wrapper::-webkit-scrollbar-track {
  @apply bg-gray-100 dark:bg-gray-800;
}

.table-wrapper::-webkit-scrollbar-thumb {
  @apply bg-gray-300 dark:bg-gray-600 rounded-full;
}

.table-wrapper::-webkit-scrollbar-thumb:hover {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>