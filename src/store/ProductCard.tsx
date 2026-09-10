import { BRAND } from '../lib/brand';
import { productWorld, worldLabel } from '../lib/catalog';
import { usd } from '../lib/format';
import { Link } from '../lib/router';
import type { Product } from '../types';
import { ImagePanel } from './ui';
import styles from './ProductCard.module.css';

// Tarjeta de producto para grillas (home y colecciones). Sin carrito: siempre
// lleva a la ficha, y desde ahi se consulta por WhatsApp.
// Artesika usa foto mas alta (4/5, tipo Etsy); GF Textil mas compacta (4/3).
export function ProductCard({ product }: { product: Product }) {
  const mediaRatio = BRAND.id === 'artesika' ? '4 / 5' : '4 / 3';

  return (
    <article className={styles.card}>
      <Link to={`/p/${product.slug}`} className={styles.media}>
        <ImagePanel image={product.images[0]} ratio={mediaRatio} compact />
      </Link>
      <div className={styles.body}>
        <span className={styles.world} data-world={productWorld(product)}>
          {worldLabel(productWorld(product))}
        </span>
        <Link to={`/p/${product.slug}`} className={styles.name}>
          {product.shortName}
        </Link>
        <span className={styles.price}>{usd(product.price)}</span>
        <Link to={`/p/${product.slug}`} className={styles.btn}>
          Ver
        </Link>
      </div>
    </article>
  );
}
