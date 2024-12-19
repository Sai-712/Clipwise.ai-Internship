import React, { useState } from 'react';
import { Script, FilePreview } from './types';
import ScriptInput from './components/ScriptInput';
import ScriptOutput from './components/ScriptOutput';
import SavedScripts from './components/SavedScripts';
import { PenTool } from 'lucide-react';

// Mock function to simulate AI script generation
const generateScript = async (prompt: string, files: FilePreview[]): Promise<Script> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return {
    id: Math.random().toString(36),
    title: `Script: ${prompt.slice(0, 30)}...`,
    content: `Generated script based on prompt: "${prompt}"\n\nThis is a mock script generation. In a real implementation, this would be replaced with actual AI-generated content based on the prompt and any uploaded files/links.\n\nFiles used:\n${files.map(f => `- ${f.filename}`).join('\n')}`,
    language: 'en',
    createdAt: new Date().toISOString()
  };
};

function App() {
  const [currentScript, setCurrentScript] = useState<Script | null>(null);
  const [savedScripts, setSavedScripts] = useState<Script[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async (prompt: string, files: FilePreview[]) => {
    setIsLoading(true);
    try {
      const script = await generateScript(prompt, files);
      setCurrentScript(script);
      setSavedScripts([script, ...savedScripts]);
    } catch (error) {
      console.error('Failed to generate script:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2">
            <PenTool className="text-blue-500" size={24} />
            <h1 className="text-xl font-bold">AI Video Script Generator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-8 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <ScriptInput onGenerate={handleGenerate} isLoading={isLoading} />
            <SavedScripts scripts={savedScripts} onSelect={setCurrentScript} />
          </div>
          <div>
            <ScriptOutput script={currentScript} />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;