import { useMemo, useState } from 'react';
import { BRAND } from '../lib/brand';
import { CONFIG } from '../lib/catalog';
import { swatchColor } from '../lib/colors';
import { bsHint, usd } from '../lib/format';
import { Link } from '../lib/router';
import { waProduct } from '../lib/whatsapp';
import { lineLabel } from '../data/lines';
import type { Product, Specialty } from '../types';
import { CrossSellStrip, KitBundle, SpecialtySelector } from './CrossSell';
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
      <ImagePanel image={product.images[active]} natural />
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
  const chosen = product.personalizations.filter((p) => personalizations.includes(p.id));
  const wa = waProduct(product.title, options, chosen);

  return (
    <div className={styles.buybox}>
      <h1 className={styles.title}>{product.title}</h1>
      <div className={styles.price}>
        <span className={styles.priceUsd}>{usd(product.price)}</span>
        <span className={styles.priceBs}>{bsHint(product.price)}</span>
      </div>
      <AvailabilityPill product={product} />

      {product.options.map((g) => {
        const isColor = g.id === 'color' || g.id === 'vivo';
        return (
          <div key={g.id} className={styles.field}>
            <p className={styles.fieldLab}>{g.label}</p>
            <div className={styles.opts}>
              {g.values.map((v) => {
                const sw = isColor ? swatchColor(v) : null;
                return (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={options[g.id] === v}
                    className={`${styles.opt} ${isColor ? styles.optColor : ''} ${options[g.id] === v ? styles.optOn : ''}`}
                    onClick={() => setOption(g.id, v)}
                  >
                    {isColor && (
                      <span
                        className={styles.swatch}
                        style={sw ? { background: sw } : undefined}
                        data-empty={sw ? undefined : 'true'}
                        aria-hidden="true"
                      />
                    )}
                    {v}
                  </button>
                );
              })}
            </div>
            {isColor && (
              <p className={styles.colorHint}>
                Otro color o combinacion?{' '}
                {BRAND.id === 'gftextil' ? (
                  <>
                    Indicalo al <Link to="/cotizar">solicitar presupuesto</Link>.
                  </>
                ) : (
                  'Escribinos y lo hacemos a pedido.'
                )}
              </p>
            )}
          </div>
        );
      })}

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

      <a className={styles.cta} href={wa} target="_blank" rel="noreferrer">
        Consultar por WhatsApp
      </a>

      {BRAND.id === 'gftextil' && (
        <p className={styles.quoteHint}>
          Pedido para un equipo o una prenda a medida?{' '}
          <Link to="/cotizar">Pedir presupuesto</Link> ·{' '}
          <Link to="/otros">Fabricacion a medida</Link>
        </p>
      )}

      <TrustBlock />
    </div>
  );
}

function SizeChartSection({ product }: { product: Product }) {
  const chart = product.sizeChart;
  if (!chart) return null;
  return (
    <section className={styles.specs}>
      <h2 className={styles.specsTitle}>Tabla de talles</h2>
      {chart.note && <p className={styles.desc}>{chart.note}</p>}
      <div className={styles.sizeWrap}>
        <table className={styles.sizeTable}>
          <thead>
            <tr>
              {chart.headers.map((h) => (
                <th key={h}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chart.rows.map((r) => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {r.values.map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className={styles.sizeNote}>Medidas en centimetros. Referenciales; puede variar segun el corte.</p>
    </section>
  );
}

function CustomerPhotosSection({ product }: { product: Product }) {
  const photos = product.customerPhotos;
  if (!photos || photos.length === 0) return null;
  return (
    <section className={styles.specs}>
      <h2 className={styles.specsTitle}>Fotos de nuestras clientas</h2>
      <div className={styles.custPhotos}>
        {photos.map((p, i) => (
          <figure key={i} className={styles.custPhoto}>
            <img src={p.image} alt={p.note ?? 'Foto de clienta con la prenda'} loading="lazy" />
            {p.note && <figcaption>{p.note}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
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

  const descTitle = BRAND.id === 'artesika' ? 'Sobre la pieza' : 'Descripcion';

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
      </div>

      <section className={styles.specs}>
        <h2 className={styles.specsTitle}>{descTitle}</h2>
        {product.description && <p className={styles.desc}>{product.description}</p>}
        {product.longDescription && <p className={styles.desc}>{product.longDescription}</p>}
        <dl className={styles.specList}>
          {product.specs.map((s) => (
            <div key={s.label} className={styles.specRow}>
              <dt>{s.label}</dt>
              <dd>{s.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <SizeChartSection product={product} />
      <CustomerPhotosSection product={product} />
    </article>
  );
}
