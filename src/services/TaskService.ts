import { PrismaClient, Task } from "@prisma/client";

export const prisma = new PrismaClient();

export class TaskService {
  // C - Create

  async createTask(title: string, description: string): Promise<Task> {
    const newTask = await prisma.task.create({
      data: {
        title,
        description,
      },
    });
    return newTask;
  }

  // R - Read (All)

  async getAllTasks(): Promise<Task[]> {
    return await prisma.task.findMany();
  }

  // R - Read (By ID)
  async getTaskById(id: number): Promise<Task | null> {
    return await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
  }

  // U - Update

  async updateTask(
    id: number,
    title: string,
    description: string,
    completed: boolean
  ): Promise<Task | null> {
    try {
      return await prisma.task.update({
        where: { id: id },
        data: {
          title,
          description,
          completed,
        },
      });
    } catch (error) {
      return null; // Tarefa não encontrada ou erro na atualização
    }
  }

  // D - Delete

  async deleteTask(id: number): Promise<boolean> {
    try {
      await prisma.task.delete({
        where: { id: id },
      });
      return true;
    } catch (error) {
      return false; // Tarefa não encontrada ou erro na exclusão
    }
  }
}
