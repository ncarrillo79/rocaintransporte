import type { ReactNode } from 'react';
import { BRAND } from '../lib/brand';
import { CONFIG } from '../lib/catalog';
import { Link } from '../lib/router';
import { useCart } from './Cart';
import { PrimaryNav } from './MegaMenu';
import styles from './StoreChrome.module.css';

export function PageShell({ children }: { children: ReactNode }) {
  return <div className={styles.shell}>{children}</div>;
}

export function StoreHeader() {
  const { count, open } = useCart();
  return (
    <header className={styles.head}>
      <div className={styles.headInner}>
        <Link to="/" className={styles.wordmark} data-brand={BRAND.id}>
          {BRAND.wordmark}
        </Link>
        <div className={styles.navWrap}>
          <PrimaryNav />
        </div>
        <button className={styles.cartBtn} onClick={open}>
          Carrito ({count})
        </button>
      </div>
    </header>
  );
}

// ---------------------------------------------------------------------------
// Footer. Unico lugar del sitio con un enlace a la otra marca, y discreto.
// ---------------------------------------------------------------------------

export function StoreFooter() {
  return (
    <footer className={styles.foot}>
      <div className={styles.footInner}>
        <nav className={styles.footNav} aria-label="Footer">
          <Link to="/pago" className={styles.footLink}>
            Formas de pago
          </Link>
          <Link to="/contacto" className={styles.footLink}>
            Contacto
          </Link>
          {BRAND.id === 'gftextil' && (
            <>
              <Link to="/cotizar" className={styles.footLink}>
                Solicitar presupuesto
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

        <p className={styles.footShip}>
          Envio nacional por {CONFIG.couriers.join(', ')} · Retiro en tienda en{' '}
          {CONFIG.pickupCities.join(', ')}
        </p>

        <p className={styles.footSibling}>
          {BRAND.sibling.footerText}{' '}
          <a href={BRAND.sibling.url} className={styles.footSiblingLink}>
            Conoce {BRAND.sibling.name} &#8599;
          </a>
        </p>

        <p className={styles.footCopy}>
          {BRAND.name} · Confeccionado y despachado en Venezuela
        </p>
      </div>
    </footer>
  );
}
