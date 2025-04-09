/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { executeQuery } from './db';
import { Document, DocumentFormData } from '@/types';

// Lưu thông tin tài liệu vào cơ sở dữ liệu
export async function saveDocument(
  userId: number,
  title: string,
  description: string | null,
  fileType: string,
  fileSize: number,
  driveFileId: string,
  driveViewLink: string,
  driveDownloadLink: string,
  isPublic: boolean,
  tags?: string
): Promise<Document> {
  try {
    const result = await executeQuery<any>(
      `INSERT INTO documents 
      (userId, title, description, fileType, fileSize, driveFileId, driveViewLink, driveDownloadLink, isPublic, tags) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [userId, title, description, fileType, fileSize, driveFileId, driveViewLink, driveDownloadLink, isPublic, tags]
    );

    // Lấy thông tin tài liệu vừa tạo
    const document = await getDocumentById(result.insertId);
    return document;
  } catch (error) {
    console.error('Lỗi khi lưu thông tin tài liệu:', error);
    throw error;
  }
}

// Lấy tài liệu theo ID
export async function getDocumentById(id: number): Promise<Document> {
  try {
    const documents = await executeQuery<Document[]>(
      'SELECT * FROM documents WHERE id = ?',
      [id]
    );

    if (documents.length === 0) {
      throw new Error('Không tìm thấy tài liệu');
    }

    return documents[0];
  } catch (error) {
    console.error('Lỗi khi lấy thông tin tài liệu:', error);
    throw error;
  }
}

// Lấy tất cả tài liệu của người dùng
export async function getUserDocuments(userId: number): Promise<Document[]> {
  try {
    const documents = await executeQuery<Document[]>(
      'SELECT * FROM documents WHERE userId = ? ORDER BY createdAt DESC',
      [userId]
    );

    return documents;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tài liệu:', error);
    throw error;
  }
}

// Lấy tài liệu công khai
export async function getPublicDocuments(): Promise<Document[]> {
  try {
    const documents = await executeQuery<Document[]>(
      'SELECT * FROM documents WHERE isPublic = true ORDER BY createdAt DESC',
      []
    );

    return documents;
  } catch (error) {
    console.error('Lỗi khi lấy danh sách tài liệu công khai:', error);
    throw error;
  }
}

// Cập nhật thông tin tài liệu
export async function updateDocument(
  id: number,
  userId: number,
  title: string,
  description: string | null,
  isPublic: boolean,
  tags?: string
): Promise<Document> {
  try {
    await executeQuery(
      `UPDATE documents 
      SET title = ?, description = ?, isPublic = ?, tags = ?
      WHERE id = ? AND userId = ?`,
      [title, description, isPublic, tags, id, userId]
    );

    // Lấy thông tin tài liệu sau khi cập nhật
    const document = await getDocumentById(id);
    return document;
  } catch (error) {
    console.error('Lỗi khi cập nhật thông tin tài liệu:', error);
    throw error;
  }
}

// Xóa tài liệu
export async function deleteDocument(id: number, userId: number): Promise<boolean> {
  try {
    const result = await executeQuery<any>(
      'DELETE FROM documents WHERE id = ? AND userId = ?',
      [id, userId]
    );

    return result.affectedRows > 0;
  } catch (error) {
    console.error('Lỗi khi xóa tài liệu:', error);
    throw error;
  }
}

// Tìm kiếm tài liệu
export async function searchDocuments(
  userId: number,
  searchTerm: string,
  includePublic: boolean = false
): Promise<Document[]> {
  try {
    const query = `
      SELECT * FROM documents 
      WHERE (userId = ? OR (isPublic = true AND ?))
      AND (title LIKE ? OR description LIKE ? OR tags LIKE ?)
      ORDER BY createdAt DESC
    `;

    const searchPattern = `%${searchTerm}%`;
    
    const documents = await executeQuery<Document[]>(
      query,
      [userId, includePublic, searchPattern, searchPattern, searchPattern]
    );

    return documents;
  } catch (error) {
    console.error('Lỗi khi tìm kiếm tài liệu:', error);
    throw error;
  }
}

// Lấy tài liệu gần đây của người dùng
export async function getRecentDocuments(userId: number, limit: number = 5): Promise<Document[]> {
  try {
    const documents = await executeQuery<Document[]>(
      'SELECT * FROM documents WHERE userId = ? ORDER BY updatedAt DESC LIMIT ?',
      [userId, limit]
    );

    return documents;
  } catch (error) {
    console.error('Lỗi khi lấy tài liệu gần đây:', error);
    throw error;
  }
}
