"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileUploadDropzone } from "./file-upload-dropzone";
import { UploadProgress } from "./upload-progress";
import { useDocumentUpload } from "@/hooks/use-document-upload";
import { DocumentFormData } from "@/types";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";

// Schema validation cho form
const formSchema = z.object({
  title: z.string().min(3, {
    message: "Tiêu đề phải có ít nhất 3 ký tự",
  }),
  description: z.string().optional(),
  isPublic: z.boolean(),
  tags: z.string().optional(),
});

// Định nghĩa kiểu dữ liệu cho form
type FormValues = z.infer<typeof formSchema>;

interface UploadDocumentFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function UploadDocumentForm({
  onSuccess,
  onCancel,
}: UploadDocumentFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { uploadDocument, uploadState } = useDocumentUpload();

  // Khởi tạo form với react-hook-form và zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      isPublic: false,
      tags: "",
    },
  });

  // Xử lý khi người dùng chọn file
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    
    // Tự động điền tiêu đề từ tên file nếu chưa có
    if (!form.getValues("title")) {
      // Lấy tên file không bao gồm phần mở rộng
      const fileName = file.name.split(".").slice(0, -1).join(".");
      form.setValue("title", fileName);
    }
  };

  // Xử lý khi gửi form
  const onSubmit = async (values: FormValues) => {
    if (!selectedFile) {
      return;
    }

    const formData: DocumentFormData = {
      ...values,
      file: selectedFile,
    };

    const document = await uploadDocument(formData);
    
    if (document && onSuccess) {
      // Reset form sau khi tải lên thành công
      form.reset();
      setSelectedFile(null);
      onSuccess();
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-2">
        {/* Khu vực kéo thả file */}
        <div className="space-y-2">
          <FormLabel>File tài liệu</FormLabel>
          <FileUploadDropzone
            onFileSelect={handleFileSelect}
            disabled={uploadState.isUploading}
          />
          
          {selectedFile && (
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-md mt-2">
              <div className="flex items-center space-x-2 overflow-hidden">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/20 rounded flex items-center justify-center">
                  <span className="text-xs font-medium text-primary-foreground">
                    {selectedFile.name.split(".").pop()?.toUpperCase()}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-white truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-white/50">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setSelectedFile(null)}
                disabled={uploadState.isUploading}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Xóa file</span>
              </Button>
            </div>
          )}
          
          <UploadProgress uploadState={uploadState} />
        </div>

        {/* Tiêu đề */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiêu đề</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tiêu đề tài liệu"
                  {...field}
                  disabled={uploadState.isUploading}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mô tả */}
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mô tả</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Nhập mô tả về tài liệu (tùy chọn)"
                  className="resize-none"
                  {...field}
                  disabled={uploadState.isUploading}
                />
              </FormControl>
              <FormDescription>
                Mô tả ngắn gọn về nội dung của tài liệu
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Tags */}
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập tags, phân cách bằng dấu phẩy (tùy chọn)"
                  {...field}
                  disabled={uploadState.isUploading}
                />
              </FormControl>
              <FormDescription>
                Ví dụ: học tập, tài liệu, công nghệ
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Công khai */}
        <FormField
          control={form.control}
          name="isPublic"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4 bg-white/5">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  disabled={uploadState.isUploading}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Công khai tài liệu</FormLabel>
                <FormDescription>
                  Tài liệu công khai có thể được xem bởi tất cả mọi người
                </FormDescription>
              </div>
            </FormItem>
          )}
        />

        {/* Nút hành động */}
        <div className="flex justify-end space-x-2 pt-2 sticky bottom-0">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={uploadState.isUploading}
            >
              Hủy
            </Button>
          )}
          <Button
            type="submit"
            disabled={!selectedFile || uploadState.isUploading}
            className={uploadState.isUploading ? "opacity-50" : ""}
          >
            {uploadState.isUploading ? "Đang tải lên..." : "Tải lên"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
