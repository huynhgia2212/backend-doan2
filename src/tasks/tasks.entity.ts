import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tasks') // Tên bảng trong database sẽ là 'tasks'
export class Task {
  @PrimaryGeneratedColumn() // Tự động tăng ID (1, 2, 3...)
  id!: number;

  @Column() // Cột lưu tiêu đề
  title!: string;

  @Column({ default: 'TODO' }) // Cột lưu trạng thái, mặc định là TODO
  status!: string;

  @Column({ nullable: true })
description!: string;
}