import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { match } from 'ts-pattern';

import { vh } from '~/utils/sizes';

type Props = {
  code: string;
  setCode?: Dispatch<SetStateAction<string>>;
  language?: 'php' | 'html' | 'javascript';
  highlightLines?: number[];
  fontSize?: number;
  lineNumbers?: boolean;
};

export function CodeEditorAlt({
  code,
  setCode,
  language = 'javascript',
  lineNumbers = false,
  fontSize = vh(2.25),
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState('100%');

  useLayoutEffect(() => {
    setHeight(
      containerRef.current?.clientHeight ? `${containerRef.current?.clientHeight}px` : '100%',
    );
  }, []);

  const readOnly = !setCode;
  const extensions = useMemo(
    () =>
      match(language)
        .with('php', () => [php()])
        .with('html', () => [html()])
        .with('javascript', () => [javascript({ jsx: true })])
        .otherwise(() => []),
    [language],
  );

  return (
    <div className="code-editor relative flex flex-col w-full h-full bg-background-code rounded-[.8vh] data-[readonly=true]:pointer-events-none overflow-hidden">
      <div className="flex flex-row gap-[.8vh] p-[1.2vh] pb-[2vh]">
        <div className="flex h-[1.6vh] w-[1.6vh] bg-traffic-red rounded-full" />
        <div className="flex h-[1.6vh] w-[1.6vh] bg-traffic-yellow rounded-full" />
        <div className="flex h-[1.6vh] w-[1.6vh] bg-traffic-green rounded-full" />
      </div>
      <div
        ref={containerRef}
        className="flex flex-1 w-full flex-col [&_.cm-scroller.cm-scroller]:leading-[1.8] overflow-hidden"
        style={{ fontSize }}
      >
        <CodeMirror
          value={code}
          onChange={setCode}
          extensions={extensions}
          theme={vscodeDark}
          height={height}
          readOnly={readOnly}
          basicSetup={{
            highlightActiveLine: !readOnly,
            lineNumbers,
            foldGutter: false,
          }}
        />
      </div>
    </div>
  );
}
