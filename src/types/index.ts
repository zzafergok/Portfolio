export interface NavItem {
  id: string;
  title: string;
  href: string;
  icon?: React.ReactNode;
  description?: string;
  bgColor?: string;
}

export interface CardProps {
  title: string;
  description: string;
  href: string;
  icon?: React.ReactNode;
  bgColor?: string;
  className?: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  image?: string;
  href: string;
  className?: string;
}

export interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  image?: string;
  href: string;
  className?: string;
}

export interface SkillsCardProps {
  category: string;
  skills: string[];
  icon?: React.ReactNode;
  className?: string;
}

export interface ContactCardProps {
  method: string;
  value: string;
  icon: React.ReactNode;
  href?: string;
  className?: string;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children: React.ReactNode;
}

export interface ThemeSwitcherProps {
  className?: string;
  isCollapsed?: boolean;
}

export interface SidebarProps {
  className?: string;
  isMobile?: boolean;
  onMobileClose?: () => void;
  isLayoutIntegrated?: boolean;
}

export interface HeaderProps {
  className?: string;
}

export interface FooterProps {
  className?: string;
}

export interface DashboardLayoutProps {
  children: React.ReactNode;
}

export type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};
