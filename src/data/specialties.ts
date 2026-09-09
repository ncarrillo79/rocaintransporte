import type { Specialty, World } from '../types';

// ---------------------------------------------------------------------------
// Catalogo de especialidades (etiquetas de profesion).
// Para agregar una: sumala aqui Y al tipo Specialty en src/types.ts
// ---------------------------------------------------------------------------

export interface SpecialtyMeta {
  id: Specialty;
  label: string;
  /** Mundo cuyo color de acento se usa para esta especialidad. */
  world: World;
}

export const SPECIALTIES: Record<Specialty, SpecialtyMeta> = {
  odontologia: { id: 'odontologia', label: 'Odontologia', world: 'trabajo' },
  enfermeria: { id: 'enfermeria', label: 'Enfermeria', world: 'trabajo' },
  medicina: { id: 'medicina', label: 'Medicina', world: 'trabajo' },
  laboratorio: { id: 'laboratorio', label: 'Laboratorio', world: 'trabajo' },
  docencia: { id: 'docencia', label: 'Docencia', world: 'oficio' },
  gastronomia: { id: 'gastronomia', label: 'Gastronomia', world: 'trabajo' },
  industrial: { id: 'industrial', label: 'Seguridad industrial', world: 'trabajo' },
};

export const specialtyLabel = (id: Specialty): string => SPECIALTIES[id]?.label ?? id;
