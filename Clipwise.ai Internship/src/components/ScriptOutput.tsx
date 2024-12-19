import React from 'react';
import { Download, Copy } from 'lucide-react';
import { Script } from '../types';

interface Props {
  script: Script | null;
}

export default function ScriptOutput({ script }: Props) {
  if (!script) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(script.content);
  };

  const handleDownload = () => {
    const blob = new Blob([script.content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${script.title}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{script.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Copy to clipboard"
          >
            <Copy size={20} />
          </button>
          <button
            onClick={handleDownload}
            className="p-2 hover:bg-gray-100 rounded-full"
            title="Download as TXT"
          >
            <Download size={20} />
          </button>
        </div>
      </div>
      <div className="bg-white p-4 rounded-lg border whitespace-pre-wrap">
        {script.content}
      </div>
    </div>
  );
}