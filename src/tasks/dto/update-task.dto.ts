import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
