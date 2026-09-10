import { BRAND } from './brand';

// ---------------------------------------------------------------------------
// Enlaces a WhatsApp. No hay carrito: cada "compra" es una consulta al chat
// de la marca con un texto ya armado.
// ---------------------------------------------------------------------------

/** wa.me de la marca activa con un texto libre. */
export function waLink(text: string): string {
  return `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(text)}`;
}

/** Consulta por un producto, con las opciones elegidas y las personalizaciones. */
export function waProduct(
  title: string,
  options?: Record<string, string>,
  addons?: { label: string }[],
): string {
  const parts: string[] = [title];
  if (options) {
    for (const [k, v] of Object.entries(options)) {
      if (v) parts.push(`${k}: ${v}`);
    }
  }
  if (addons && addons.length > 0) {
    parts.push(`con ${addons.map((a) => a.label).join(', ')}`);
  }
  return waLink(`Hola, me interesa este producto de ${BRAND.name}: ${parts.join(' - ')}`);
}
