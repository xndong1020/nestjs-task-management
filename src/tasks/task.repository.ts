import { PatchTaskDto } from './dto/patch-task.dto'
import { Repository, EntityRepository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { UpdateTaskDto } from './dto/update-task.dto'
import { FilterTaskDto } from './dto/filter-task.dto'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const { status, search } = filterTaskDto
    const query = this.createQueryBuilder('task')

    if (status) query.andWhere('task.status = :status', { status })
    if (search)
      query.andWhere(
        'task.title LIKE :search OR task.description LIKE :search ',
        { search: `%${search}%` },
      )
    const results = await query.getMany()
    return results
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new Task()
    newTask.title = createTaskDto.title
    newTask.description = createTaskDto.description
    newTask.status = TaskStatus.OPEN
    await newTask.save()
    return newTask
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const found = await this.findOne(id)
    found.title = updateTaskDto.title
    found.description = updateTaskDto.description
    found.status = updateTaskDto.status
    await found.save()
    return found
  }

  async patchTask(id: number, patchTaskDto: PatchTaskDto): Promise<Task> {
    const found = await this.findOne(id)
    const { key, value } = patchTaskDto
    found[key] = value
    await found.save()
    return found
  }
}
