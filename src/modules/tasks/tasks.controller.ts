import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateTaskDto } from 'src/modules/tasks/dtos/create-task.dto';
import { TasksService } from './tasks.service';
import { UpdateTaskDto } from './dtos/update-task.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { TaskDto } from './dtos/task.dto';
import { BadRequestDto } from 'src/libs/dtos/bad-request.dto';
import { CommonErrorDto } from 'src/libs/dtos/common-error.dto';

@Controller('tasks')
@ApiTags('Tasks')
export class TasksController {
  constructor(private readonly taskService: TasksService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'Create new task',
    type: TaskDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestDto,
  })
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get()
  @ApiOkResponse({
    description: 'Gets list of tasks',
    type: TaskDto,
    isArray: true,
  })
  async findAllTasks() {
    return await this.taskService.findAllTasks();
  }

  @Get(':id')
  @ApiOkResponse({
    description: 'Gets task by id',
    type: TaskDto,
  })
  @ApiBadRequestResponse({
    description: 'Id validation error',
    type: CommonErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: CommonErrorDto,
  })
  async findTaskById(@Param('id', ParseIntPipe) id: number) {
    return await this.taskService.findTaskById(id);
  }

  @Patch(':id')
  @ApiOkResponse({
    description: 'Updates task by id',
    type: TaskDto,
  })
  @ApiBadRequestResponse({
    description: 'Validation error',
    type: BadRequestDto,
  })
  @ApiBadRequestResponse({
    description: 'Id validation error',
    type: CommonErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: CommonErrorDto,
  })
  async updateTask(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return await this.taskService.updateTask(id, updateTaskDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiNoContentResponse({
    description: 'Deletes task by id',
  })
  @ApiBadRequestResponse({
    description: 'Id validation error',
    type: CommonErrorDto,
  })
  @ApiNotFoundResponse({
    description: 'Not found',
    type: CommonErrorDto,
  })
  async deleteTask(@Param('id', ParseIntPipe) id: number) {
    await this.taskService.deleteTask(id);
  }
}
