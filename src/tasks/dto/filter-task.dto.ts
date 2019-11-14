import { TaskStatus } from '../task.model'
import { IsOptional, IsIn, IsNotEmpty } from 'class-validator'

export class FilterTaskDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.IN_PROGRESS, TaskStatus.DONE])
  status: string

  @IsOptional()
  @IsNotEmpty()
  search: string
}
