import { getCrossSell, getKitFor, priceKit, productWorld, worldLabel } from '../lib/catalog';
import { usd } from '../lib/format';
import { Link } from '../lib/router';
import { waLink } from '../lib/whatsapp';
import { SPECIALTIES } from '../data/specialties';
import type { Product, Specialty } from '../types';
import { ImagePanel } from './ui';
import styles from './CrossSell.module.css';

// ===========================================================================
// Selector de especialidad: reordena los complementos y cambia el kit.
// ===========================================================================

export function SpecialtySelector({
  options,
  value,
  onChange,
}: {
  options: Specialty[];
  value: Specialty;
  onChange: (s: Specialty) => void;
}) {
  if (options.length <= 1) return null;
  return (
    <div className={styles.specSel}>
      <p className={styles.specLab}>Especialidad - ajusta los detalles a juego</p>
      <div className={styles.specPills} role="group" aria-label="Especialidad">
        {options.map((s) => (
          <button
            key={s}
            type="button"
            aria-pressed={s === value}
            className={`${styles.specPill} ${s === value ? styles.specPillOn : ''}`}
            onClick={() => onChange(s)}
          >
            {SPECIALTIES[s].label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ===========================================================================
// "Combina con tu especialidad" - complementos de la misma marca.
// ===========================================================================

export function CrossSellStrip({
  product,
  specialty,
}: {
  product: Product;
  specialty: Specialty;
}) {
  const items = getCrossSell(product, specialty, 3);
  if (items.length === 0) return null;

  return (
    <section className={styles.block} aria-labelledby="xsell-title">
      <div className={styles.blockHead}>
        <h2 id="xsell-title" className={styles.blockTitle}>
          Combina con tu especialidad
        </h2>
      </div>
      <ul className={styles.strip}>
        {items.map((p) => (
          <li key={p.id} className={styles.mini}>
            <Link to={`/p/${p.slug}`}>
              <ImagePanel image={p.images[0]} ratio="3 / 2" compact />
            </Link>
            <div className={styles.miniBody}>
              <span className={styles.miniName}>{p.shortName}</span>
              <span className={styles.miniMeta}>
                {worldLabel(productWorld(p))} - {usd(p.price)}
              </span>
              <Link to={`/p/${p.slug}`} className={styles.addBtn}>
                Ver
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ===========================================================================
// Kit (combo curado a precio de paquete). Se consulta por WhatsApp.
// ===========================================================================

export function KitBundle({
  product,
  specialty,
  selectedOptions,
}: {
  product: Product;
  specialty: Specialty;
  selectedOptions: Record<string, string>;
}) {
  const kit = getKitFor(product, specialty);
  if (!kit) return null;
  const pricing = priceKit(kit);

  const piezas = [
    pricing.anchor?.shortName,
    ...pricing.components.map((c) => c.shortName),
  ].filter(Boolean);
  const wa = waLink(
    `Hola, me interesa el ${kit.title} (${piezas.join(' + ')})` +
      (selectedOptions.talla ? ` - talla ${selectedOptions.talla}` : '') +
      (selectedOptions.color ? ` - ${selectedOptions.color}` : ''),
  );

  return (
    <section className={styles.kit} aria-labelledby="kit-title">
      <p className={styles.kitHead} id="kit-title">
        {kit.title} - ahorra {Math.round(kit.discountPct * 100)} %
      </p>
      <div className={styles.kitBody}>
        <div>
          <p className={styles.kitBlurb}>{kit.blurb}</p>
          <ul className={styles.kitItems}>
            {pricing.anchor && (
              <li>
                {pricing.anchor.shortName}
                {selectedOptions.talla ? ` - talla ${selectedOptions.talla}` : ''}
                {selectedOptions.color ? ` - ${selectedOptions.color}` : ''}
              </li>
            )}
            {pricing.components.map((c) => (
              <li key={c.id}>{c.shortName}</li>
            ))}
          </ul>
        </div>
        <div className={styles.kitPrice}>
          <span className={styles.kitOld}>Suelto {usd(pricing.listTotal)}</span>
          <span className={styles.kitNew}>{usd(pricing.kitTotal)}</span>
          <span className={styles.kitSave}>ahorras {usd(pricing.savings)}</span>
          <a className={styles.kitBtn} href={wa} target="_blank" rel="noreferrer">
            Consultar el kit
          </a>
        </div>
      </div>
    </section>
  );
}
