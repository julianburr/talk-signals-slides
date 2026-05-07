import faviconDev from '~/assets/images/favicon-dev.png';
import faviconGithub from '~/assets/images/favicon-github.png';
import faviconMilomg from '~/assets/images/favicon-milomg.png';
import faviconPzuraq from '~/assets/images/favicon-pzuraq.png';
import faviconYoutube from '~/assets/images/favicon-youtube.png';

const resources = [
  {
    url: 'https://www.pzuraq.com/blog/what-is-reactivity',
    title: 'What is Reactivity?',
    favicon: faviconPzuraq,
  },
  {
    url: 'https://milomg.dev/2022-12-01/reactivity',
    title: 'Reactivity',
    favicon: faviconMilomg,
  },
  {
    url: 'https://dev.to/ryansolid/a-hands-on-introduction-to-fine-grained-reactivity-3ndf',
    title: 'A Hands-On Introduction to Fine-Grained Reactivity',
    favicon: faviconDev,
  },
  {
    url: 'https://dev.to/this-is-learning/the-evolution-of-signals-in-javascript-8ob',
    title: 'The Evolution of Signals in JavaScript',
    favicon: faviconDev,
  },
  {
    url: 'https://github.com/milomg/reactively/blob/main/Reactive-algorithms.md#reactively',
    title: 'Reactive Algorithms',
    favicon: faviconGithub,
  },
  {
    url: 'https://www.youtube.com/watch?v=nYkdrAPrdcw',
    title: 'Rethinking Web App Development at Facebook',
    favicon: faviconYoutube,
  },
  {
    url: 'https://www.youtube.com/watch?v=uA0CIYdC0xA',
    title: 'Daniel Ehrenberg – Standardizing Signals in TC39',
    favicon: faviconYoutube,
  },
];

export function ResourcesSlide() {
  return (
    <div className="flex flex-col flex-1 w-full h-full items-center justify-center p-[7vh]">
      {/* <h1 className="font-heading font-bold text-[6vh] leading-[1.2] uppercase">
        Some good resources
      </h1> */}

      <div className="flex flex-col items-center w-[50vw] gap-[2vh]">
        {resources.map((resource) => (
          <div key={resource.url} className="flex flex-col items-center text-center">
            <a
              href={resource.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[2.8vh] uppercase font-medium hover:underline focus:underline tracking-wide"
            >
              {resource.url}
            </a>
            <span className="text-[2vh] opacity-[.6]">{resource.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
