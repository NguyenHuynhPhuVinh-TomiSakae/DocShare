"use client";

import { FileUploadState } from "@/types";

interface UploadProgressProps {
  uploadState: FileUploadState;
}

export function UploadProgress({ uploadState }: UploadProgressProps) {
  const { isUploading, progress, error } = uploadState;

  if (!isUploading && !error) return null;

  return (
    <div className="mt-4 w-full">
      {isUploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-white/70">Đang tải lên...</span>
            <span className="text-white/70">{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
      
      {error && (
        <div className="p-3 bg-destructive/20 border border-destructive/50 rounded-md mt-2">
          <p className="text-sm text-destructive-foreground">{error}</p>
        </div>
      )}
    </div>
  );
}
