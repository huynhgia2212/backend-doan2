import { Body, Controller, Get, Post, Param, Delete, Patch} from '@nestjs/common';
import { TasksService } from './tasks.service';

// Đường dẫn tổng của cụm này sẽ là: http://localhost:3000/tasks
@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // Xử lý request GET: Lấy toàn bộ task
  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  // Xử lý request POST: Tạo task mới
  @Post()
  createTask(@Body() body: { title: string; status: string }) {
    return this.tasksService.createTask(body.title, body.status);
  }

  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.tasksService.getTaskById(Number(id));
  }

  // API Xóa công việc
  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    // Chuyển id từ chuỗi (string) sang số (number) vì URL luôn gửi dạng chuỗi
    return this.tasksService.deleteTask(Number(id));
  }

  // API Cập nhật trạng thái công việc (dùng Patch thay vì Put vì ta chỉ sửa 1 phần dữ liệu)
  @Patch(':id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: string,
  ) {
    return this.tasksService.updateTaskStatus(Number(id), status);
  }
}