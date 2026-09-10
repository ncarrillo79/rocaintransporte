import { BRAND } from '../lib/brand';
import { productWorld, worldLabel } from '../lib/catalog';
import { usd } from '../lib/format';
import { Link } from '../lib/router';
import type { Product } from '../types';
import { useCart } from './Cart';
import { ImagePanel } from './ui';
import styles from './ProductCard.module.css';

// Tarjeta de producto para grillas (home y colecciones).
// Si la pieza tiene opciones obligatorias (talla, color) manda a la ficha;
// si no, deja anadir al carrito desde la grilla.
// Artesika usa foto mas alta (4/5, tipo Etsy); GF Textil mas compacta (4/3).
export function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const needsOptions = product.options.some((o) => o.required);
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
        {needsOptions ? (
          <Link to={`/p/${product.slug}`} className={styles.btn}>
            Ver opciones
          </Link>
        ) : (
          <button
            type="button"
            className={styles.btn}
            onClick={() =>
              add({
                kind: 'addon',
                refId: product.id,
                title: product.shortName,
                unitPrice: product.price,
              })
            }
          >
            + Anadir
          </button>
        )}
      </div>
    </article>
  );
}
