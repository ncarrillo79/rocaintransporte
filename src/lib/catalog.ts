import { COLLECTIONS } from '../data/collections';
import { CONFIG } from '../data/config';
import { LINES } from '../data/lines';
import { KITS, PRODUCTS } from '../data/products';
import type { Collection, Kit, Product, ProductFilter, Specialty, World } from '../types';
import { round2 } from './format';

// ---------------------------------------------------------------------------
// Consultas al catalogo. Los componentes solo hablan con estas funciones,
// nunca con los arrays crudos: manana esto puede leer de Shopify o un CMS
// sin cambiar un solo componente.
// ---------------------------------------------------------------------------

/** El mundo de un producto se deriva de su linea. */
export function productWorld(p: Product): World {
  return LINES[p.line].world;
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

// El puente real es hacia el Mundo 2: mostramos "oficio" antes que el resto.
function worldRank(p: Product): number {
  const w = productWorld(p);
  return w === 'oficio' ? 0 : w === 'gala' ? 1 : w === 'navidad' ? 2 : 3;
}

/**
 * Complementos para el modulo "Combina con tu especialidad".
 * Se llena solo: productos add_on que comparten la especialidad seleccionada.
 * Si faltan, rellena con regalos universales de temporada.
 */
export function getCrossSell(
  product: Product,
  specialty: Specialty | null,
  limit = 3,
): Product[] {
  const wanted = specialty ?? product.specialties[0] ?? null;
  const sharesSpecialty = (p: Product) => wanted !== null && p.specialties.includes(wanted);

  const primary = PRODUCTS.filter(
    (p) => p.id !== product.id && p.roles.includes('add_on') && sharesSpecialty(p),
  ).sort((a, b) => worldRank(a) - worldRank(b));

  if (primary.length >= limit) return primary.slice(0, limit);

  const filler = PRODUCTS.filter(
    (p) =>
      p.id !== product.id &&
      !primary.some((x) => x.id === p.id) &&
      p.roles.includes('gift') &&
      p.specialties.length === 0 &&
      p.occasions.includes('navidad'),
  );

  return [...primary, ...filler].slice(0, limit);
}

/** El kit que corresponde a esta ficha y a la especialidad elegida (si existe). */
export function getKitFor(product: Product, specialty: Specialty | null): Kit | undefined {
  return KITS.find(
    (k) => k.anchorProductId === product.id && (specialty === null || k.specialty === specialty),
  );
}

export interface KitPricing {
  listTotal: number;
  kitTotal: number;
  savings: number;
  anchor: Product | undefined;
  components: Product[];
}

/** Calcula el precio del kit a partir de sus piezas y el descuento. */
export function priceKit(kit: Kit): KitPricing {
  const anchor = getProduct(kit.anchorProductId);
  const components = kit.componentProductIds
    .map(getProduct)
    .filter((p): p is Product => Boolean(p));
  const listTotal = round2((anchor?.price ?? 0) + components.reduce((s, p) => s + p.price, 0));
  const kitTotal = round2(listTotal * (1 - kit.discountPct));
  return { listTotal, kitTotal, savings: round2(listTotal - kitTotal), anchor, components };
}

/** Sugerencias baratas para empujar la barra de envio gratis. */
export function cheapAddOns(excludeIds: string[], limit = 3): Product[] {
  return PRODUCTS.filter((p) => p.roles.includes('add_on') && !excludeIds.includes(p.id))
    .sort((a, b) => a.price - b.price)
    .slice(0, limit);
}

// ---------------------------------------------------------------------------
// Colecciones y filtrado de catalogo.
// ---------------------------------------------------------------------------

/** Aplica un filtro declarativo sobre un conjunto de productos. */
export function filterProducts(f: ProductFilter, pool: Product[] = PRODUCTS): Product[] {
  return pool.filter((p) => {
    if (f.worlds && f.worlds.length > 0 && !f.worlds.includes(productWorld(p))) return false;
    if (f.lines && f.lines.length > 0 && !f.lines.includes(p.line)) return false;
    if (
      f.specialties &&
      f.specialties.length > 0 &&
      !f.specialties.some((s) => p.specialties.includes(s))
    )
      return false;
    if (
      f.occasions &&
      f.occasions.length > 0 &&
      !f.occasions.some((o) => p.occasions.includes(o))
    )
      return false;
    if (f.roles && f.roles.length > 0 && !f.roles.some((r) => p.roles.includes(r))) return false;
    if (typeof f.maxPrice === 'number' && p.price > f.maxPrice) return false;
    return true;
  });
}

export function getCollection(id: string): Collection | undefined {
  return COLLECTIONS.find((c) => c.id === id);
}

export function getCollectionProducts(id: string): Product[] {
  const c = getCollection(id);
  return c ? filterProducts(c.filter) : [];
}

// ---------------------------------------------------------------------------
// Etiquetas de mundo, para la interfaz.
// ---------------------------------------------------------------------------

export const worldLabel = (w: World): string =>
  w === 'trabajo'
    ? 'Trabajo'
    : w === 'oficio'
      ? 'Oficio'
      : w === 'gala'
        ? 'Gala'
        : 'Navidad';

export { COLLECTIONS, CONFIG };
