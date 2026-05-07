/* eslint-disable max-lines */
import { useEffect, useRef, useState } from 'react';
import { match, P } from 'ts-pattern';

import IconHtmlSvg from '~/assets/illustrations/icon-html.svg?react';
import IconJsSvg from '~/assets/illustrations/icon-js.svg?react';
import { CodeEditorAlt } from '~/components/code-editor-alt';
import { formatCode } from '~/utils/code';

const codeSnapshots = [
  // Cmd+0 = Start
  [
    formatCode(`
      <button id="buttonone">Counter: <span id="valueone">0</span></button>

      <p>Parity: <span id="parity">even</span></p>

      <script type="module">
      </script>
    `),
    '',
  ],

  // Cmd+1
  [
    formatCode(`
      <button id="buttonone">Counter: <span id="valueone">0</span></button>

      <p>Parity: <span id="parity">even</span></p>

      <script type="module">
        window.buttonone.onclick = () => {
          const value1 = parseInt(window.valueone.textContent);
          const newValue1 = value1 + 1;
          const newParity = newValue1 % 2 === 0 ? "even" : "odd";

          window.valueone.textContent = newValue1;
          window.parity.textContent = newParity;
        };
      </script>
    `),
    '',
  ],

  // Cmd+2
  [
    formatCode(`
      <button id="buttonone">Counter: <span id="valueone">0</span></button>
      <button id="buttontwo">Counter: <span id="valuetwo">0</span></button>

      <p>Sum: <span id="sum">0</span></p>
      <p>Parity: <span id="parity">even</span></p>

      <script type="module">
        window.buttonone.onclick = () => {
          const value1 = parseInt(window.valueone.textContent);
          const value2 = parseInt(window.valueone.textContent);
          const newValue1 = value1 + 1;
          const newSum = newValue1 + value2;
          const newParity = newSum % 2 === 0 ? "even" : "odd";

          window.valueone.textContent = newValue1;
          window.sum.textContent = newSum;
          window.parity.textContent = newParity;
        };
      </script>
    `),
    '',
  ],

  // Cmd+3
  [
    formatCode(`
      <button id="buttonone">Counter: <span id="valueone">0</span></button>
      <button id="buttontwo">Counter: <span id="valuetwo">0</span></button>
      <button id="buttonboth">Increase both</button>

      <p>Sum: <span id="sum">0</span></p>
      <p>Parity: <span id="parity">even</span></p>

      <script type="module">
        window.buttonone.onclick = () => {
          const value1 = parseInt(window.valueone.textContent);
          const value2 = parseInt(window.valuetwo.textContent);
          const newValue1 = value1 + 1;
          const newSum = newValue1 + value2;
          const newParity = newSum % 2 === 0 ? "even" : "odd";

          window.valueone.textContent = newValue1;
          window.sum.textContent = newSum;
          window.parity.textContent = newParity;
        };

        window.buttontwo.onclick = () => {
          const value1 = parseInt(window.valueone.textContent);
          const value2 = parseInt(window.valuetwo.textContent);
          const newValue2 = value2 + 1;
          const newSum = value1 + newValue2;
          const newParity = newSum % 2 === 0 ? "even" : "odd";

          window.valuetwo.textContent = newValue2;
          window.sum.textContent = newSum;
          window.parity.textContent = newParity;
        };

        window.buttonboth.onclick = () => {
          const value1 = parseInt(window.valueone.textContent);
          const value2 = parseInt(window.valuetwo.textContent);
          const newValue1 = value1 + 1;
          const newValue2 = value2 + 1;
          const newSum = newValue1 + newValue2;
          const newParity = newSum % 2 === 0 ? "even" : "odd";

          window.valueone.textContent = newValue1;
          window.valuetwo.textContent = newValue2;
          window.sum.textContent = newSum;
          window.parity.textContent = newParity;
        };
      </script>
    `),
    '',
  ],

  // Cmd+4
  [
    formatCode(`
      <button id="buttonone">Counter: <span id="valueone">0</span></button>
      <button id="buttontwo">Counter: <span id="valuetwo">0</span></button>
      <button id="buttonboth">Increase both</button>

      <p>Sum: <span id="sum">0</span></p>
      <p>Parity: <span id="parity">even</span></p>

      <script type="module">
        import { signal, computed, effect } from './signal.js';

        const value1 = signal(0);
        const value2 = signal(0);
        const sum = computed(() => value1.get() + value2.get());
        const parity = computed(() => sum.get() % 2 === 0 ? "even" : "odd");

        effect(() => (window.valueone.textContent = value1.get()));
        effect(() => (window.valuetwo.textContent = value2.get()));
        effect(() => (window.sum.textContent = sum.get()));
        effect(() => (window.parity.textContent = parity.get()));

        window.buttonone.onclick = () => value1.set(value1.get() + 1);
        window.buttontwo.onclick = () => value2.set(value2.get() + 1);
        window.buttonboth.onclick = () => {
          value1.set(value1.get() + 1);
          value2.set(value2.get() + 1);
        };
      </script>
    `),
    '',
  ],

  // Cmd+5
  [
    formatCode(`
      <button id="buttonone">Counter: <span id="valueone">0</span></button>
      <button id="buttontwo">Counter: <span id="valuetwo">0</span></button>
      <button id="buttonboth">Increase both</button>

      <p>Sum: <span id="sum">0</span></p>
      <p>Parity: <span id="parity">even</span></p>

      <script type="module">
        import { signal, computed, effect } from './signal.js';

        const value1 = signal(0);
        const value2 = signal(0);
        const sum = computed(() => value1.get() + value2.get());
        const parity = computed(() => sum.get() % 2 === 0 ? "even" : "odd");

        effect(() => (window.valueone.textContent = value1.get()));
        effect(() => (window.valuetwo.textContent = value2.get()));
        effect(() => (window.sum.textContent = sum.get()));
        effect(() => (window.parity.textContent = parity.get()));

        window.buttonone.onclick = () => value1.set(value1.get() + 1);
        window.buttontwo.onclick = () => value2.set(value2.get() + 1);
        window.buttonboth.onclick = () => {
          value1.set(value1.get() + 1);
          value2.set(value2.get() + 1);
        };
      </script>
    `),
    formatCode(`
      let currentEffect = null;

      export function signal(initialValue) {
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
            subscribers.forEach((fn) => fn());
          },
        };
      }

      export function computed(fn) {
        return {
          get: () => {
            return fn();
          },
        };
      }

      export function effect(fn) {
        currentEffect = fn;
        fn();
        currentEffect = null;
      }
    `),
  ],
];

type Props = {
  step: number;
};

export function CodeLiveSlide({ step }: Props) {
  const [file, setFile] = useState('index.html');

  const [indexCode, setIndexCode] = useState(codeSnapshots[0][0]);
  const [signalCode, setSignalCode] = useState(codeSnapshots[0][1]);

  useEffect(() => {
    setIndexCode(codeSnapshots[step][0]);
    setSignalCode(codeSnapshots[step][1]);
  }, [step]);

  const code = file === 'index.html' ? indexCode : signalCode;
  const setCode = file === 'index.html' ? setIndexCode : setSignalCode;

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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      match([e.key, e.metaKey, e.ctrlKey])
        .with(['r', true, false], () => {
          e.preventDefault();
          e.stopPropagation();
        })
        .with([P.union('0', '1', '2', '3', '4', '5'), false, true], () => {
          e.preventDefault();
          e.stopPropagation();
          const index = parseInt(e.key);
          setIndexCode(codeSnapshots[index][0]);
          setSignalCode(codeSnapshots[index][1]);
        })
        .otherwise(() => null);
    };

    window.document.addEventListener('keydown', handleKeyDown);
    return () => window.document.removeEventListener('keydown', handleKeyDown);
  }, []);

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
          key={file}
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
