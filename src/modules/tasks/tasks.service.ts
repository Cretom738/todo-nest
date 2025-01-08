import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/libs/services/prisma.service';
import { CreateTaskDto } from 'src/modules/tasks/dtos/create-task.dto';
import { UpdateTaskDto } from './dtos/update-task.dto';
import { ITasksService } from './tasks';
import { Task } from '.prisma/client';

@Injectable()
export class TasksService implements ITasksService {
  constructor(private readonly prisma: PrismaService) {}

  async createTask({
    title,
    description,
    status,
  }: CreateTaskDto): Promise<Partial<Task>> {
    return await this.prisma.task.create({
      data: {
        title,
        description,
        status,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  async findAllTasks(): Promise<Partial<Task>[]> {
    return await this.prisma.task.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  async findTaskById(id: number): Promise<Partial<Task>> {
    return await this.prisma.task.findUniqueOrThrow({
      where: { id },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  async updateTask(
    id: number,
    { title, description, status }: UpdateTaskDto,
  ): Promise<Partial<Task>> {
    return await this.prisma.task.update({
      where: { id },
      data: {
        title,
        description,
        status,
      },
      select: {
        id: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  async deleteTask(id: number): Promise<void> {
    await this.prisma.task.delete({
      where: { id },
    });
  }
}
