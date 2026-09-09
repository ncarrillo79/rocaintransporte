import type { BrandId, World } from '../types';

// ---------------------------------------------------------------------------
// LAS DOS MARCAS. Una sola plataforma, dos caras.
//  - GF Textil : confeccion (kimonos, uniformes, salud, gastronomia, gala...)
//  - Artesika  : artesania (pulseras, cocuizas, lamparas, decoracion)
//
// Comparten catalogo, carrito, checkout, WhatsApp y cola de pedidos. Lo que
// cambia por marca: nombre, portada, color de acento y coleccion destacada.
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
  /** Mundos propios de la marca: se muestran primero en la home. */
  worlds: World[];
  /** Dominios que resuelven a esta marca. */
  hostnames: string[];
  /** La otra marca (el puente). */
  sibling: { id: BrandId; name: string; url: string; blurb: string };
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
    hostnames: ['gftextil.com', 'www.gftextil.com'],
    sibling: {
      id: 'artesika',
      name: 'Artesika',
      url: 'https://artesika.com',
      blurb: 'Pulseras por profesion, cocuizas, lamparas y decoracion artesanal.',
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
    worlds: ['oficio'],
    hostnames: ['artesika.com', 'www.artesika.com'],
    sibling: {
      id: 'gftextil',
      name: 'GF Textil',
      url: 'https://gftextil.com',
      blurb: 'Kimonos, uniformes de salud y gastronomia, escolares y trajes de gala a medida.',
    },
  },
};
