<template>
  <div class="w-full space-y-4">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
      <!-- Search -->
      <div class="relative flex-1 max-w-sm">
        <Search class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          v-model="searchQuery"
          placeholder="Search tasks..."
          class="pl-10"
        />
      </div>

      <!-- Filters -->
      <div class="flex items-center gap-2">
        <!-- Status Filter -->
        <div class="relative">
          <Button 
            variant="outline" 
            class="border-dashed" 
            @click="showStatusFilter = !showStatusFilter"
          >
            <Filter class="mr-2 h-4 w-4" />
            Status
            <Badge v-if="selectedStatuses.length > 0" class="ml-2 rounded-full px-1 text-xs">
              {{ selectedStatuses.length }}
            </Badge>
          </Button>
          <div 
            v-if="showStatusFilter" 
            class="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10"
          >
            <div class="p-3">
              <h4 class="text-sm font-medium mb-2">Filter by Status</h4>
              <div class="space-y-2">
                <div 
                  v-for="status in uniqueStatuses" 
                  :key="status"
                  class="flex items-center space-x-2"
                >
                  <input 
                    :id="status"
                    type="checkbox"
                    :checked="selectedStatuses.includes(status)"
                    @change="toggleStatusFilter(status)"
                    class="w-4 h-4"
                  />
                  <label :for="status" class="text-sm font-normal">{{ status }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Priority Filter -->
        <div class="relative">
          <Button 
            variant="outline" 
            class="border-dashed" 
            @click="showPriorityFilter = !showPriorityFilter"
          >
            <Filter class="mr-2 h-4 w-4" />
            Priority
            <Badge v-if="selectedPriorities.length > 0" class="ml-2 rounded-full px-1 text-xs">
              {{ selectedPriorities.length }}
            </Badge>
          </Button>
          <div 
            v-if="showPriorityFilter" 
            class="absolute top-full left-0 mt-1 w-48 bg-white border rounded-md shadow-lg z-10"
          >
            <div class="p-3">
              <h4 class="text-sm font-medium mb-2">Filter by Priority</h4>
              <div class="space-y-2">
                <div 
                  v-for="priority in uniquePriorities" 
                  :key="priority"
                  class="flex items-center space-x-2"
                >
                  <input 
                    :id="priority"
                    type="checkbox"
                    :checked="selectedPriorities.includes(priority)"
                    @change="togglePriorityFilter(priority)"
                    class="w-4 h-4"
                  />
                  <label :for="priority" class="text-sm font-normal">{{ priority }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Clear Filters -->
        <Button 
          v-if="hasActiveFilters"
          @click="clearFilters" 
          variant="ghost" 
          size="sm"
        >
          <X class="mr-1 h-3 w-3" />
          Clear
        </Button>
      </div>
    </div>

    <!-- Selection Info -->
    <div v-if="selectedRows.length > 0" class="flex items-center gap-2 text-sm text-muted-foreground">
      <span>{{ selectedRows.length }} row{{ selectedRows.length > 1 ? 's' : '' }} selected</span>
      <Button @click="clearSelection" variant="ghost" size="sm">
        Clear selection
      </Button>
    </div>

    <!-- Table -->
    <div class="border rounded-lg overflow-hidden">
      <div class="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow class="hover:bg-transparent">
              <!-- Select All Checkbox -->
              <TableHead class="w-12">
                <input
                  type="checkbox"
                  :checked="isAllSelected"
                  :indeterminate="isPartiallySelected"
                  @change="toggleSelectAll(($event.target as HTMLInputElement).checked)"
                  class="w-4 h-4"
                />
              </TableHead>

              <!-- Dynamic Columns -->
              <TableHead
                v-for="column in columns"
                :key="column.key"
                :class="[
                  'font-medium',
                  column.sortable ? 'cursor-pointer select-none hover:bg-accent' : '',
                  column.align === 'center' ? 'text-center' : '',
                  column.align === 'right' ? 'text-right' : ''
                ]"
                @click="column.sortable ? handleSort(column.key) : undefined"
              >
                <div class="flex items-center gap-1">
                  <span>{{ column.label }}</span>
                  <div v-if="column.sortable" class="flex flex-col">
                    <ChevronUp 
                      :class="[
                        'h-3 w-3 -mb-1 transition-colors',
                        sortField === column.key && sortDirection === 'asc' 
                          ? 'text-foreground' 
                          : 'text-muted-foreground'
                      ]"
                    />
                    <ChevronDown 
                      :class="[
                        'h-3 w-3 transition-colors',
                        sortField === column.key && sortDirection === 'desc' 
                          ? 'text-foreground' 
                          : 'text-muted-foreground'
                      ]"
                    />
                  </div>
                </div>
              </TableHead>

              <!-- Actions Column -->
              <TableHead class="w-12">
                <span class="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            <!-- Loading State -->
            <template v-if="loading">
              <TableRow v-for="n in rowsPerPage" :key="`skeleton-${n}`">
                <TableCell>
                  <Skeleton class="h-4 w-4" />
                </TableCell>
                <TableCell v-for="column in columns" :key="column.key">
                  <Skeleton class="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton class="h-4 w-4" />
                </TableCell>
              </TableRow>
            </template>

            <!-- Data Rows -->
            <template v-else>
              <TableRow 
                v-for="row in paginatedRows" 
                :key="getRowId(row)"
                :class="[
                  'cursor-pointer hover:bg-muted/50',
                  selectedRows.includes(getRowId(row)) ? 'bg-muted' : ''
                ]"
                @click="toggleRowSelection(getRowId(row))"
              >
                <!-- Row Selection -->
                <TableCell @click.stop>
                  <input
                    type="checkbox"
                    :checked="selectedRows.includes(getRowId(row))"
                    @change="toggleRowSelection(getRowId(row))"
                    class="w-4 h-4"
                  />
                </TableCell>

                <!-- Dynamic Cells -->
                <TableCell
                  v-for="column in columns"
                  :key="column.key"
                  :class="[
                    column.align === 'center' ? 'text-center' : '',
                    column.align === 'right' ? 'text-right' : ''
                  ]"
                >
                  <!-- Custom Cell Content -->
                  <div v-if="column.key === 'title'" class="flex items-center gap-2">
                    <Badge
                      class="text-xs"
                    >
                      {{ row.type }}
                    </Badge>
                    <span class="font-medium">{{ row[column.key] }}</span>
                  </div>

                  <!-- Status Cell -->
                  <div v-else-if="column.key === 'status'" class="flex items-center gap-2">
                    <div 
                      :class="[
                        'h-2 w-2 rounded-full',
                        statusColors[row[column.key]] || 'bg-gray-400'
                      ]"
                    />
                    <span>{{ row[column.key] }}</span>
                  </div>

                  <!-- Priority Cell -->
                  <div v-else-if="column.key === 'priority'" class="flex items-center gap-2">
                    <component
                      :is="priorityIcons[row[column.key]]?.icon || ArrowUp"
                      :class="[
                        'h-4 w-4',
                        priorityIcons[row[column.key]]?.color || 'text-gray-400'
                      ]"
                    />
                    <span>{{ row[column.key] }}</span>
                  </div>

                  <!-- Default Cell -->
                  <span v-else>{{ row[column.key] }}</span>
                </TableCell>

                <!-- Actions -->
                <TableCell @click.stop>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" class="h-8 w-8 p-0">
                        <span class="sr-only">Open menu</span>
                        <MoreHorizontal class="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem @click="$emit('view', row)">
                        <Eye class="mr-2 h-4 w-4" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem @click="$emit('edit', row)">
                        <Edit class="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        @click="$emit('delete', row)"
                        class="text-destructive"
                      >
                        <Trash2 class="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>

              <!-- Empty State -->
              <TableRow v-if="paginatedRows.length === 0 && !loading">
                <TableCell :colspan="columns.length + 2" class="h-24 text-center">
                  <div class="flex flex-col items-center gap-2">
                    <Search class="h-8 w-8 text-muted-foreground" />
                    <span class="text-muted-foreground">No results found.</span>
                  </div>
                </TableCell>
              </TableRow>
            </template>
          </TableBody>
        </Table>
      </div>
    </div>

    <!-- Pagination -->
    <div v-if="totalRows > rowsPerPage" class="flex items-center justify-between">
      <div class="text-sm text-muted-foreground">
        Showing {{ startIndex + 1 }} to {{ Math.min(endIndex, totalRows) }} of {{ totalRows }} results
      </div>
      
      <div class="flex items-center space-x-6 lg:space-x-8">
        <div class="flex items-center space-x-2">
          <p class="text-sm font-medium">Rows per page</p>
          <select 
            :value="rowsPerPage" 
            @change="handleRowsPerPageChange(($event.target as HTMLSelectElement).value)"
            class="h-8 w-[70px] border rounded px-2 text-sm"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
            <option value="50">50</option>
          </select>
        </div>
        
        <div class="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            class="h-8 w-8 p-0"
            :disabled="page <= 1"
            @click="handlePageChange(page - 1)"
          >
            <span class="sr-only">Go to previous page</span>
            <ChevronLeft class="h-4 w-4" />
          </Button>
          
          <div class="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {{ page }} of {{ totalPages }}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            class="h-8 w-8 p-0"
            :disabled="page >= totalPages"
            @click="handlePageChange(page + 1)"
          >
            <span class="sr-only">Go to next page</span>
            <ChevronRight class="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { Badge } from '~/components/ui/badge'
import { Skeleton } from '~/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu'

import {
  Search,
  Filter,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  ArrowUp,
  X,
} from 'lucide-vue-next'

// Types
interface Column {
  key: string
  label: string
  sortable?: boolean
  align?: 'left' | 'center' | 'right'
}

interface StatusColors {
  [key: string]: string
}

interface PriorityIcon {
  icon: any
  color: string
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

// Props with defaults
const props = withDefaults(defineProps<Props>(), {
  statusColors: () => ({}),
  priorityIcons: () => ({}),
  loading: false,
})

// Emits
const emit = defineEmits<{
  pageChange: [page: number]
  rowsPerPageChange: [rowsPerPage: number]
  view: [row: any]
  edit: [row: any]
  delete: [row: any]
}>()

// Reactive state
const searchQuery = ref('')
const selectedStatuses = ref<string[]>([])
const selectedPriorities = ref<string[]>([])
const selectedRows = ref<(string | number)[]>([])
const sortField = ref<string>('')
const sortDirection = ref<'asc' | 'desc'>('asc')
const showStatusFilter = ref(false)
const showPriorityFilter = ref(false)

// Computed properties
const uniqueStatuses = computed(() => {
  const statuses = new Set<string>()
  props.rows.forEach(row => {
    if (row.status) statuses.add(row.status)
  })
  return Array.from(statuses).sort()
})

const uniquePriorities = computed(() => {
  const priorities = new Set<string>()
  props.rows.forEach(row => {
    if (row.priority) priorities.add(row.priority)
  })
  return Array.from(priorities).sort()
})

const hasActiveFilters = computed(() => 
  searchQuery.value.length > 0 || 
  selectedStatuses.value.length > 0 || 
  selectedPriorities.value.length > 0
)

const filteredRows = computed(() => {
  let filtered = [...props.rows]

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    filtered = filtered.filter(row =>
      Object.values(row).some(value =>
        String(value).toLowerCase().includes(query)
      )
    )
  }

  // Status filter
  if (selectedStatuses.value.length > 0) {
    filtered = filtered.filter(row => 
      selectedStatuses.value.includes(row.status)
    )
  }

  // Priority filter
  if (selectedPriorities.value.length > 0) {
    filtered = filtered.filter(row => 
      selectedPriorities.value.includes(row.priority)
    )
  }

  return filtered
})

const sortedRows = computed(() => {
  if (!sortField.value) return filteredRows.value

  return [...filteredRows.value].sort((a, b) => {
    const aVal = a[sortField.value]
    const bVal = b[sortField.value]

    let comparison = 0
    if (aVal < bVal) comparison = -1
    if (aVal > bVal) comparison = 1

    return sortDirection.value === 'desc' ? -comparison : comparison
  })
})

const paginatedRows = computed(() => {
  const start = (props.page - 1) * props.rowsPerPage
  const end = start + props.rowsPerPage
  return sortedRows.value.slice(start, end)
})

const totalPages = computed(() => 
  Math.ceil(filteredRows.value.length / props.rowsPerPage)
)

const startIndex = computed(() => 
  (props.page - 1) * props.rowsPerPage
)

const endIndex = computed(() => 
  Math.min(startIndex.value + props.rowsPerPage, filteredRows.value.length)
)

const isAllSelected = computed(() => 
  paginatedRows.value.length > 0 && 
  paginatedRows.value.every(row => selectedRows.value.includes(getRowId(row)))
)

const isPartiallySelected = computed(() => 
  selectedRows.value.length > 0 && !isAllSelected.value
)

// Methods
const getRowId = (row: any): string | number => {
  return row.id || row.task || JSON.stringify(row)
}


const handleSort = (field: string) => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortField.value = field
    sortDirection.value = 'asc'
  }
}

const handlePageChange = (newPage: number) => {
  emit('pageChange', newPage)
}

const handleRowsPerPageChange = (value: string) => {
  emit('rowsPerPageChange', parseInt(value))
}

const toggleStatusFilter = (status: string) => {
  const index = selectedStatuses.value.indexOf(status)
  if (index > -1) {
    selectedStatuses.value.splice(index, 1)
  } else {
    selectedStatuses.value.push(status)
  }
}

const togglePriorityFilter = (priority: string) => {
  const index = selectedPriorities.value.indexOf(priority)
  if (index > -1) {
    selectedPriorities.value.splice(index, 1)
  } else {
    selectedPriorities.value.push(priority)
  }
}

const clearFilters = () => {
  searchQuery.value = ''
  selectedStatuses.value = []
  selectedPriorities.value = []
}

const toggleRowSelection = (rowId: string | number) => {
  const index = selectedRows.value.indexOf(rowId)
  if (index > -1) {
    selectedRows.value.splice(index, 1)
  } else {
    selectedRows.value.push(rowId)
  }
}

const toggleSelectAll = (checked: boolean) => {
  if (checked) {
    selectedRows.value = paginatedRows.value.map(row => getRowId(row))
  } else {
    selectedRows.value = []
  }
}

const clearSelection = () => {
  selectedRows.value = []
}

// Watch for page changes to clear selection
watch(() => props.page, () => {
  selectedRows.value = []
})
</script>