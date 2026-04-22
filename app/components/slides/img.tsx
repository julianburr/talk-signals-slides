import imgTweetAndrew from '~/assets/images/tweet-andrew.png';
import imgYoutubeReactFir from '~/assets/images/youtube-react-fir.png';
import imgYoutubeReactIntro from '~/assets/images/youtube-react-intro.png';

import { Slide } from '~/components/slide';

const images = {
  'youtube-react-intro': {
    src: imgYoutubeReactIntro,
    alt: 'Tom Occhino talking about React at a FB event in 2014',
    source: 'https://www.youtube.com/watch?v=nYkdrAPrdcw',
  },
  'tweet-andrew': {
    src: imgTweetAndrew,
    alt: 'Andrew Clark tweeting about Signals in React',
    source: 'https://x.com/acdlite/status/1626590880126889984',
  },
  'youtube-react-fir': {
    src: imgYoutubeReactFir,
    alt: 'Joe Savona introducing React Fir and its findings at React Conf 2025',
    source: 'https://www.youtube.com/watch?v=uAmRtE52mYk',
  },
};

type Props = {
  id: keyof typeof images;
};

export function ImgSlide({ id }: Props) {
  const img = images[id];
  return (
    <Slide source={img.source}>
      <div className="flex w-full h-full p-[10vh] pb-[3.6vh]">
        <div className="w-full h-full relative">
          <img src={img.src} alt={img.alt} className="w-full h-full object-contain" />
        </div>
      </div>
    </Slide>
  );
}
