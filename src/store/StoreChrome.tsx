import type { ReactNode } from 'react';
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
        <Link to="/" className={styles.wordmark}>
          TALLER<sup>logo</sup>
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
