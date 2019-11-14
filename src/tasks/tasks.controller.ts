import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Patch,
  Param,
  Body,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { Task } from './task.model'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { PatchTaskDto } from './dto/patch-task.dto'
import { FilterTaskDto } from './dto/filter-task.dto'
import { TaskStatusValidation } from '../pipelines/task-status-validation-pipeline'

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllWithFilters(@Query() filterTaskDto: FilterTaskDto): Task[] {
    if (!Object.keys(filterTaskDto).length)
      return this.tasksService.getAllTasks()
    return this.tasksService.getAllWithFilters(filterTaskDto)
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto)
  }

  @Put('/:id')
  updateTask(
    @Param('id') id: string,
    @Body(TaskStatusValidation) updateTaskDto: UpdateTaskDto,
  ): Task {
    return this.tasksService.updateTask(id, updateTaskDto)
  }

  @Patch('/:id')
  patchTask(
    @Param('id') id: string,
    @Body(TaskStatusValidation) patchTaskDto: PatchTaskDto,
  ): Task {
    return this.tasksService.patchTask(id, patchTaskDto)
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): void {
    return this.tasksService.deleteTask(id)
  }
}
