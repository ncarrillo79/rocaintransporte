import { BRANDS, type Brand } from '../data/brands';
import type { BrandId } from '../types';

// ---------------------------------------------------------------------------
// Que marca mostrar. Se decide una vez, al cargar la pagina:
//   1. ?brand=artesika en la URL  (para pruebas; se recuerda en la sesion)
//   2. el dominio (gftextil.com / artesika.com)
//   3. por defecto: GF Textil
// ---------------------------------------------------------------------------

const DEFAULT_BRAND: BrandId = 'gftextil';

function isBrandId(v: string | null): v is BrandId {
  return v === 'gftextil' || v === 'artesika';
}

function detect(): BrandId {
  try {
    const q = new URLSearchParams(window.location.search).get('brand');
    if (isBrandId(q)) {
      sessionStorage.setItem('brand', q);
      return q;
    }
    const saved = sessionStorage.getItem('brand');
    if (isBrandId(saved)) return saved;
  } catch {
    /* sin storage */
  }

  const host = window.location.hostname.toLowerCase();
  for (const brand of Object.values(BRANDS)) {
    if (brand.hostnames.some((h) => host === h)) return brand.id;
  }
  // dominios de preview tipo *-artesika.pages.dev
  if (host.includes('artesika')) return 'artesika';

  return DEFAULT_BRAND;
}

export const BRAND: Brand = BRANDS[detect()];

/** Aplica el acento de la marca y el titulo. Se llama una vez en main.tsx. */
export function applyBrand(): void {
  const root = document.documentElement;
  root.style.setProperty('--brand-accent', BRAND.accent);
  root.style.setProperty('--brand-btn', BRAND.button);
  root.dataset.brand = BRAND.id;
  document.title = BRAND.name;
}
