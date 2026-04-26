import React, { useState, useEffect } from 'react';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs';
import 'prismjs/components/prism-javascript';
import 'prismjs/themes/prism-tomorrow.css';
import { Play, RotateCcw, AlertTriangle, Terminal as TerminalIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PlaygroundProps {
  initialCode: string;
  onRun?: (code: string) => void;
}

export const Playground: React.FC<PlaygroundProps> = ({ initialCode }) => {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
  }, [initialCode]);

  const runCode = () => {
    const logs: string[] = [];
    setOutput([]);
    setError(null);

    // Mock console.log
    const mockConsole = {
      log: (...args: any[]) => {
        logs.push(args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
        ).join(' '));
      }
    };

    try {
      const execute = new Function('console', code);
      execute(mockConsole);
      setOutput(logs);
      if (logs.length === 0) setOutput(['Code executed successfully (no output).']);
    } catch (err: any) {
      let hint = err.message;
      if (hint.includes('is not defined')) {
        hint += ". Check your variable declaration scope.";
      } else if (hint.includes('Unexpected token')) {
        hint += ". Check for missing braces or semicolons.";
      }
      setError(hint);
    }
  };

  const resetCode = () => {
    setCode(initialCode);
    setOutput([]);
    setError(null);
  };

  return (
    <div className="flex flex-col h-full bg-zinc-900 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 h-10 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2">
          <button 
            onClick={runCode}
            className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 text-[11px] font-bold uppercase tracking-widest transition-all transform active:scale-95 group"
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse group-hover:scale-125" />
            Run Code
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={resetCode}
            className="text-[10px] font-bold text-zinc-500 hover:text-zinc-300 uppercase tracking-tighter"
          >
            Reset
          </button>
          <span className="text-[11px] font-mono text-zinc-600 hidden xs:inline">index.js</span>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-[#1e1e1e] font-mono text-sm relative scrollbar-thin scrollbar-thumb-zinc-800">
        <Editor
          value={code}
          onValueChange={setCode}
          highlight={code => highlight(code, languages.js, 'javascript')}
          padding={20}
          style={{
            fontFamily: '"Fira Code", "JetBrains Mono", monospace',
            minHeight: '100%',
          } as React.CSSProperties}
          className="editor-content"
          id="code-editor"
        />
      </div>

      <div className="h-36 sm:h-40 border-t border-zinc-800 flex flex-col bg-black/40 font-mono text-xs">
        <div className="flex items-center gap-2 px-4 py-2 border-b border-zinc-800 text-zinc-500">
          <TerminalIcon size={12} />
          <span className="uppercase tracking-widest text-[10px]">Terminal Output</span>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin scrollbar-thumb-zinc-800">
          <AnimatePresence mode="popLayout">
            {error ? (
              <motion.div 
                initial={{ opacity: 0, x: -5 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-2 text-red-400 bg-red-400/5 p-2 rounded border border-red-400/10"
              >
                <AlertTriangle size={14} className="shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            ) : (
              output.map((line, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-emerald-400/90"
                >
                  <span className="text-zinc-600 mr-2">&gt;</span>
                  {line}
                </motion.div>
              ))
            )}
          </AnimatePresence>
          {!error && output.length === 0 && (
            <div className="text-zinc-600 italic mt-1 ml-4 opacity-50 text-[10px]">Ready for execution...</div>
          )}
        </div>
      </div>
    </div>
  );
};
