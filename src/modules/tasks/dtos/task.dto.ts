import { ApiProperty } from '@nestjs/swagger';
import { CreateTaskDto } from './create-task.dto';

export class TaskDto extends CreateTaskDto {
  @ApiProperty()
  id: number;
}
