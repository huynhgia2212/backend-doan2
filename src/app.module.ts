import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    // 1. Đọc dữ liệu từ file .env
    ConfigModule.forRoot(),
    
    // 2. Cấu hình kết nối PostgreSQL
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL, // Lấy link từ két sắt
      autoLoadEntities: true,
      synchronize: true, // Tính năng tự động tạo bảng dữ liệu (cực kỳ hữu ích khi Dev)
      ssl: {
        rejectUnauthorized: false, // Render bắt buộc phải có dòng này để cho phép kết nối từ bên ngoài
      },
    }),
    
    TasksModule,
  ],
})
export class AppModule {}