import { useEffect, useState, type ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Router minimo basado en hash (#/...). Sin dependencias.
// Rutas:
//   #/                      -> home
//   #/c/<id-de-coleccion>   -> pagina de coleccion
//   #/p/<slug-de-producto>  -> ficha de producto
// ---------------------------------------------------------------------------

export type Route =
  | { name: 'home' }
  | { name: 'collection'; id: string }
  | { name: 'product'; slug: string }
  | { name: 'presale' }
  | { name: 'quote'; garmentId?: string }
  | { name: 'custom' }
  | { name: 'payment' }
  | { name: 'contact' }
  | { name: 'notfound' };

function parseHash(): Route {
  const raw = window.location.hash.replace(/^#/, '');
  const seg = raw.split('/').filter(Boolean);
  if (seg.length === 0) return { name: 'home' };
  if (seg[0] === 'c' && seg[1]) return { name: 'collection', id: decodeURIComponent(seg[1]) };
  if (seg[0] === 'p' && seg[1]) return { name: 'product', slug: decodeURIComponent(seg[1]) };
  if (seg[0] === 'preventa') return { name: 'presale' };
  if (seg[0] === 'otros') return { name: 'custom' };
  if (seg[0] === 'pago') return { name: 'payment' };
  if (seg[0] === 'contacto') return { name: 'contact' };
  if (seg[0] === 'cotizar') {
    return { name: 'quote', garmentId: seg[1] ? decodeURIComponent(seg[1]) : undefined };
  }
  return { name: 'notfound' };
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash);
  useEffect(() => {
    const onChange = () => setRoute(parseHash());
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);
  return route;
}

export function hrefFor(to: string): string {
  return '#' + (to.startsWith('/') ? to : '/' + to);
}

export function navigate(to: string): void {
  window.location.hash = hrefFor(to);
}

export function Link({
  to,
  className,
  children,
  onNavigate,
}: {
  to: string;
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  return (
    <a href={hrefFor(to)} className={className} onClick={onNavigate}>
      {children}
    </a>
  );
}
