import { PatchTaskDto } from './dto/patch-task.dto'
import { Repository, EntityRepository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'
import { UpdateTaskDto } from './dto/update-task.dto'

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
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
