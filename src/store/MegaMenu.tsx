import { useEffect, useRef, useState } from 'react';
import { Link, useRoute } from '../lib/router';
import styles from './MegaMenu.module.css';

// ---------------------------------------------------------------------------
// Navegacion principal + mega-menu.
// El menu se define aqui como datos: cada entrada apunta a una coleccion real
// (src/data/collections.ts). Editar labels y destinos sin tocar la logica.
// ---------------------------------------------------------------------------

type MenuWorld = 'trabajo' | 'oficio' | 'gala' | 'navidad' | 'hub';

interface Column {
  title: string;
  links: { label: string; to: string }[];
}

interface Entry {
  label: string;
  world: MenuWorld;
  to?: string; // entrada simple (sin panel)
  columns?: Column[]; // entrada con mega-menu
  bridge?: { title: string; text: string; to: string }; // el puente dentro del menu
}

const MENU: Entry[] = [
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
    bridge: {
      title: 'Es para regalar?',
      text: 'Un colega, una graduacion, un detalle para el equipo.',
      to: '/c/regalar-odontologia',
    },
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
  {
    label: 'Artesania & Regalos',
    world: 'oficio',
    columns: [
      {
        title: 'Piezas',
        links: [
          { label: 'Todas las artesanias', to: '/c/artesania' },
          { label: 'Cocuizas / espardenas', to: '/c/artesania' },
          { label: 'Lamparas de madera', to: '/c/artesania' },
        ],
      },
      {
        title: 'Regalar por profesion',
        links: [
          { label: 'Para un odontologo', to: '/c/regalar-odontologia' },
          { label: 'Para enfermeria', to: '/c/regalar-enfermeria' },
          { label: 'Para un chef', to: '/c/regalar-gastronomia' },
        ],
      },
      {
        title: 'Por presupuesto',
        links: [
          { label: 'Regalos hasta $10', to: '/c/regalos-hasta-10' },
          { label: 'Detalles para regalar', to: '/c/regalar-detalles' },
        ],
      },
    ],
  },
  {
    label: 'Navidad',
    world: 'navidad',
    columns: [
      {
        title: 'Regalos',
        links: [
          { label: 'Regalos personales', to: '/c/navidad' },
          { label: 'Detalles hasta $10', to: '/c/regalos-hasta-10' },
        ],
      },
      {
        title: 'Preventa',
        links: [{ label: 'Lotes con cupo y anticipo', to: '/preventa' }],
      },
      {
        title: 'Empresas',
        links: [
          { label: 'Kits corporativos con logo', to: '/b2b' },
          { label: 'Solicitar cotizacion', to: '/b2b/cotizar' },
        ],
      },
    ],
  },
  { label: 'Regalar', world: 'hub', to: '/c/regalar-detalles' },
  { label: 'Corporativo', world: 'hub', to: '/b2b' },
];

export function PrimaryNav() {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const route = useRoute();
  const ref = useRef<HTMLDivElement>(null);

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
        {MENU.map((entry, i) => {
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
                    {entry.bridge && (
                      <div className={styles.bridge}>
                        <p className={styles.bridgeTitle}>{entry.bridge.title}</p>
                        <p className={styles.bridgeText}>{entry.bridge.text}</p>
                        <Link to={entry.bridge.to} className={styles.bridgeLink} onNavigate={close}>
                          Regalar por profesion &rarr;
                        </Link>
                      </div>
                    )}
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
