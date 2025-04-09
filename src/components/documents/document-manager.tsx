"use client";

import { useState } from "react";
import { DocumentList } from "./document-list";
import { UploadDocumentForm } from "./upload-document-form";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function DocumentManager() {
  const [showUploadDialog, setShowUploadDialog] = useState(false);

  // Xử lý khi tải lên thành công
  const handleUploadSuccess = () => {
    setShowUploadDialog(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold">Quản lý tài liệu</h2>
          <p className="text-white/70 text-sm sm:text-base mt-1">
            Tải lên, quản lý và chia sẻ tài liệu của bạn
          </p>
        </div>
        <Button onClick={() => setShowUploadDialog(true)} className="sm:self-end">
          <FileUp className="h-4 w-4 mr-2" />
          Tải tài liệu lên
        </Button>
      </div>

      <Tabs defaultValue="my-documents" className="w-full">
        <TabsList className="grid grid-cols-2 w-full max-w-md">
          <TabsTrigger value="my-documents">Tài liệu của tôi</TabsTrigger>
          <TabsTrigger value="public-documents">Tài liệu công khai</TabsTrigger>
        </TabsList>
        <TabsContent value="my-documents" className="pt-4">
          <DocumentList onUploadClick={() => setShowUploadDialog(true)} />
        </TabsContent>
        <TabsContent value="public-documents" className="pt-4">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle>Tài liệu công khai</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70">
                Tính năng xem tài liệu công khai sẽ sớm được cập nhật.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dialog tải tài liệu lên */}
      <Dialog open={showUploadDialog} onOpenChange={setShowUploadDialog}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] bg-black border-white/10 overflow-hidden flex flex-col">
          <DialogHeader>
            <DialogTitle>Tải tài liệu lên</DialogTitle>
            <DialogDescription>
              Tải tài liệu lên và chia sẻ với mọi người
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto pr-1 -mr-1">
            <UploadDocumentForm
              onSuccess={handleUploadSuccess}
              onCancel={() => setShowUploadDialog(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
