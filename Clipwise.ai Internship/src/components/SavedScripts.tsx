import React, { useState } from 'react';
import { Script } from '../types';
import { Clock, Search } from 'lucide-react';

interface Props {
  scripts: Script[];
  onSelect: (script: Script) => void;
}

export default function SavedScripts({ scripts, onSelect }: Props) {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const scriptsPerPage = 5;

  const filteredScripts = scripts.filter(script =>
    script.title.toLowerCase().includes(search.toLowerCase()) ||
    script.content.toLowerCase().includes(search.toLowerCase())
  );

  const paginatedScripts = filteredScripts.slice(
    (page - 1) * scriptsPerPage,
    page * scriptsPerPage
  );

  const totalPages = Math.ceil(filteredScripts.length / scriptsPerPage);

  return (
    <div className="w-full max-w-3xl mx-auto p-4 space-y-4">
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-semibold">Saved Scripts</h2>
        <div className="flex-1 relative">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search scripts..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      <div className="space-y-2">
        {paginatedScripts.map((script) => (
          <div
            key={script.id}
            onClick={() => onSelect(script)}
            className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-medium">{script.title}</h3>
              <div className="flex items-center text-sm text-gray-500">
                <Clock size={16} className="mr-1" />
                {new Date(script.createdAt).toLocaleDateString()}
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">
              {script.content}
            </p>
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}