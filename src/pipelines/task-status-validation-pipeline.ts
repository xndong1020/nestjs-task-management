import { UpdateTaskDto } from './../tasks/dto/update-task.dto'
import { TaskStatus } from '../tasks/task.model'
import { PatchTaskDto } from '../tasks/dto/patch-task.dto'
import {
  ArgumentMetadata,
  PipeTransform,
  BadRequestException,
  Injectable,
} from '@nestjs/common'
import { plainToClass } from 'class-transformer'

@Injectable()
export class TaskStatusValidation implements PipeTransform {
  private static readonly allowedStatuses = [
    TaskStatus.OPEN,
    TaskStatus.IN_PROGRESS,
    TaskStatus.DONE,
  ]

  transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata
    if (!metatype) return value
    const convertedValue = plainToClass(metadata.metatype, value)

    // for PatchTaskDto, if the key is 'status', to check the value is in allowedStatuses
    if (
      convertedValue instanceof PatchTaskDto &&
      convertedValue.key === 'status'
    ) {
      const dto = convertedValue as PatchTaskDto
      if (!TaskStatusValidation.allowedStatuses.includes(dto.value))
        throw new BadRequestException()
    }

    // for UpdateTaskDto
    if (convertedValue instanceof UpdateTaskDto) {
      const dto = convertedValue as UpdateTaskDto
      if (!TaskStatusValidation.allowedStatuses.includes(dto.status))
        throw new BadRequestException()
    }

    return value
  }
}
