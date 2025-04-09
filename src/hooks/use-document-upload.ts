/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useCallback } from 'react';
import { DocumentFormData, UploadResponse, Document, FileUploadState } from '@/types';
import { toast } from 'sonner';

export const useDocumentUpload = () => {
  const [uploadState, setUploadState] = useState<FileUploadState>({
    isUploading: false,
    progress: 0,
    error: null,
  });
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Hàm tải tài liệu lên
  const uploadDocument = async (formData: DocumentFormData): Promise<Document | null> => {
    setUploadState({
      isUploading: true,
      progress: 0,
      error: null,
    });

    try {
      // Tạo FormData để gửi lên server
      const data = new FormData();
      data.append('file', formData.file);
      data.append('title', formData.title);
      
      if (formData.description) {
        data.append('description', formData.description);
      }
      
      data.append('isPublic', formData.isPublic.toString());
      
      if (formData.tags) {
        data.append('tags', formData.tags);
      }

      // Tạo XMLHttpRequest để theo dõi tiến trình tải lên
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        
        xhr.upload.addEventListener('progress', (event) => {
          if (event.lengthComputable) {
            const progress = Math.round((event.loaded / event.total) * 100);
            setUploadState(prev => ({
              ...prev,
              progress,
            }));
          }
        });
        
        xhr.addEventListener('load', () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            const response: UploadResponse = JSON.parse(xhr.responseText);
            
            if (response.success && response.document) {
              setUploadState({
                isUploading: false,
                progress: 100,
                error: null,
              });
              
              // Thêm tài liệu mới vào danh sách
              setDocuments(prev => [response.document!, ...prev]);
              
              toast.success('Tải tài liệu lên thành công');
              resolve(response.document);
            } else {
              setUploadState({
                isUploading: false,
                progress: 0,
                error: response.error || 'Lỗi không xác định',
              });
              
              toast.error(response.error || 'Lỗi không xác định');
              reject(new Error(response.error || 'Lỗi không xác định'));
            }
          } else {
            const errorMessage = `Lỗi ${xhr.status}: ${xhr.statusText}`;
            
            setUploadState({
              isUploading: false,
              progress: 0,
              error: errorMessage,
            });
            
            toast.error(errorMessage);
            reject(new Error(errorMessage));
          }
        });
        
        xhr.addEventListener('error', () => {
          const errorMessage = 'Lỗi kết nối khi tải tài liệu lên';
          
          setUploadState({
            isUploading: false,
            progress: 0,
            error: errorMessage,
          });
          
          toast.error(errorMessage);
          reject(new Error(errorMessage));
        });
        
        xhr.addEventListener('abort', () => {
          const errorMessage = 'Đã hủy tải tài liệu lên';
          
          setUploadState({
            isUploading: false,
            progress: 0,
            error: errorMessage,
          });
          
          toast.error(errorMessage);
          reject(new Error(errorMessage));
        });
        
        xhr.open('POST', '/api/documents');
        xhr.send(data);
      });
    } catch (error: any) {
      setUploadState({
        isUploading: false,
        progress: 0,
        error: error.message || 'Lỗi không xác định',
      });
      
      toast.error(error.message || 'Lỗi không xác định');
      return null;
    }
  };

  // Hàm lấy danh sách tài liệu - sử dụng useCallback để tránh tạo hàm mới mỗi khi render
  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/documents');
      const data = await response.json();
      
      if (data.success) {
        setDocuments(data.documents);
      } else {
        toast.error(data.error || 'Lỗi khi lấy danh sách tài liệu');
      }
    } catch (error: any) {
      toast.error(error.message || 'Lỗi khi lấy danh sách tài liệu');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Hàm xóa tài liệu
  const deleteDocument = async (documentId: number) => {
    try {
      const response = await fetch(`/api/documents/${Number(documentId)}`, {
        method: 'DELETE',
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Cập nhật danh sách tài liệu
        setDocuments(prev => prev.filter(doc => doc.id !== Number(documentId)));
        toast.success('Đã xóa tài liệu thành công');
        return true;
      } else {
        toast.error(data.error || 'Lỗi khi xóa tài liệu');
        return false;
      }
    } catch (error: any) {
      toast.error(error.message || 'Lỗi khi xóa tài liệu');
      return false;
    }
  };

  // Hàm cập nhật thông tin tài liệu
  const updateDocument = async (
    documentId: number,
    data: { title: string; description?: string; isPublic: boolean; tags?: string }
  ) => {
    try {
      console.log('Đang gửi yêu cầu cập nhật tài liệu:', documentId, data);
      const response = await fetch(`/api/documents/${Number(documentId)}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      console.log('Trạng thái phản hồi:', response.status, response.statusText);
      const responseData = await response.json();
      console.log('Dữ liệu phản hồi:', responseData);
      
      if (responseData.success && responseData.document) {
        // Cập nhật danh sách tài liệu
        setDocuments(prev => 
          prev.map(doc => 
            doc.id === Number(documentId) ? responseData.document : doc
          )
        );
        
        toast.success('Đã cập nhật tài liệu thành công');
        return responseData.document;
      } else {
        toast.error(responseData.error || 'Lỗi khi cập nhật tài liệu');
        return null;
      }
    } catch (error: any) {
      toast.error(error.message || 'Lỗi khi cập nhật tài liệu');
      return null;
    }
  };

  return {
    uploadState,
    documents,
    isLoading,
    uploadDocument,
    fetchDocuments,
    deleteDocument,
    updateDocument,
  };
};
