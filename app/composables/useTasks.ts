import { ref, computed } from 'vue'

export interface Task {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee?: {
    name: string
    email: string
    avatar?: string
  }
  dueDate?: Date
  createdAt: Date
  updatedAt: Date
  tags?: string[]
}

export const useTasks = () => {
  const tasks = ref<Task[]>([
    {
      id: '1',
      title: 'Complete project documentation',
      description: 'Write comprehensive documentation for the new API endpoints',
      status: 'in-progress',
      priority: 'high',
      assignee: {
        name: 'Olivia Martin',
        email: 'olivia.martin@email.com',
        avatar: 'OM'
      },
      dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      tags: ['documentation', 'api']
    },
    {
      id: '2',
      title: 'Fix authentication bug',
      description: 'Users are getting logged out randomly',
      status: 'in-progress',
      priority: 'urgent',
      assignee: {
        name: 'Jackson Lee',
        email: 'jackson.lee@email.com',
        avatar: 'JL'
      },
      dueDate: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      tags: ['bug', 'auth']
    },
    {
      id: '3',
      title: 'Design new dashboard layout',
      description: 'Create mockups for the updated dashboard',
      status: 'pending',
      priority: 'medium',
      assignee: {
        name: 'Isabella Nguyen',
        email: 'isabella.nguyen@email.com',
        avatar: 'IN'
      },
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      tags: ['design', 'ui']
    },
    {
      id: '4',
      title: 'Database optimization',
      description: 'Optimize slow queries in production',
      status: 'completed',
      priority: 'high',
      assignee: {
        name: 'William Kim',
        email: 'will@email.com',
        avatar: 'WK'
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      tags: ['backend', 'performance']
    },
    {
      id: '5',
      title: 'Implement search functionality',
      description: 'Add search feature to the product catalog',
      status: 'in-progress',
      priority: 'medium',
      assignee: {
        name: 'Sofia Davis',
        email: 'sofia.davis@email.com',
        avatar: 'SD'
      },
      dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      updatedAt: new Date(),
      tags: ['feature', 'search']
    }
  ])

  const taskStats = computed(() => {
    const total = tasks.value.length
    const completed = tasks.value.filter(t => t.status === 'completed').length
    const inProgress = tasks.value.filter(t => t.status === 'in-progress').length
    const pending = tasks.value.filter(t => t.status === 'pending').length
    const urgent = tasks.value.filter(t => t.priority === 'urgent').length

    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0
    const productivityChange = 12.5 // Mock data - in real app, calculate from historical data

    return {
      total,
      completed,
      inProgress,
      pending,
      urgent,
      completionRate,
      productivityChange
    }
  })

  const recentTasks = computed(() => {
    return [...tasks.value]
      .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
      .slice(0, 5)
  })

  const upcomingTasks = computed(() => {
    return tasks.value
      .filter(t => t.dueDate && t.status !== 'completed')
      .sort((a, b) => (a.dueDate?.getTime() || 0) - (b.dueDate?.getTime() || 0))
      .slice(0, 5)
  })

  return {
    tasks,
    taskStats,
    recentTasks,
    upcomingTasks
  }
}