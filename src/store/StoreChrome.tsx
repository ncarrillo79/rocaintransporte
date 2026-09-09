import type { ReactNode } from 'react';
import { BRAND } from '../lib/brand';
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
        <a className={styles.sibling} href={BRAND.sibling.url}>
          {BRAND.sibling.name} &#8599;
        </a>
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
