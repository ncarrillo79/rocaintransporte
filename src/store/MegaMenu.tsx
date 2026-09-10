import { useEffect, useRef, useState } from 'react';
import { BRAND } from '../lib/brand';
import { Link, useRoute } from '../lib/router';
import type { BrandId } from '../types';
import styles from './MegaMenu.module.css';

// ---------------------------------------------------------------------------
// Navegacion principal + mega-menu. El menu es distinto por marca: GF Textil
// solo muestra Trabajo y Gala; Artesika solo Oficio y Navidad. No hay entradas
// que crucen de una marca a la otra.
// El menu se define como datos: cada link apunta a una coleccion o pagina real.
// ---------------------------------------------------------------------------

type MenuWorld = 'trabajo' | 'oficio' | 'gala' | 'navidad' | 'info';

interface Column {
  title: string;
  links: { label: string; to: string }[];
}

interface Entry {
  label: string;
  world: MenuWorld;
  to?: string; // entrada simple (sin panel)
  columns?: Column[]; // entrada con mega-menu
}

const GFTEXTIL_MENU: Entry[] = [
  {
    label: 'Uniformes & Textil',
    world: 'trabajo',
    columns: [
      {
        title: 'Salud y quirurgico',
        links: [
          { label: 'Kimonos y batas', to: '/c/salud' },
          { label: 'Pijamas quirurgicas', to: '/c/salud' },
        ],
      },
      {
        title: 'Gastronomia',
        links: [
          { label: 'Filipinas de chef', to: '/c/gastronomia' },
          { label: 'Delantales y gorros', to: '/c/gastronomia' },
        ],
      },
      {
        title: 'Escolar',
        links: [
          { label: 'Uniformes por colegio', to: '/c/escolar' },
          { label: 'Batas de laboratorio', to: '/c/escolar' },
        ],
      },
      {
        title: 'Corporativo y Columbia',
        links: [
          { label: 'Camisas tipo Columbia', to: '/c/uniformes-corporativo' },
          { label: 'Chemises y blusas', to: '/c/uniformes-corporativo' },
        ],
      },
      {
        title: 'Seguridad industrial',
        links: [{ label: 'Overoles y chalecos', to: '/c/industrial' }],
      },
    ],
  },
  {
    label: 'Gala & Tradicion',
    world: 'gala',
    columns: [
      {
        title: 'Fiesta y graduacion',
        links: [{ label: 'Vestidos de gala', to: '/c/gala' }],
      },
      {
        title: 'Tradicion',
        links: [{ label: 'Liqui liqui (dama y caballero)', to: '/c/gala' }],
      },
      {
        title: 'A medida',
        links: [{ label: 'Trajes y prendas a medida', to: '/otros' }],
      },
    ],
  },
  { label: 'Presupuesto', world: 'info', to: '/cotizar' },
  { label: 'A medida', world: 'info', to: '/otros' },
  { label: 'Contacto', world: 'info', to: '/contacto' },
];

const ARTESIKA_MENU: Entry[] = [
  {
    label: 'Artesania & Regalos',
    world: 'oficio',
    columns: [
      {
        title: 'Piezas',
        links: [
          { label: 'Toda la artesania', to: '/c/artesania' },
          { label: 'Bisuteria y pulseras', to: '/c/bisuteria' },
          { label: 'Decoracion', to: '/c/decoracion' },
        ],
      },
      {
        title: 'Regalos',
        links: [
          { label: 'Detalles para regalar', to: '/c/regalar-detalles' },
          { label: 'Regalos hasta $10', to: '/c/regalos-hasta-10' },
        ],
      },
    ],
  },
  {
    label: 'Navidad',
    world: 'navidad',
    columns: [
      {
        title: 'Regalos y decoracion',
        links: [
          { label: 'Todo Navidad', to: '/c/navidad' },
          { label: 'Detalles hasta $10', to: '/c/regalos-hasta-10' },
        ],
      },
      {
        title: 'Preventa',
        links: [{ label: 'Lotes con cupo y anticipo', to: '/preventa' }],
      },
    ],
  },
  { label: 'Contacto', world: 'info', to: '/contacto' },
];

const MENU_BY_BRAND: Record<BrandId, Entry[]> = {
  gftextil: GFTEXTIL_MENU,
  artesika: ARTESIKA_MENU,
};

export function PrimaryNav() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const route = useRoute();
  const ref = useRef<HTMLDivElement>(null);
  const menu = MENU_BY_BRAND[BRAND.id];

  // Cerrar al cambiar de ruta.
  useEffect(() => setOpenIdx(null), [route]);

  // Cerrar al hacer clic fuera o pulsar Escape.
  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpenIdx(null);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpenIdx(null);
    }
    document.addEventListener('mousedown', onDoc);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDoc);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const close = () => setOpenIdx(null);

  return (
    <nav className={styles.nav} aria-label="Principal" ref={ref}>
      <ul className={styles.list}>
        {menu.map((entry, i) => {
          const isOpen = openIdx === i;
          return (
            <li key={entry.label} className={styles.item}>
              {entry.columns ? (
                <button
                  type="button"
                  className={styles.top}
                  data-world={entry.world}
                  aria-expanded={isOpen}
                  aria-haspopup="true"
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                >
                  {entry.label}
                  <span className={styles.caret} aria-hidden="true">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
              ) : (
                <Link to={entry.to ?? '/'} className={styles.topLink}>
                  <span className={styles.topInner} data-world={entry.world}>
                    {entry.label}
                  </span>
                </Link>
              )}

              {entry.columns && isOpen && (
                <div className={styles.panel} role="region" aria-label={entry.label}>
                  <div className={styles.cols}>
                    {entry.columns.map((col) => (
                      <div key={col.title} className={styles.col}>
                        <p className={styles.colTitle}>{col.title}</p>
                        <ul className={styles.colList}>
                          {col.links.map((l) => (
                            <li key={l.label}>
                              <Link to={l.to} className={styles.colLink} onNavigate={close}>
                                {l.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
