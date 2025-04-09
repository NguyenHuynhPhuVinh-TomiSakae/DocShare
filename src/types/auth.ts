// Định nghĩa các kiểu dữ liệu cho phần xác thực
export interface AuthInputProps {
  type: string;
  id: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  required?: boolean;
}

export interface AuthButtonProps {
  type: "button" | "submit" | "reset";
  onClick?: () => void;
  children: React.ReactNode;
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "outline";
  className?: string;
}

export interface AuthSocialLoginProps {
  provider: "google" | "facebook" | "github";
  label: string;
}

export interface AuthFooterProps {
  question: string;
  linkText: string;
  linkHref: string;
}

export interface AuthFormProps {
  children: React.ReactNode;
  onSubmit: (e: React.FormEvent) => void;
}

export interface AuthBackgroundProps {
  variant?: "login" | "register";
}

export interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  variant?: "login" | "register";
}
