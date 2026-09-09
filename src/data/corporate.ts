import type { GlyphName } from '../types';

// ---------------------------------------------------------------------------
// KITS CORPORATIVOS. No van al carrito: llevan al formulario de cotizacion.
//  - unitPriceFrom : precio referencial por persona (se confirma en cotizacion)
//  - minUnits      : cantidad minima para produccion
// ---------------------------------------------------------------------------

export interface CorporateKit {
  id: string;
  title: string;
  forWho: string;
  includes: string[];
  unitPriceFrom: number; // USD por persona
  minUnits: number;
  glyph: GlyphName;
  logo: boolean;
}

export const CORPORATE_KITS: CorporateKit[] = [
  {
    id: 'kit-consultorio',
    title: 'Kit Consultorio',
    forWho: 'consultorios y clinicas',
    includes: ['Bata clinica con bordado', 'Gorro quirurgico a juego', 'Pulsera tematica'],
    unitPriceFrom: 32,
    minUnits: 5,
    glyph: 'bata',
    logo: true,
  },
  {
    id: 'kit-escuela',
    title: 'Kit Bienvenida Escuela',
    forWho: 'colegios e institutos',
    includes: ['Bata de laboratorio', 'Cocuiza artesanal', 'Tarjeta personalizada'],
    unitPriceFrom: 22,
    minUnits: 10,
    glyph: 'caja',
    logo: true,
  },
  {
    id: 'kit-detalle',
    title: 'Kit Detalle Corporativo',
    forWho: 'empresas y aliados',
    includes: ['Cocuiza artesanal', 'Organizador de madera', 'Envoltorio de regalo'],
    unitPriceFrom: 18,
    minUnits: 10,
    glyph: 'caja',
    logo: true,
  },
  {
    id: 'kit-premium',
    title: 'Kit Premium Aliados',
    forWho: 'clientes y aliados clave',
    includes: ['Lampara de madera grabada', 'Pulsera tematica', 'Caja de regalo con cinta de cocuiza'],
    unitPriceFrom: 35,
    minUnits: 5,
    glyph: 'lampara',
    logo: true,
  },
];

export const CITIES = ['Barquisimeto', 'Caracas', 'Valencia', 'Maracaibo', 'Otra'];
