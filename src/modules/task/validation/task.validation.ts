import { Prisma } from '@prisma/client'
import { z } from 'zod'

const taskValidator = Prisma.validator<Prisma.TaskDefaultArgs>()({})
type Task = Prisma.TaskGetPayload<typeof taskValidator>

const taskWithRolesSelect = Prisma.validator<Prisma.TaskDefaultArgs>()({
  include: { roles: true },
})
type TaskWithRoles = Prisma.TaskGetPayload<typeof taskWithRolesSelect>

const taskFilterSelect = Prisma.validator<Prisma.TaskDefaultArgs>()({
  select: {
    title: true,
    code: true,
    priority: true,
    projectId: true,
    statusId: true,
  },
})
type TaskFilterType = Prisma.TaskGetPayload<typeof taskFilterSelect>

const getTaskByIdInputValidator = Prisma.validator<Prisma.TaskDefaultArgs>()({
  select: {
    id: true,
  },
})
type GetTaskByIdInput = Prisma.TaskGetPayload<typeof getTaskByIdInputValidator>

const createTaskInputValidator = Prisma.validator<Prisma.TaskDefaultArgs>()({
  select: {
    title: true,
    description: true,
    code: true,
    priority: true,
    isActive: true,
    dueDate: true,
    startDate: true,
    endDate: true,
    projectId: true,
    statusId: true,
    typeId: true,
    categoryId: true,
    assigneeId: true,
    reporterId: true,
    organizationMemberAssigneeId: true,
    organizationMemberReporterId: true,
  },
})
type CreateTaskInput = Prisma.TaskGetPayload<typeof createTaskInputValidator>

const updateTaskInputValidator = Prisma.validator<Prisma.TaskDefaultArgs>()({
  select: {
    id: true,
    title: true,
    description: true,
    code: true,
    priority: true,
    isActive: true,
    isArchived: true,
    dueDate: true,
    startDate: true,
    endDate: true,
    projectId: true,
    statusId: true,
    typeId: true,
    categoryId: true,
    assigneeId: true,
    reporterId: true,
    organizationMemberAssigneeId: true,
    organizationMemberReporterId: true,
  },
})
type UpdateTaskInput = Prisma.TaskGetPayload<typeof updateTaskInputValidator>

type GetTaskInput = {
  page?: number
  limit?: number
  search?: string
  filters?: TaskFilterType
}

type TaskWhereFilters = {
  total: number
  page: number
  limit: number
  items: TaskWithRoles[]
} | null

type GetTaskOutput = {
  message: string
  success?: boolean
  data: TaskWhereFilters
}

type GetTaskByIdOutput = {
  message: string
  success?: boolean
  data: TaskWithRoles | null
}

type CreateTaskOutput = {
  message: string
  success?: boolean
  data: TaskWithRoles | null
}

type UpdateTaskOutput = {
  message: string
  success?: boolean
  data: TaskWithRoles | null
}

type DeleteTaskOutput = {
  message: string
  success?: boolean
  data: { id: string } | null
}

const taskSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  code: z.string(),
  priority: z.number(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
  dueDate: z.date().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  projectId: z.string(),
  statusId: z.string().nullable(),
  typeId: z.string().nullable(),
  categoryId: z.string().nullable(),
  assigneeId: z.string().nullable(),
  reporterId: z.string().nullable(),
  organizationMemberAssigneeId: z.string().nullable(),
  organizationMemberReporterId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
}) satisfies z.ZodType<Task>

const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  code: z.string(),
  isSystem: z.boolean(),
  isActive: z.boolean(),
  isDefault: z.boolean(),
  level: z.number(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
})

const taskWithRolesSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  code: z.string(),
  priority: z.number(),
  isActive: z.boolean(),
  isArchived: z.boolean(),
  dueDate: z.date().nullable(),
  startDate: z.date().nullable(),
  endDate: z.date().nullable(),
  projectId: z.string(),
  statusId: z.string().nullable(),
  typeId: z.string().nullable(),
  categoryId: z.string().nullable(),
  assigneeId: z.string().nullable(),
  reporterId: z.string().nullable(),
  organizationMemberAssigneeId: z.string().nullable(),
  organizationMemberReporterId: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().nullable(),
  roles: z.array(roleSchema),
}) satisfies z.ZodType<TaskWithRoles>

const getTaskInputSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(10),
  search: z.string().optional(),
  filters: z
    .object({
      title: z.string().optional(),
      code: z.string().optional(),
      priority: z.number().optional(),
      projectId: z.string().optional(),
      statusId: z.string().nullable().optional(),
    })
    .optional(),
})

const getTaskByIdInputSchema = z.object({
  id: z.string(),
}) satisfies z.ZodType<GetTaskByIdInput>

const createTaskInputSchema = z.object({
  title: z.string().min(1),
  description: z.string().nullable().optional().default(null),
  code: z.string().min(1),
  priority: z.number().default(0),
  isActive: z.boolean().default(true),
  dueDate: z.date().nullable().optional().default(null),
  startDate: z.date().nullable().optional().default(null),
  endDate: z.date().nullable().optional().default(null),
  projectId: z.string(),
  statusId: z.string().nullable().optional().default(null),
  typeId: z.string().nullable().optional().default(null),
  categoryId: z.string().nullable().optional().default(null),
  assigneeId: z.string().nullable().optional().default(null),
  reporterId: z.string().nullable().optional().default(null),
  organizationMemberAssigneeId: z.string().nullable().optional().default(null),
  organizationMemberReporterId: z.string().nullable().optional().default(null),
})

const updateTaskInputSchema = z.object({
  id: z.string(),
  title: z.string().min(1).optional(),
  description: z.string().nullable().optional().default(null),
  code: z.string().min(1).optional(),
  priority: z.number().optional(),
  isActive: z.boolean().optional(),
  isArchived: z.boolean().optional(),
  dueDate: z.date().nullable().optional().default(null),
  startDate: z.date().nullable().optional().default(null),
  endDate: z.date().nullable().optional().default(null),
  projectId: z.string().optional(),
  statusId: z.string().nullable().optional().default(null),
  typeId: z.string().nullable().optional().default(null),
  categoryId: z.string().nullable().optional().default(null),
  assigneeId: z.string().nullable().optional().default(null),
  reporterId: z.string().nullable().optional().default(null),
  organizationMemberAssigneeId: z.string().nullable().optional().default(null),
  organizationMemberReporterId: z.string().nullable().optional().default(null),
})

const deleteTaskInputSchema = z.object({
  id: z.string(),
})

const taskFilterSchema = z.object({
  total: z.number(),
  page: z.number(),
  limit: z.number(),
  items: z.array(taskWithRolesSchema),
}) satisfies z.ZodType<TaskWhereFilters>

const getTaskOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: taskFilterSchema.nullable(),
}) satisfies z.ZodType<GetTaskOutput>

const getTaskByIdOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: taskWithRolesSchema.nullable(),
}) satisfies z.ZodType<GetTaskByIdOutput>

const createTaskOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: taskWithRolesSchema.nullable(),
}) satisfies z.ZodType<CreateTaskOutput>

const updateTaskOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: taskWithRolesSchema.nullable(),
}) satisfies z.ZodType<UpdateTaskOutput>

const deleteTaskOutputSchema = z.object({
  message: z.string(),
  success: z.boolean().default(true),
  data: z
    .object({
      id: z.string(),
    })
    .nullable(),
}) satisfies z.ZodType<DeleteTaskOutput>

export const taskValidators = {
  taskValidator,
  taskFilterSelect,
  taskWithRolesSelect,
  updateTaskInputValidator,
  createTaskInputValidator,
  getTaskByIdInputValidator,
}

export const taskValidations = {
  taskSchema,
  taskWithRolesSchema,
  getTaskInputSchema,
  getTaskOutputSchema,
  getTaskByIdInputSchema,
  getTaskByIdOutputSchema,
  createTaskInputSchema,
  createTaskOutputSchema,
  updateTaskInputSchema,
  updateTaskOutputSchema,
  deleteTaskInputSchema,
  deleteTaskOutputSchema,
}

export interface TaskTypes {
  Task: Task
  TaskWithRoles: TaskWithRoles
  TaskFilterType: TaskFilterType
  TaskWhereFilters: TaskWhereFilters
  GetTaskInput: GetTaskInput
  GetTaskOutput: GetTaskOutput
  GetTaskByIdInput: GetTaskByIdInput
  GetTaskByIdOutput: GetTaskByIdOutput
  CreateTaskInput: CreateTaskInput
  CreateTaskOutput: CreateTaskOutput
  UpdateTaskInput: UpdateTaskInput
  UpdateTaskOutput: UpdateTaskOutput
  DeleteTaskOutput: DeleteTaskOutput
}
