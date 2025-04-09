"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Document } from "@/types";
import { useDocumentUpload } from "@/hooks/use-document-upload";
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
import { useState } from "react";

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

interface DocumentEditFormProps {
  document: Document;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function DocumentEditForm({
  document,
  onSuccess,
  onCancel,
}: DocumentEditFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateDocument } = useDocumentUpload();

  // Khởi tạo form với react-hook-form và zod validation
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: document.title,
      description: document.description || "",
      isPublic: document.isPublic,
      tags: document.tags || "",
    },
  });

  // Xử lý khi gửi form
  const onSubmit = async (values: FormValues) => {
    setIsSubmitting(true);
    try {
      const updatedDocument = await updateDocument(document.id, values);
      
      if (updatedDocument && onSuccess) {
        onSuccess();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 overflow-y-auto">
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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
                  disabled={isSubmitting}
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

        {/* Thông tin file */}
        <div className="rounded-md p-4 bg-white/5 space-y-2">
          <h4 className="text-sm font-medium">Thông tin file</h4>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="text-white/60">Loại file:</div>
            <div>{document.fileType}</div>
            <div className="text-white/60">Kích thước:</div>
            <div>
              {document.fileSize < 1024 * 1024
                ? `${(document.fileSize / 1024).toFixed(1)} KB`
                : `${(document.fileSize / (1024 * 1024)).toFixed(1)} MB`}
            </div>
            <div className="text-white/60">Ngày tạo:</div>
            <div>{new Date(document.createdAt).toLocaleDateString("vi-VN")}</div>
          </div>
        </div>

        {/* Nút hành động */}
        <div className="flex justify-end space-x-2 pt-2">
          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Hủy
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className={isSubmitting ? "opacity-50" : ""}
          >
            {isSubmitting ? "Đang lưu..." : "Lưu thay đổi"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
