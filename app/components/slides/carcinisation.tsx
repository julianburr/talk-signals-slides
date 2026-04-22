import BackgroundSeaSvg from '~/assets/illustrations/background-sea.svg?react';
import CrabSvg from '~/assets/illustrations/crab.svg?react';
import JellyfishSvg from '~/assets/illustrations/jellyfish.svg?react';
import LogoAngularSvg from '~/assets/illustrations/logo-angular.svg?react';
import LogoReactSvg from '~/assets/illustrations/logo-react.svg?react';
import LogoSolidSvg from '~/assets/illustrations/logo-solid.svg?react';
import LogoVueSvg from '~/assets/illustrations/logo-vue.svg?react';
import { Slide } from '~/components/slide';

export function CarcinisationSlide() {
  return (
    <Slide className="bg-background-sea text-foreground-sea">
      <BackgroundSeaSvg className="absolute z-5 bottom-[-10vh] left-[-15vw] right-[-15vw] w-[130vw] h-auto" />

      <div className="flex flex-col w-full max-w-[80vw] h-full p-[12vh] relative z-10">
        <h1 className="font-heading font-bold text-[6vh] leading-[1.2]">
          Frontend frameworks have been evolving and converging towards the same solution for the
          same problem
        </h1>
        <p className="absolute top-[40vh] left-[50%] text-[5.2vh] font-handwriting -rotate-7">
          *we’re all becoming crabs
        </p>
      </div>

      <div className="jellyfish-react absolute z-1 top-[10vh] left-[-3vw] -rotate-3">
        <JellyfishSvg className="h-[40vh] w-auto" />
        <LogoReactSvg className="absolute top-[18%] left-[48%] h-[10%] w-auto -rotate-7 opacity-30" />
      </div>

      <div className="crab-solid absolute z-20 bottom-[4vh] left-[4vw] -rotate-4">
        <CrabSvg className="h-[38vh] w-auto" />
        <LogoSolidSvg className="absolute bottom-[12%] left-[46%] h-[24%] w-auto -rotate-4 opacity-60" />
      </div>
      <div className="crab-vue absolute z-20 bottom-[10vh] left-[40vw] -rotate-3">
        <CrabSvg className="h-[24vh] w-auto" />
        <LogoVueSvg className="absolute bottom-[12%] left-[46%] h-[20%] w-auto -rotate-7 opacity-70" />
      </div>
      <div className="crab-angular absolute z-20 bottom-[12vh] left-[58vw] rotate-16">
        <CrabSvg className="h-[22vh] w-auto" />
        <LogoAngularSvg className="absolute bottom-[12%] left-[44%] h-[24%] w-auto -rotate-7 opacity-40" />
      </div>
    </Slide>
  );
}
