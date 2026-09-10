import type { ReactNode } from 'react';
import { BRAND } from '../lib/brand';
import { CONFIG } from '../lib/catalog';
import { Link } from '../lib/router';
import { waLink } from '../lib/whatsapp';
import { PrimaryNav } from './MegaMenu';
import styles from './StoreChrome.module.css';

export function PageShell({ children }: { children: ReactNode }) {
  return <div className={styles.shell}>{children}</div>;
}

export function StoreHeader() {
  const wa = waLink(`Hola ${BRAND.name}, quiero hacer una consulta.`);
  return (
    <header className={styles.head}>
      <div className={styles.headInner}>
        <Link to="/" className={styles.wordmark} data-brand={BRAND.id}>
          {BRAND.wordmark}
        </Link>
        <div className={styles.navWrap}>
          <PrimaryNav />
        </div>
        <a className={styles.waBtn} href={wa} target="_blank" rel="noreferrer">
          <span className={styles.waDot} aria-hidden="true" />
          WhatsApp
        </a>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Footer: bloque de marca + WhatsApp, columnas de enlaces, y una franja
// inferior con el unico enlace (discreto) a la otra marca.
// ---------------------------------------------------------------------------

const FOOT_CATS: Record<string, { label: string; to: string }[]> = {
  gftextil: [
    { label: 'Salud y quirurgico', to: '/c/salud' },
    { label: 'Gastronomia', to: '/c/gastronomia' },
    { label: 'Escolar', to: '/c/escolar' },
    { label: 'Corporativo y Columbia', to: '/c/uniformes-corporativo' },
    { label: 'Gala y tradicion', to: '/c/gala' },
  ],
  artesika: [
    { label: 'Bisuteria y pulseras', to: '/c/bisuteria' },
    { label: 'Decoracion', to: '/c/decoracion' },
    { label: 'Regalos', to: '/c/regalar-detalles' },
    { label: 'Navidad', to: '/c/navidad' },
  ],
};

export function StoreFooter() {
  const wa = waLink(`Hola ${BRAND.name}, quiero hacer un pedido.`);
  const cats = FOOT_CATS[BRAND.id] ?? [];
  const year = new Date().getFullYear();

  return (
    <footer className={styles.foot} data-brand={BRAND.id}>
      <div className={styles.footInner}>
        <div className={styles.footTop}>
          <div className={styles.footBrand}>
            <span className={styles.footMark} data-brand={BRAND.id}>
              {BRAND.wordmark}
            </span>
            <p className={styles.footTagline}>{BRAND.tagline}</p>
            <a className={styles.footWa} href={wa} target="_blank" rel="noreferrer">
              Escribinos por WhatsApp
            </a>
          </div>

          <nav className={styles.footCol} aria-label="Tienda">
            <p className={styles.footColTitle}>Tienda</p>
            {cats.map((c) => (
              <Link key={c.to} to={c.to} className={styles.footLink}>
                {c.label}
              </Link>
            ))}
          </nav>

          <nav className={styles.footCol} aria-label="Ayuda">
            <p className={styles.footColTitle}>Ayuda</p>
            <Link to="/pago" className={styles.footLink}>
              Formas de pago
            </Link>
            <Link to="/contacto" className={styles.footLink}>
              Contacto
            </Link>
            {BRAND.id === 'gftextil' && (
              <>
                <Link to="/cotizar" className={styles.footLink}>
                  Pedir presupuesto
                </Link>
                <Link to="/otros" className={styles.footLink}>
                  Fabricacion a medida
                </Link>
              </>
            )}
            {BRAND.worlds.includes('navidad') && (
              <Link to="/preventa" className={styles.footLink}>
                Preventa navidena
              </Link>
            )}
          </nav>

          <div className={styles.footCol}>
            <p className={styles.footColTitle}>Envio y retiro</p>
            <p className={styles.footSmall}>Nacional por {CONFIG.couriers.join(', ')}.</p>
            <p className={styles.footSmall}>Retiro en {CONFIG.pickupCities.join(', ')}.</p>
            <p className={styles.footSmall}>
              {BRAND.id === 'artesika' ? 'contacto@artesika.com' : 'contacto@gftextil.com'}
            </p>
          </div>
        </div>

        <div className={styles.footBar}>
          <span className={styles.footCopy}>
            &copy; {year} {BRAND.name} &nbsp;·&nbsp; Hecho y despachado en Venezuela
          </span>
          <a href={BRAND.sibling.url} className={styles.footSiblingLink}>
            {BRAND.sibling.footerText} Conoce {BRAND.sibling.name} &#8599;
          </a>
        </div>
      </div>
    </footer>
  );
}
