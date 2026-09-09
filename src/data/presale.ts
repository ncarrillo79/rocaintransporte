import type { GlyphName, Specialty } from '../types';

// ---------------------------------------------------------------------------
// PREVENTA NAVIDENA. Cada lote es un bloque de produccion con fecha y cupo.
//  - slotsTotal / slotsTaken : la capacidad real que confirme Venezuela.
//    Cuando slotsTaken == slotsTotal, el lote pasa a "lista de espera".
//  - unitPrice : precio total de la pieza (el anticipo se calcula con
//    CONFIG.season.depositPct).
// ---------------------------------------------------------------------------

export interface PresaleLot {
  id: string;
  title: string;
  description: string;
  glyph: GlyphName;
  specialty?: Specialty;
  unitPrice: number; // USD, total
  deliveryLabel: string;
  slotsTotal: number;
  slotsTaken: number;
}

export const PRESALE_LOTS: PresaleLot[] = [
  {
    id: 'lote-lampara-grabada',
    title: 'Lampara de madera con grabado',
    description:
      'Lampara tallada con el nombre del consultorio o un mensaje. Ideal para regalar a un colega.',
    glyph: 'lampara',
    specialty: 'odontologia',
    unitPrice: 28,
    deliveryLabel: 'Semana del 8 de diciembre',
    slotsTotal: 8,
    slotsTaken: 3,
  },
  {
    id: 'lote-set-pulseras',
    title: 'Set de 3 pulseras tematicas',
    description: 'Tres pulseras por profesion en caja de regalo. Para el equipo del consultorio.',
    glyph: 'pulsera',
    unitPrice: 24,
    deliveryLabel: 'Semana del 1 de diciembre',
    slotsTotal: 10,
    slotsTaken: 6,
  },
  {
    id: 'lote-cocuiza-navidad',
    title: 'Cocuizas edicion navidena',
    description: 'Espardenas artesanales con hilos en tonos de temporada. Serie corta.',
    glyph: 'cocuiza',
    unitPrice: 12,
    deliveryLabel: 'Semana del 15 de diciembre',
    slotsTotal: 12,
    slotsTaken: 12,
  },
  {
    id: 'lote-organizador-grabado',
    title: 'Organizador de consultorio grabado',
    description: 'Organizador de escritorio en madera con grabado personalizado.',
    glyph: 'caja',
    specialty: 'odontologia',
    unitPrice: 18,
    deliveryLabel: 'Semana del 8 de diciembre',
    slotsTotal: 6,
    slotsTaken: 1,
  },
];

// ---------------------------------------------------------------------------
// FECHAS LIMITE de la campana. Ajustar con los plazos reales de courier.
// ---------------------------------------------------------------------------

export interface CampaignMilestone {
  label: string;
  dateISO: string;
  note: string;
}

export const CAMPAIGN_MILESTONES: CampaignMilestone[] = [
  {
    label: 'Cierre de pedidos corporativos con logo',
    dateISO: '2026-11-21',
    note: 'Requiere aprobacion de arte y lote de produccion',
  },
  {
    label: 'Cierre de preventa artesanal personalizada',
    dateISO: '2026-11-28',
    note: 'Sujeto a cupo del lote',
  },
  {
    label: 'Ultimo pedido con envio nacional',
    dateISO: '2026-12-12',
    note: 'Entrega estimada antes del 20 de diciembre',
  },
  {
    label: 'Ultimo retiro en tienda',
    dateISO: '2026-12-23',
    note: 'Coordinar hora por WhatsApp',
  },
];
