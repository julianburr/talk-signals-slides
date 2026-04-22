import { match } from 'ts-pattern';

import MvcFlowChartSvg from '~/assets/illustrations/flow-charts/mvc.svg?react';

type Props = {
  step: number;
};

export function MvcSlide({ step }: Props) {
  const title = match(step)
    .with(0, () => null)
    .with(1, () => 'Your View is a pure function of the model.')
    .otherwise(() => 'Your UI is the result of a pure function of the state.');

  return (
    <div className="flex flex-1 w-full h-full flex-row gap-[4vw] items-center justify-center px-[10vw]">
      <div className="flex flex-col gap-[.4vh] items-center justify-center">
        <MvcFlowChartSvg
          data-arrow-up={step > 0}
          className='h-[70vh] w-auto [&_.arrow-up]:opacity-0 data-[arrow-up="true"]:[&_.arrow-up]:opacity-100'
        />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center">
        {title && (
          <h1 className="font-heading font-bold text-[6.4vh] leading-[1.2] max-w-[50vw] text-balance text-center">
            {title}
          </h1>
        )}

        <p
          data-active={step === 3}
          className='font-handwriting text-[4.8vh] leading-[1.2] max-w-[52vw] text-pretty text-center mt-[4vh] -rotate-2 opacity-0 data-[active="true"]:opacity-100'
        >
          For a given state, no matter how you arrived at that state, the output of the system is
          always the same
        </p>
      </div>
    </div>
  );
}
