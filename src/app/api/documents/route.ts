/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getUserDocuments, saveDocument } from '@/lib/document';
import { uploadFileToDrive } from '@/lib/google-drive';

// API endpoint để lấy danh sách tài liệu của người dùng
export async function GET(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Không có quyền truy cập' },
        { status: 401 }
      );
    }
    
    const userId = parseInt(session.user.id);
    const documents = await getUserDocuments(userId);
    
    return NextResponse.json({ success: true, documents });
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tài liệu:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi lấy danh sách tài liệu' },
      { status: 500 }
    );
  }
}

// API endpoint để tải tài liệu lên
export async function POST(req: NextRequest) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Không có quyền truy cập' },
        { status: 401 }
      );
    }
    
    const userId = parseInt(session.user.id);
    
    // Lấy access token từ cơ sở dữ liệu hoặc session
    // Trong thực tế, bạn cần lưu và lấy token từ cơ sở dữ liệu
    // const accessToken = process.env.GOOGLE_DRIVE_ACCESS_TOKEN;
    
    // Tạm thời bỏ qua việc kiểm tra access token để phát triển UI
    // if (!accessToken) {
    //   return NextResponse.json(
    //     { success: false, error: 'Chưa kết nối với Google Drive' },
    //     { status: 400 }
    //   );
    // }
    
    const formData = await req.formData();
    const file = formData.get('file') as File;
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const isPublic = formData.get('isPublic') === 'true';
    const tags = formData.get('tags') as string;
    
    if (!file || !title) {
      return NextResponse.json(
        { success: false, error: 'Thiếu thông tin tài liệu' },
        { status: 400 }
      );
    }
    
    // Chuyển đổi File thành Buffer để tải lên Google Drive
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    
    // Tạm thời sử dụng mock data cho driveFile
    const driveFile = {
      id: `mock-file-${Date.now()}`,
      name: file.name,
      mimeType: file.type,
      size: file.size,
      webViewLink: `https://example.com/view/${file.name}`,
      webContentLink: `https://example.com/download/${file.name}`
    };
    
    // Lưu thông tin tài liệu vào cơ sở dữ liệu
    const document = await saveDocument(
      userId,
      title,
      description || null,
      file.type,
      file.size,
      driveFile.id,
      driveFile.webViewLink,
      driveFile.webContentLink,
      isPublic,
      tags
    );
    
    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error('Lỗi khi tải tài liệu lên:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi tải tài liệu lên' },
      { status: 500 }
    );
  }
}
