import { useMemo, useState } from 'react';
import { specialtyLabel } from '../data/specialties';
import { getCollection, getCollectionProducts, productWorld, worldLabel } from '../lib/catalog';
import { Link } from '../lib/router';
import type { Availability, Specialty, World } from '../types';
import { ProductCard } from './ProductCard';
import styles from './CollectionPage.module.css';

type PriceBucket = 'all' | 'lt10' | 'mid' | 'gt25';
type AvailKind = 'all' | Availability['kind'];

const uniq = <T,>(xs: T[]): T[] => [...new Set(xs)];

const PRICE_OPTIONS: [PriceBucket, string][] = [
  ['all', 'Todos'],
  ['lt10', 'Hasta $10'],
  ['mid', '$10 - $25'],
  ['gt25', 'Mas de $25'],
];

const AVAIL_OPTIONS: [AvailKind, string][] = [
  ['all', 'Todas'],
  ['in_stock', 'En stock'],
  ['made_to_order', 'Bajo pedido'],
  ['presale', 'Preventa'],
];

export function CollectionPage({ id }: { id: string }) {
  const collection = getCollection(id);
  const base = useMemo(() => getCollectionProducts(id), [id]);
  const worldsInBase = useMemo(() => uniq(base.map((p) => productWorld(p))), [base]);
  const specsInBase = useMemo(() => uniq(base.flatMap((p) => p.specialties)), [base]);

  const [worldSel, setWorldSel] = useState<World[]>([]);
  const [specSel, setSpecSel] = useState<Specialty[]>([]);
  const [price, setPrice] = useState<PriceBucket>('all');
  const [avail, setAvail] = useState<AvailKind>('all');

  if (!collection) {
    return (
      <div className={styles.page}>
        <p className={styles.notfound}>
          No encontramos esa coleccion. <Link to="/">Volver al inicio</Link>
        </p>
      </div>
    );
  }

  const shown = base.filter((p) => {
    if (worldSel.length > 0 && !worldSel.includes(productWorld(p))) return false;
    if (specSel.length > 0 && !specSel.some((s) => p.specialties.includes(s))) return false;
    if (price === 'lt10' && p.price >= 10) return false;
    if (price === 'mid' && (p.price < 10 || p.price > 25)) return false;
    if (price === 'gt25' && p.price <= 25) return false;
    if (avail !== 'all' && p.availability.kind !== avail) return false;
    return true;
  });

  const anyFilter =
    worldSel.length > 0 || specSel.length > 0 || price !== 'all' || avail !== 'all';

  const clear = () => {
    setWorldSel([]);
    setSpecSel([]);
    setPrice('all');
    setAvail('all');
  };

  const toggleWorld = (w: World) =>
    setWorldSel((xs) => (xs.includes(w) ? xs.filter((x) => x !== w) : [...xs, w]));
  const toggleSpec = (s: Specialty) =>
    setSpecSel((xs) => (xs.includes(s) ? xs.filter((x) => x !== s) : [...xs, s]));

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>{collection.kicker}</p>
        <h1 className={styles.title}>{collection.title}</h1>
        <p className={styles.blurb}>{collection.blurb}</p>
        {collection.world === 'hub' && worldsInBase.length > 1 && (
          <p className={styles.bridgeNote}>
            Mezcla ropa de trabajo y artesania: el puente por intencion.
          </p>
        )}
      </header>

      <div className={styles.body}>
        <aside className={styles.facets} aria-label="Filtros">
          {worldsInBase.length > 1 && (
            <div className={styles.facet}>
              <p className={styles.facetLab}>Mundo</p>
              <div className={styles.pillRow}>
                {worldsInBase.map((w) => (
                  <button
                    key={w}
                    type="button"
                    aria-pressed={worldSel.includes(w)}
                    className={`${styles.pill} ${worldSel.includes(w) ? styles.pillOn : ''}`}
                    onClick={() => toggleWorld(w)}
                  >
                    {worldLabel(w)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {specsInBase.length > 1 && (
            <div className={styles.facet}>
              <p className={styles.facetLab}>Especialidad</p>
              <div className={styles.pillRow}>
                {specsInBase.map((s) => (
                  <button
                    key={s}
                    type="button"
                    aria-pressed={specSel.includes(s)}
                    className={`${styles.pill} ${specSel.includes(s) ? styles.pillOn : ''}`}
                    onClick={() => toggleSpec(s)}
                  >
                    {specialtyLabel(s)}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.facet}>
            <p className={styles.facetLab}>Precio</p>
            <div className={styles.radioCol}>
              {PRICE_OPTIONS.map(([v, label]) => (
                <label key={v} className={styles.radio}>
                  <input
                    type="radio"
                    name="precio"
                    checked={price === v}
                    onChange={() => setPrice(v)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          <div className={styles.facet}>
            <p className={styles.facetLab}>Disponibilidad</p>
            <div className={styles.radioCol}>
              {AVAIL_OPTIONS.map(([v, label]) => (
                <label key={v} className={styles.radio}>
                  <input
                    type="radio"
                    name="disp"
                    checked={avail === v}
                    onChange={() => setAvail(v)}
                  />
                  {label}
                </label>
              ))}
            </div>
          </div>

          {anyFilter && (
            <button type="button" className={styles.clear} onClick={clear}>
              Limpiar filtros
            </button>
          )}
        </aside>

        <div className={styles.results}>
          <p className={styles.count}>
            {shown.length} {shown.length === 1 ? 'articulo' : 'articulos'}
          </p>
          {shown.length === 0 ? (
            <p className={styles.empty}>Nada coincide con esos filtros.</p>
          ) : (
            <div className={styles.grid}>
              {shown.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
