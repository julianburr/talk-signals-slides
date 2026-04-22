import { useMemo } from 'react';
import { Navigate, useParams } from 'react-router';

import { SlidesNavigation } from '~/components/slides-navigation';
import { slides } from '~/data/slides';

type PreparedSlide = (typeof slides)[number] & {
  start: number;
  end: number;
};

let lastSlide: PreparedSlide | undefined = undefined;
const preparedSlides: PreparedSlide[] = slides.map((slide) => {
  const start = lastSlide?.end ? lastSlide.end + 1 : 0;
  const end = start + slide.steps - 1;
  lastSlide = { ...slide, start, end };
  return lastSlide;
});

const maxSlideIndex = slides.reduce((acc, slide) => acc + slide.steps, 0) - 1;

export default function SlideRoute() {
  const params = useParams();
  const slide = params.slide!;
  const conference = params.conference!;

  const slideIndex = slide || '0';
  const slideNumber = Number.parseInt(slideIndex);

  const slideItem = useMemo(
    () => preparedSlides.find((s) => slideNumber >= s.start && slideNumber <= s.end),
    [slideNumber],
  );

  if (slideNumber > maxSlideIndex) {
    return <Navigate to={`/${conference}/slide/${maxSlideIndex}`} />;
  }

  if (!slideItem) {
    return <p>Slide: {slide} -- nothing found</p>;
  }

  console.log({ slide, conference });
  return (
    <>
      {slideItem.component(slideNumber - slideItem.start)}

      <SlidesNavigation slide={slide} conference={conference} maxSlideIndex={maxSlideIndex} />
    </>
  );
}
