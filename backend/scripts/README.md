# Hướng dẫn sử dụng script tạo dữ liệu mẫu

## Thông tin về script

File `seedData.js` được sử dụng để tạo dữ liệu mẫu cho ứng dụng web bán hàng. Script này sẽ tạo dữ liệu cho các bảng sau:

- Users (Người dùng)
- Categories (Danh mục sản phẩm)
- Products (Sản phẩm)
- Reviews (Đánh giá)
- Orders (Đơn hàng)
- Carts (Giỏ hàng)

## Cách sử dụng

1. Đảm bảo bạn đã cài đặt tất cả các gói phụ thuộc cần thiết:

   ```
   npm install
   ```

2. Tạo file `.env` trong thư mục backend với nội dung sau (nếu chưa có):

   ```
   MONGODB_URI=your_mongodb_connection_string
   ```

   Thay `your_mongodb_connection_string` bằng chuỗi kết nối MongoDB của bạn.

3. Chạy script tạo dữ liệu mẫu bằng lệnh:
   ```
   npm run seed
   ```

## Dữ liệu được tạo

### Người dùng

- Admin (email: admin@example.com, password: admin123)
- Người dùng thông thường (4 người dùng với password: user123)

### Danh mục

- Điện thoại
- Laptop
- Máy tính bảng
- Phụ kiện
- Đồng hồ thông minh

### Sản phẩm

- 10 sản phẩm thuộc 5 danh mục khác nhau

### Đánh giá

- 20 đánh giá ngẫu nhiên cho các sản phẩm

### Đơn hàng

- Mỗi người dùng (trừ admin) có 1-3 đơn hàng
- Mỗi đơn hàng có 1-3 sản phẩm

### Giỏ hàng

- Mỗi người dùng (trừ admin) có giỏ hàng với 0-3 sản phẩm

## Chú ý

- Script sẽ xóa toàn bộ dữ liệu hiện có trước khi tạo dữ liệu mới
- Chỉ sử dụng script này trong môi trường phát triển, không sử dụng trong môi trường production
