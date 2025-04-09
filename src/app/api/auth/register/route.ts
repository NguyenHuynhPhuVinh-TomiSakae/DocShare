import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { executeQuery } from "@/lib/db";

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface UserRecord {
  id: number;
  email: string;
}

export async function POST(request: Request) {
  try {
    // Lấy dữ liệu từ request
    const body: RegisterRequest = await request.json();
    const { name, email, password } = body;
    
    // Kiểm tra dữ liệu đầu vào
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ thông tin" },
        { status: 400 }
      );
    }
    
    // Kiểm tra email đã tồn tại chưa
    const existingUsers = await executeQuery<UserRecord[]>(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    
    if (existingUsers && existingUsers.length > 0) {
      return NextResponse.json(
        { error: "Email đã được sử dụng" },
        { status: 400 }
      );
    }
    
    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Tạo người dùng mới
    await executeQuery(
      "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    
    return NextResponse.json(
      { message: "Đăng ký thành công" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Lỗi đăng ký:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi đăng ký" },
      { status: 500 }
    );
  }
}
