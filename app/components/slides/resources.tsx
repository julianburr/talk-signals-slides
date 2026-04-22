import faviconDev from '~/assets/images/favicon-dev.png';
import faviconGithub from '~/assets/images/favicon-github.png';
import faviconMilomg from '~/assets/images/favicon-milomg.png';
import faviconPzuraq from '~/assets/images/favicon-pzuraq.png';
import faviconYoutube from '~/assets/images/favicon-youtube.png';

const blogs = [
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
];

const videos = [
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
      <h1 className="font-heading font-bold text-[6vh] leading-[1.2] uppercase">
        Some good resources
      </h1>

      <div className="flex flex-col items-start w-[60vw] gap-[1.6vh] mt-[4vh]">
        {blogs.map((blog) => (
          <div key={blog.url} className="flex flex-row gap-[1.6vh] text-[2.8vh]">
            <img src={blog.favicon} alt={blog.title} className="w-lh h-lh rounded-[.6vh]" />
            <span>
              {blog.title} <span className="opacity-[.4]">—</span>{' '}
              <a
                href={blog.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-[.4] hover:underline focus:underline"
              >
                {blog.url}
              </a>
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-start w-[60vw] gap-[1.2vh] mt-[4vh]">
        {videos.map((video) => (
          <div key={video.url} className="flex flex-row gap-[1.6vh] text-[2.8vh]">
            <img src={video.favicon} alt={video.title} className="w-lh h-lh rounded-[.6vh]" />
            <span>
              {video.title} <span className="opacity-[.4]">—</span>{' '}
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-[.4] hover:underline focus:underline"
              >
                {video.url}
              </a>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
