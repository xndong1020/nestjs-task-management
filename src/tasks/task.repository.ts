import { Repository, EntityRepository } from 'typeorm'
import { Task } from './task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { TaskStatus } from './task-status.enum'

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
}
