import { CarcinisationSlide } from '~/components/slides/carcinisation';
import { CodeChallengesSlide } from '~/components/slides/code-challenges';
import { CodeCompare } from '~/components/slides/code-compare';
import { CodeHistorySlide } from '~/components/slides/code-history';
import { CodeLiveSlide } from '~/components/slides/code-live';
import { CodeProposalSlide } from '~/components/slides/code-proposal';
import { CoverSlide } from '~/components/slides/cover';
import { ImgSlide } from '~/components/slides/img';
import { MvcSlide } from '~/components/slides/mvc';
import { QrCodeSlide } from '~/components/slides/qr-code';
import { ResourcesSlide } from '~/components/slides/resources';
import { TitleSlide } from '~/components/slides/title';

type Slide = {
  steps: number;
  component: (step: number) => React.ReactNode;
};

export const slides: Slide[] = [
  { steps: 2, component: (step) => <CoverSlide expanded={step === 1} /> },
  { steps: 5, component: (step) => <CodeCompare step={step} /> },
  { steps: 4, component: (step) => <MvcSlide step={step} /> },
  { steps: 1, component: () => <TitleSlide title="A Brief History of Reactivity on the Web" /> },
  { steps: 13, component: (step) => <CodeHistorySlide step={step} /> },
  { steps: 1, component: () => <TitleSlide title="What about React?" /> },
  { steps: 1, component: () => <CodeHistorySlide step={13} /> },
  { steps: 1, component: () => <ImgSlide id="youtube-react-intro" /> },
  { steps: 1, component: () => <ImgSlide id="tweet-andrew" /> },
  { steps: 1, component: () => <ImgSlide id="youtube-react-fir" /> },
  { steps: 1, component: () => <TitleSlide title="How does it work?" /> },
  { steps: 2, component: (step) => <CodeLiveSlide step={step} /> },
  { steps: 1, component: () => <TitleSlide title="There are still challenges" /> },
  { steps: 11, component: (step) => <CodeChallengesSlide step={step} /> },
  { steps: 1, component: () => <TitleSlide title="The TC39 proposal" /> },
  { steps: 1, component: () => <CarcinisationSlide /> },
  { steps: 1, component: () => <CodeProposalSlide /> },
  { steps: 1, component: () => <ResourcesSlide /> },
  { steps: 1, component: () => <QrCodeSlide /> },
];
