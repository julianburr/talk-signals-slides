import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { php } from '@codemirror/lang-php';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';
import CodeMirror from '@uiw/react-codemirror';
import * as pluginBabel from 'prettier/plugins/babel';
import * as pluginEstree from 'prettier/plugins/estree';
import * as pluginHtml from 'prettier/plugins/html';
import * as prettier from 'prettier/standalone';
import {
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type KeyboardEvent,
  type SetStateAction,
} from 'react';
import { match } from 'ts-pattern';

import type { EditorView } from '@uiw/react-codemirror';

import { vh } from '~/utils/sizes';

type Props = {
  code: string;
  setCode?: Dispatch<SetStateAction<string>>;
  language?: 'php' | 'html' | 'javascript';
  highlightLines?: number[];
  fontSize?: number;
  lineNumbers?: boolean;
  onFocus?: () => void;
};

export function CodeEditorAlt({
  code,
  setCode,
  language = 'javascript',
  lineNumbers = false,
  fontSize = vh(2.25),
  onFocus,
}: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<null | EditorView>(null);
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

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    match([e.key, e.metaKey])
      .with(['s', true], async () => {
        // Cmd+S = format code with prettier
        e.preventDefault();
        e.stopPropagation();
        try {
          const formatted = await prettier.format(code, {
            parser: language === 'html' ? 'html' : 'babel',
            plugins:
              language === 'html'
                ? [pluginBabel, pluginEstree, pluginHtml]
                : [pluginBabel, pluginEstree],
            pluginEstree,
          });

          if (viewRef.current) {
            const currentSelection = viewRef.current.state.selection;
            const currentScrollTop = viewRef.current.scrollDOM.scrollTop;
            viewRef.current.dispatch({
              changes: { from: 0, to: viewRef.current.state.doc.length, insert: formatted },
              selection: currentSelection,
            });
            viewRef.current.scrollDOM.scrollTo({ top: currentScrollTop });
          }
        } catch (e) {
          console.error(e);
        }
      })
      .otherwise(() => null);
  };

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
          onCreateEditor={(view) => {
            viewRef.current = view;
          }}
          onKeyDown={handleKeyDown}
          onFocus={onFocus}
          basicSetup={{
            highlightActiveLine: !readOnly,
            lineNumbers,
            foldGutter: false,
            autocompletion: true,
          }}
        />
      </div>
    </div>
  );
}
