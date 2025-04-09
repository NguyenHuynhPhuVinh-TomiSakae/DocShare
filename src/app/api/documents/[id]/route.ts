import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { getDocumentById, updateDocument, deleteDocument } from '@/lib/document';
// import { updateFilePermission } from '@/lib/google-drive';

// API endpoint để lấy thông tin tài liệu theo ID
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Không có quyền truy cập' },
        { status: 401 }
      );
    }
    
    const userId = parseInt(session.user.id);
    const documentId = parseInt(await params.id);
    
    const document = await getDocumentById(documentId);
    
    // Kiểm tra quyền truy cập
    if (document.userId !== userId && !document.isPublic) {
      return NextResponse.json(
        { success: false, error: 'Không có quyền truy cập tài liệu này' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({ success: true, document });
  } catch (error) {
    console.error('Lỗi khi lấy thông tin tài liệu:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi lấy thông tin tài liệu' },
      { status: 500 }
    );
  }
}

// API endpoint để cập nhật thông tin tài liệu
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Không có quyền truy cập' },
        { status: 401 }
      );
    }
    
    const userId = parseInt(session.user.id);
    const documentId = parseInt(await params.id);
    
    // Lấy thông tin tài liệu hiện tại
    const existingDocument = await getDocumentById(documentId);
    
    // Kiểm tra quyền truy cập
    if (existingDocument.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Không có quyền cập nhật tài liệu này' },
        { status: 403 }
      );
    }
    
    const data = await req.json();
    const { title, description, isPublic, tags } = data;
    
    if (!title) {
      return NextResponse.json(
        { success: false, error: 'Thiếu tiêu đề tài liệu' },
        { status: 400 }
      );
    }
    
    // Cập nhật quyền truy cập file trên Google Drive nếu trạng thái công khai thay đổi
    if (existingDocument.isPublic !== isPublic) {
      // Tạm thởi bỏ qua việc cập nhật quyền truy cập trên Google Drive
      // await updateFilePermission(process.env.GOOGLE_DRIVE_ACCESS_TOKEN, existingDocument.driveFileId, isPublic);
      console.log('Bỏ qua việc cập nhật quyền truy cập trên Google Drive');
    }
    
    // Cập nhật thông tin tài liệu trong cơ sở dữ liệu
    const updatedDocument = await updateDocument(
      documentId,
      userId,
      title,
      description || null,
      isPublic,
      tags
    );
    
    return NextResponse.json({ success: true, document: updatedDocument });
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin tài liệu:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi cập nhật thông tin tài liệu' },
      { status: 500 }
    );
  }
}

// API endpoint để xóa tài liệu
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await auth();
    
    if (!session || !session.user) {
      return NextResponse.json(
        { success: false, error: 'Không có quyền truy cập' },
        { status: 401 }
      );
    }
    
    const userId = parseInt(session.user.id);
    const documentId = parseInt(await params.id);
    
    // Lấy thông tin tài liệu hiện tại
    const existingDocument = await getDocumentById(documentId);
    
    // Kiểm tra quyền truy cập
    if (existingDocument.userId !== userId) {
      return NextResponse.json(
        { success: false, error: 'Không có quyền xóa tài liệu này' },
        { status: 403 }
      );
    }
    
    // Tạm thởi bỏ qua việc xóa file trên Google Drive
    // Xóa thông tin tài liệu trong cơ sở dữ liệu
    await deleteDocument(documentId, userId);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lỗi khi xóa tài liệu:', error);
    return NextResponse.json(
      { success: false, error: 'Đã xảy ra lỗi khi xóa tài liệu' },
      { status: 500 }
    );
  }
}
