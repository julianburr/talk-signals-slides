import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { isRouteErrorResponse, Links, Meta, Outlet, Scripts } from 'react-router';
import { match } from 'ts-pattern';

import type { Route } from './+types/root';

import './app.css';

export const links: Route.LinksFunction = () => [
  { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
];

export function Layout({ children }: { children: React.ReactNode }) {
  const [saturation, _setSaturation] = useState(100);
  const [showSaturation, setShowSaturation] = useState(false);

  const saturationTimer = useRef<NodeJS.Timeout | null>(null);
  const setSaturation = useCallback((value: Parameters<Dispatch<SetStateAction<number>>>[0]) => {
    clearTimeout(saturationTimer.current!);
    _setSaturation(value);
    setShowSaturation(true);
    saturationTimer.current = setTimeout(() => setShowSaturation(false), 1_000);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      match([e.ctrlKey, e.key])
        .with([true, ','], () => setSaturation((state) => Math.min(140, state + 5)))
        .with([true, '.'], () => setSaturation((state) => Math.max(40, state - 5)))
        .otherwise(() => null);
    };

    window.document.addEventListener('keydown', handleKeyDown);
    return () => window.document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="hide-cursor" style={{ filter: `saturate(${saturation}%)` }}>
        {children}

        <pre
          data-visible={showSaturation}
          className="fixed z-1000 top-[2vh] left-[2vh] font-mono text-[1.6vh] opacity-0 transition-all duration-120 data-[visible=true]:opacity-50"
        >
          {saturation}
        </pre>
        <div className="hide-cursor-overlay" />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = 'Oops!';
  let details = 'An unexpected error occurred.';
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? '404' : 'Error';
    details =
      error.status === 404 ? 'The requested page could not be found.' : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
