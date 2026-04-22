import classNames from 'classnames';

import type { PropsWithChildren } from 'react';

type Props = PropsWithChildren<{
  source?: string;
  sourceText?: string;
  className?: string;
}>;

export function Slide({ children, source, sourceText, className }: Props) {
  return (
    <div className={classNames('flex flex-col h-full w-full', className)}>
      <div className="flex flex-col flex-1 justify-center items-center overflow-hidden">
        {children}
      </div>

      {(source || sourceText) && (
        <div className="flex w-full align-end justify-end p-[3vh]">
          {source ? (
            <a
              className="text-[1.5vh] font-foreground opacity-[.4] uppercase hover:underline hover:opacity-[.6] focus:underline focus:opacity-[.6] transition-all duration-120"
              href={source}
              target="_blank"
              rel="noopener noreferrer"
            >
              {sourceText || source}
            </a>
          ) : (
            <span className="text-[1.5vh] font-foreground opacity-[.4] uppercase">
              {sourceText}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
