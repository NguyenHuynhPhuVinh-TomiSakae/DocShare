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
