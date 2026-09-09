import type { ReactElement, ReactNode } from 'react';
import type { GlyphName, ProductImage } from '../types';
import styles from './ui.module.css';

// Dibujos de linea que hacen de marcador de posicion mientras no hay fotos.
const PATHS: Record<GlyphName, ReactElement> = {
  bata: <path d="M60 16 L92 30 L84 48 L76 45 L76 112 L44 112 L44 45 L36 48 L28 30 Z M60 16 v14" />,
  gorro: <path d="M28 62 Q60 20 92 62 M26 62 h68 M30 62 l-6 12 M90 62 l6 12" />,
  delantal: <path d="M46 22 q14 10 28 0 M44 40 q-6 4 -6 16 v46 h44 v-46 q0 -12 -6 -16 M52 30 l-8 10 M68 30 l8 10" />,
  camisa: <path d="M42 26 l10 -8 l8 8 l8 -8 l10 8 l-8 12 v58 h-20 M50 38 v58 M40 38 l-6 -6 M80 38 l6 -6" />,
  vestido: <path d="M50 20 h20 l4 18 l16 62 h-60 l16 -62 z M50 20 l-8 10 M70 20 l8 10" />,
  pulsera: <path d="M60 20 a26 26 0 1 0 0.01 0 M60 8 v6 M86 34 h6 M28 34 h-6" />,
  llavero: <path d="M44 20 h32 v40 h-32 z M60 60 v14 M46 74 h28" />,
  lampara: <path d="M45 24 h30 l12 30 h-54 z M60 54 v34 M40 88 h40" />,
  cocuiza: <path d="M24 74 q10 -20 40 -20 q28 0 32 20 q-36 8 -72 0 z" />,
  caja: <path d="M26 40 l34 -16 l34 16 v40 l-34 16 l-34 -16 z M26 40 l34 16 l34 -16 M60 56 v40" />,
};

export function Glyph({ name }: { name: GlyphName }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={styles.glyph}
      fill="none"
      stroke="currentColor"
      strokeWidth={3}
      aria-hidden="true"
    >
      {PATHS[name]}
    </svg>
  );
}

export function ImagePanel({
  image,
  ratio = '4 / 5',
  compact = false,
}: {
  image: ProductImage;
  ratio?: string;
  compact?: boolean;
}) {
  if (image.kind === 'photo') {
    return (
      <img
        className={styles.photo}
        src={image.src}
        alt={image.alt}
        style={{ aspectRatio: ratio }}
      />
    );
  }
  return (
    <div className={styles.panel} style={{ aspectRatio: ratio }}>
      <Glyph name={image.glyph} />
      {!compact && <span className={styles.panelCaption}>{image.caption}</span>}
    </div>
  );
}

export type PillTone = 'trabajo' | 'oficio' | 'navidad' | 'ok' | 'muted';

export function Pill({ children, tone = 'muted' }: { children: ReactNode; tone?: PillTone }) {
  return <span className={`${styles.pill} ${styles[`pill_${tone}`]}`}>{children}</span>;
}
