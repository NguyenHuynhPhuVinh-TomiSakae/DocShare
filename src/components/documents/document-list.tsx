"use client";

import { useEffect } from "react";
import { useDocumentUpload } from "@/hooks/use-document-upload";
import { DocumentCard } from "@/components/documents/document-card";
import { Button } from "@/components/ui/button";
import { RefreshCw, FileUp } from "lucide-react";

interface DocumentListProps {
  onUploadClick?: () => void;
}

export function DocumentList({ onUploadClick }: DocumentListProps) {
  const { documents, isLoading, fetchDocuments } = useDocumentUpload();

  // Lấy danh sách tài liệu khi component được tạo
  useEffect(() => {
    // Chỉ gọi fetchDocuments một lần khi component mount
    // fetchDocuments đã được memoize bằng useCallback nên không tạo ra vòng lặp vô hạn
    fetchDocuments();
  }, [fetchDocuments]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg sm:text-xl font-semibold">Tài liệu của bạn</h3>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchDocuments()}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Làm mới
          </Button>
          {onUploadClick && (
            <Button size="sm" onClick={onUploadClick}>
              <FileUp className="h-4 w-4 mr-2" />
              Tải lên
            </Button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
        </div>
      ) : documents.length === 0 ? (
        <div className="text-center py-10 bg-white/5 rounded-lg">
          <div className="flex justify-center">
            <FileUp className="h-12 w-12 text-white/40" />
          </div>
          <h3 className="mt-4 text-lg font-medium text-white">
            Chưa có tài liệu nào
          </h3>
          <p className="mt-1 text-sm text-white/60">
            Bắt đầu tải lên tài liệu đầu tiên của bạn
          </p>
          {onUploadClick && (
            <Button
              onClick={onUploadClick}
              className="mt-4"
            >
              Tải tài liệu lên
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((document) => (
            <DocumentCard key={document.id} document={document} />
          ))}
        </div>
      )}
    </div>
  );
}
