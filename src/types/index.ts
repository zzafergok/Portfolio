export interface NavItem {
  id: string;
  href: string;
  title: string;
  bgColor?: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface CardProps {
  href: string;
  title: string;
  bgColor?: string;
  className?: string;
  description: string;
  icon?: React.ReactNode;
}

export interface ProjectCardProps {
  href: string;
  title: string;
  image?: string;
  className?: string;
  description: string;
  technologies: string[];
}

export interface BlogCardProps {
  date: string;
  href: string;
  title: string;
  image?: string;
  readTime: string;
  className?: string;
  description: string;
}

export interface SkillsCardProps {
  category: string;
  skills: string[];
  className?: string;
  icon?: React.ReactNode;
}

export interface ContactCardProps {
  value: string;
  href?: string;
  method: string;
  className?: string;
  icon: React.ReactNode;
}

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
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
