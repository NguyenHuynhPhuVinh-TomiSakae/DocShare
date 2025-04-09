"use client";

import { useState } from "react";
import { Document } from "@/types";
import { useDocumentUpload } from "@/hooks/use-document-upload";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Eye, Download, Trash2, Edit, FileText, Calendar, Tag, Globe, Lock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { DocumentEditForm } from "@/components/documents/document-edit-form";
import { toast } from "sonner";

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const { deleteDocument } = useDocumentUpload();

  // Xử lý xóa tài liệu
  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const success = await deleteDocument(document.id);
      if (success) {
        setShowDeleteDialog(false);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  // Xử lý khi cập nhật thành công
  const handleEditSuccess = () => {
    setShowEditDialog(false);
    toast.success("Đã cập nhật tài liệu thành công");
  };

  // Lấy icon phù hợp với loại file
  const getFileIcon = () => {
    const fileType = document.fileType.toLowerCase();
    
    if (fileType.includes("pdf")) return "PDF";
    if (fileType.includes("word") || fileType.includes("document")) return "DOC";
    if (fileType.includes("excel") || fileType.includes("sheet")) return "XLS";
    if (fileType.includes("powerpoint") || fileType.includes("presentation")) return "PPT";
    if (fileType.includes("text")) return "TXT";
    if (fileType.includes("image")) return "IMG";
    
    return "FILE";
  };

  // Format kích thước file
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <Card className="bg-white/5 border-white/10 hover:bg-white/10 transition-colors">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
              <span className="text-xs font-medium text-primary-foreground">
                {getFileIcon()}
              </span>
            </div>
            <CardTitle className="text-base font-medium truncate max-w-[200px]">
              {document.title}
            </CardTitle>
          </div>
          <Badge variant={document.isPublic ? "default" : "outline"} className="ml-2 flex-shrink-0">
            {document.isPublic ? (
              <Globe className="h-3 w-3 mr-1" />
            ) : (
              <Lock className="h-3 w-3 mr-1" />
            )}
            {document.isPublic ? "Công khai" : "Riêng tư"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        {document.description && (
          <p className="text-sm text-white/70 mb-3 line-clamp-2">
            {document.description}
          </p>
        )}
        <div className="space-y-1.5">
          <div className="flex items-center text-xs text-white/50">
            <FileText className="h-3 w-3 mr-1.5" />
            <span>{formatFileSize(document.fileSize)}</span>
          </div>
          <div className="flex items-center text-xs text-white/50">
            <Calendar className="h-3 w-3 mr-1.5" />
            <span>
              {formatDistanceToNow(new Date(document.createdAt), {
                addSuffix: true,
                locale: vi,
              })}
            </span>
          </div>
          {document.tags && (
            <div className="flex items-center text-xs text-white/50">
              <Tag className="h-3 w-3 mr-1.5 flex-shrink-0" />
              <div className="truncate">
                {document.tags.split(",").map((tag, index) => (
                  <span key={index} className="mr-1">
                    #{tag.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="pt-2">
        <div className="flex justify-between w-full">
          <div className="flex space-x-1">
            <Button variant="ghost" size="icon" asChild>
              <a
                href={document.driveViewLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="Xem tài liệu"
              >
                <Eye className="h-4 w-4" />
                <span className="sr-only">Xem</span>
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a
                href={document.driveDownloadLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                title="Tải xuống"
              >
                <Download className="h-4 w-4" />
                <span className="sr-only">Tải xuống</span>
              </a>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowEditDialog(true)}
              title="Chỉnh sửa"
            >
              <Edit className="h-4 w-4" />
              <span className="sr-only">Chỉnh sửa</span>
            </Button>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowDeleteDialog(true)}
            className="text-destructive hover:text-destructive"
            title="Xóa"
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Xóa</span>
          </Button>
        </div>
      </CardFooter>

      {/* Dialog chỉnh sửa tài liệu */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-black border-white/10 overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Chỉnh sửa tài liệu</DialogTitle>
            <DialogDescription>
              Cập nhật thông tin cho tài liệu của bạn
            </DialogDescription>
          </DialogHeader>
          <DocumentEditForm
            document={document}
            onSuccess={handleEditSuccess}
            onCancel={() => setShowEditDialog(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Dialog xác nhận xóa */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa tài liệu</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa tài liệu này? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={isDeleting}
            >
              Hủy
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Đang xóa..." : "Xóa tài liệu"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
}
