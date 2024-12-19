export interface Script {
  id: string;
  content: string;
  title: string;
  language: string;
  createdAt: string;
}

export interface FilePreview {
  id: string;
  content: string;
  type: 'document' | 'image' | 'link';
  filename: string;
}