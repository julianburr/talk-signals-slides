import { CodeEditorAlt } from '~/components/code-editor-alt';
import { Slide } from '~/components/slide';
import { formatCode } from '~/utils/code';

const code = `
  const counter = new Signal.State(0);
  const parity = new Signal.Computed(
    () => counter.get() % 2 ? "odd" : "even"
  );

  const decrease = () => counter.set(counter.get() - 1);
  const increase = () => counter.set(counter.get() + 1);

  // A library or framework defines effects using low-level primitives
  declare function effect(cb: () => void): (() => void);

  effect(() => window.counter.innerHTML = counter.get());
  effect(() => window.parity.innerHTML = parity.get());
`;

export function CodeProposalSlide() {
  return (
    <Slide source="https://github.com/tc39/proposal-signals">
      <div className="flex flex-1 w-full h-full max-w-[66vw] p-[7vh]">
        <div className="flex w-full h-full">
          <CodeEditorAlt code={formatCode(code)} language="javascript" />
        </div>
      </div>
    </Slide>
  );
}
