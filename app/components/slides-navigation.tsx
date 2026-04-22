import { useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { match } from 'ts-pattern';

import ArrowLeftIcon from '~/assets/icons/icon-arrow-left.svg?react';
import ArrowRightIcon from '~/assets/icons/icon-arrow-right.svg?react';
import MoonIcon from '~/assets/icons/icon-moon.svg?react';
import SunIcon from '~/assets/icons/icon-sun.svg?react';

type Props = {
  slide: string;
  conference: string;
  maxSlideIndex: number;
};

export function SlidesNavigation({ slide, conference, maxSlideIndex }: Props) {
  const navigate = useNavigate();

  const slideIndex = Number.parseInt(slide || '0');
  const initialTheme = window.localStorage.getItem('talk-signals/theme') || 'light';

  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    window.localStorage.setItem('talk-signals/theme', theme);
    window.document.body.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  const handleNext = useCallback(() => {
    if (slideIndex < maxSlideIndex) {
      window.document.body.classList.add('hide-cursor');
      navigate(`/${conference}/slide/${slideIndex + 1}`);
    }
  }, [slideIndex, navigate, conference]);

  const handlePrevious = useCallback(() => {
    if (slideIndex > 0) {
      window.document.body.classList.add('hide-cursor');
      navigate(`/${conference}/slide/${slideIndex - 1}`);
    }
  }, [slideIndex, navigate, conference]);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  }, []);

  const mouseTimer = useRef<NodeJS.Timeout>(null);
  const lastMousePosition = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      window.document.body.classList.remove('hide-cursor');
      lastMousePosition.current = { x: e.clientX, y: e.clientY };

      clearTimeout(mouseTimer.current!);
      mouseTimer.current = setTimeout(() => {
        if (lastMousePosition.current.x < 300 && lastMousePosition.current.y < 300) {
          window.document.body.classList.add('hide-cursor');
        }
      }, 1_000);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Always catch Cmd+S, since I accidentally always hit that within the code editor :|
      if (e.metaKey && e.key === 's') {
        e.preventDefault();
        e.stopPropagation();
        return;
      }

      // Don't trigger navigation if we're currently e.g. in the code editor
      const target = e.target as HTMLElement;
      const check = target?.closest?.('.code-editor');
      if (!check) {
        match(e.key)
          .with('ArrowRight', () => handleNext())
          .with('ArrowLeft', () => handlePrevious())
          .with('b', () => toggleFullscreen())
          .otherwise(() => null);
      }
    };

    window.document.addEventListener('mousemove', handleMouseMove);
    window.document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.document.removeEventListener('mousemove', handleMouseMove);
      window.document.removeEventListener('keydown', handleKeyDown);
      clearTimeout(mouseTimer.current!);
    };
  }, [handleNext, handlePrevious, toggleFullscreen]);

  return (
    <nav className="absolute z-500 top-[3vh] left-[50%] translate-x-[-50%] bg-background-highlight rounded-full p-[.5vh] transition-opacity duration-300 opacity-0 focus-within:opacity-100 hover:opacity-100">
      <button
        onClick={handlePrevious}
        disabled={slideIndex === 0}
        className="p-[1.2vh] hover:bg-background focus:bg-background rounded-full cursor-pointer disabled:opacity-50"
      >
        <ArrowLeftIcon className="w-[2.4vh] h-[2.4vh]" />
      </button>
      <button
        onClick={handleNext}
        className="p-[1.2vh] hover:bg-background focus:bg-background rounded-full cursor-pointer disabled:opacity-50"
      >
        <ArrowRightIcon className="w-[2.4vh] h-[2.4vh]" />
      </button>
      <button
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        className="p-[1.2vh] hover:bg-background focus:bg-background rounded-full cursor-pointer"
      >
        {theme === 'dark' ? (
          <SunIcon className="w-[2.4vh] h-[2.4vh]" />
        ) : (
          <MoonIcon className="w-[2.4vh] h-[2.4vh]" />
        )}
      </button>
    </nav>
  );
}
