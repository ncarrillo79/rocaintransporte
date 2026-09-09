import { useMemo, useState } from 'react';
import { CONFIG } from '../lib/catalog';
import { bsHint, usd } from '../lib/format';
import { lineLabel } from '../data/lines';
import type { Product, Specialty } from '../types';
import { useCart } from './Cart';
import { ChristmasBridge, CrossSellStrip, KitBundle, SpecialtySelector } from './CrossSell';
import { ImagePanel, Pill } from './ui';
import styles from './ProductPage.module.css';

function AvailabilityPill({ product }: { product: Product }) {
  const a = product.availability;
  if (a.kind === 'in_stock') {
    return (
      <Pill tone="ok">
        En stock - despacho {a.dispatchDays[0]}-{a.dispatchDays[1]} dias
      </Pill>
    );
  }
  if (a.kind === 'made_to_order') {
    return (
      <Pill tone="oficio">
        Hecho para ti - {a.leadDays[0]}-{a.leadDays[1]} dias
      </Pill>
    );
  }
  return <Pill tone="navidad">Preventa - entrega {a.deliverByLabel}</Pill>;
}

function Gallery({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  return (
    <div className={styles.gallery}>
      <ImagePanel image={product.images[active]} ratio="4 / 5" />
      {product.images.length > 1 && (
        <div className={styles.thumbs}>
          {product.images.map((img, i) => (
            <button
              key={i}
              type="button"
              className={`${styles.thumb} ${i === active ? styles.thumbOn : ''}`}
              onClick={() => setActive(i)}
              aria-label={`Ver imagen ${i + 1}`}
              aria-pressed={i === active}
            >
              <ImagePanel image={img} ratio="1 / 1" compact />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function TrustBlock() {
  return (
    <p className={styles.trust}>
      <strong>Confeccionado en Venezuela.</strong> Despacho nacional por {CONFIG.couriers.join(', ')}{' '}
      - Retiro en tienda en {CONFIG.pickupCities.join(', ')} - Cambio de talla dentro de 7 dias.
    </p>
  );
}

function BuyBox({
  product,
  options,
  setOption,
  personalizations,
  togglePersonalization,
}: {
  product: Product;
  options: Record<string, string>;
  setOption: (id: string, value: string) => void;
  personalizations: string[];
  togglePersonalization: (id: string) => void;
}) {
  const { add } = useCart();
  const chosen = product.personalizations.filter((p) => personalizations.includes(p.id));

  function addToCart() {
    add({
      kind: 'product',
      refId: product.id,
      title: product.title,
      unitPrice: product.price,
      options,
      addons: chosen.map((p) => ({ id: p.id, label: p.label, price: p.price })),
    });
  }

  return (
    <div className={styles.buybox}>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.price}>
        <span className={styles.priceUsd}>{usd(product.price)}</span>
        <span className={styles.priceBs}>{bsHint(product.price)}</span>
      </div>
      <AvailabilityPill product={product} />

      {product.options.map((g) => (
        <div key={g.id} className={styles.field}>
          <p className={styles.fieldLab}>{g.label}</p>
          <div className={styles.opts}>
            {g.values.map((v) => (
              <button
                key={v}
                type="button"
                aria-pressed={options[g.id] === v}
                className={`${styles.opt} ${options[g.id] === v ? styles.optOn : ''}`}
                onClick={() => setOption(g.id, v)}
              >
                {v}
              </button>
            ))}
          </div>
        </div>
      ))}

      {product.personalizations.map((p) => (
        <label key={p.id} className={styles.pers}>
          <input
            type="checkbox"
            checked={personalizations.includes(p.id)}
            onChange={() => togglePersonalization(p.id)}
          />
          <span>
            {p.label} - <strong>+{usd(p.price)}</strong>
          </span>
        </label>
      ))}

      <button type="button" className={styles.cta} onClick={addToCart}>
        Agregar al carrito
      </button>

      <TrustBlock />
    </div>
  );
}

export function ProductPage({ product }: { product: Product }) {
  const [specialty, setSpecialty] = useState<Specialty>(product.specialties[0] ?? 'odontologia');
  const [options, setOptions] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      product.options.filter((g) => g.required).map((g) => [g.id, g.values[0]]),
    ),
  );
  const [personalizations, setPersonalizations] = useState<string[]>([]);

  const setOption = (id: string, value: string) => setOptions((o) => ({ ...o, [id]: value }));
  const togglePersonalization = (id: string) =>
    setPersonalizations((list) =>
      list.includes(id) ? list.filter((x) => x !== id) : [...list, id],
    );

  const crumbs = useMemo(
    () => ['Inicio', lineLabel(product.line), product.title],
    [product.line, product.title],
  );

  return (
    <article className={styles.page}>
      <p className={styles.crumb}>{crumbs.join(' / ')}</p>

      <div className={styles.top}>
        <Gallery product={product} />
        <BuyBox
          product={product}
          options={options}
          setOption={setOption}
          personalizations={personalizations}
          togglePersonalization={togglePersonalization}
        />
      </div>

      <div className={styles.bridges}>
        <SpecialtySelector options={product.specialties} value={specialty} onChange={setSpecialty} />
        <CrossSellStrip product={product} specialty={specialty} />
        <KitBundle product={product} specialty={specialty} selectedOptions={options} />
        <ChristmasBridge product={product} specialty={specialty} selectedOptions={options} />
      </div>

      <section className={styles.specs}>
        <h2 className={styles.specsTitle}>Ficha tecnica</h2>
        <p className={styles.desc}>{product.description}</p>
        <dl className={styles.specList}>
          {product.specs.map((s) => (
            <div key={s.label} className={styles.specRow}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
