import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
 // Bật CORS để lát nữa Frontend có thể gọi API mà không bị chặn
  app.enableCors(); 

  // Thay vì fix cứng 3000, ta dùng process.env.PORT của Cloud.
  // Tham số '0.0.0.0' cực kỳ quan trọng để Docker cho phép truy cập từ bên ngoài.
  const port = process.env.PORT || 3000;
  await app.listen(port, '0.0.0.0');
  
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
