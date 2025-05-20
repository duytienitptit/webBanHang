const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
const User = require('../models/User')
const Category = require('../models/Category')
const Product = require('../models/Product')
const Review = require('../models/Review')
const Order = require('../models/Order')
const Cart = require('../models/Cart')
const connectDB = require('../config/db')

// Cấu hình biến môi trường
dotenv.config()

// Kết nối đến cơ sở dữ liệu
connectDB()

// Xóa dữ liệu cũ
const clearData = async () => {
  try {
    await User.deleteMany({})
    await Category.deleteMany({})
    await Product.deleteMany({})
    await Review.deleteMany({})
    await Order.deleteMany({})
    await Cart.deleteMany({})
    console.log('Đã xóa dữ liệu cũ thành công')
  } catch (error) {
    console.error('Lỗi khi xóa dữ liệu cũ:', error)
    process.exit(1)
  }
}

// Tạo dữ liệu người dùng
const createUsers = async () => {
  try {
    const adminPassword = await bcrypt.hash('admin123', 10)
    const userPassword = await bcrypt.hash('user123', 10)

    const users = [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        role: 'admin'
      },
      {
        name: 'Nguyễn Văn A',
        email: 'nguyenvana@example.com',
        password: userPassword,
        role: 'user'
      },
      {
        name: 'Trần Thị B',
        email: 'tranthib@example.com',
        password: userPassword,
        role: 'user'
      },
      {
        name: 'Lê Văn C',
        email: 'levanc@example.com',
        password: userPassword,
        role: 'user'
      },
      {
        name: 'Phạm Thị D',
        email: 'phamthid@example.com',
        password: userPassword,
        role: 'user'
      }
    ]

    const createdUsers = await User.insertMany(users)
    console.log('Đã tạo người dùng thành công')
    return createdUsers
  } catch (error) {
    console.error('Lỗi khi tạo người dùng:', error)
    process.exit(1)
  }
}

// Tạo dữ liệu danh mục
const createCategories = async () => {
  try {
    const categories = [
      {
        name: 'Điện thoại',
        description: 'Các loại điện thoại di động'
      },
      {
        name: 'Laptop',
        description: 'Máy tính xách tay các loại'
      },
      {
        name: 'Máy tính bảng',
        description: 'Các loại máy tính bảng'
      },
      {
        name: 'Phụ kiện',
        description: 'Phụ kiện điện tử'
      },
      {
        name: 'Đồng hồ thông minh',
        description: 'Đồng hồ thông minh các loại'
      }
    ]

    const createdCategories = await Category.insertMany(categories)
    console.log('Đã tạo danh mục thành công')
    return createdCategories
  } catch (error) {
    console.error('Lỗi khi tạo danh mục:', error)
    process.exit(1)
  }
}

// Tạo dữ liệu sản phẩm
const createProducts = async categories => {
  try {
    // Tìm danh mục theo tên để lấy id
    const getCategory = name => {
      return categories.find(c => c.name === name)._id
    }

    const products = [
      // Điện thoại - 12 sản phẩm
      {
        name: 'iPhone 15',
        price: 22990000,
        description: 'Chip A16 Bionic, camera 48MP, USB-C, màn hình 6.1 inch',
        category: getCategory('Điện thoại'),
        stock: 45,
        image:
          'https://images.unsplash.com/photo-1591337676887-a217a6970a8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Samsung Galaxy S23 Ultra',
        price: 24990000,
        description: 'Điện thoại cao cấp với camera 200MP, màn hình Dynamic AMOLED 2X',
        category: getCategory('Điện thoại'),
        stock: 50,
        image:
          'https://images.unsplash.com/photo-1668606450886-4564d6ef5a61?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'iPhone 15 Pro Max',
        price: 33990000,
        description: 'Chip A17 Pro, camera 48MP, màn hình Super Retina XDR',
        category: getCategory('Điện thoại'),
        stock: 30,
        image:
          'https://images.unsplash.com/photo-1695048133142-1a20484bce71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Xiaomi 14 Ultra',
        price: 21990000,
        description: 'Camera Leica 50MP, màn hình AMOLED 6.73 inch, pin 5000mAh',
        category: getCategory('Điện thoại'),
        stock: 40,
        image:
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Google Pixel 8 Pro',
        price: 22990000,
        description: 'Camera AI 50MP, màn hình 120Hz, chip Google Tensor G3',
        category: getCategory('Điện thoại'),
        stock: 35,
        image:
          'https://images.unsplash.com/photo-1683035005040-9bd12656e296?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'OPPO Find X7 Ultra',
        price: 19990000,
        description: 'Camera periscope 50MP, màn hình AMOLED 6.78 inch, sạc siêu nhanh 100W',
        category: getCategory('Điện thoại'),
        stock: 30,
        image:
          'https://images.unsplash.com/photo-1583573636246-18cf414eee24?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Samsung Galaxy A54',
        price: 9990000,
        description: 'Camera 50MP, màn hình Super AMOLED 120Hz, pin 5000mAh',
        category: getCategory('Điện thoại'),
        stock: 60,
        image:
          'https://images.unsplash.com/photo-1564156280315-1d42b4651629?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Xiaomi Redmi Note 13 Pro',
        price: 7990000,
        description: 'Camera 200MP, màn hình AMOLED 120Hz, sạc nhanh 67W',
        category: getCategory('Điện thoại'),
        stock: 70,
        image:
          'https://images.unsplash.com/photo-1545127398-14699f92334b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Realme GT 5 Pro',
        price: 14990000,
        description: 'Snapdragon 8 Gen 3, màn hình 144Hz, sạc nhanh 100W',
        category: getCategory('Điện thoại'),
        stock: 40,
        image:
          'https://images.unsplash.com/photo-1536849460588-696219a9e99d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Vivo X100 Pro',
        price: 18990000,
        description: 'Camera ZEISS 50MP, màn hình AMOLED 120Hz, MediaTek Dimensity 9300',
        category: getCategory('Điện thoại'),
        stock: 35,
        image:
          'https://images.unsplash.com/photo-1529688530647-93a6e1916f5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'OnePlus 12',
        price: 17990000,
        description: 'Snapdragon 8 Gen 3, màn hình LTPO 120Hz, sạc 100W',
        category: getCategory('Điện thoại'),
        stock: 30,
        image:
          'https://images.unsplash.com/photo-1557312311-5a037d525da4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Nothing Phone 2',
        price: 15990000,
        description: 'Giao diện Glyph độc đáo, Snapdragon 8+ Gen 1, màn hình OLED 120Hz',
        category: getCategory('Điện thoại'),
        stock: 25,
        image:
          'https://images.unsplash.com/photo-1598124146163-36819847286d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },

      // Laptop - 12 sản phẩm
      {
        name: 'Dell XPS 13',
        price: 32990000,
        description: 'Laptop mỏng nhẹ với màn hình 13.4 inch, chip Intel Core i7',
        category: getCategory('Laptop'),
        stock: 20,
        image:
          'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'MacBook Pro 14',
        price: 52990000,
        description: 'Chip M3 Pro, màn hình Liquid Retina XDR, pin 18 giờ',
        category: getCategory('Laptop'),
        stock: 15,
        image:
          'https://images.unsplash.com/photo-1628236876304-a22c600a8ef8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Lenovo ThinkPad X1 Carbon',
        price: 38990000,
        description: 'Laptop doanh nhân cao cấp, bền bỉ với Intel Core i7, 16GB RAM',
        category: getCategory('Laptop'),
        stock: 15,
        image:
          'https://images.unsplash.com/photo-1600267185393-e158a98703de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'HP Spectre x360',
        price: 34990000,
        description: 'Laptop 2-in-1 cao cấp với màn hình cảm ứng OLED, Intel Core i7',
        category: getCategory('Laptop'),
        stock: 18,
        image:
          'https://images.unsplash.com/photo-1589561084283-930aa7b1ce50?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Asus ROG Zephyrus G14',
        price: 35990000,
        description: 'Laptop gaming mỏng nhẹ với AMD Ryzen 9, RTX 4060, 16GB RAM',
        category: getCategory('Laptop'),
        stock: 20,
        image:
          'https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Acer Swift 5',
        price: 27990000,
        description: 'Laptop siêu nhẹ dưới 1kg, màn hình cảm ứng, Intel Core i7',
        category: getCategory('Laptop'),
        stock: 25,
        image:
          'https://images.unsplash.com/photo-1629131726692-1accd0c53ce0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'MacBook Air M3',
        price: 32990000,
        description: 'Chip M3, màn hình Liquid Retina, không quạt tản nhiệt, pin 18 giờ',
        category: getCategory('Laptop'),
        stock: 30,
        image:
          'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Microsoft Surface Laptop Studio',
        price: 42990000,
        description: 'Laptop sáng tạo với màn hình xoay 3 chế độ, RTX 3050 Ti',
        category: getCategory('Laptop'),
        stock: 15,
        image:
          'https://images.unsplash.com/photo-1618410320928-25228d811631?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'MSI Creator Z16',
        price: 45990000,
        description: 'Laptop dành cho nhà sáng tạo nội dung với RTX 4070, i9-13900H',
        category: getCategory('Laptop'),
        stock: 10,
        image:
          'https://images.unsplash.com/photo-1630794180018-433d915c34ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Dell Alienware x16',
        price: 76990000,
        description: 'Laptop gaming cao cấp với RTX 4080, i9-13900HX, 32GB RAM',
        category: getCategory('Laptop'),
        stock: 8,
        image:
          'https://images.unsplash.com/photo-1623126908029-58c95c54aaf2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Razer Blade 15',
        price: 58990000,
        description: 'Laptop gaming mỏng nhẹ, RTX 4070, i7-13800H, màn hình 240Hz',
        category: getCategory('Laptop'),
        stock: 12,
        image:
          'https://images.unsplash.com/photo-1544731612-de7f96afe55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'LG Gram 16',
        price: 36990000,
        description: 'Laptop siêu nhẹ với màn hình 16 inch, Intel Core i7, 16GB RAM',
        category: getCategory('Laptop'),
        stock: 15,
        image:
          'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },

      // Máy tính bảng - 8 sản phẩm
      {
        name: 'iPad Pro M2',
        price: 23990000,
        description: 'Máy tính bảng với chip M2, màn hình Liquid Retina XDR',
        category: getCategory('Máy tính bảng'),
        stock: 25,
        image:
          'https://images.unsplash.com/photo-1585790050230-5dd28404ccb9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Galaxy Tab S9',
        price: 19990000,
        description: 'Máy tính bảng màn hình 11 inch, chip Snapdragon 8 Gen 2',
        category: getCategory('Máy tính bảng'),
        stock: 20,
        image:
          'https://images.unsplash.com/photo-1587033411391-5d9e51cce126?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'iPad Air M1',
        price: 17990000,
        description: 'Máy tính bảng mỏng nhẹ với chip M1, màn hình Liquid Retina 10.9 inch',
        category: getCategory('Máy tính bảng'),
        stock: 30,
        image:
          'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Samsung Galaxy Tab S9 Ultra',
        price: 25990000,
        description: 'Máy tính bảng cao cấp màn hình 14.6 inch, Snapdragon 8 Gen 2',
        category: getCategory('Máy tính bảng'),
        stock: 15,
        image:
          'https://images.unsplash.com/photo-1589739900243-4b52cd9dd8df?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Xiaomi Pad 6 Pro',
        price: 9990000,
        description: 'Màn hình 144Hz, Snapdragon 8+ Gen 1, sạc nhanh 67W',
        category: getCategory('Máy tính bảng'),
        stock: 35,
        image:
          'https://images.unsplash.com/photo-1623126798943-06de36222475?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'iPad Mini 6',
        price: 13990000,
        description: 'Màn hình Liquid Retina 8.3 inch, chip A15 Bionic, Apple Pencil 2',
        category: getCategory('Máy tính bảng'),
        stock: 25,
        image:
          'https://images.unsplash.com/photo-1622533950950-2f4b5b9575f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Lenovo Tab P12 Pro',
        price: 14990000,
        description: 'Màn hình AMOLED 12.6 inch, Snapdragon 870, bút cảm ứng',
        category: getCategory('Máy tính bảng'),
        stock: 20,
        image:
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'OPPO Pad 2',
        price: 11990000,
        description: 'Màn hình 2.8K 144Hz, MediaTek Dimensity 9000, sạc nhanh 67W',
        category: getCategory('Máy tính bảng'),
        stock: 18,
        image:
          'https://images.unsplash.com/photo-1561154464-82e9adf32764?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },

      // Phụ kiện - 10 sản phẩm
      {
        name: 'Tai nghe AirPods Pro 2',
        price: 6790000,
        description: 'Tai nghe không dây với chống ồn chủ động, chống nước IPX4',
        category: getCategory('Phụ kiện'),
        stock: 100,
        image:
          'https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Sạc nhanh Samsung 45W',
        price: 990000,
        description: 'Bộ sạc nhanh cho điện thoại và máy tính bảng Samsung',
        category: getCategory('Phụ kiện'),
        stock: 200,
        image:
          'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Sony WH-1000XM5',
        price: 8490000,
        description: 'Tai nghe chụp tai chống ồn chủ động cao cấp, pin 30 giờ',
        category: getCategory('Phụ kiện'),
        stock: 50,
        image:
          'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Bose QuietComfort Ultra',
        price: 9990000,
        description: 'Tai nghe chụp tai với chống ồn hàng đầu, âm thanh không gian',
        category: getCategory('Phụ kiện'),
        stock: 30,
        image:
          'https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Logitech MX Master 3S',
        price: 2590000,
        description: 'Chuột không dây cao cấp với sensor 8K DPI, kết nối đa thiết bị',
        category: getCategory('Phụ kiện'),
        stock: 80,
        image:
          'https://images.unsplash.com/photo-1605773527852-c546a8584ea3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Apple Magic Keyboard',
        price: 3290000,
        description: 'Bàn phím không dây chính hãng cho Mac và iPad',
        category: getCategory('Phụ kiện'),
        stock: 60,
        image:
          'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Samsung Powerbank 20.000mAh',
        price: 1290000,
        description: 'Pin dự phòng dung lượng cao, sạc nhanh 45W',
        category: getCategory('Phụ kiện'),
        stock: 120,
        image:
          'https://images.unsplash.com/photo-1585003791541-d6666e15c6c8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Ốp lưng iPhone 15 Pro Max',
        price: 790000,
        description: 'Ốp lưng silicon cao cấp chống sốc, bảo vệ camera',
        category: getCategory('Phụ kiện'),
        stock: 150,
        image:
          'https://images.unsplash.com/photo-1563473213013-de5cd4e5a2a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Anker Powerline III',
        price: 390000,
        description: 'Cáp sạc USB-C to Lightning bền bỉ, hỗ trợ sạc nhanh 30W',
        category: getCategory('Phụ kiện'),
        stock: 200,
        image:
          'https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'JBL Flip 6',
        price: 2490000,
        description: 'Loa bluetooth di động chống nước IP67, âm thanh mạnh mẽ',
        category: getCategory('Phụ kiện'),
        stock: 70,
        image:
          'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },

      // Đồng hồ thông minh - 8 sản phẩm
      {
        name: 'Apple Watch Series 9',
        price: 11990000,
        description: 'Đồng hồ thông minh với màn hình Always-On, cảm biến sức khỏe',
        category: getCategory('Đồng hồ thông minh'),
        stock: 40,
        image:
          'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Galaxy Watch 6',
        price: 6990000,
        description: 'Đồng hồ thông minh với màn hình Super AMOLED, theo dõi sức khỏe',
        category: getCategory('Đồng hồ thông minh'),
        stock: 35,
        image:
          'https://images.unsplash.com/photo-1680876805156-cf51b334a07d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Apple Watch Ultra 2',
        price: 19990000,
        description: 'Đồng hồ thông minh bền bỉ với GPS chính xác, pin 36 giờ',
        category: getCategory('Đồng hồ thông minh'),
        stock: 20,
        image:
          'https://images.unsplash.com/photo-1693072371849-b92f97aa626a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Samsung Galaxy Watch Ultra',
        price: 12990000,
        description: 'Đồng hồ thông minh cao cấp với Wear OS, cảm biến BioActive',
        category: getCategory('Đồng hồ thông minh'),
        stock: 25,
        image:
          'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Garmin Fenix 7 Pro',
        price: 18990000,
        description: 'Đồng hồ thông minh chuyên thể thao với GPS đa băng tần, pin 37 ngày',
        category: getCategory('Đồng hồ thông minh'),
        stock: 15,
        image:
          'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Huawei Watch GT 4',
        price: 6490000,
        description: 'Đồng hồ thông minh với pin 2 tuần, theo dõi sức khỏe toàn diện',
        category: getCategory('Đồng hồ thông minh'),
        stock: 30,
        image:
          'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Xiaomi Watch S3',
        price: 4990000,
        description: 'Đồng hồ thông minh với màn hình AMOLED, pin 15 ngày',
        category: getCategory('Đồng hồ thông minh'),
        stock: 40,
        image:
          'https://images.unsplash.com/photo-1617043786394-f977fa12eddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      },
      {
        name: 'Fitbit Sense 2',
        price: 7490000,
        description: 'Đồng hồ thông minh theo dõi sức khỏe với cảm biến EDA, ECG',
        category: getCategory('Đồng hồ thông minh'),
        stock: 25,
        image:
          'https://images.unsplash.com/photo-1597167231350-a2416bea0758?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60'
      }
    ]

    // Tạo slug cho mỗi sản phẩm và lưu từng sản phẩm một
    const slugify = require('slugify')
    const createdProducts = []

    for (const productData of products) {
      // Tạo slug từ tên sản phẩm
      const slugBase = slugify(productData.name, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g
      })

      // Kiểm tra xem slug đã tồn tại chưa
      let slug = slugBase
      let counter = 1
      let slugExists = await Product.findOne({ slug: slugBase })

      // Nếu slug đã tồn tại, thêm số vào cuối để tạo slug độc nhất
      while (slugExists) {
        slug = `${slugBase}-${counter}`
        counter++
        slugExists = await Product.findOne({ slug })
      }

      // Thêm slug vào dữ liệu sản phẩm
      productData.slug = slug

      // Tạo và lưu sản phẩm
      const product = new Product(productData)
      const savedProduct = await product.save()
      createdProducts.push(savedProduct)
    }

    console.log('Đã tạo sản phẩm thành công')
    return createdProducts
  } catch (error) {
    console.error('Lỗi khi tạo sản phẩm:', error)
    process.exit(1)
  }
}

// Tạo dữ liệu đánh giá
const createReviews = async (users, products) => {
  try {
    const reviews = []

    // Tạo một số đánh giá ngẫu nhiên
    for (let i = 0; i < 20; i++) {
      const user = users[Math.floor(Math.random() * users.length)]
      const product = products[Math.floor(Math.random() * products.length)]
      const rating = Math.floor(Math.random() * 5) + 1 // Đánh giá từ 1-5

      const comments = [
        'Sản phẩm rất tốt, đúng như mô tả',
        'Chất lượng khá ổn, giao hàng nhanh',
        'Tôi rất hài lòng với sản phẩm này',
        'Sẽ mua lại lần sau',
        'Giá cả hợp lý cho chất lượng này',
        'Sản phẩm tạm được nhưng chưa như kỳ vọng',
        'Đóng gói cẩn thận, sản phẩm không bị hư hại'
      ]

      const comment = comments[Math.floor(Math.random() * comments.length)]

      reviews.push({
        user: user._id,
        product: product._id,
        rating,
        comment
      })
    }

    const createdReviews = await Review.insertMany(reviews)
    console.log('Đã tạo đánh giá thành công')
    return createdReviews
  } catch (error) {
    console.error('Lỗi khi tạo đánh giá:', error)
    process.exit(1)
  }
}

// Tạo dữ liệu đơn hàng
const createOrders = async (users, products) => {
  try {
    const orders = []
    const statuses = ['pending', 'processing', 'shipped', 'delivered']
    const paymentStatuses = ['pending', 'completed']

    // Tạo đơn hàng cho mỗi người dùng
    for (const user of users) {
      if (user.role === 'admin') continue // Bỏ qua tài khoản admin

      // Mỗi người dùng có 1-3 đơn hàng
      const orderCount = Math.floor(Math.random() * 3) + 1

      for (let i = 0; i < orderCount; i++) {
        // Mỗi đơn hàng có 1-3 sản phẩm
        const itemCount = Math.floor(Math.random() * 3) + 1
        const items = []
        let totalAmount = 0

        // Thêm sản phẩm vào đơn hàng
        for (let j = 0; j < itemCount; j++) {
          const product = products[Math.floor(Math.random() * products.length)]
          const quantity = Math.floor(Math.random() * 3) + 1
          const price = product.price

          items.push({
            product: product._id,
            quantity,
            price
          })

          totalAmount += price * quantity
        }

        const status = statuses[Math.floor(Math.random() * statuses.length)]
        const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)]

        orders.push({
          user: user._id,
          items,
          totalAmount,
          shippingAddress: {
            address: '123 Đường ABC',
            city: 'TP Hồ Chí Minh',
            postalCode: '70000',
            country: 'Việt Nam'
          },
          status,
          paymentStatus,
          createdAt: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000) // Ngày trong vòng 30 ngày qua
        })
      }
    }

    const createdOrders = await Order.insertMany(orders)
    console.log('Đã tạo đơn hàng thành công')
    return createdOrders
  } catch (error) {
    console.error('Lỗi khi tạo đơn hàng:', error)
    process.exit(1)
  }
}

// Tạo dữ liệu giỏ hàng
const createCarts = async (users, products) => {
  try {
    const carts = []

    // Tạo giỏ hàng cho mỗi người dùng (trừ admin)
    for (const user of users) {
      if (user.role === 'admin') continue

      // Mỗi giỏ hàng có 0-3 sản phẩm
      const itemCount = Math.floor(Math.random() * 4)
      const items = []

      // Thêm sản phẩm vào giỏ hàng
      for (let i = 0; i < itemCount; i++) {
        const product = products[Math.floor(Math.random() * products.length)]
        const quantity = Math.floor(Math.random() * 3) + 1

        items.push({
          product: product._id,
          quantity
        })
      }

      if (items.length > 0) {
        carts.push({
          user: user._id,
          items
        })
      }
    }

    const createdCarts = await Cart.insertMany(carts)
    console.log('Đã tạo giỏ hàng thành công')
    return createdCarts
  } catch (error) {
    console.error('Lỗi khi tạo giỏ hàng:', error)
    process.exit(1)
  }
}

// Chạy quá trình tạo dữ liệu
const seedData = async () => {
  try {
    await clearData()
    const users = await createUsers()
    const categories = await createCategories()
    const products = await createProducts(categories)
    await createReviews(users, products)
    await createOrders(users, products)
    await createCarts(users, products)

    console.log('Đã tạo dữ liệu mẫu thành công!')
    process.exit(0)
  } catch (error) {
    console.error('Lỗi khi tạo dữ liệu mẫu:', error)
    process.exit(1)
  }
}

// Chạy script
seedData()
