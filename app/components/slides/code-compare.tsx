import { match, P } from 'ts-pattern';

import { CodeEditorAlt } from '~/components/code-editor-alt';
import { Slide } from '~/components/slide';
import { formatCode } from '~/utils/code';

type Props = {
  step: number;
};

export function CodeCompare({ step }: Props) {
  const codeLeft = match(step)
    .with(
      0,
      () =>
        `
          let counter = 1;
          let isEven = counter % 2 === 0;
          let parity = isEven ? "even" : "odd";
        `,
    )
    .with(
      1,
      () =>
        `
          let counter = 1;
          let isEven = counter % 2 === 0;
          let parity = isEven ? "even" : "odd";

          // Whenever counter changes
          counter = 6;
        `,
    )
    .with(
      P.number.gt(1),
      () =>
        `
          let counter = 1;
          let isEven = counter % 2 === 0;
          let parity = isEven ? "even" : "odd";

          // Whenever counter changes
          counter = 6;
          isEven = counter % 2 === 0;
          parity = isEven ? "even" : "odd";
        `,
    )
    .otherwise(() => ``);

  const codeRight = match(step)
    .with(
      3,
      () =>
        `
          let counter = 1;
          const isEven $= counter % 2 === 0;
          const parity $= isEven ? "even" : "odd";
        `,
    )
    .with(
      4,
      () =>
        `
          let counter = 1;
          const isEven $= counter % 2 === 0;
          const parity $= isEven ? "even" : "odd";

          // Changing \`counter\` triggers re-calc
          counter = 6;
          // → isEven = true
          // → parity = "even"
        `,
    )
    .otherwise(() => ``);

  return (
    <Slide source="https://en.wikipedia.org/wiki/Reactive_programming">
      <div className="grid grid-cols-2 gap-[2vh] w-[80vw] text-[2.6vh]">
        <div className="flex w-full h-[40vh]">
          <CodeEditorAlt code={formatCode(codeLeft)} />
        </div>
        <div className="flex w-full h-[40vh]">
          <CodeEditorAlt code={formatCode(codeRight)} />
        </div>
      </div>
    </Slide>
  );
}
