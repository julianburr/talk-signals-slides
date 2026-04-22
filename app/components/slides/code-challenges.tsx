import classNames from 'classnames';
import { match, P } from 'ts-pattern';

import ArrowDownSvg from '~/assets/illustrations/arrow-down.svg?react';
import { CodeEditorAlt } from '~/components/code-editor-alt';
import { formatCode } from '~/utils/code';

type Props = {
  step: number;
};

export function CodeChallengesSlide({ step }: Props) {
  const code = match(step)
    .with(
      P.number.between(0, 4),
      () => `
        const counter = signal(0);
        const increased = computed(() => 
          counter.get() + 1);

        const isGreater = computed(() => 
          increased.get() > counter.get());

        counter.set(1);

        // Depending on the order the computed 
        // values will be re-calculated, you can
        // end up in a glitch state where 
        // isGreater.get() equals false 🙈
      `,
    )
    .with(
      P.number.between(5, 7),
      () => `
        const counter1 = signal(0);
        const counter2 = signal(0);
        const sum = computed(() =>
          counter1.get() + counter2.get());

        effect(() => console.log(\`Sum: $\{sum.get()\}\`);

        const increaseBoth = (amount) => {
          counter1.set(counter1.get() + amount);
          counter2.set(counter2.get() + amount);
        };

        increaseBoth(2);
        // Sum: 2
        // Sum: 4
      `,
    )
    .with(
      8,
      () => `
        const counter = signal(0);
        const isEven = computed(() => 
          counter.get() % 2 === 0);
        const parity = computed(() => 
          isEven.get() ? "even" : "odd");

        counter.set(3);
        // isEven = false
        // parity = "odd"
      `,
    )
    .with(
      P.number.between(9, 10),
      () => `
        const counter = signal(0);
        const isEven = computed(() => 
          counter.get() % 2 === 0);
        const parity = computed(() => 
          isEven.get() ? "even" : "odd");

        counter.set(3);
        // isEven = false
        // parity = "odd"

        counter.set(7);
        // isEven = false
        // parity = "odd"
      `,
    )
    .otherwise(() => '');

  const diagram = match(step)
    .with(P.number.between(1, 4), () => (
      <div className="w-full flex flex-col items-center justify-center gap-[1.2vh]">
        <p className="text-[3.2vh] pl-[8vw] mb-[4vh] font-handwriting text-center rotate-2">
          The order of recalculation matters
        </p>

        <div className="font-mono rounded-[.6rem] bg-[#F3F0EC] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          counter = 0
        </div>
        <div className="font-mono rounded-[.6rem] bg-[#d9edf4] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          increased = 1
        </div>
        <div className="font-mono rounded-[.6rem] bg-[#d9edf4] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          isGreater = 1 &gt; 0 = true
        </div>

        <ArrowDownSvg
          className={classNames('h-[4vh] w-auto my-[2vh]', { 'opacity-0': step < 2 })}
        />

        <div
          className={classNames(
            'font-mono rounded-[.6rem] bg-[#F3F0EC] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]',
            { 'opacity-0': step < 2 },
          )}
        >
          counter = 1
        </div>
        <div
          className={classNames(
            'font-mono rounded-[.6rem] bg-[#f4d9db] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]',
            { 'opacity-0': step < 3 },
          )}
        >
          isGreater = 1 &gt; 1 = false
        </div>
        <div
          className={classNames(
            'font-mono rounded-[.6rem] bg-[#f4d9db] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]',
            { 'opacity-0': step < 4 },
          )}
        >
          increased = 2
        </div>
      </div>
    ))
    .with(P.number.between(5, 7), () => (
      <div className="w-full flex flex-col items-center justify-center gap-[1.2vh]">
        <p className="text-[3.2vh] pl-[2vw] pr-[6vw] mb-[4vh] font-handwriting text-center -rotate-2">
          Unbatched changes lead to intermediate glitches
        </p>

        <div className="font-mono rounded-[.6rem] bg-[#F3F0EC] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          counter1 = 0
        </div>
        <div className="font-mono rounded-[.6rem] bg-[#F3F0EC] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          counter2 = 0
        </div>
        <div className="font-mono rounded-[.6rem] bg-[#d9edf4] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          sum = 0 + 0 = 0
        </div>
        <ArrowDownSvg className={classNames('h-[4vh] w-auto', { 'opacity-0': step < 6 })} />
        <div
          className={classNames(
            'font-mono rounded-[.6rem] bg-[#F3F0EC] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]',
            { 'opacity-0': step < 6 },
          )}
        >
          counter1 = 0
        </div>
        <div
          className={classNames(
            'font-mono rounded-[.6rem] bg-[#f4d9db] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]',
            { 'opacity-0': step < 6 },
          )}
        >
          sum = 1 + 0 = 1
        </div>
        <ArrowDownSvg className={classNames('h-[4vh] w-auto', { 'opacity-0': step < 7 })} />
        <div
          className={classNames(
            'font-mono rounded-[.6rem] bg-[#F3F0EC] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]',
            { 'opacity-0': step < 7 },
          )}
        >
          counter2 = 0
        </div>
        <div
          className={classNames(
            'font-mono rounded-[.6rem] bg-[#d9edf4] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]',
            { 'opacity-0': step < 7 },
          )}
        >
          sum = 1 + 1 = 2
        </div>
      </div>
    ))
    .with(P.number.between(8, 10), () => (
      <div className="w-full flex flex-col items-center justify-center gap-[1.2vh]">
        <p className="text-[3.2vh] pl-[3vw] pr-[2vw] mb-[3vh] font-handwriting text-center rotate-1">
          Recalculation can be skipped if none of the dependencies are dirty
        </p>

        <div className="font-mono rounded-[.6rem] bg-[#F3F0EC] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          counter = 3
        </div>
        <div className="font-mono rounded-[.6rem] bg-[#d9edf4] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          isEven = 3 % 2 === 0 = false
        </div>
        <div className="font-mono rounded-[.6rem] bg-[#d9edf4] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
          parity = odd
        </div>
        <ArrowDownSvg
          className={classNames('h-[4vh] w-auto my-[2vh]', { 'opacity-0': step < 9 })}
        />
        <div
          className={classNames('flex flex-row items-center gap-[1.2vh] relative', {
            'opacity-0': step < 9,
          })}
        >
          <div className="font-mono rounded-[.6rem] bg-[#F3F0EC] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
            counter = 7
          </div>
          <div className="font-mono rounded-[.6rem] bg-[#171717]/10 p-[.8vh] px-[1.2vh] text-[1.4vh] absolute left-[calc(100%+1.2vh)] top-[50%] translate-y-[-50%] whitespace-nowrap">
            dirty = true
          </div>
        </div>
        <div
          className={classNames('flex flex-row items-center gap-[1.2vh] relative', {
            'opacity-0': step < 9,
          })}
        >
          <div className="font-mono rounded-[.6rem] bg-[#d9edf4] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh]">
            isEvent = false
          </div>
          <div className="font-mono rounded-[.6rem] bg-[#171717]/10 p-[.8vh] px-[1.2vh] text-[1.4vh] absolute left-[calc(100%+1.2vh)] top-[50%] translate-y-[-50%] whitespace-nowrap">
            dirty = false
          </div>
        </div>
        <div
          className={classNames('flex flex-row items-center gap-[1.2vh] relative', {
            'opacity-0': step < 10,
          })}
        >
          <div className="font-mono rounded-[.6rem] bg-[#d9edf4] border-[.15rem] border-[#171717] p-[.8vh] px-[1.8vh] text-[2.2vh] opacity-[.3]">
            parity = odd
          </div>
          <div className="font-mono rounded-[.6rem] bg-[#171717]/10 p-[.8vh] px-[1.2vh] text-[1.4vh] absolute left-[calc(100%+1.2vh)] top-[50%] translate-y-[-50%] whitespace-nowrap">
            skipped
          </div>
        </div>
      </div>
    ))
    .otherwise(() => null);

  return (
    <div className="flex flex-1 w-full h-full flex-col p-[7vh]">
      <div className="flex flex-row flex-1 gap-[2vh]">
        <div className="flex flex-1">
          <CodeEditorAlt code={formatCode(code)} language="javascript" />
        </div>
        <div className="flex shrink-0 w-[28vw] h-full">{diagram}</div>
      </div>
    </div>
  );
}
