import React, { useState, useRef } from 'react';
import { Upload, Link, Languages, Send } from 'lucide-react';
import { FilePreview } from '../types';

interface Props {
  onGenerate: (prompt: string, files: FilePreview[]) => void;
  isLoading: boolean;
}

export default function ScriptInput({ onGenerate, isLoading }: Props) {
  const [prompt, setPrompt] = useState('');
  const [files, setFiles] = useState<FilePreview[]>([]);
  const [url, setUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(e.target.files || []);
    
    const newFiles = await Promise.all(
      uploadedFiles.map(async (file) => {
        const content = await file.text();
        return {
          id: Math.random().toString(36),
          content,
          type: file.type.includes('image') ? 'image' : 'document',
          filename: file.name
        } as FilePreview;
      })
    );

    setFiles([...files, ...newFiles]);
  };

  const handleUrlAdd = () => {
    if (!url) return;
    
    setFiles([...files, {
      id: Math.random().toString(36),
      content: url,
      type: 'link',
      filename: url
    }]);
    setUrl('');
  };

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;
    onGenerate(prompt, files);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Enter your video script prompt..."
            className="w-full h-32 p-4 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="absolute bottom-2 right-2 flex gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 rounded-full hover:bg-gray-100"
              title="Upload files"
            >
              <Upload size={20} />
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".txt,.pdf,image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter URL to enhance prompt..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button
            type="button"
            onClick={handleUrlAdd}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            <Link size={20} />
          </button>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-semibold">Attached Files:</h3>
            <div className="flex flex-wrap gap-2">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg"
                >
                  <span className="text-sm truncate max-w-[200px]">
                    {file.filename}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFile(file.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
          ) : (
            <>
              <Send size={20} />
              Generate Script
            </>
          )}
        </button>
      </form>
    </div>
  );
}