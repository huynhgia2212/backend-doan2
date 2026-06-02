# Dùng môi trường Node.js nhẹ nhất
FROM node:18-alpine

# Tạo thư mục làm việc trong container
WORKDIR /app

# Copy các file cấu hình thư viện vào trước
COPY package*.json ./

# Cài đặt thư viện
RUN npm install

# Copy toàn bộ code vào
COPY . .

# Build code TypeScript sang JavaScript
RUN npm run build

# Mở cổng 3000
EXPOSE 3000

# Lệnh khởi chạy server
CMD ["npm", "run", "start:prod"]