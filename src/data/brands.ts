import type { BrandId, World } from '../types';

// ---------------------------------------------------------------------------
// LAS DOS MARCAS. Una sola plataforma tecnica, dos tiendas independientes.
//  - GF Textil : confeccion profesional. Mundos trabajo y gala.
//  - Artesika  : artesania y regalos. Mundos oficio y navidad.
//
// Cada marca se comporta como su propia tienda: navegacion, home, colecciones
// y cross-sell NO cruzan de una a la otra. Lo unico compartido es el carrito y
// el despacho a nivel tecnico (mismo Cart.tsx). El unico enlace entre marcas es
// un link discreto en el footer.
//
// El aislamiento se aplica una sola vez en src/lib/catalog.ts, que filtra el
// catalogo a los `worlds` de la marca activa.
//
// La marca se decide por el dominio (ver src/lib/brand.ts). Para probar en
// local: agrega ?brand=artesika a la URL.
// ---------------------------------------------------------------------------

export interface Brand {
  id: BrandId;
  name: string;
  wordmark: string;
  heroTitle: string;
  tagline: string;
  /**
   * Acento de marca (subrayado del logo, portada). Usa un token del tema
   * (`var(--trabajo)` / `var(--oficio)`) para que siga claro/oscuro solo.
   */
  accent: string;
  /** Fondo del boton primario (color fijo; debe llevar texto blanco legible). */
  button: string;
  /** Coleccion que la home de esta marca destaca. */
  homeCollectionId: string;
  /**
   * Mundos de la marca. El catalogo, la navegacion y el cross-sell se limitan
   * a estos mundos (ver src/lib/catalog.ts). Un producto de otro mundo no
   * aparece nunca en esta marca.
   */
  worlds: World[];
  /** WhatsApp de esta marca, formato internacional sin '+'. Para cotizacion y a medida. */
  whatsapp: string;
  /** Dominios que resuelven a esta marca. */
  hostnames: string[];
  /** La otra marca: solo para el link discreto del footer. */
  sibling: { id: BrandId; name: string; url: string; footerText: string };
}

export const BRANDS: Record<BrandId, Brand> = {
  gftextil: {
    id: 'gftextil',
    name: 'GF Textil',
    wordmark: 'GF TEXTIL',
    heroTitle: 'Confeccion profesional, hecha en Venezuela',
    tagline:
      'Confeccion profesional, escolar y de gala. Kimonos, uniformes, batas y trajes a medida, hechos en Venezuela.',
    accent: 'var(--trabajo)',
    button: '#1e5b57',
    homeCollectionId: 'uniformes',
    worlds: ['trabajo', 'gala'],
    // Numero real, confirmado. Es el mismo de Artesika a proposito: lo atienden
    // las dos socias desde el mismo telefono.
    whatsapp: '584243018032',
    hostnames: ['gftextil.com', 'www.gftextil.com'],
    sibling: {
      id: 'artesika',
      name: 'Artesika',
      url: 'https://artesika.com',
      footerText: 'Buscas artesania, bisuteria o regalos hechos a mano?',
    },
  },
  artesika: {
    id: 'artesika',
    name: 'Artesika',
    wordmark: 'artesika',
    heroTitle: 'Artesania venezolana, hecha a mano',
    tagline:
      'Artesania venezolana: pulseras por profesion, cocuizas y espardenas, lamparas de madera y detalles para regalar.',
    accent: 'var(--oficio)',
    button: '#8a5f22',
    homeCollectionId: 'artesania',
    worlds: ['oficio', 'navidad'],
    // Numero real, confirmado. Es el mismo de GF Textil a proposito: lo
    // atienden las dos socias desde el mismo telefono.
    whatsapp: '584243018032',
    hostnames: ['artesika.com', 'www.artesika.com'],
    sibling: {
      id: 'gftextil',
      name: 'GF Textil',
      url: 'https://gftextil.com',
      footerText: 'Buscas uniformes o confeccion textil a medida?',
    },
  },
};
