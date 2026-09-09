import type { Collection } from '../types';

// ---------------------------------------------------------------------------
// COLECCIONES. Cada una es un filtro sobre el catalogo.
//  - world: 'hub'  => la coleccion mezcla mundos a proposito (el puente).
//  - filter.lines        => por linea de producto (salud, gastronomia, ...).
//  - filter.specialties  => trae piezas de cualquier mundo con esa etiqueta.
// Para crear una nueva: agrega un objeto aqui y enlaza su id desde el menu
// (src/store/MegaMenu.tsx) o desde la home.
// ---------------------------------------------------------------------------

export const COLLECTIONS: Collection[] = [
  // ---- Mundo 1: Trabajo ----
  {
    id: 'uniformes',
    title: 'Uniformes y textil profesional',
    kicker: 'Mundo 1 - Trabajo',
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

  // ---- Mundo 2: Oficio ----
  {
    id: 'artesania',
    title: 'Artesania y regalos',
    kicker: 'Mundo 2 - Oficio',
    blurb: 'Cocuizas, pulseras por profesion, lamparas de madera y decoracion. Hecho a mano.',
    world: 'oficio',
    filter: { lines: ['artesania', 'decoracion'] },
  },

  // ---- Hubs transversales (el puente) ----
  {
    id: 'regalar-odontologia',
    title: 'Para un odontologo',
    kicker: 'Regalar por profesion',
    blurb: 'Todo lo que lleva la etiqueta de odontologia, venga del trabajo o del oficio.',
    world: 'hub',
    filter: { specialties: ['odontologia'] },
  },
  {
    id: 'regalar-enfermeria',
    title: 'Para enfermeria',
    kicker: 'Regalar por profesion',
    blurb: 'Prendas y detalles con la etiqueta de enfermeria.',
    world: 'hub',
    filter: { specialties: ['enfermeria'] },
  },
  {
    id: 'regalar-medicina',
    title: 'Para medicina',
    kicker: 'Regalar por profesion',
    blurb: 'Prendas y detalles con la etiqueta de medicina.',
    world: 'hub',
    filter: { specialties: ['medicina'] },
  },
  {
    id: 'regalar-gastronomia',
    title: 'Para un chef',
    kicker: 'Regalar por profesion',
    blurb: 'Filipinas, delantales y detalles artesanales con la etiqueta de gastronomia.',
    world: 'hub',
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
    blurb: 'El detalle que se suma sin pensarlo.',
    world: 'hub',
    filter: { roles: ['add_on', 'gift'], maxPrice: 10 },
  },

  // ---- Mundo 3: Navidad ----
  {
    id: 'navidad',
    title: 'Navidad',
    kicker: 'Mundo 3 - Temporada',
    blurb: 'Regalos personales y detalles corporativos. Preventa con anticipo y cupos por semana.',
    world: 'navidad',
    filter: { occasions: ['navidad'] },
  },
];
