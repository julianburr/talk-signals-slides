import { useParams } from 'react-router';
import { match } from 'ts-pattern';

import CrabSvg from '~/assets/illustrations/crab.svg?react';
import { Slide } from '~/components/slide';

type Props = {
  expanded: boolean;
};

export function CoverSlide({ expanded }: Props) {
  const params = useParams();
  const conference = match(params.conference)
    .with('ndcsydney', () => 'NDC Sydney 2026')
    .with('devworld', () => 'DevWorld 2026')
    .otherwise(() => null);

  return (
    <Slide
      className="bg-background-cover"
      sourceText={conference ? `Julian Burr @ ${conference}` : undefined}
    >
      <div className="flex flex-1 items-center justify-center text-center leading-[1.1] text-foreground-cover">
        <div className="relative flex flex-col items-center justify-center -mt-[14vh]">
          <h1 className="font-heading font-bold text-[8vh] uppercase">
            It’s Time To
            <br />
            Talk About
          </h1>
          <h1 className="font-heading-art text-[18vh] mt-[1vh] uppercase">Signals</h1>
          {expanded && (
            <p className="absolute top-[calc(100%+4vh)] left-0 right-0 pl-[36vh] text-center font-handwriting text-[6vh] leading-[.9] -rotate-2">
              and the carcinisation of the web
            </p>
          )}

          <CrabSvg className="absolute bottom-[-31vh] left-[-10vh] h-[34vh] w-auto -rotate-10" />
        </div>
      </div>
    </Slide>
  );
}
