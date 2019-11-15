import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { PatchTaskDto } from './dto/patch-task.dto'
import { FilterTaskDto } from './dto/filter-task.dto'
import { TaskRepository } from './task.repository'
import { InjectRepository } from '@nestjs/typeorm'
import { Task } from './task.entity'

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository) private taskRepository: TaskRepository,
  ) {}

  async getTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const result = await this.taskRepository.getTasks(filterTaskDto)
    return result
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)
    if (!found) throw new NotFoundException(`Task id ${id} not found`)
    return found
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.taskRepository.createTask(createTaskDto)
    return newTask
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const found = await this.taskRepository.updateTask(id, updateTaskDto)
    return found
  }

  async patchTask(id: number, patchTaskDto: PatchTaskDto): Promise<Task> {
    const found = await this.taskRepository.patchTask(id, patchTaskDto)
    return found
  }

  async deleteTask(id: number): Promise<void> {
    // const found = await this.getTaskById(id)
    // found.remove()
    const result = await this.taskRepository.delete(id)
    if (result.affected === 0)
      throw new NotFoundException(`Task id ${id} not found`)
  }
}
