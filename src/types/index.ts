// Định nghĩa các kiểu dữ liệu chung cho ứng dụng

export interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'purple' | 'pink' | 'orange';
  linkText?: string;
  linkHref?: string;
}

export interface StatItemProps {
  value: string;
  label: string;
  color: 'blue' | 'purple' | 'pink' | 'orange';
  target: string;
  suffix: string;
}

export interface FooterLinkProps {
  href: string;
  label: string;
}

export interface FooterLinkGroupProps {
  title: string;
  links: FooterLinkProps[];
}

export interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
}

// Types cho quản lý tài liệu
export interface Document {
  id: number;
  userId: number;
  title: string;
  description?: string;
  fileType: string;
  fileSize: number;
  driveFileId: string;
  driveViewLink?: string;
  driveDownloadLink?: string;
  isPublic: boolean;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DocumentFormData {
  title: string;
  description?: string;
  file: File;
  isPublic: boolean;
  tags?: string;
}

export interface UploadResponse {
  success: boolean;
  document?: Document;
  error?: string;
}

export interface DocumentsResponse {
  success: boolean;
  documents: Document[];
  error?: string;
}

export interface DocumentResponse {
  success: boolean;
  document?: Document;
  error?: string;
}

export interface FileUploadState {
  isUploading: boolean;
  progress: number;
  error: string | null;
}
