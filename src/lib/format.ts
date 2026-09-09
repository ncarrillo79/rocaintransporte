import { CONFIG } from '../data/config';

/** Formatea un monto USD: "$28" o "$37,40" (coma decimal, estilo es-VE). */
export function usd(n: number): string {
  const hasCents = Math.round(n * 100) % 100 !== 0;
  const s = n.toLocaleString('es-VE', {
    minimumFractionDigits: hasCents ? 2 : 0,
    maximumFractionDigits: 2,
  });
  return `$${s}`;
}

/** Texto de referencia en bolivares junto al precio. */
export function bsHint(n: number): string {
  if (CONFIG.bsRate && CONFIG.bsRate > 0) {
    const bs = (n * CONFIG.bsRate).toLocaleString('es-VE', { maximumFractionDigits: 0 });
    return `~ Bs. ${bs}`;
  }
  return '~ Bs. ref. segun tasa del dia';
}

/** Redondeo a 2 decimales sin errores de coma flotante. */
export function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
