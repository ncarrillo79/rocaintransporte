import { CONFIG, getCrossSell, getKitFor, priceKit, productWorld, worldLabel } from '../lib/catalog';
import { round2, usd } from '../lib/format';
import { SPECIALTIES } from '../data/specialties';
import type { Product, Specialty } from '../types';
import { useCart } from './Cart';
import { ImagePanel } from './ui';
import styles from './CrossSell.module.css';

// ===========================================================================
// PUENTE 0 - Selector de especialidad
// Reordena los complementos y cambia el kit sin recargar la ficha.
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
// PUENTE 1 - "Combina con tu especialidad"
// ===========================================================================

export function CrossSellStrip({
  product,
  specialty,
}: {
  product: Product;
  specialty: Specialty;
}) {
  const { add } = useCart();
  const items = getCrossSell(product, specialty, 3);
  if (items.length === 0) return null;

  return (
    <section className={styles.block} aria-labelledby="xsell-title">
      <div className={styles.blockHead}>
        <h2 id="xsell-title" className={styles.blockTitle}>
          Combina con tu especialidad
        </h2>
        <span className={styles.blockVia}>se llena por la etiqueta #{specialty} - rol add-on</span>
      </div>
      <ul className={styles.strip}>
        {items.map((p) => (
          <li key={p.id} className={styles.mini}>
            <ImagePanel image={p.images[0]} ratio="3 / 2" compact />
            <div className={styles.miniBody}>
              <span className={styles.miniName}>{p.shortName}</span>
              <span className={styles.miniMeta}>
                {worldLabel(productWorld(p))} - {usd(p.price)}
              </span>
              <button
                type="button"
                className={styles.addBtn}
                onClick={() =>
                  add({ kind: 'addon', refId: p.id, title: p.shortName, unitPrice: p.price })
                }
              >
                + Anadir
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

// ===========================================================================
// PUENTE 2 - Kit (combo curado a precio de paquete)
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
  const { add } = useCart();
  const kit = getKitFor(product, specialty);
  if (!kit) return null;
  const pricing = priceKit(kit);

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
          <button
            type="button"
            className={styles.kitBtn}
            onClick={() =>
              add({
                kind: 'kit',
                refId: kit.id,
                title: kit.title,
                unitPrice: pricing.kitTotal,
                options: selectedOptions,
              })
            }
          >
            Agregar el kit
          </button>
        </div>
      </div>
    </section>
  );
}

// ===========================================================================
// PUENTE 3 - Navidad (envoltorio + reserva con anticipo)
// Se apaga entero con CONFIG.season.christmasEnabled = false
// ===========================================================================

export function ChristmasBridge({
  product,
  specialty,
  selectedOptions,
}: {
  product: Product;
  specialty: Specialty;
  selectedOptions: Record<string, string>;
}) {
  const { add } = useCart();
  const season = CONFIG.season;
  if (!season.christmasEnabled) return null;

  const kit = getKitFor(product, specialty);
  const base = kit ? priceKit(kit).kitTotal : product.price;
  const deposit = round2(base * season.depositPct);
  const balance = round2(base - deposit);

  return (
    <section className={styles.xmas} aria-labelledby="xmas-title">
      <span className={styles.xmasMark} aria-hidden="true">
        {'\u{1F384}'}
      </span>
      <div className={styles.xmasMain}>
        <h2 id="xmas-title" className={styles.xmasTitle}>
          Es un regalo para un colega?
        </h2>
        <p className={styles.xmasText}>
          {season.deadlineNote} Cupos de produccion esta semana:{' '}
          <strong>{season.weeklySlots}</strong>.
        </p>
        <div className={styles.xmasActs}>
          {CONFIG.giftWraps.map((w) => (
            <button
              key={w.id}
              type="button"
              className={styles.xmasBtn}
              onClick={() =>
                add({ kind: 'addon', refId: w.id, title: w.label, unitPrice: w.price })
              }
            >
              + {w.label} ({usd(w.price)})
            </button>
          ))}
          <button
            type="button"
            className={styles.xmasBtnSolid}
            onClick={() =>
              add({
                kind: 'reservation',
                refId: kit ? kit.id : product.id,
                title: `Reserva Navidad - ${kit ? kit.title : product.shortName}`,
                unitPrice: deposit,
                options: selectedOptions,
                note: `Anticipo ${Math.round(season.depositPct * 100)} % - saldo ${usd(
                  balance,
                )} contra despacho`,
              })
            }
          >
            Reservar para Navidad ({usd(deposit)})
          </button>
        </div>
      </div>
    </section>
  );
}
