// ---------------------------------------------------------------------------
// Modelo de datos de la tienda.
// Es la unica pieza que hay que entender para administrar el catalogo.
// ---------------------------------------------------------------------------

/** Los cuatro mundos de la tienda. */
export type World = 'trabajo' | 'oficio' | 'gala' | 'navidad';

/** Marcas que comparten esta plataforma (mismo carrito y despacho). */
export type BrandId = 'gftextil' | 'artesika';

/**
 * Linea de producto. Subdivide el mundo "trabajo" (que es muy amplio) y
 * ordena el catalogo. Cada linea pertenece a un mundo (ver src/data/lines.ts).
 */
export type ProductLine =
  | 'salud'
  | 'gastronomia'
  | 'escolar'
  | 'corporativo'
  | 'industrial'
  | 'gala'
  | 'artesania'
  | 'decoracion'
  | 'otros';

/** Etiqueta de profesion. Es lo que conecta un kimono con una pulsera. */
export type Specialty =
  | 'odontologia'
  | 'enfermeria'
  | 'medicina'
  | 'laboratorio'
  | 'docencia'
  | 'gastronomia'
  | 'industrial';

/** Etiqueta de ocasion. Hace que una pieza aparezca en Navidad, graduaciones, etc. */
export type Occasion =
  | 'graduacion'
  | 'apertura-consulta'
  | 'agradecimiento'
  | 'navidad'
  | 'cumpleanos';

/**
 * Rol comercial de la pieza dentro de la ficha:
 *  - anchor  : trae trafico (el kimono, la bata)
 *  - add_on  : se suma barato desde otra ficha (pulsera, gorro, llavero)
 *  - gift    : se comunica como regalo
 *  - corporate: entra en kits para equipos / con logo
 */
export type CommercialRole = 'anchor' | 'add_on' | 'gift' | 'corporate';

/** Nombres de los dibujos de marcador de posicion (mientras no hay fotos reales). */
export type GlyphName =
  | 'bata'
  | 'gorro'
  | 'delantal'
  | 'camisa'
  | 'vestido'
  | 'pulsera'
  | 'llavero'
  | 'lampara'
  | 'cocuiza'
  | 'caja';

/** Una imagen de producto: foto real o marcador de posicion. */
export type ProductImage =
  | { kind: 'photo'; src: string; alt: string }
  | { kind: 'placeholder'; glyph: GlyphName; caption: string };

/** Disponibilidad honesta: el cliente siempre sabe que esta comprando. */
export type Availability =
  | { kind: 'in_stock'; dispatchDays: [number, number] }
  | { kind: 'made_to_order'; leadDays: [number, number] }
  | { kind: 'presale'; deliverByLabel: string; weeklySlots: number };

export interface ProductOptionGroup {
  id: string; // 'talla' | 'color' ...
  label: string; // 'Talla'
  values: string[];
  required?: boolean;
}

/**
 * Tabla de talles de la ficha (inspirada en dracherie.com.br, sin login).
 * `headers` es la fila de encabezado (Talla, Busto, Cintura, ...); cada fila
 * lleva su etiqueta (S, M, L, ...) y los valores en el mismo orden que headers
 * sin contar la primera columna.
 */
export interface SizeChart {
  note?: string;
  headers: string[];
  rows: { label: string; values: string[] }[];
}

/** Foto enviada por una clienta con la prenda puesta (estilo Shein). */
export interface CustomerPhoto {
  image: string; // ruta desde la raiz del sitio: /img/...
  note?: string;
}

export interface Personalization {
  id: string;
  label: string;
  price: number; // USD
  leadDaysExtra?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortName: string; // para strips y kits
  line: ProductLine; // el mundo se deriva de la linea (ver src/data/lines.ts)
  price: number; // USD
  images: ProductImage[];
  availability: Availability;
  specialties: Specialty[];
  occasions: Occasion[];
  roles: CommercialRole[];
  options: ProductOptionGroup[];
  personalizations: Personalization[];
  specs: { label: string; value: string }[];
  /** Resumen corto. Si falta, la ficha usa `longDescription`. */
  description?: string;
  /** Descripcion ampliada: composicion del tejido, corte, cierre, detalles de diseno. */
  longDescription?: string;
  /** Tabla de talles (prendas de confeccion). Ausente en piezas sin talla. */
  sizeChart?: SizeChart;
  /** Fotos de clientas con la prenda puesta. Placeholder hasta subir las reales. */
  customerPhotos?: CustomerPhoto[];
}

/** Un combo curado: producto ancla + complementos a precio de paquete. */
export interface Kit {
  id: string;
  title: string;
  specialty: Specialty;
  anchorProductId: string;
  componentProductIds: string[];
  discountPct: number; // 0.15 = 15 %
  blurb: string;
}

export interface GiftWrap {
  id: string;
  label: string;
  price: number; // USD
}

/** Toda la configuracion operativa editable en un solo lugar. */
export interface StoreConfig {
  currency: 'USD';
  /** Tasa Bs/USD si se quiere mostrar precio en bolivares; null => "segun tasa del dia". */
  bsRate: number | null;
  /**
   * Numero de WhatsApp por defecto (formato internacional sin "+"). Cada marca
   * define el suyo en src/data/brands.ts; este queda como respaldo.
   */
  whatsapp: string;
  /** Umbral de envio nacional gratis, en USD. */
  freeShippingThreshold: number;
  couriers: string[];
  pickupCities: string[];
  /**
   * Metodos de pago aceptados (solo el nombre; los datos de cuenta se comunican
   * aparte, nunca en el codigo). Se listan en la pagina #/pago y en el carrito.
   */
  paymentMethods: string[];
  season: {
    christmasEnabled: boolean;
    depositPct: number; // 0.5 = 50 % de anticipo
    weeklySlots: number;
    deadlineNote: string;
  };
  giftWraps: GiftWrap[];
}

// ---------------------------------------------------------------------------
// Colecciones: una vista del catalogo definida por un filtro.
// El menu y las paginas de coleccion se construyen sobre esto.
// ---------------------------------------------------------------------------

export interface ProductFilter {
  worlds?: World[];
  lines?: ProductLine[];
  specialties?: Specialty[];
  occasions?: Occasion[];
  roles?: CommercialRole[];
  maxPrice?: number;
}

export interface Collection {
  id: string;
  title: string;
  kicker: string;
  blurb: string;
  /** 'hub' = mezcla mundos a proposito (el puente por intencion). */
  world: World | 'hub';
  filter: ProductFilter;
}
