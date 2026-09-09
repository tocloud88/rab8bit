import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  className?: string;
  label?: string;
}

export default function CopyButton({ text, className = '', label = '프롬프트 복사하기' }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all shadow-md active:scale-95 cursor-pointer ${
        copied
          ? 'bg-emerald-600 text-white shadow-emerald-600/30'
          : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/30'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" />
          <span>복사되었습니다!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
}
