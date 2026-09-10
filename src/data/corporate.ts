// ---------------------------------------------------------------------------
// PRESUPUESTO DE CONFECCION POR VOLUMEN (GF Textil).
// Alimenta el formulario #/cotizar. No va al carrito: genera un resumen para
// enviar por WhatsApp o correo. `unitPriceFrom` y `minUnits` son referenciales;
// el precio real se confirma en la cotizacion.
// ---------------------------------------------------------------------------

export interface GarmentType {
  id: string;
  label: string;
  unitPriceFrom: number; // USD por unidad, referencial
  minUnits: number;
}

export const GARMENT_TYPES: GarmentType[] = [
  { id: 'linea-medica', label: 'Linea medica y quirurgica (kimonos, batas, pijamas)', unitPriceFrom: 22, minUnits: 5 },
  { id: 'gastronomia', label: 'Gastronomia (filipinas, delantales, gorros)', unitPriceFrom: 15, minUnits: 5 },
  { id: 'escolar', label: 'Uniformes escolares', unitPriceFrom: 9, minUnits: 15 },
  { id: 'corporativo', label: 'Corporativo y Columbia (camisas, chemises, blusas)', unitPriceFrom: 16, minUnits: 10 },
  { id: 'industrial', label: 'Seguridad industrial (overoles, chalecos)', unitPriceFrom: 20, minUnits: 10 },
  { id: 'gala', label: 'Gala y tradicion (vestidos, liqui liqui) a medida', unitPriceFrom: 80, minUnits: 1 },
  { id: 'otro', label: 'Otra prenda / a medida', unitPriceFrom: 0, minUnits: 1 },
];

export const CITIES = ['La Victoria', 'Maracay', 'Valencia', 'Caracas'];
