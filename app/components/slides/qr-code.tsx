import QRCode from 'qrcode';
import { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import { match } from 'ts-pattern';

import { Slide } from '~/components/slide';

const socials = [
  'https://www.linkedin.com/in/julianburr/',
  'https://bsky.app/profile/julianburr.de',
  'https://github.com/julianburr',
];

export function QrCodeSlide() {
  const params = useParams();
  const conference = match(params.conference)
    .with('ndcsydney', () => 'NDC Sydney 2026')
    .with('devworld', () => 'DevWorld 2026')
    .otherwise(() => null);

  const slidesUrl = match(params.conference)
    .with('ndcsydney', () => 'https://www.julianburr.de/ndc-sydney-2026-slides.pdf')
    .with('devworld', () => 'https://www.julianburr.de/devworld-2026-slides.pdf')
    .otherwise(() => '');

  const [qrCode, setQrCode] = useState<string | null>(null);
  useLayoutEffect(() => {
    QRCode.toDataURL(slidesUrl, { width: 1024 }).then(setQrCode);
  }, [slidesUrl]);

  return (
    <Slide sourceText={conference ? `Julian Burr @ ${conference}` : undefined}>
      <div className="flex h-full w-full max-w-[80vw] flex-row items-center justify-center gap-[8.4vh]">
        <div className="flex w-[50vh] h-[50vh] shrink-0">
          {qrCode && <img src={qrCode} className="w-full h-full rounded-[.8vh]" />}
        </div>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col items-start gap-[.8vh]">
            <span className="text-[3.2vh]">Link to the slides:</span>
            <a
              href="https://www.julianburr.de/react-summit-us-2025-slides.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[5.2vh] leading-[1.1] font-heading font-bold hover:underline focus:underline"
            >
              https://www.julianburr.de/
              <br />
              {slidesUrl?.replace('https://www.julianburr.de/', '')}
            </a>
          </div>

          <div className="flex flex-col items-start gap-[1.2vh] mt-[4.8vh]">
            {socials.map((url) => (
              <a
                key={url}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex text-[3.2vh] hover:underline focus:underline"
              >
                {url}
              </a>
            ))}
          </div>
        </div>
      </div>
    </Slide>
  );
}
