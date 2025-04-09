"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud } from "lucide-react";

interface FileUploadDropzoneProps {
  onFileSelect: (file: File) => void;
  acceptedFileTypes?: string[];
  maxSize?: number;
  disabled?: boolean;
}

export function FileUploadDropzone({
  onFileSelect,
  acceptedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "text/plain",
    "image/jpeg",
    "image/png",
  ],
  maxSize = 10485760, // 10MB mặc định
  disabled = false,
}: FileUploadDropzoneProps) {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    [onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxSize,
    disabled,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
        isDragActive
          ? "border-primary bg-primary/10"
          : isDragReject
          ? "border-destructive bg-destructive/10"
          : "border-white/20 hover:border-white/40"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center gap-2">
        <UploadCloud className="h-10 w-10 text-white/70" />
        <p className="text-sm sm:text-base text-white/70">
          {isDragActive
            ? "Thả file để tải lên"
            : "Kéo và thả file hoặc nhấp để chọn file"}
        </p>
        <p className="text-xs text-white/50">
          Hỗ trợ PDF, Word, Excel, PowerPoint, Text, JPEG, PNG (Tối đa {maxSize / 1048576}MB)
        </p>
      </div>
    </div>
  );
}
