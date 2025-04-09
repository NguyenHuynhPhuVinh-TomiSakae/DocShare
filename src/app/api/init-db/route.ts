import { NextResponse } from "next/server";
import { initDatabase, testConnection } from "@/lib/db";

export async function GET() {
  try {
    // Kiểm tra kết nối đến cơ sở dữ liệu
    const isConnected = await testConnection();
    
    if (!isConnected) {
      return NextResponse.json(
        { error: "Không thể kết nối đến cơ sở dữ liệu" },
        { status: 500 }
      );
    }
    
    // Khởi tạo cơ sở dữ liệu và các bảng
    await initDatabase();
    
    return NextResponse.json(
      { message: "Khởi tạo cơ sở dữ liệu thành công" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Lỗi khởi tạo cơ sở dữ liệu:", error);
    return NextResponse.json(
      { error: "Đã xảy ra lỗi khi khởi tạo cơ sở dữ liệu" },
      { status: 500 }
    );
  }
}
