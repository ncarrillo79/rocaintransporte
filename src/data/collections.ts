import type { Collection } from '../types';

// ---------------------------------------------------------------------------
// COLECCIONES. Cada una es un filtro sobre el catalogo.
//  - filter.lines        => por linea de producto (salud, gastronomia, ...).
//  - filter.specialties  => piezas con esa etiqueta de profesion.
// El catalogo ya viene acotado a la marca activa (src/lib/catalog.ts), asi que
// una coleccion nunca muestra productos de la otra marca aunque el filtro sea
// amplio. Las colecciones "regalar-*" solo se enlazan desde Artesika.
// Para crear una nueva: agrega un objeto aqui y enlaza su id desde el menu
// (src/store/MegaMenu.tsx) o desde la home.
// ---------------------------------------------------------------------------

export const COLLECTIONS: Collection[] = [
  // ---- Mundo 1: Trabajo ----
  {
    id: 'uniformes',
    title: 'Uniformes y textil profesional',
    kicker: 'Trabajo',
    blurb: 'Toda la linea de trabajo: salud, gastronomia, escolar, corporativo e industrial.',
    world: 'trabajo',
    filter: { worlds: ['trabajo'] },
  },
  {
    id: 'salud',
    title: 'Salud y quirurgico',
    kicker: 'Trabajo - Salud',
    blurb: 'Kimonos, batas antifluido, pijamas quirurgicas y gorros. Por talla y color.',
    world: 'trabajo',
    filter: { lines: ['salud'] },
  },
  {
    id: 'gastronomia',
    title: 'Gastronomia',
    kicker: 'Trabajo - Gastronomia',
    blurb: 'Filipinas de chef, delantales, gorros y mandiles de sala. Bordado de logo disponible.',
    world: 'trabajo',
    filter: { lines: ['gastronomia'] },
  },
  {
    id: 'escolar',
    title: 'Uniformes escolares',
    kicker: 'Trabajo - Escolar',
    blurb: 'Camisas, monos deportivos y batas de laboratorio. Produccion por colegio y talla.',
    world: 'trabajo',
    filter: { lines: ['escolar'] },
  },
  {
    id: 'uniformes-corporativo',
    title: 'Corporativo y Columbia',
    kicker: 'Trabajo - Corporativo',
    blurb: 'Camisas tipo Columbia, chemises, blusas administrativas y uniformes de empresa.',
    world: 'trabajo',
    filter: { lines: ['corporativo'] },
  },
  {
    id: 'industrial',
    title: 'Seguridad industrial',
    kicker: 'Trabajo - Industrial',
    blurb: 'Overoles, chalecos reflectivos y dotacion de trabajo.',
    world: 'trabajo',
    filter: { lines: ['industrial'] },
  },

  // ---- Mundo Gala ----
  {
    id: 'gala',
    title: 'Gala y tradicion',
    kicker: 'Mundo Gala',
    blurb: 'Vestidos de fiesta y graduacion, liqui liqui de dama y caballero. Confeccion a medida.',
    world: 'gala',
    filter: { lines: ['gala'] },
  },

  // ---- Artesika: Oficio ----
  {
    id: 'artesania',
    title: 'Artesania y regalos',
    kicker: 'Oficio',
    blurb: 'Cocuizas, pulseras por profesion, lamparas de madera y decoracion. Hecho a mano.',
    world: 'oficio',
    filter: { lines: ['artesania', 'decoracion'] },
  },
  {
    id: 'bisuteria',
    title: 'Bisuteria y pulseras',
    kicker: 'Oficio',
    blurb: 'Pulseras por profesion, llaveros y piezas pequenas tejidas a mano.',
    world: 'oficio',
    filter: { lines: ['artesania'] },
  },
  {
    id: 'decoracion',
    title: 'Decoracion',
    kicker: 'Oficio',
    blurb: 'Lamparas de madera, cojines, faroles y piezas para la casa. Hecho a mano.',
    world: 'oficio',
    filter: { lines: ['decoracion'] },
  },

  // ---- Artesika: regalar por profesion (solo piezas artesanales) ----
  {
    id: 'regalar-odontologia',
    title: 'Para un odontologo',
    kicker: 'Regalar por profesion',
    blurb: 'Pulseras, llaveros y detalles hechos a mano con la tematica de odontologia.',
    world: 'oficio',
    filter: { specialties: ['odontologia'] },
  },
  {
    id: 'regalar-enfermeria',
    title: 'Para enfermeria',
    kicker: 'Regalar por profesion',
    blurb: 'Detalles artesanales con la tematica de enfermeria.',
    world: 'oficio',
    filter: { specialties: ['enfermeria'] },
  },
  {
    id: 'regalar-medicina',
    title: 'Para medicina',
    kicker: 'Regalar por profesion',
    blurb: 'Detalles artesanales con la tematica de medicina.',
    world: 'oficio',
    filter: { specialties: ['medicina'] },
  },
  {
    id: 'regalar-gastronomia',
    title: 'Para un chef',
    kicker: 'Regalar por profesion',
    blurb: 'Pulseras y detalles artesanales con la tematica de gastronomia.',
    world: 'oficio',
    filter: { specialties: ['gastronomia'] },
  },
  {
    id: 'regalar-detalles',
    title: 'Detalles para regalar',
    kicker: 'Regalar',
    blurb: 'Piezas artesanales que funcionan como regalo para cualquiera.',
    world: 'oficio',
    filter: { roles: ['gift'] },
  },
  {
    id: 'regalos-hasta-10',
    title: 'Regalos hasta $10',
    kicker: 'Por presupuesto',
    blurb: 'El detalle artesanal que se suma sin pensarlo.',
    world: 'oficio',
    filter: { roles: ['add_on', 'gift'], maxPrice: 10 },
  },

  // ---- Artesika: Navidad ----
  {
    id: 'navidad',
    title: 'Navidad',
    kicker: 'Temporada',
    blurb: 'Decoracion y regalos hechos a mano. Preventa con anticipo y cupos por semana.',
    world: 'navidad',
    filter: { occasions: ['navidad'] },
  },
];
