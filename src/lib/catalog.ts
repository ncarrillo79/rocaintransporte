import { COLLECTIONS } from '../data/collections';
import { CONFIG } from '../data/config';
import { LINES } from '../data/lines';
import { KITS, PRODUCTS } from '../data/products';
import type { Collection, Kit, Product, ProductFilter, Specialty, World } from '../types';
import { BRAND } from './brand';
import { round2 } from './format';

// ---------------------------------------------------------------------------
// Consultas al catalogo. Los componentes solo hablan con estas funciones,
// nunca con los arrays crudos: manana esto puede leer de Shopify o un CMS
// sin cambiar un solo componente.
//
// AISLAMIENTO POR MARCA: todo lo visible se limita a los `worlds` de la marca
// activa (src/data/brands.ts). GF Textil nunca ve artesania ni Navidad;
// Artesika nunca ve trabajo ni gala. Esto se aplica aqui, una sola vez.
// ---------------------------------------------------------------------------

/** El mundo de un producto se deriva de su linea. */
export function productWorld(p: Product): World {
  return LINES[p.line].world;
}

/** Todos los productos de la marca activa (incluye los que aun no tienen foto). */
export const BRAND_POOL: Product[] = PRODUCTS.filter((p) =>
  BRAND.worlds.includes(productWorld(p)),
);

const hasPhoto = (p: Product) => p.images.some((i) => i.kind === 'photo');

/**
 * Lo que se MUESTRA: solo productos con foto real. Los que estan con dibujo
 * de linea quedan ocultos hasta que se les cargue una foto (reaparecen solos).
 */
export const VISIBLE_POOL: Product[] = BRAND_POOL.filter(hasPhoto);

/** Un kit se muestra solo si su ancla y todos sus componentes son de la marca. */
const inPool = (id: string) => BRAND_POOL.some((p) => p.id === id);
export const BRAND_KITS: Kit[] = KITS.filter(
  (k) => inPool(k.anchorProductId) && k.componentProductIds.every(inPool),
);

/** Busca en TODO el catalogo, sin filtros. Solo para calculos internos (kits). */
function findProductAny(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProduct(id: string): Product | undefined {
  return VISIBLE_POOL.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): Product | undefined {
  return VISIBLE_POOL.find((p) => p.slug === slug);
}

// Orden de los complementos dentro de la ficha: primero el mismo mundo que la
// pieza, luego el resto de mundos de la marca. (Antes esto empujaba "oficio"
// para cruzar de una marca a la otra; ese puente se elimino.)
function worldRank(anchor: Product, p: Product): number {
  return productWorld(p) === productWorld(anchor) ? 0 : 1;
}

/**
 * Complementos para el modulo "Combina con tu especialidad".
 * Se llena solo: productos add_on de la misma marca que comparten la
 * especialidad seleccionada. Si faltan, rellena con regalos universales.
 */
export function getCrossSell(
  product: Product,
  specialty: Specialty | null,
  limit = 3,
): Product[] {
  const wanted = specialty ?? product.specialties[0] ?? null;
  const sharesSpecialty = (p: Product) => wanted !== null && p.specialties.includes(wanted);

  const primary = VISIBLE_POOL.filter(
    (p) => p.id !== product.id && p.roles.includes('add_on') && sharesSpecialty(p),
  ).sort((a, b) => worldRank(product, a) - worldRank(product, b));

  if (primary.length >= limit) return primary.slice(0, limit);

  const filler = VISIBLE_POOL.filter(
    (p) =>
      p.id !== product.id &&
      !primary.some((x) => x.id === p.id) &&
      p.roles.includes('gift') &&
      p.specialties.length === 0,
  );

  return [...primary, ...filler].slice(0, limit);
}

/** El kit que corresponde a esta ficha y a la especialidad elegida (si existe). */
export function getKitFor(product: Product, specialty: Specialty | null): Kit | undefined {
  return BRAND_KITS.find(
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
  const anchor = findProductAny(kit.anchorProductId);
  const components = kit.componentProductIds
    .map(findProductAny)
    .filter((p): p is Product => Boolean(p));
  const listTotal = round2((anchor?.price ?? 0) + components.reduce((s, p) => s + p.price, 0));
  const kitTotal = round2(listTotal * (1 - kit.discountPct));
  return { listTotal, kitTotal, savings: round2(listTotal - kitTotal), anchor, components };
}

// ---------------------------------------------------------------------------
// Colecciones y filtrado de catalogo.
// ---------------------------------------------------------------------------

/** Aplica un filtro declarativo. Por defecto sobre lo visible (con foto). */
export function filterProducts(f: ProductFilter, pool: Product[] = VISIBLE_POOL): Product[] {
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
