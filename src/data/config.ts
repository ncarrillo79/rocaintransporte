import type { StoreConfig } from '../types';

// ---------------------------------------------------------------------------
// Configuracion operativa. Editar aqui, sin tocar componentes.
//  - freeShippingThreshold : la barra del carrito apunta a este monto
//  - bsRate                : pon un numero para mostrar precio en Bs
//  - season.christmasEnabled : true/false enciende o apaga TODO el puente de Navidad
//  - season.weeklySlots    : cupos de produccion reales que confirme Venezuela
// ---------------------------------------------------------------------------

export const CONFIG: StoreConfig = {
  currency: 'USD',
  bsRate: null,
  whatsapp: '584243018032',
  freeShippingThreshold: 35,
  couriers: ['MRW', 'Zoom', 'Tealca', 'Domesa'],
  pickupCities: ['La Victoria', 'Maracay', 'Valencia', 'Caracas'],
  season: {
    christmasEnabled: true,
    depositPct: 0.5,
    weeklySlots: 8,
    deadlineNote: 'Reserva antes del 28 de noviembre para entrega antes del 20 de diciembre.',
  },
  giftWraps: [
    { id: 'wrap-basico', label: 'Envoltorio artesanal + tarjeta escrita a mano', price: 3 },
    { id: 'wrap-caja', label: 'Caja de regalo con cinta de cocuiza', price: 6 },
  ],
};
