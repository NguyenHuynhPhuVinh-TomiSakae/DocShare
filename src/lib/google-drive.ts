/* eslint-disable @typescript-eslint/no-explicit-any */
import { google } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

// Cấu hình Google Drive API
const SCOPES = ['https://www.googleapis.com/auth/drive.file'];

// Tạo OAuth2 client từ thông tin xác thực
export function createOAuth2Client(): OAuth2Client {
  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  const redirectUri = process.env.GOOGLE_REDIRECT_URI || 'http://localhost:3000/api/auth/google-drive-callback';

  if (!clientId || !clientSecret) {
    throw new Error('Thiếu thông tin xác thực Google Drive API. Vui lòng kiểm tra biến môi trường.');
  }

  return new google.auth.OAuth2(clientId, clientSecret, redirectUri);
}

// Tạo URL xác thực để người dùng đăng nhập và cấp quyền
export function getAuthUrl(userId: number): string {
  const oauth2Client = createOAuth2Client();
  
  return oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
    state: userId.toString(), // Lưu userId để sử dụng sau khi callback
    prompt: 'consent', // Luôn yêu cầu người dùng đồng ý để nhận refresh_token
  });
}

// Lấy tokens từ code sau khi người dùng đồng ý cấp quyền
export async function getTokensFromCode(code: string): Promise<any> {
  const oauth2Client = createOAuth2Client();
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}

// Tạo Drive client từ access token
export function createDriveClient(accessToken: string): any {
  const oauth2Client = createOAuth2Client();
  oauth2Client.setCredentials({ access_token: accessToken });
  
  return google.drive({
    version: 'v3',
    auth: oauth2Client,
  });
}

// Tải file lên Google Drive
export async function uploadFileToDrive(
  accessToken: string,
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<any> {
  const drive = createDriveClient(accessToken);
  
  try {
    const response = await drive.files.create({
      requestBody: {
        name: fileName,
        mimeType: mimeType,
      },
      media: {
        mimeType: mimeType,
        body: fileBuffer,
      },
      fields: 'id,name,mimeType,size,webViewLink,webContentLink',
    });
    
    // Cập nhật quyền để có thể xem file bằng link
    await drive.permissions.create({
      fileId: response.data.id,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });
    
    // Lấy lại thông tin file sau khi cập nhật quyền
    const updatedFile = await drive.files.get({
      fileId: response.data.id,
      fields: 'id,name,mimeType,size,webViewLink,webContentLink',
    });
    
    return updatedFile.data;
  } catch (error) {
    console.error('Lỗi khi tải file lên Google Drive:', error);
    throw error;
  }
}

// Xóa file từ Google Drive
export async function deleteFileFromDrive(accessToken: string, fileId: string): Promise<boolean> {
  const drive = createDriveClient(accessToken);
  
  try {
    await drive.files.delete({
      fileId: fileId,
    });
    return true;
  } catch (error) {
    console.error('Lỗi khi xóa file từ Google Drive:', error);
    throw error;
  }
}

// Cập nhật quyền truy cập file (public/private)
export async function updateFilePermission(
  accessToken: string,
  fileId: string,
  isPublic: boolean
): Promise<boolean> {
  const drive = createDriveClient(accessToken);
  
  try {
    if (isPublic) {
      // Cấp quyền đọc cho tất cả mọi người
      await drive.permissions.create({
        fileId: fileId,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });
    } else {
      // Xóa tất cả quyền truy cập công khai
      const permissions = await drive.permissions.list({
        fileId: fileId,
      });
      
      for (const permission of permissions.data.permissions || []) {
        if (permission.type === 'anyone') {
          await drive.permissions.delete({
            fileId: fileId,
            permissionId: permission.id,
          });
        }
      }
    }
    return true;
  } catch (error) {
    console.error('Lỗi khi cập nhật quyền truy cập file:', error);
    throw error;
  }
}
