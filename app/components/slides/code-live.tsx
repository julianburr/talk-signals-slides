import * as pluginBabel from 'prettier/plugins/babel';
import * as pluginEstree from 'prettier/plugins/estree';
import * as pluginHtml from 'prettier/plugins/html';
import * as prettier from 'prettier/standalone';
import { useEffect, useRef, useState } from 'react';

import IconHtmlSvg from '~/assets/illustrations/icon-html.svg?react';
import IconJsSvg from '~/assets/illustrations/icon-js.svg?react';
import { CodeEditorAlt } from '~/components/code-editor-alt';
import { formatCode } from '~/utils/code';

const initialIndexCode = `
  <button id="one">Counter 1: <span id="valueone">0</span></button>
  <button id="two">Counter 2: <span id="valuetwo">0</span></button>
  <button id="both">Increase both</button>

  <p>Sum: <span id="sum">0</span></p>
  <p>Parity: <span id="parity">even</span></p>

  <script type="module">
    import { signal, computed, effect } from "./signal.js";

    const count1 = signal(0);
    const count2 = signal(0);
    const sum = computed(() => count1.get() + count2.get());
    const parity = computed(() => (sum.get() % 2 === 0 ? "even" : "odd"));

    window.one.onclick = () => count1.set(count1.get() + 1);
    window.two.onclick = () => count2.set(count2.get() + 1);
    window.both.onclick = () => {
      count1.set(count1.get() + 1);
      count2.set(count2.get() + 1);
    };

    effect(() => (window.valueone.textContent = count1.get()));
    effect(() => (window.valuetwo.textContent = count2.get()));
    effect(() => (window.sum.textContent = sum.get()));
    effect(() => (window.parity.textContent = parity.get()));

    effect(() => console.log({ parity: parity.get() }));
  </script>

`;

const initialSignalCode = `
  let currentEffect = null;

  function signal(initialValue) {
    let value = initialValue;
    let subscribers = [];
    return {
      get: () => {
        if (currentEffect) {
          subscribers.push(currentEffect);
        }
        return value;
      },
      set: (newValue) => {
        value = newValue;
        subscribers.forEach((subscriber) => subscriber());
      },
    };
  }

  function computed(fn) {
    return {
      get: () => fn(),
    };
  }

  function effect(fn) {
    currentEffect = fn;
    fn();
    currentEffect = null;
  }

  export { signal, computed, effect };
`;

export function CodeLiveSlide() {
  const [file, setFile] = useState('index.html');

  const [indexCode, setIndexCode] = useState(formatCode(initialIndexCode));
  const [signalCode, setSignalCode] = useState(formatCode(initialSignalCode));

  const code = file === 'index.html' ? indexCode : signalCode;
  const setCode = file === 'index.html' ? setIndexCode : setSignalCode;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      console.log({ e, key: e.key, metaKey: e.metaKey });
      if (e.key === 's' && e.metaKey) {
        console.log({ indexCode, signalCode });
        Promise.all([
          prettier.format(indexCode, {
            parser: 'html',
            plugins: [pluginBabel, pluginEstree, pluginHtml],
          }),
          prettier.format(signalCode, {
            parser: 'babel',
            plugins: [pluginBabel, pluginEstree],
          }),
        ])
          .then(([formattedIndexCode, formattedSignalCode]) => {
            console.log({ formattedIndexCode, formattedSignalCode });
            setIndexCode(formattedIndexCode);
            setSignalCode(formattedSignalCode);
          })
          .catch(console.error);
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, []);

  const [previewCode, setPreviewCode] = useState('');
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    clearTimeout(debounceTimer.current!);

    debounceTimer.current = setTimeout(() => {
      setPreviewCode(`
        ${indexCode
          .split('\n')
          .map((line) => (line.trim().startsWith('import') ? signalCode : line))
          .join('\n')}
      `);
    }, 500);
  }, [indexCode, signalCode]);

  const previewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (previewRef.current) {
      previewRef.current.innerHTML = previewCode;

      Array.from(previewRef.current.querySelectorAll('script')).forEach((oldScriptEl) => {
        const newScriptEl = document.createElement('script');

        Array.from(oldScriptEl.attributes).forEach((attr) => {
          newScriptEl.setAttribute(attr.name, attr.value);
        });

        const scriptText = document.createTextNode(oldScriptEl.innerHTML);
        newScriptEl.appendChild(scriptText);

        oldScriptEl.parentNode?.replaceChild(newScriptEl, oldScriptEl);
      });
    }
  }, [previewCode]);

  return (
    <div className="flex flex-row w-full h-full">
      <div className="p-[2vh] flex w-[60vw] h-full relative">
        <div className="absolute z-100 top-[3.6vh] left-[14vh] flex flex-row gap-[2.4vh] text-foreground-code font-mono text-[1.6vh]">
          <button
            data-active={file === 'index.html'}
            onClick={() => setFile('index.html')}
            className="flex flex-row items-center gap-[.5vh] transition-all duration-120 opacity-[.4] cursor-pointer hover:opacity-100 focus:opacity-100 data-[active=true]:opacity-100"
          >
            <IconHtmlSvg
              data-active={file === 'index.html'}
              className='h-[.9lh] w-auto transition-all duration-120 grayscale-[1] data-[active="true"]:grayscale-[0]'
            />
            <span>index.html</span>
          </button>
          <button
            data-active={file === 'signal.js'}
            onClick={() => setFile('signal.js')}
            className="flex flex-row items-center gap-[.5vh] transition-all duration-120 opacity-[.4] data-[active=true]:opacity-100 cursor-pointer hover:opacity-100 focus:opacity-100"
          >
            <IconJsSvg
              data-active={file === 'signal.js'}
              className='h-[.9lh] w-auto transition-all duration-120 grayscale-[1] data-[active="true"]:grayscale-[0]'
            />
            <span>signal.js</span>
          </button>
        </div>
        <CodeEditorAlt
          code={code}
          setCode={setCode}
          language={file === 'index.html' ? 'html' : 'javascript'}
          lineNumbers
        />
      </div>

      <div
        ref={previewRef}
        className="code-live-preview flex flex-1 flex-col items-center justify-center h-full"
      />
    </div>
  );
}
