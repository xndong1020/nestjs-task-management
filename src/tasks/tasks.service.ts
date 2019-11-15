import { Injectable, NotFoundException } from '@nestjs/common'
import { TaskStatus } from './task-status.enum'
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

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOne(id)
    if (!found) throw new NotFoundException(`Task id ${id} not found`)
    return found
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = await this.taskRepository.createTask(createTaskDto)
    return newTask
  }

  async deleteTask(id: number): Promise<void> {
    const found = await this.getTaskById(id)
    found.remove()
  }
}
