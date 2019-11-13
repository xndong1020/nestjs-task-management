import { TaskStatus } from '../task.model';

export class UpdateTaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
