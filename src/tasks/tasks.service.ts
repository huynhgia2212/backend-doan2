import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './tasks.entity';

@Injectable()
export class TasksService {
  constructor(
    // Tiêm (Inject) công cụ giao tiếp với bảng Task vào Service
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  // 1. Lấy toàn bộ công việc từ Database
  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  // 2. Tạo công việc mới và lưu vào Database
  async createTask(title: string, status: string): Promise<Task> {
    const newTask = this.tasksRepository.create({ title, status });
    return this.tasksRepository.save(newTask); // Lưu xuống DB
  }

  // 3. Tìm 1 công việc theo ID
  async getTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Không tìm thấy công việc số ${id}`);
    }
    return task;
  }

  // 4. Xóa công việc khỏi Database
  async deleteTask(id: number) {
    const result = await this.tasksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Không tìm thấy công việc số ${id} để xóa`);
    }
    return { message: `Đã xóa thành công công việc số ${id}` };
  }

  // 5. Cập nhật trạng thái và lưu lại
  async updateTaskStatus(id: number, status: string): Promise<Task> {
    const task = await this.getTaskById(id); // Tận dụng hàm tìm ở trên
    task.status = status;
    return this.tasksRepository.save(task);
  }
}