export interface BlogSection {
  code?: string;
  heading: string;
  content: string;
  content2?: string;
}

export interface BlogPage {
  id: number;
  title: string;
  date?: string;
  tags?: string[];
  author?: string;
  readTime?: string;
  category?: string;
  sections: BlogSection[];
}
