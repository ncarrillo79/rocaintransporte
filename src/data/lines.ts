import type { ProductLine, World } from '../types';

// ---------------------------------------------------------------------------
// LINEAS DE PRODUCTO. Cada linea pertenece a un mundo.
// El mundo de un producto se deriva de aqui (no se escribe en cada producto).
// Para agregar una linea: sumala al tipo ProductLine en src/types.ts y aqui.
// ---------------------------------------------------------------------------

export interface LineMeta {
  label: string;
  world: World;
}

export const LINES: Record<ProductLine, LineMeta> = {
  salud: { label: 'Salud y quirurgico', world: 'trabajo' },
  gastronomia: { label: 'Gastronomia', world: 'trabajo' },
  escolar: { label: 'Escolar', world: 'trabajo' },
  corporativo: { label: 'Corporativo y Columbia', world: 'trabajo' },
  industrial: { label: 'Seguridad industrial', world: 'trabajo' },
  gala: { label: 'Gala y tradicion', world: 'gala' },
  artesania: { label: 'Artesania', world: 'oficio' },
  decoracion: { label: 'Decoracion', world: 'oficio' },
  otros: { label: 'Otros / a medida', world: 'trabajo' },
};

export const lineLabel = (l: ProductLine): string => LINES[l]?.label ?? l;
