import { BRAND } from '../lib/brand';
import { usd } from '../lib/format';
import { Link } from '../lib/router';
import type { Product } from '../types';
import { ImagePanel } from './ui';
import styles from './ProductCard.module.css';

// Tarjeta de producto para grillas (home y colecciones). Sin carrito: toda la
// tarjeta lleva a la ficha, y desde ahi se consulta por WhatsApp.
// Artesika usa foto mas alta (4/5, tipo Etsy); GF Textil mas compacta (4/3).
export function ProductCard({ product }: { product: Product }) {
  const mediaRatio = BRAND.id === 'artesika' ? '4 / 5' : '4 / 3';
  const to = `/p/${product.slug}`;

  return (
    <article className={styles.card}>
      <Link to={to} className={styles.media}>
        <ImagePanel image={product.images[0]} ratio={mediaRatio} compact />
      </Link>
      <div className={styles.body}>
        <Link to={to} className={styles.name}>
          {product.shortName}
        </Link>
        <span className={styles.price}>{usd(product.price)}</span>
        <Link to={to} className={styles.btn}>
          Ver detalle &rarr;
        </Link>
      </div>
    </article>
  );
}
