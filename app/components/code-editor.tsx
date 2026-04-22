import { Editor } from '@monaco-editor/react';
import { useEffect, useRef, useState, type ComponentProps } from 'react';

import { vh } from '~/utils/sizes';

type Props = {
  initialCode: string;
  readOnly: boolean;
  language?: ComponentProps<typeof Editor>['language'];
  highlightLines?: number[];
  fontSize?: number;
  lineNumbers?: boolean;
};

export function CodeEditor({
  initialCode,
  readOnly,
  language = 'javascript',
  highlightLines,
  fontSize = vh(2.2),
  lineNumbers,
}: Props) {
  const [code, setCode] = useState(initialCode);
  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  const containerRef = useRef<HTMLDivElement>(null);
  const editorRef = useRef<any>(null);
  const lastCode = useRef<string>(code);
  useEffect(() => {
    if (code !== lastCode.current) {
      editorRef.current?.setValue(code);
      setCode(code);
    }
    lastCode.current = code;
  }, [code]);

  const codeContainerRef = useRef<HTMLDivElement>(null);
  const highlightTopRef = useRef<HTMLDivElement>(null);
  const highlightBottomRef = useRef<HTMLDivElement>(null);

  const showHighlightLines = (lines?: number[]) => {
    if (!editorRef.current) {
      return;
    }

    const topRef = highlightTopRef.current;
    const bottomRef = highlightBottomRef.current;

    if (topRef && bottomRef) {
      if (lines) {
        const top = editorRef.current?.getTopForLineNumber(lines[0]);
        const bottom = editorRef.current?.getTopForLineNumber(lines[1] + 1);
        if (top !== undefined && bottom !== undefined) {
          topRef.style.height = `${top}px`;
          bottomRef.style.top = `${bottom}px`;

          const revealLine = Math.min(lines[0] + 6, Math.floor((lines[0] + lines[1]) / 2));

          editorRef.current?.revealLineInCenter(revealLine);
        }
      } else {
        topRef.style.height = '0px';
        bottomRef.style.top = '100%';

        editorRef.current?.revealLineNearTop(0);
      }
    }
  };

  return (
    <div
      data-readonly={readOnly}
      className="editor--loading relative flex flex-col w-full h-full bg-background-code p-[1.6vh] rounded-[.8vh] data-[readonly=true]:pointer-events-none"
    >
      <div className="flex flex-row gap-[.8vh] pb-[2vh]">
        <div className="flex h-[1.6vh] w-[1.6vh] bg-traffic-red rounded-full" />
        <div className="flex h-[1.6vh] w-[1.6vh] bg-traffic-yellow rounded-full" />
        <div className="flex h-[1.6vh] w-[1.6vh] bg-traffic-green rounded-full" />
      </div>

      <div ref={containerRef} className="flex flex-1 relative">
        <div
          ref={highlightTopRef}
          className="absolute top-0 left-0 right-0 bg-(--vscode-editor-background) opacity-80 z-10 pointer-events-none"
        />
        <div
          ref={highlightBottomRef}
          className="absolute bottom-0 left-0 right-0 bg-(--vscode-editor-background) opacity-80 z-10 pointer-events-none"
        />

        <Editor
          width="100%"
          height="100%"
          language={language}
          theme="vs-dark"
          options={{
            lineNumbers: lineNumbers ? 'on' : 'off',
            fontFamily: 'var(--font-mono)',
            fontSize,
            lineHeight: 1.8,
            smoothScrolling: true,
            minimap: { enabled: false },
            guides: { indentation: false },
            stickyScroll: { enabled: false },
            scrollbar: { vertical: 'hidden', horizontal: 'hidden' },
            overviewRulerLanes: 0,
            hideCursorInOverviewRuler: true,
            overviewRulerBorder: false,
            renderLineHighlight: 'none',
            tabIndex: -1,
            readOnly,
          }}
          defaultValue={code}
          onChange={(value) => setCode(value || '')}
          onMount={(editor) => {
            editorRef.current = editor;

            console.log(editor);

            codeContainerRef.current = window.document.querySelector(
              '.monaco-editor .lines-content',
            );
            codeContainerRef.current?.appendChild(highlightTopRef.current!);
            codeContainerRef.current?.appendChild(highlightBottomRef.current!);

            setTimeout(() => {
              codeContainerRef.current?.classList.remove('editor--loading');
              showHighlightLines(highlightLines);
            });
          }}
        />
      </div>
    </div>
  );
}
