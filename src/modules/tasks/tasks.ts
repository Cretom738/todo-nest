import { CreateTaskDto } from "src/modules/tasks/dtos/create-task.dto";
import { Task } from '.prisma/client';
import { UpdateTaskDto } from "./dtos/update-task.dto";

export interface ITasksService {

    createTask(data: CreateTaskDto): Promise<Partial<Task>>;

    findAllTasks(): Promise<Partial<Task>[]>;

    findTaskById(id: number): Promise<Partial<Task>>;

    updateTask(id: number, data: UpdateTaskDto): Promise<Partial<Task>>;

    deleteTask(id: number): Promise<void>;
}