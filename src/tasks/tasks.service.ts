import * as uuid from 'uuid/v1';
import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { PatchTaskDto } from './dto/patch-task.dto';
import { FilterTaskDto } from './dto/filter-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  public getAllTasks(): Task[] {
    return this.tasks;
  }

  public getAllWithFilters(filterTaskDto: FilterTaskDto): Task[] {
    const { status, search } = filterTaskDto;
    let filtered = this.tasks;

    if (status) filtered = filtered.filter(task => task.status === status);
    if (search)
      filtered = filtered.filter(
        task =>
          task.title.includes(search) || task.description.includes(search),
      );

    return filtered;
  }

  public getTaskById(id: string): Task {
    const task = this.tasks.find(task => task.id === id);
    return task;
  }

  public createTask(createTaskDto: CreateTaskDto): Task {
    const newTask: Task = {
      id: uuid(),
      title: createTaskDto.title,
      description: createTaskDto.description,
      status: TaskStatus.OPEN,
    };
    this.tasks = [...this.tasks, newTask];
    return newTask;
  }

  public updateTask(updateTaskDto: UpdateTaskDto): Task {
    const targetIdx = this.tasks.findIndex(
      task => task.id === updateTaskDto.id,
    );
    if (targetIdx !== -1) this.tasks[targetIdx] = updateTaskDto;
    return updateTaskDto;
  }

  public patchTask(id: string, { key, value }: PatchTaskDto): Task {
    const targetIdx = this.tasks.findIndex(task => task.id === id);
    if (targetIdx !== -1) this.tasks[targetIdx][key] = value;
    return this.tasks[targetIdx];
  }

  public deleteTask(id: string): void {
    const targetIdx = this.tasks.findIndex(task => task.id === id);
    if (targetIdx !== -1) this.tasks.splice(targetIdx, 1);
  }
}
