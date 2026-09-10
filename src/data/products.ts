import type { Kit, Product, SizeChart } from '../types';

// ---------------------------------------------------------------------------
// CATALOGO. Este es el archivo que se administra a diario.
//
// Datos genericos de ejemplo: precios, telas, tallas y fotos son de relleno.
// El mundo de cada producto se DERIVA de su `line` (ver src/data/lines.ts).
//
// Reglas practicas:
//  - roles: ['anchor']            -> pieza que trae trafico (kimono / bata / vestido)
//  - roles: ['add_on', 'gift']    -> aparece en "Combina con tu especialidad"
//  - specialties: []              -> regalo universal (relleno de la tira y de Navidad)
//  - occasions incluye 'navidad'  -> la pieza entra a la campana navidena
//  - images: { kind: 'photo', src: '/img/archivo.jpg', alt: '...' } cuando haya fotos
// ---------------------------------------------------------------------------

const TALLAS_ROPA = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
const TALLAS_ESCOLAR = ['4', '6', '8', '10', '12', '14', '16', 'S', 'M', 'L'];

// ---------------------------------------------------------------------------
// TABLAS DE TALLES compartidas. Medidas en centimetros, referenciales (ejemplo).
// Reemplazar con las medidas reales del taller cuando esten confirmadas.
// ---------------------------------------------------------------------------
const SC_TOP_DAMA: SizeChart = {
  note: 'Prenda superior de dama. Si estas entre dos tallas, elige la mayor.',
  headers: ['Talla', 'Busto', 'Cintura', 'Cadera', 'Largo', 'Manga', 'Ancho de brazo', 'Puno'],
  rows: [
    { label: 'XS', values: ['84', '68', '90', '60', '57', '32', '22'] },
    { label: 'S', values: ['88', '72', '94', '61', '58', '33', '23'] },
    { label: 'M', values: ['94', '78', '100', '63', '59', '35', '24'] },
    { label: 'L', values: ['100', '86', '106', '65', '60', '37', '25'] },
    { label: 'XL', values: ['108', '94', '114', '67', '61', '39', '26'] },
    { label: 'XXL', values: ['116', '102', '122', '69', '62', '41', '27'] },
  ],
};
const SC_CAMISA: SizeChart = {
  note: 'Camisa de corte recto. El cuello y el pecho mandan sobre la talla.',
  headers: ['Talla', 'Cuello', 'Pecho', 'Cintura', 'Largo', 'Manga'],
  rows: [
    { label: 'S', values: ['38', '100', '92', '72', '60'] },
    { label: 'M', values: ['40', '108', '100', '74', '62'] },
    { label: 'L', values: ['42', '116', '108', '76', '64'] },
    { label: 'XL', values: ['44', '124', '116', '78', '65'] },
    { label: 'XXL', values: ['46', '132', '124', '80', '66'] },
  ],
};
const SC_PANTALON: SizeChart = {
  note: 'Pantalon. Medir sobre una prenda que te quede bien y comparar.',
  headers: ['Talla', 'Cintura', 'Cadera', 'Tiro', 'Largo', 'Ruedo'],
  rows: [
    { label: 'XS', values: ['66', '90', '26', '98', '18'] },
    { label: 'S', values: ['72', '96', '27', '100', '19'] },
    { label: 'M', values: ['78', '102', '28', '102', '20'] },
    { label: 'L', values: ['86', '110', '29', '103', '21'] },
    { label: 'XL', values: ['94', '118', '30', '104', '22'] },
    { label: 'XXL', values: ['102', '126', '31', '105', '23'] },
  ],
};
const SC_CONJUNTO_CLINICO: SizeChart = {
  note: 'Conjunto clinico (top + pantalon). El top se mide en el pecho; el pantalon en la cintura.',
  headers: ['Talla', 'Pecho', 'Largo top', 'Cintura pant.', 'Cadera pant.', 'Largo pant.'],
  rows: [
    { label: 'XS', values: ['90', '64', '68', '92', '98'] },
    { label: 'S', values: ['96', '65', '74', '98', '100'] },
    { label: 'M', values: ['102', '67', '80', '104', '102'] },
    { label: 'L', values: ['110', '69', '88', '112', '103'] },
    { label: 'XL', values: ['118', '71', '96', '120', '104'] },
    { label: 'XXL', values: ['126', '73', '104', '128', '105'] },
  ],
};

// Fotos de clientas de ejemplo. Usa una foto real de una prenda GF Textil puesta;
// reemplazar por la foto de la clienta con ESTE producto cuando la haya.
const CUSTOMER_PHOTOS_PLACEHOLDER = [
  { image: '/img/gftextil/conjunto-jogger-1.jpg', note: 'Ejemplo - clienta con una prenda GF Textil (reemplazar por foto de este producto)' },
];

export const PRODUCTS: Product[] = [
  // ===================== SALUD Y QUIRURGICO =====================
  {
    id: 'kimono-odontologico',
    slug: 'kimono-odontologico',
    title: 'Kimono Odontologico',
    shortName: 'Kimono odontologico',
    line: 'salud',
    price: 26,
    images: [
      { kind: 'placeholder', glyph: 'bata', caption: 'FOTO - kimono, vista frontal' },
      { kind: 'placeholder', glyph: 'bata', caption: 'FOTO - espalda' },
    ],
    availability: { kind: 'in_stock', dispatchDays: [1, 2] },
    specialties: ['odontologia'],
    occasions: ['apertura-consulta', 'graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Verde menta', 'Azul cielo'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre y profesion', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Corte', value: 'Cuello mao, cierre lateral a presion' },
      { label: 'Tela', value: 'Antifluido (dato de ejemplo)' },
    ],
    description:
      'Kimono de corte clinico para odontologia. Datos de ejemplo: ajusta tela, colores y tallas en este archivo.',
  },
  {
    id: 'bata-clinica-antifluido',
    slug: 'bata-clinica-antifluido',
    title: 'Bata Clinica Antifluido',
    shortName: 'Bata Clinica',
    line: 'salud',
    price: 24,
    images: [
      { kind: 'photo', src: '/img/gftextil/filipina-clinica-blanca-1.jpg', alt: 'Filipina clinica blanca de manga larga, cuello mao y hombro abullonado' },
      { kind: 'placeholder', glyph: 'bata', caption: 'FOTO - espalda' },
    ],
    availability: { kind: 'in_stock', dispatchDays: [1, 2] },
    specialties: ['odontologia', 'medicina', 'laboratorio', 'enfermeria'],
    occasions: ['apertura-consulta', 'graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      {
        id: 'color',
        label: 'Color',
        values: ['Verde quirurgico', 'Blanco', 'Azul petroleo'],
        required: true,
      },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre y profesion', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Tela', value: 'Antifluido, 100 % poliester microfibra (ejemplo)' },
      { label: 'Bolsillos', value: '3 (uno interior)' },
      { label: 'Cuidados', value: 'Lavado a maquina en frio, no usar cloro' },
    ],
    description:
      'Bata de corte clinico en tela antifluido. Sirve como pieza base para varias especialidades.',
    longDescription:
      'Filipina de manga larga con cuello mao y una leve caida abullonada en el hombro. Cierre de botones al frente, tres bolsillos (uno interior) y leve entalle en la cintura. Tela antifluido de microfibra que repele salpicaduras y seca rapido.',
    sizeChart: SC_TOP_DAMA,
  },
  {
    id: 'pijama-quirurgica',
    slug: 'pijama-quirurgica',
    title: 'Pijama Quirurgica (conjunto cuello V)',
    shortName: 'Pijama quirurgica',
    line: 'salud',
    price: 26,
    images: [
      { kind: 'photo', src: '/img/gftextil/pijama_quirurgica.png', alt: 'Pijama quirurgica gris azulado: top de cuello en V con bolsillos y pantalon recto, sobre maniqui' },
    ],
    availability: { kind: 'made_to_order', leadDays: [4, 7] },
    specialties: ['medicina', 'enfermeria', 'odontologia'],
    occasions: [],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Gris azulado', 'Verde quirurgico', 'Azul petroleo', 'Vino', 'Negro'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre y profesion', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Incluye', value: 'Top + pantalon' },
      { label: 'Top', value: 'Cuello en V, manga corta, 2 o 3 bolsillos de parche' },
      { label: 'Pantalon', value: 'Tiro medio, pretina con elastico, caida recta' },
      { label: 'Tela', value: 'Antifluido de secado rapido (ejemplo)' },
    ],
    description: 'Conjunto de pijama quirurgica de cuello en V, top + pantalon.',
    longDescription:
      'Conjunto quirurgico clasico de dos piezas: top de cuello en V con manga corta y bolsillos de parche, y pantalon recto de tiro medio con pretina elastica. Tela antifluido de secado rapido. Se confecciona por talla y color, con opcion de bordado del nombre y la profesion en el pecho.',
    sizeChart: SC_CONJUNTO_CLINICO,
  },
  {
    id: 'gorro-quirurgico',
    slug: 'gorro-quirurgico-ajuste',
    title: 'Gorro quirurgico con ajuste',
    shortName: 'Gorro a juego',
    line: 'salud',
    price: 4,
    images: [{ kind: 'placeholder', glyph: 'gorro', caption: 'FOTO - gorro quirurgico' }],
    availability: { kind: 'in_stock', dispatchDays: [1, 2] },
    specialties: ['odontologia', 'medicina', 'enfermeria', 'laboratorio'],
    occasions: [],
    roles: ['add_on'],
    options: [
      { id: 'color', label: 'Color', values: ['Verde quirurgico', 'Estampado'], required: false },
    ],
    personalizations: [],
    specs: [{ label: 'Ajuste', value: 'Banda elastica + cinta regulable' }],
    description: 'Gorro a juego con la linea clinica.',
  },

  // ===================== GASTRONOMIA =====================
  {
    id: 'filipina-chef',
    slug: 'filipina-chef',
    title: 'Filipina de Chef',
    shortName: 'Filipina de chef',
    line: 'gastronomia',
    price: 22,
    images: [{ kind: 'placeholder', glyph: 'camisa', caption: 'FOTO - filipina de chef' }],
    availability: { kind: 'in_stock', dispatchDays: [1, 3] },
    specialties: ['gastronomia'],
    occasions: ['apertura-consulta', 'graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Negro'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre y restaurante', price: 5, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Corte', value: 'Doble botonadura, manga larga (ejemplo)' },
      { label: 'Tela', value: 'Sarga de algodon (ejemplo)' },
    ],
    description: 'Filipina (chaqueta de chef) de doble botonadura. Datos de ejemplo.',
  },
  {
    id: 'delantal-cocina',
    slug: 'delantal-cocina-peto',
    title: 'Delantal de Cocina con peto',
    shortName: 'Delantal de cocina',
    line: 'gastronomia',
    price: 12,
    images: [{ kind: 'placeholder', glyph: 'delantal', caption: 'FOTO - delantal con peto' }],
    availability: { kind: 'in_stock', dispatchDays: [1, 3] },
    specialties: ['gastronomia'],
    occasions: ['navidad', 'agradecimiento'],
    roles: ['anchor', 'add_on'],
    options: [{ id: 'color', label: 'Color', values: ['Negro', 'Mostaza', 'Vino', 'Gris'], required: true }],
    personalizations: [{ id: 'bordado', label: 'Bordado de logo', price: 5 }],
    specs: [{ label: 'Ajuste', value: 'Tiras cruzadas a la espalda, largo regulable' }],
    description: 'Delantal de peto con bolsillo frontal. Datos de ejemplo.',
  },
  {
    id: 'gorro-cocina',
    slug: 'gorro-cocina',
    title: 'Gorro de Cocina',
    shortName: 'Gorro de cocina',
    line: 'gastronomia',
    price: 6,
    images: [{ kind: 'placeholder', glyph: 'gorro', caption: 'FOTO - gorro de cocina' }],
    availability: { kind: 'in_stock', dispatchDays: [1, 3] },
    specialties: ['gastronomia'],
    occasions: [],
    roles: ['add_on'],
    options: [{ id: 'modelo', label: 'Modelo', values: ['Bombacho', 'Media caña', 'Panuelo'], required: false }],
    personalizations: [],
    specs: [{ label: 'Ajuste', value: 'Banda regulable' }],
    description: 'Gorro a juego con la linea de gastronomia.',
  },
  {
    id: 'mandil-mesonero',
    slug: 'mandil-mesonero',
    title: 'Mandil de Mesonero (media cintura)',
    shortName: 'Mandil de mesonero',
    line: 'gastronomia',
    price: 8,
    images: [{ kind: 'placeholder', glyph: 'delantal', caption: 'FOTO - mandil de media cintura' }],
    availability: { kind: 'made_to_order', leadDays: [3, 6] },
    specialties: ['gastronomia'],
    occasions: [],
    roles: ['add_on'],
    options: [{ id: 'color', label: 'Color', values: ['Negro', 'Vino', 'Gris'], required: true }],
    personalizations: [],
    specs: [{ label: 'Bolsillos', value: '2 frontales' }],
    description: 'Mandil corto para servicio de sala. Datos de ejemplo.',
  },

  // ===================== ESCOLAR =====================
  {
    id: 'camisa-escolar',
    slug: 'camisa-escolar',
    title: 'Camisa Escolar',
    shortName: 'Camisa escolar',
    line: 'escolar',
    price: 9,
    images: [{ kind: 'placeholder', glyph: 'camisa', caption: 'FOTO - camisa escolar' }],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: [],
    occasions: [],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: ['4', '6', '8', '10', '12', '14', '16', 'S', 'M', 'L'], required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Azul escolar', 'Beige', 'Verde quirurgico', 'Negro'], required: true },
    ],
    personalizations: [{ id: 'escudo', label: 'Escudo del colegio bordado', price: 3 }],
    specs: [{ label: 'Tela', value: 'Oxford / poplin (ejemplo)' }],
    description: 'Camisa de uniforme escolar. Se produce por colegio y por talla.',
  },
  {
    id: 'mono-deportivo-escolar',
    slug: 'mono-deportivo-escolar',
    title: 'Mono Deportivo Escolar',
    shortName: 'Mono deportivo',
    line: 'escolar',
    price: 16,
    images: [{ kind: 'placeholder', glyph: 'camisa', caption: 'FOTO - mono deportivo escolar' }],
    availability: { kind: 'made_to_order', leadDays: [7, 12] },
    specialties: [],
    occasions: [],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: ['6', '8', '10', '12', '14', '16', 'S', 'M', 'L'], required: true },
    ],
    personalizations: [{ id: 'estampado', label: 'Estampado del colegio', price: 4 }],
    specs: [{ label: 'Incluye', value: 'Chaqueta + pantalon' }],
    description: 'Conjunto deportivo escolar. Datos de ejemplo.',
  },
  {
    id: 'bata-laboratorio-escolar',
    slug: 'bata-laboratorio-escolar',
    title: 'Bata de Laboratorio Escolar',
    shortName: 'Bata de laboratorio',
    line: 'escolar',
    price: 13,
    images: [{ kind: 'placeholder', glyph: 'bata', caption: 'FOTO - bata de laboratorio' }],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: ['laboratorio'],
    occasions: [],
    roles: ['add_on'],
    options: [{ id: 'talla', label: 'Talla', values: ['8', '10', '12', '14', '16', 'S', 'M', 'L'], required: true }],
    personalizations: [{ id: 'bordado', label: 'Bordado de nombre', price: 3 }],
    specs: [{ label: 'Tela', value: 'Gabardina blanca (ejemplo)' }],
    description: 'Bata blanca para clases de laboratorio.',
  },

  // ===================== CORPORATIVO Y COLUMBIA =====================
  {
    id: 'camisa-columbia',
    slug: 'camisa-tipo-columbia',
    title: 'Camisa tipo Columbia',
    shortName: 'Camisa Columbia',
    line: 'corporativo',
    price: 22,
    images: [
      { kind: 'photo', src: '/img/gftextil/columbia-blanca-1.jpg', alt: 'Camisa tipo Columbia blanca de manga corta con cuello de boton y bolsillos de tapa' },
      { kind: 'photo', src: '/img/gftextil/columbia-verde-1.jpg', alt: 'Camisa tipo Columbia verde de manga corta sobre maniqui de vestir' },
    ],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: [],
    occasions: [],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Verde', 'Beige', 'Verde oliva', 'Azul', 'Gris'], required: true },
      { id: 'manga', label: 'Manga', values: ['Corta', 'Larga'], required: true },
    ],
    personalizations: [{ id: 'bordado', label: 'Bordado de logo empresarial', price: 5, leadDaysExtra: 4 }],
    specs: [
      { label: 'Detalle', value: 'Cuello de boton, canesu, bolsillos de pecho con tapa' },
      { label: 'Tela', value: 'Microfibra de secado rapido (ejemplo)' },
    ],
    description: 'Camisa tipo Columbia para uso corporativo y de campo.',
    longDescription:
      'Camisa tipo Columbia de manga corta o larga, con cuello de boton, canesu en la espalda y dos bolsillos de pecho con tapa. Tela de microfibra liviana de secado rapido. Se produce por lote en el color de la empresa, con el logo bordado.',
    sizeChart: SC_CAMISA,
  },
  {
    id: 'chemise-corporativa',
    slug: 'chemise-corporativa',
    title: 'Chemise Corporativa',
    shortName: 'Chemise corporativa',
    line: 'corporativo',
    price: 15,
    images: [{ kind: 'placeholder', glyph: 'camisa', caption: 'FOTO - chemise corporativa' }],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: [],
    occasions: [],
    roles: ['anchor', 'add_on'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Negro', 'Azul', 'Rojo'], required: true },
    ],
    personalizations: [{ id: 'bordado', label: 'Bordado de logo', price: 4 }],
    specs: [{ label: 'Tela', value: 'Pique de algodon (ejemplo)' }],
    description: 'Chemise (polo) para uniforme corporativo. Datos de ejemplo.',
  },
  {
    id: 'blusa-administrativa',
    slug: 'blusa-administrativa',
    title: 'Blusa Administrativa',
    shortName: 'Blusa administrativa',
    line: 'corporativo',
    price: 17,
    images: [{ kind: 'placeholder', glyph: 'camisa', caption: 'FOTO - blusa administrativa' }],
    availability: { kind: 'made_to_order', leadDays: [6, 12] },
    specialties: [],
    occasions: [],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Azul', 'Perla'], required: true },
    ],
    personalizations: [{ id: 'bordado', label: 'Bordado de logo', price: 4 }],
    specs: [{ label: 'Corte', value: 'Manga 3/4, cuello camisero (ejemplo)' }],
    description: 'Blusa de uniforme para personal administrativo. Datos de ejemplo.',
  },

  // ===================== SEGURIDAD INDUSTRIAL =====================
  {
    id: 'overol-industrial',
    slug: 'overol-industrial',
    title: 'Overol Industrial',
    shortName: 'Overol industrial',
    line: 'industrial',
    price: 30,
    images: [{ kind: 'placeholder', glyph: 'bata', caption: 'FOTO - overol industrial' }],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: ['industrial'],
    occasions: [],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Azul', 'Gris', 'Beige'], required: true },
    ],
    personalizations: [{ id: 'bordado', label: 'Bordado de logo y nombre', price: 6 }],
    specs: [
      { label: 'Detalle', value: 'Cintas reflectivas opcionales, multiples bolsillos (ejemplo)' },
      { label: 'Tela', value: 'Gabardina resistente (ejemplo)' },
    ],
    description: 'Overol entero para trabajo industrial. Datos de ejemplo.',
  },
  {
    id: 'chaleco-seguridad',
    slug: 'chaleco-seguridad',
    title: 'Chaleco de Seguridad reflectivo',
    shortName: 'Chaleco de seguridad',
    line: 'industrial',
    price: 8,
    images: [{ kind: 'placeholder', glyph: 'camisa', caption: 'FOTO - chaleco reflectivo' }],
    availability: { kind: 'in_stock', dispatchDays: [1, 3] },
    specialties: ['industrial'],
    occasions: [],
    roles: ['add_on'],
    options: [{ id: 'color', label: 'Color', values: ['Naranja', 'Amarillo'], required: true }],
    personalizations: [{ id: 'estampado', label: 'Estampado de empresa', price: 3 }],
    specs: [{ label: 'Norma', value: 'Cintas de alta visibilidad (ejemplo)' }],
    description: 'Chaleco reflectivo de alta visibilidad.',
  },

  // ===================== GALA Y TRADICION =====================
  {
    id: 'vestido-gala-graduacion',
    slug: 'vestido-gala-graduacion',
    title: 'Vestido de Gala y Graduacion',
    shortName: 'Vestido de gala',
    line: 'gala',
    price: 100,
    images: [
      { kind: 'placeholder', glyph: 'vestido', caption: 'FOTO - vestido de gala' },
      { kind: 'placeholder', glyph: 'vestido', caption: 'FOTO - detalle de la espalda' },
    ],
    availability: { kind: 'made_to_order', leadDays: [15, 30] },
    specialties: [],
    occasions: ['graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: ['XS', 'S', 'M', 'L', 'XL', 'A medida'], required: true },
      { id: 'color', label: 'Color', values: ['Negro', 'Vino', 'Azul noche', 'Esmeralda', 'A elegir'], required: true },
    ],
    personalizations: [{ id: 'medida', label: 'Ajuste a medida (toma de medidas)', price: 25 }],
    specs: [
      { label: 'Confeccion', value: 'A medida, prueba y ajuste (ejemplo)' },
      { label: 'Tiempo', value: '3 a 4 semanas segun temporada' },
    ],
    description:
      'Vestido de gala para graduaciones y eventos formales. Confeccion a medida. Datos de ejemplo.',
  },
  {
    id: 'liquiliqui-caballero',
    slug: 'liquiliqui-caballero',
    title: 'Liqui Liqui Caballero',
    shortName: 'Liqui liqui caballero',
    line: 'gala',
    price: 85,
    images: [{ kind: 'placeholder', glyph: 'camisa', caption: 'FOTO - liqui liqui caballero' }],
    availability: { kind: 'made_to_order', leadDays: [15, 25] },
    specialties: [],
    occasions: ['graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: ['S', 'M', 'L', 'XL', 'XXL', 'A medida'], required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Beige', 'Negro', 'Gris'], required: true },
    ],
    personalizations: [{ id: 'medida', label: 'Ajuste a medida', price: 20 }],
    specs: [
      { label: 'Incluye', value: 'Chaqueta de cuello alto + pantalon' },
      { label: 'Confeccion', value: 'Tradicional venezolana (ejemplo)' },
    ],
    description: 'Traje liqui liqui de caballero. Confeccion a medida. Datos de ejemplo.',
  },
  {
    id: 'liquiliqui-dama',
    slug: 'liquiliqui-dama',
    title: 'Liqui Liqui Dama',
    shortName: 'Liqui liqui dama',
    line: 'gala',
    price: 88,
    images: [{ kind: 'placeholder', glyph: 'vestido', caption: 'FOTO - liqui liqui dama' }],
    availability: { kind: 'made_to_order', leadDays: [15, 25] },
    specialties: [],
    occasions: ['graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: ['XS', 'S', 'M', 'L', 'XL', 'A medida'], required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Beige', 'Negro'], required: true },
    ],
    personalizations: [{ id: 'medida', label: 'Ajuste a medida', price: 20 }],
    specs: [{ label: 'Confeccion', value: 'Tradicional, silueta femenina (ejemplo)' }],
    description: 'Traje liqui liqui de dama. Confeccion a medida. Datos de ejemplo.',
  },

  // ===================== ARTESANIA (Mundo 2) =====================
  {
    id: 'pulsera-molar',
    slug: 'pulsera-molar-hilo-encerado',
    title: 'Pulsera Molar - hilo encerado',
    shortName: 'Pulsera Molar',
    line: 'artesania',
    price: 9,
    images: [{ kind: 'placeholder', glyph: 'pulsera', caption: 'FOTO - pulsera molar' }],
    availability: { kind: 'made_to_order', leadDays: [3, 6] },
    specialties: ['odontologia'],
    occasions: ['graduacion', 'navidad', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [],
    personalizations: [],
    specs: [{ label: 'Material', value: 'Hilo encerado + dije de zamak' }],
    description: 'Pulsera artesanal tejida a mano con dije de molar.',
  },
  {
    id: 'pulsera-caduceo',
    slug: 'pulsera-caduceo',
    title: 'Pulsera Caduceo',
    shortName: 'Pulsera Caduceo',
    line: 'artesania',
    price: 9,
    images: [{ kind: 'placeholder', glyph: 'pulsera', caption: 'FOTO - pulsera caduceo' }],
    availability: { kind: 'made_to_order', leadDays: [3, 6] },
    specialties: ['medicina'],
    occasions: ['graduacion', 'navidad', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [],
    personalizations: [],
    specs: [{ label: 'Material', value: 'Hilo encerado + dije de zamak' }],
    description: 'Pulsera artesanal con dije de caduceo.',
  },
  {
    id: 'pulsera-lampara',
    slug: 'pulsera-lampara-florence',
    title: 'Pulsera Lampara de Florence',
    shortName: 'Pulsera Lampara',
    line: 'artesania',
    price: 9,
    images: [{ kind: 'placeholder', glyph: 'pulsera', caption: 'FOTO - pulsera lampara' }],
    availability: { kind: 'made_to_order', leadDays: [3, 6] },
    specialties: ['enfermeria'],
    occasions: ['graduacion', 'navidad', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [],
    personalizations: [],
    specs: [{ label: 'Material', value: 'Hilo encerado + dije de zamak' }],
    description: 'Pulsera artesanal con dije de lampara de aceite.',
  },
  {
    id: 'pulsera-chef',
    slug: 'pulsera-chef-cuchillo',
    title: 'Pulsera Chef',
    shortName: 'Pulsera Chef',
    line: 'artesania',
    price: 9,
    images: [{ kind: 'placeholder', glyph: 'pulsera', caption: 'FOTO - pulsera chef' }],
    availability: { kind: 'made_to_order', leadDays: [3, 6] },
    specialties: ['gastronomia'],
    occasions: ['graduacion', 'navidad', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [],
    personalizations: [],
    specs: [{ label: 'Material', value: 'Hilo encerado + dije de zamak' }],
    description: 'Pulsera artesanal con dije de cuchillo de chef.',
  },
  {
    id: 'llavero-diente',
    slug: 'llavero-resina-diente',
    title: 'Llavero de resina con diente',
    shortName: 'Llavero diente',
    line: 'artesania',
    price: 5,
    images: [{ kind: 'placeholder', glyph: 'llavero', caption: 'FOTO - llavero de resina' }],
    availability: { kind: 'made_to_order', leadDays: [3, 7] },
    specialties: ['odontologia'],
    occasions: ['navidad', 'cumpleanos', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [],
    personalizations: [],
    specs: [{ label: 'Material', value: 'Resina epoxica pigmentada' }],
    description: 'Llavero artesanal en resina.',
  },
  {
    id: 'cocuiza-clasica',
    slug: 'cocuiza-espardena-clasica',
    title: 'Cocuiza / espardena clasica',
    shortName: 'Cocuiza artesanal',
    line: 'artesania',
    price: 8,
    images: [{ kind: 'placeholder', glyph: 'cocuiza', caption: 'FOTO - cocuiza artesanal' }],
    availability: { kind: 'made_to_order', leadDays: [4, 8] },
    specialties: [],
    occasions: ['navidad', 'cumpleanos', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [
      {
        id: 'talla',
        label: 'Talla',
        values: ['35', '36', '37', '38', '39', '40', '41', '42'],
        required: true,
      },
    ],
    personalizations: [],
    specs: [{ label: 'Material', value: 'Fibra de cocuiza trenzada + suela de goma' }],
    description: 'Calzado artesanal venezolano tejido en fibra de cocuiza.',
  },

  // ===================== DECORACION (Mundo 2) =====================
  {
    id: 'lampara-diente',
    slug: 'lampara-madera-diente',
    title: 'Lampara de madera - forma de molar',
    shortName: 'Lampara molar',
    line: 'decoracion',
    price: 24,
    images: [{ kind: 'placeholder', glyph: 'lampara', caption: 'FOTO - lampara de madera' }],
    availability: { kind: 'made_to_order', leadDays: [5, 9] },
    specialties: ['odontologia'],
    occasions: ['apertura-consulta', 'navidad'],
    roles: ['gift'],
    options: [],
    personalizations: [{ id: 'grabado', label: 'Grabado del nombre del consultorio', price: 5 }],
    specs: [{ label: 'Material', value: 'Pino tratado + LED calido' }],
    description: 'Lampara decorativa tallada para el consultorio.',
  },
  {
    id: 'organizador-consultorio',
    slug: 'organizador-madera-consultorio',
    title: 'Organizador de escritorio en madera',
    shortName: 'Organizador',
    line: 'decoracion',
    price: 12,
    images: [{ kind: 'placeholder', glyph: 'caja', caption: 'FOTO - organizador de madera' }],
    availability: { kind: 'made_to_order', leadDays: [4, 8] },
    specialties: ['odontologia', 'medicina', 'laboratorio'],
    occasions: ['apertura-consulta', 'navidad', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [],
    personalizations: [],
    specs: [{ label: 'Material', value: 'Madera de saqui-saqui' }],
    description: 'Organizador para tarjetas y boligrafos.',
  },

  // ---- Navidad Artesika (fotos reales, revisar precio / medidas / material) ----
  {
    id: 'cojin-cinta-dorada',
    slug: 'cojin-decorativo-cinta-dorada',
    title: 'Cojin decorativo con cinta dorada (juego de 2)',
    shortName: 'Cojin cinta dorada',
    line: 'decoracion',
    price: 16,
    images: [
      {
        kind: 'photo',
        src: '/img/fotos_artesika/cojin001.jpeg',
        alt: 'Juego de dos cojines beige con cinta dorada y borlas de hilo marfil',
      },
    ],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: [],
    occasions: ['navidad', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [],
    personalizations: [{ id: 'iniciales', label: 'Iniciales bordadas', price: 4 }],
    specs: [
      { label: 'Material', value: 'Funda de lino, cinta de raso y borlas de hilo' },
      { label: 'Medida', value: 'Aprox. 45 x 45 cm - juego de 2 fundas' },
    ],
    description: 'Par de fundas decorativas hechas a mano, con cinta dorada y borlas.',
  },
  {
    id: 'cojin-espiral-bordada',
    slug: 'cojin-decorativo-espiral-bordada',
    title: 'Cojin decorativo con espiral bordada (juego de 2)',
    shortName: 'Cojin espiral',
    line: 'decoracion',
    price: 16,
    images: [
      {
        kind: 'photo',
        src: '/img/fotos_artesika/cojin002.jpeg',
        alt: 'Juego de dos cojines beige con espiral bordada en hilo marfil y borla',
      },
    ],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: [],
    occasions: ['navidad', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [],
    personalizations: [],
    specs: [
      { label: 'Material', value: 'Funda de lino con bordado a mano y borla' },
      { label: 'Medida', value: 'Aprox. 45 x 45 cm - juego de 2 fundas' },
    ],
    description: 'Par de fundas decorativas con espiral bordada a mano.',
  },
  {
    id: 'farol-navideno-pie',
    slug: 'farol-navideno-de-pie',
    title: 'Farol navideno de pie',
    shortName: 'Farol navideno',
    line: 'decoracion',
    price: 55,
    images: [
      {
        kind: 'photo',
        src: '/img/fotos_artesika/Farol.jpeg',
        alt: 'Farol navideno rojo sobre poste tipo baston de caramelo, decorado con flores de pascua, pinas y lazos plateados',
      },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: ['navidad'],
    roles: ['anchor', 'gift'],
    options: [],
    personalizations: [],
    specs: [
      { label: 'Material', value: 'Madera y metal pintados, follaje artificial, luz calida' },
      { label: 'Alto', value: 'Aprox. 1,5 m' },
    ],
    description: 'Pieza de piso hecha a mano: farol rojo iluminado sobre poste, con decoracion navidena.',
  },
  {
    id: 'reno-decorativo-sueter',
    slug: 'reno-decorativo-con-sueter',
    title: 'Reno decorativo con sueter navideno',
    shortName: 'Reno con sueter',
    line: 'decoracion',
    price: 30,
    images: [
      {
        kind: 'photo',
        src: '/img/fotos_artesika/Reno002.jpeg',
        alt: 'Reno decorativo de tela, con lentes redondos, sueter navideno y botas de peluche',
      },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: ['navidad'],
    roles: ['gift'],
    options: [],
    personalizations: [],
    specs: [
      { label: 'Material', value: 'Tela y peluche con relleno de fibra, base rigida' },
      { label: 'Alto', value: 'Aprox. 45 cm' },
    ],
    description: 'Reno decorativo cosido a mano, vestido con sueter navideno y botas.',
  },
  {
    id: 'pareja-renos-decorativos',
    slug: 'pareja-de-renos-decorativos',
    title: 'Pareja de renos decorativos',
    shortName: 'Pareja de renos',
    line: 'decoracion',
    price: 56,
    images: [
      {
        kind: 'photo',
        src: '/img/fotos_artesika/parejareno.jpeg',
        alt: 'Pareja de renos decorativos de tela, vestidos con sueteres navidenos, bufanda y botas',
      },
      {
        kind: 'photo',
        src: '/img/fotos_artesika/Renosvarios.jpeg',
        alt: 'Varias piezas de la coleccion navidena Artesika: renos, farol de pie y munecos de Papa Noel',
      },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: ['navidad', 'agradecimiento'],
    roles: ['gift'],
    options: [],
    personalizations: [],
    specs: [
      { label: 'Material', value: 'Tela y peluche con relleno de fibra, base rigida' },
      { label: 'Alto', value: 'Aprox. 45 cm cada uno' },
    ],
    description: 'Dupla de renos decorativos hechos a mano, a juego, para recibidor o mesa.',
  },
  {
    id: 'muneco-papa-noel',
    slug: 'muneco-papa-noel-decorativo',
    title: 'Muneco de Papa Noel decorativo',
    shortName: 'Papa Noel decorativo',
    line: 'decoracion',
    price: 30,
    images: [
      {
        kind: 'photo',
        src: '/img/fotos_artesika/Renosvarios.jpeg',
        alt: 'Coleccion navidena Artesika: munecos de Papa Noel junto a renos y farol de pie',
      },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: ['navidad', 'agradecimiento'],
    roles: ['gift'],
    options: [
      { id: 'tamano', label: 'Tamano', values: ['Mediano (aprox. 35 cm)', 'Grande (aprox. 55 cm)'], required: true },
    ],
    personalizations: [],
    specs: [
      { label: 'Material', value: 'Tela y peluche con relleno de fibra, base rigida' },
      { label: 'Hecho a mano', value: 'Cada pieza tiene pequenas diferencias' },
    ],
    description: 'Papa Noel decorativo cosido a mano, a juego con la coleccion navidena de renos y farol.',
    longDescription:
      'Muneco de Papa Noel decorativo, cosido y vestido a mano, con relleno de fibra y base para que se pare solo. Combina con los renos y el farol de la misma coleccion. Pieza de temporada, para recibidor, mesa o vidriera. La foto muestra varias piezas de la coleccion juntas.',
  },

  // =====================================================================
  // GF TEXTIL - fichas generadas a partir de fotos reales del taller
  // (public/img/gftextil/). Precios y algunas medidas son de ejemplo:
  // revisar antes de publicar. Ver CONTENIDO-PENDIENTE.md.
  // =====================================================================

  // ---- Salud y quirurgico ----
  {
    id: 'conjunto-clinico-blanco',
    slug: 'conjunto-clinico-blanco',
    title: 'Conjunto Clinico Blanco (top cuello mao + pantalon)',
    shortName: 'Conjunto clinico blanco',
    line: 'salud',
    price: 28,
    images: [
      { kind: 'photo', src: '/img/gftextil/conjunto-clinico-blanco-1.jpg', alt: 'Conjunto clinico blanco: top de cuello mao con abertura y pantalon recto' },
      { kind: 'photo', src: '/img/gftextil/conjunto-clinico-blanco-2.jpg', alt: 'Conjunto clinico blanco visto de frente sobre maniqui' },
    ],
    availability: { kind: 'made_to_order', leadDays: [4, 8] },
    specialties: ['odontologia', 'medicina', 'enfermeria', 'laboratorio'],
    occasions: ['apertura-consulta'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Verde quirurgico', 'Azul petroleo', 'Vino'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre y profesion', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Incluye', value: 'Top + pantalon' },
      { label: 'Cuello', value: 'Mao con abertura corta al frente' },
      { label: 'Tela', value: 'Antifluido / gabardina liviana (ejemplo)' },
    ],
    longDescription:
      'Conjunto de dos piezas para consultorio. El top es de cuello mao con una abertura corta al frente y corte recto con leve entalle en la cintura; el pantalon es de tiro medio, pretina con elastico atras y caida recta. Tela antifluido de secado rapido. Se confecciona por talla y color, con opcion de bordado.',
    sizeChart: SC_CONJUNTO_CLINICO,
    customerPhotos: CUSTOMER_PHOTOS_PLACEHOLDER,
  },
  {
    id: 'conjunto-clinico-rojo',
    slug: 'conjunto-clinico-rojo-vivo-blanco',
    title: 'Conjunto Clinico Rojo con vivo blanco',
    shortName: 'Conjunto clinico rojo',
    line: 'salud',
    price: 30,
    images: [
      { kind: 'photo', src: '/img/gftextil/conjunto-clinico-rojo-1.jpg', alt: 'Conjunto clinico rojo tipo cache-coeur con vivo blanco y lazo en la cintura' },
    ],
    availability: { kind: 'made_to_order', leadDays: [5, 9] },
    specialties: ['odontologia', 'enfermeria'],
    occasions: ['apertura-consulta', 'graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Rojo con vivo blanco', 'Vino con vivo blanco', 'Azul con vivo blanco'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Corte', value: 'Cruzado tipo cache-coeur con lazo en la cintura' },
      { label: 'Incluye', value: 'Top + pantalon' },
      { label: 'Detalle', value: 'Vivo de color en contraste en cuello y manga' },
    ],
    longDescription:
      'Conjunto clinico de corte cruzado, con escote en V terminado en cuello mao y un lazo que ajusta en la cintura. Manga corta con dobladillo y vivo en contraste que recorre el cuello y el puno. Pantalon recto a juego. Confeccion por talla; el color y el vivo se eligen al pedir.',
    sizeChart: SC_CONJUNTO_CLINICO,
  },
  {
    id: 'conjunto-jogger-clinico',
    slug: 'conjunto-jogger-clinico-con-chaqueta',
    title: 'Conjunto Clinico Jogger con chaqueta',
    shortName: 'Conjunto jogger clinico',
    line: 'salud',
    price: 40,
    images: [
      { kind: 'photo', src: '/img/gftextil/conjunto-jogger-1.jpg', alt: 'Conjunto clinico jogger vinotinto con chaqueta con capucha y cierre' },
      { kind: 'photo', src: '/img/gftextil/conjunto-jogger-2.jpg', alt: 'Conjunto clinico jogger morado con chaqueta de cuello mao y cierre' },
    ],
    availability: { kind: 'made_to_order', leadDays: [6, 12] },
    specialties: ['medicina', 'enfermeria', 'odontologia'],
    occasions: [],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Vinotinto', 'Morado', 'Azul petroleo', 'Negro'], required: true },
      { id: 'chaqueta', label: 'Chaqueta', values: ['Con capucha', 'Cuello mao'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre y profesion', price: 5, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Incluye', value: 'Top + pantalon jogger + chaqueta con cierre' },
      { label: 'Pantalon', value: 'Tipo jogger, puno elastico y bolsillos cargo' },
      { label: 'Tela', value: 'Antifluido con algo de elastano (ejemplo)' },
    ],
    longDescription:
      'Conjunto de tres piezas de linea moderna: top de escote en V, pantalon jogger con puno elastico y bolsillos tipo cargo, y chaqueta de cierre completo (con capucha o de cuello mao, a elegir). Tela con un porcentaje de elastano para libertad de movimiento. Ideal para turnos largos.',
    sizeChart: SC_CONJUNTO_CLINICO,
  },
  {
    id: 'chaqueta-enfermeria-vivo',
    slug: 'chaqueta-enfermeria-manga-larga-vivo',
    title: 'Chaqueta de Enfermeria manga larga con vivo',
    shortName: 'Chaqueta de enfermeria',
    line: 'salud',
    price: 25,
    images: [
      { kind: 'photo', src: '/img/gftextil/chaqueta-enfermeria-1.jpg', alt: 'Chaqueta blanca de enfermeria de manga larga con solapa y vivo rojo en cuello y bolsillos' },
    ],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: ['enfermeria', 'medicina', 'laboratorio'],
    occasions: ['apertura-consulta'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'vivo', label: 'Color del vivo', values: ['Rojo', 'Azul', 'Verde', 'Sin vivo'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre y profesion', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Corte', value: 'Entallado con pinzas, solapa de muesca, manga larga con puno' },
      { label: 'Bolsillos', value: '2 de parche con vivo en contraste' },
      { label: 'Cierre', value: 'Botonadura simple' },
    ],
    longDescription:
      'Chaqueta blanca de manga larga, entallada con pinzas y con solapa de muesca. Lleva un vivo de color en contraste que bordea el cuello, la tapeta y los bolsillos de parche. Largo a la cadera. El color del vivo se elige al pedir.',
    sizeChart: SC_TOP_DAMA,
  },
  {
    id: 'bata-laboratorio-consultorio',
    slug: 'bata-laboratorio-consultorio-blanca',
    title: 'Bata de Laboratorio / Consultorio blanca',
    shortName: 'Bata de consultorio',
    line: 'salud',
    price: 26,
    images: [
      { kind: 'photo', src: '/img/gftextil/bata-laboratorio-1.jpg', alt: 'Bata blanca larga de manga larga con solapa, pinzas en la cintura y bolsillos' },
    ],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: ['medicina', 'laboratorio', 'odontologia'],
    occasions: ['apertura-consulta', 'graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'largo', label: 'Largo', values: ['A la cadera', 'A media pierna', 'A la rodilla'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de nombre y profesion', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Corte', value: 'Solapa de muesca, pinzas y costura en la cintura, manga larga con puno' },
      { label: 'Bolsillos', value: '2 inferiores de parche + 1 de pecho' },
      { label: 'Tela', value: 'Gabardina blanca (ejemplo)' },
    ],
    longDescription:
      'Bata blanca clasica de consultorio y laboratorio. Solapa de muesca, cierre de botones y una costura marcada en la cintura con pinzas que define la silueta. Tres bolsillos. El largo se elige al pedir. Se puede bordar el nombre y la profesion.',
    sizeChart: SC_TOP_DAMA,
  },
  {
    id: 'gorro-panuelo-quirurgico',
    slug: 'gorro-panuelo-quirurgico',
    title: 'Gorro quirurgico tipo panuelo',
    shortName: 'Gorro panuelo',
    line: 'salud',
    price: 5,
    images: [
      { kind: 'photo', src: '/img/gftextil/gorro-panuelo-1.jpg', alt: 'Gorro quirurgico tipo panuelo rosado con cinta de raso, atado atras' },
    ],
    availability: { kind: 'in_stock', dispatchDays: [1, 3] },
    specialties: ['odontologia', 'medicina', 'enfermeria', 'laboratorio'],
    occasions: [],
    roles: ['add_on'],
    options: [
      { id: 'color', label: 'Color', values: ['Rosado', 'Verde quirurgico', 'Azul', 'Estampado'], required: true },
    ],
    personalizations: [],
    specs: [
      { label: 'Cierre', value: 'Se ata atras con tiras; cinta de raso decorativa' },
      { label: 'Ajuste', value: 'Talla unica' },
    ],
    longDescription:
      'Gorro tipo panuelo que cubre todo el cabello y se ata en la nuca. Lleva una cinta de raso en contraste. Talla unica. Se hace a juego con cualquiera de los conjuntos clinicos.',
  },
  {
    id: 'conjunto-clinico-bordado-institucional',
    slug: 'conjunto-clinico-bordado-institucional',
    title: 'Conjunto Clinico con bordado institucional',
    shortName: 'Clinico con bordado',
    line: 'salud',
    price: 32,
    images: [
      { kind: 'photo', src: '/img/gftextil/clinico-bordado-1.jpg', alt: 'Conjunto clinico azul rey con logo de universidad bordado en el pecho y pantalon celeste' },
      { kind: 'photo', src: '/img/gftextil/clinico-bordado-2.jpg', alt: 'Conjunto clinico negro con logo de universidad bordado en el pecho' },
    ],
    availability: { kind: 'made_to_order', leadDays: [8, 15] },
    specialties: ['medicina', 'enfermeria', 'odontologia', 'laboratorio'],
    occasions: ['graduacion'],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Azul rey / celeste', 'Negro', 'Vino', 'A convenir'], required: true },
    ],
    personalizations: [
      { id: 'bordado-logo', label: 'Bordado del logo de la institucion', price: 6, leadDaysExtra: 5 },
      { id: 'bordado-nombre', label: 'Bordado de nombre y apellido', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Para', value: 'Universidades, clinicas y grupos que piden por lote' },
      { label: 'Incluye', value: 'Top + pantalon; combinacion de dos colores opcional' },
      { label: 'Minimo sugerido', value: '5 unidades para bordado de logo' },
    ],
    longDescription:
      'Conjunto clinico pensado para pedidos por grupo: universidades, servicios y clinicas. Permite combinar dos colores (por ejemplo top azul rey y pantalon celeste) y llevar el logo de la institucion bordado en el pecho junto con el nombre de cada persona. Para pedidos grandes, solicita un presupuesto.',
    sizeChart: SC_CONJUNTO_CLINICO,
  },

  // ---- Gastronomia ----
  {
    id: 'delantal-peto-logo',
    slug: 'delantal-peto-con-logo-bordado',
    title: 'Delantal de peto con logo bordado',
    shortName: 'Delantal con logo',
    line: 'gastronomia',
    price: 14,
    images: [
      { kind: 'photo', src: '/img/gftextil/delantal-peto-1.jpg', alt: 'Delantal de peto negro con logo bordado a color y bolsillo frontal dividido' },
      { kind: 'photo', src: '/img/gftextil/delantal-peto-2.jpg', alt: 'Delantal de peto rosado con logo bordado y bolsillo frontal' },
      { kind: 'photo', src: '/img/gftextil/delantal-peto-3.jpg', alt: 'Delantal de peto azul marino sobre camisa, con gorro de chef' },
    ],
    availability: { kind: 'made_to_order', leadDays: [3, 7] },
    specialties: ['gastronomia'],
    occasions: ['navidad', 'agradecimiento', 'apertura-consulta'],
    roles: ['anchor', 'add_on', 'corporate'],
    options: [
      { id: 'color', label: 'Color', values: ['Negro', 'Rosado', 'Azul marino', 'Vino', 'Mostaza'], required: true },
    ],
    personalizations: [
      { id: 'bordado-logo', label: 'Bordado del logo del negocio', price: 6, leadDaysExtra: 3 },
      { id: 'bordado-nombre', label: 'Bordado de nombre', price: 3, leadDaysExtra: 2 },
    ],
    specs: [
      { label: 'Ajuste', value: 'Tira al cuello regulable con hebilla, tiras largas a la cintura' },
      { label: 'Bolsillo', value: 'Frontal amplio, dividido en dos' },
      { label: 'Tela', value: 'Sarga o antifluido segun uso (ejemplo)' },
    ],
    longDescription:
      'Delantal de peto entero, con tira al cuello regulable por hebilla y tiras largas que dan la vuelta y se atan al frente. Bolsillo frontal amplio dividido en dos. El logo del negocio se borda a color en el pecho. Se usa en cocina, pasteleria, cafeteria y fruteria.',
  },
  {
    id: 'mandil-mesonero-logo',
    slug: 'mandil-mesonero-media-cintura-logo',
    title: 'Mandil de Mesonero media cintura con logo',
    shortName: 'Mandil con logo',
    line: 'gastronomia',
    price: 9,
    images: [
      { kind: 'photo', src: '/img/gftextil/mandil-mesonero-1.jpg', alt: 'Mandil de media cintura negro atado atras, con logo estampado a un lado' },
    ],
    availability: { kind: 'made_to_order', leadDays: [3, 6] },
    specialties: ['gastronomia'],
    occasions: [],
    roles: ['add_on', 'corporate'],
    options: [
      { id: 'color', label: 'Color', values: ['Negro', 'Vino', 'Gris', 'Azul marino'], required: true },
    ],
    personalizations: [
      { id: 'logo', label: 'Estampado o bordado del logo', price: 4, leadDaysExtra: 2 },
    ],
    specs: [
      { label: 'Largo', value: 'A media pierna, corte de servicio de sala' },
      { label: 'Bolsillos', value: '2 frontales para comandas' },
    ],
    longDescription:
      'Mandil corto de media cintura para servicio de sala y barra. Se ata atras con tiras largas. Dos bolsillos frontales para la libreta de comandas y el saca-corchos. El logo va estampado o bordado a un lado.',
  },

  // ---- Escolar ----
  {
    id: 'conjunto-deportivo-escolar-azul',
    slug: 'conjunto-deportivo-escolar-raglan',
    title: 'Conjunto Deportivo Escolar (franela raglan + mono)',
    shortName: 'Deportivo escolar',
    line: 'escolar',
    price: 18,
    images: [
      { kind: 'photo', src: '/img/gftextil/deportivo-escolar-azul-1.jpg', alt: 'Conjunto deportivo escolar: franela raglan blanca con mangas azules y mono azul' },
      { kind: 'photo', src: '/img/gftextil/deportivo-escolar-azul-2.jpg', alt: 'Detalle del cuello de la franela raglan azul y blanca' },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: [],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ESCOLAR, required: true },
      { id: 'colores', label: 'Colores', values: ['Azul y blanco', 'Rojo y negro', 'A definir por el colegio'], required: true },
    ],
    personalizations: [
      { id: 'estampado', label: 'Estampado o bordado del colegio', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Incluye', value: 'Franela manga raglan + mono (pantalon deportivo)' },
      { label: 'Tela', value: 'Micropunto deportivo (ejemplo)' },
      { label: 'Produccion', value: 'Por colegio y por talla' },
    ],
    longDescription:
      'Conjunto de educacion fisica: franela de manga raglan en dos colores y mono deportivo a juego con vivo lateral. Se produce por colegio, con los colores y el escudo de cada institucion. Tallas de nino y de adulto.',
    sizeChart: {
      note: 'Tallas escolares por edad aproximada; S/M/L para adulto joven.',
      headers: ['Talla', 'Pecho', 'Largo franela', 'Cintura mono', 'Largo mono'],
      rows: [
        { label: '4', values: ['62', '42', '52', '62'] },
        { label: '8', values: ['70', '48', '58', '74'] },
        { label: '12', values: ['80', '55', '64', '88'] },
        { label: '16', values: ['92', '62', '72', '98'] },
        { label: 'M', values: ['104', '68', '80', '102'] },
        { label: 'L', values: ['112', '71', '88', '104'] },
      ],
    },
  },
  {
    id: 'conjunto-deportivo-escolar-rojo',
    slug: 'conjunto-deportivo-escolar-rojo-negro',
    title: 'Conjunto Deportivo Escolar rojo y negro (franela + bermuda)',
    shortName: 'Deportivo rojo/negro',
    line: 'escolar',
    price: 16,
    images: [
      { kind: 'photo', src: '/img/gftextil/deportivo-escolar-rojo-1.jpg', alt: 'Conjunto deportivo escolar: franela roja con mangas negras y bermuda negra con vivo rojo' },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: [],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ESCOLAR, required: true },
      { id: 'parte-baja', label: 'Parte de abajo', values: ['Bermuda', 'Mono largo'], required: true },
    ],
    personalizations: [
      { id: 'estampado', label: 'Estampado del colegio', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Incluye', value: 'Franela raglan + bermuda (o mono)' },
      { label: 'Detalle', value: 'Vivo lateral en contraste en la bermuda' },
    ],
    longDescription:
      'Version del conjunto de educacion fisica con franela roja de mangas negras y bermuda negra con vivo rojo a los lados. Se puede pedir con mono largo en vez de bermuda. Produccion por colegio y talla.',
  },
  {
    id: 'franela-deportiva-escolar-v',
    slug: 'franela-deportiva-escolar-cuello-v',
    title: 'Franela Deportiva Escolar cuello V',
    shortName: 'Franela deportiva',
    line: 'escolar',
    price: 8,
    images: [
      { kind: 'photo', src: '/img/gftextil/franela-deportiva-1.jpg', alt: 'Franela deportiva blanca de cuello en V con vivos azul y rojo en cuello y manga' },
    ],
    availability: { kind: 'made_to_order', leadDays: [5, 10] },
    specialties: [],
    occasions: [],
    roles: ['add_on', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ESCOLAR, required: true },
      { id: 'color', label: 'Color base', values: ['Blanco', 'Azul', 'Rojo', 'Gris'], required: true },
    ],
    personalizations: [
      { id: 'estampado', label: 'Estampado del colegio o del curso', price: 3, leadDaysExtra: 2 },
    ],
    specs: [
      { label: 'Cuello', value: 'En V con ribete tejido en contraste' },
      { label: 'Tela', value: 'Micropunto deportivo (ejemplo)' },
    ],
    longDescription:
      'Franela deportiva de cuello en V con ribete tejido en dos colores en el cuello y el borde de la manga. Sirve como pieza suelta del uniforme de educacion fisica o para promociones y cursos.',
  },

  // ---- Corporativo y Columbia ----
  {
    id: 'camisa-corporativa-logo',
    slug: 'camisa-corporativa-manga-larga-logo',
    title: 'Camisa Corporativa manga larga con logo',
    shortName: 'Camisa con logo',
    line: 'corporativo',
    price: 20,
    images: [
      { kind: 'photo', src: '/img/gftextil/camisa-corporativa-logo-1.jpg', alt: 'Camisa verde de manga larga con cuello camisero y logo de empresa bordado en el bolsillo' },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: [],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Verde', 'Azul', 'Blanco', 'Gris', 'A convenir'], required: true },
      { id: 'manga', label: 'Manga', values: ['Larga', 'Corta'], required: true },
    ],
    personalizations: [
      { id: 'bordado-logo', label: 'Bordado del logo de la empresa', price: 5, leadDaysExtra: 4 },
      { id: 'bordado-nombre', label: 'Bordado de nombre', price: 3, leadDaysExtra: 2 },
    ],
    specs: [
      { label: 'Corte', value: 'Cuello camisero, canesu, bolsillo de pecho' },
      { label: 'Para', value: 'Dotacion de empresa; se pide por lote' },
    ],
    longDescription:
      'Camisa de uniforme de empresa, de cuello camisero y corte clasico, con bolsillo de pecho donde va el logo bordado. Manga larga o corta. Se produce por lote con el color corporativo. Para pedidos de dotacion, solicita un presupuesto.',
    sizeChart: SC_CAMISA,
  },
  {
    id: 'camisa-trabajo-dotacion',
    slug: 'camisa-de-trabajo-dotacion',
    title: 'Camisa de Trabajo (dotacion)',
    shortName: 'Camisa de trabajo',
    line: 'corporativo',
    price: 17,
    images: [
      { kind: 'photo', src: '/img/gftextil/camisa-trabajo-1.jpg', alt: 'Camisa de trabajo coral de manga corta con dos bolsillos de tapa y pantalon gris' },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: ['industrial'],
    occasions: [],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Coral', 'Gris', 'Azul', 'Beige', 'A convenir'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de logo y nombre', price: 5, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Bolsillos', value: '2 de pecho con tapa' },
      { label: 'Tela', value: 'Gabardina resistente (ejemplo)' },
    ],
    longDescription:
      'Camisa de trabajo de manga corta, cuello camisero y dos bolsillos de pecho con tapa. Tela de gabardina resistente para uso diario. Se produce por lote en el color de la empresa.',
    sizeChart: SC_CAMISA,
    customerPhotos: [
      { image: '/img/gftextil/camisa-trabajo-lote-1.jpg', note: 'Lote de camisas de trabajo listo para entregar' },
    ],
  },
  {
    id: 'blusa-administrativa-roja',
    slug: 'blusa-administrativa-manga-corta',
    title: 'Blusa Administrativa manga corta',
    shortName: 'Blusa administrativa',
    line: 'corporativo',
    price: 18,
    images: [
      { kind: 'photo', src: '/img/gftextil/blusa-administrativa-1.jpg', alt: 'Blusa roja entallada de manga corta con cuello camisero y pinzas' },
    ],
    availability: { kind: 'made_to_order', leadDays: [6, 12] },
    specialties: [],
    occasions: [],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Rojo', 'Blanco', 'Azul', 'Perla', 'A convenir'], required: true },
      { id: 'manga', label: 'Manga', values: ['Corta', '3/4', 'Larga'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de logo', price: 4, leadDaysExtra: 3 },
    ],
    specs: [
      { label: 'Corte', value: 'Entallado con pinzas, cuello camisero' },
      { label: 'Detalle', value: 'Bolsillos de pecho con tapa' },
    ],
    longDescription:
      'Blusa de uniforme para personal administrativo y de atencion. Corte entallado con pinzas al frente y atras, cuello camisero y botonadura simple. Bolsillos de pecho con tapa. Manga corta, 3/4 o larga. Se pide por lote en el color de la empresa.',
    sizeChart: SC_TOP_DAMA,
  },
  {
    id: 'camisa-cuello-mao-caballero',
    slug: 'camisa-cuello-mao-caballero',
    title: 'Camisa cuello mao caballero',
    shortName: 'Camisa cuello mao',
    line: 'corporativo',
    price: 22,
    images: [
      { kind: 'photo', src: '/img/gftextil/camisa-cuello-mao-1.jpg', alt: 'Camisa magenta de caballero con cuello mao y vivo oscuro en la tapeta' },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: ['graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Magenta', 'Blanco', 'Negro', 'Azul', 'Vino'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de iniciales', price: 3, leadDaysExtra: 2 },
    ],
    specs: [
      { label: 'Cuello', value: 'Mao (sin solapa)' },
      { label: 'Detalle', value: 'Vivo en contraste en la tapeta y el puno' },
      { label: 'Tela', value: 'Popelina de algodon (ejemplo)' },
    ],
    longDescription:
      'Camisa de caballero de cuello mao, sin solapa, con la tapeta y el puno rematados en un vivo oscuro en contraste. Corte semi entallado. Sirve para uniforme de recepcion y eventos, o como camisa de vestir informal.',
    sizeChart: SC_CAMISA,
  },
  {
    id: 'pantalon-vestir-caballero',
    slug: 'pantalon-de-vestir-caballero',
    title: 'Pantalon de Vestir caballero',
    shortName: 'Pantalon de vestir',
    line: 'corporativo',
    price: 22,
    images: [
      { kind: 'photo', src: '/img/gftextil/pantalon-vestir-1.jpg', alt: 'Pantalon de vestir gris con pretina, pasadores y bolsillo trasero con boton' },
    ],
    availability: { kind: 'made_to_order', leadDays: [7, 14] },
    specialties: [],
    occasions: ['graduacion'],
    roles: ['anchor', 'add_on'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Gris', 'Negro', 'Azul marino', 'Beige'], required: true },
      { id: 'pinza', label: 'Delantero', values: ['Con pinza', 'Sin pinza'], required: true },
    ],
    personalizations: [],
    specs: [
      { label: 'Pretina', value: 'Con pasadores y cierre de boton + gancho' },
      { label: 'Bolsillos', value: '2 delanteros diagonales + 2 traseros con boton' },
      { label: 'Tela', value: 'Casimir liviano (ejemplo)' },
    ],
    longDescription:
      'Pantalon de vestir de caballero, de caida recta y tiro medio. Pretina con pasadores, cierre de boton y gancho. Bolsillos delanteros diagonales y traseros con boton. Se confecciona a la medida; el ruedo se ajusta al pedir.',
    sizeChart: SC_PANTALON,
  },
  {
    id: 'traje-institucional-mao',
    slug: 'traje-institucional-cuello-mao',
    title: 'Traje Institucional cuello mao (protocolo)',
    shortName: 'Traje institucional',
    line: 'gala',
    price: 95,
    images: [
      { kind: 'photo', src: '/img/gftextil/traje-institucional-1.jpg', alt: 'Chaqueta institucional beige de cuello mao con botonadura, sobre maniqui' },
      { kind: 'photo', src: '/img/gftextil/traje-institucional-2.jpg', alt: 'Dama y caballero con traje institucional beige de cuello mao y quepis' },
    ],
    availability: { kind: 'made_to_order', leadDays: [15, 30] },
    specialties: [],
    occasions: ['graduacion'],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'A medida'], required: true },
      { id: 'modelo', label: 'Modelo', values: ['Dama', 'Caballero'], required: true },
      { id: 'color', label: 'Color', values: ['Beige', 'Gris', 'Azul marino', 'A convenir'], required: true },
    ],
    personalizations: [
      { id: 'medida', label: 'Confeccion a medida (toma de medidas)', price: 25 },
      { id: 'insignia', label: 'Insignias / botones institucionales', price: 12 },
    ],
    specs: [
      { label: 'Incluye', value: 'Chaqueta de cuello mao + pantalon (quepis aparte)' },
      { label: 'Uso', value: 'Protocolo, promociones, cuerpos institucionales' },
      { label: 'Confeccion', value: 'A medida, con prueba y ajuste' },
    ],
    longDescription:
      'Traje de corte institucional: chaqueta de cuello mao con botonadura al frente, hombros estructurados y bolsillos de vivo, con pantalon a juego. Se confecciona a medida para dama y caballero, en el color que defina la institucion, y admite insignias o botones especiales. El quepis se cotiza aparte.',
    sizeChart: SC_TOP_DAMA,
  },

  // ---- Seguridad industrial ----
  {
    id: 'chaqueta-mezclilla-trabajo',
    slug: 'chaqueta-de-mezclilla-de-trabajo',
    title: 'Chaqueta de Mezclilla de trabajo',
    shortName: 'Chaqueta de mezclilla',
    line: 'industrial',
    price: 30,
    images: [
      { kind: 'photo', src: '/img/gftextil/chaqueta-mezclilla-1.jpg', alt: 'Chaqueta de mezclilla azul de trabajo con cuatro bolsillos de parche y botones' },
      { kind: 'photo', src: '/img/gftextil/chaqueta-mezclilla-2.jpg', alt: 'Chaqueta de mezclilla de trabajo vista de tres cuartos' },
    ],
    availability: { kind: 'made_to_order', leadDays: [10, 18] },
    specialties: ['industrial'],
    occasions: [],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Azul mezclilla', 'Negro mezclilla'], required: true },
    ],
    personalizations: [
      { id: 'bordado', label: 'Bordado de logo y nombre', price: 6, leadDaysExtra: 4 },
    ],
    specs: [
      { label: 'Bolsillos', value: '4 de parche (2 de pecho, 2 inferiores)' },
      { label: 'Cierre', value: 'Botones metalicos' },
      { label: 'Tela', value: 'Mezclilla de trabajo (ejemplo)' },
    ],
    longDescription:
      'Chaqueta de mezclilla resistente tipo chore, con cuatro bolsillos de parche y botones metalicos. Corte holgado para usar sobre la ropa de trabajo. Se puede bordar el logo de la empresa en el pecho y la espalda.',
    sizeChart: SC_CAMISA,
  },
  {
    id: 'pantalon-tactico-cargo',
    slug: 'pantalon-tactico-cargo-ripstop',
    title: 'Pantalon Tactico / Cargo (ripstop)',
    shortName: 'Pantalon tactico',
    line: 'industrial',
    price: 26,
    images: [
      { kind: 'photo', src: '/img/gftextil/pantalon-tactico-1.jpg', alt: 'Pantalon tactico azul marino con bolsillos cargo, refuerzo en el asiento y pasadores anchos' },
    ],
    availability: { kind: 'made_to_order', leadDays: [10, 18] },
    specialties: ['industrial'],
    occasions: [],
    roles: ['anchor', 'corporate'],
    options: [
      { id: 'talla', label: 'Talla', values: TALLAS_ROPA, required: true },
      { id: 'color', label: 'Color', values: ['Azul marino', 'Negro', 'Verde', 'Beige'], required: true },
    ],
    personalizations: [],
    specs: [
      { label: 'Bolsillos', value: 'Cargo laterales + traseros con tapa + delanteros' },
      { label: 'Refuerzo', value: 'Costuras dobles y refuerzo en asiento y rodilla' },
      { label: 'Tela', value: 'Ripstop (ejemplo)' },
    ],
    longDescription:
      'Pantalon tactico de tela ripstop, con bolsillos cargo laterales, refuerzos en el asiento y las rodillas y costuras dobles en las zonas de esfuerzo. Pretina con pasadores anchos para cinturon de trabajo. Para seguridad, vigilancia y personal de campo.',
    sizeChart: SC_PANTALON,
  },

  // ---- Gala y tradicion ----
  {
    id: 'traje-sastre-dama-blanco',
    slug: 'traje-sastre-dama-blazer-pantalon-blanco',
    title: 'Traje Sastre Dama blanco (blazer + pantalon)',
    shortName: 'Traje sastre blanco',
    line: 'gala',
    price: 105,
    images: [
      { kind: 'photo', src: '/img/gftextil/traje-sastre-blanco-1.jpg', alt: 'Traje sastre blanco de dama: blazer de solapa con un boton y pantalon de pierna ancha' },
      { kind: 'photo', src: '/img/gftextil/traje-sastre-blanco-2.jpg', alt: 'Detalle del bolsillo de vivo del blazer blanco' },
      { kind: 'photo', src: '/img/gftextil/traje-sastre-blanco-3.jpg', alt: 'Detalle de la solapa del blazer blanco de dama' },
    ],
    availability: { kind: 'made_to_order', leadDays: [15, 30] },
    specialties: [],
    occasions: ['graduacion', 'agradecimiento'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: ['XS', 'S', 'M', 'L', 'XL', 'A medida'], required: true },
      { id: 'color', label: 'Color', values: ['Blanco', 'Negro', 'Beige', 'Azul noche', 'A elegir'], required: true },
      { id: 'pantalon', label: 'Pantalon', values: ['Pierna ancha', 'Recto', 'Sastre clasico'], required: true },
    ],
    personalizations: [{ id: 'medida', label: 'Ajuste a medida (toma de medidas)', price: 25 }],
    specs: [
      { label: 'Incluye', value: 'Blazer forrado + pantalon' },
      { label: 'Blazer', value: 'Solapa de muesca, un boton, bolsillos de vivo' },
      { label: 'Confeccion', value: 'A medida, con prueba y ajuste' },
    ],
    longDescription:
      'Traje sastre de dama: blazer entallado de solapa de muesca, cierre de un boton y bolsillos de vivo, con pantalon a juego de pierna ancha (o recto / sastre clasico, a elegir). Se confecciona a medida en el color que prefieras. Para graduaciones, eventos y uso ejecutivo.',
    sizeChart: SC_TOP_DAMA,
  },
  {
    id: 'traje-sastre-dama-vinotinto',
    slug: 'traje-sastre-dama-chaleco-pantalon-vinotinto',
    title: 'Traje Sastre Dama vinotinto (chaleco + pantalon)',
    shortName: 'Traje chaleco vinotinto',
    line: 'gala',
    price: 80,
    images: [
      { kind: 'photo', src: '/img/gftextil/traje-sastre-vinotinto-1.jpg', alt: 'Traje sastre vinotinto de dama: chaleco de solapa con tres botones y pantalon recto' },
    ],
    availability: { kind: 'made_to_order', leadDays: [15, 25] },
    specialties: [],
    occasions: ['graduacion'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: ['XS', 'S', 'M', 'L', 'XL', 'A medida'], required: true },
      { id: 'color', label: 'Color', values: ['Vinotinto', 'Negro', 'Azul noche', 'Verde', 'A elegir'], required: true },
    ],
    personalizations: [{ id: 'medida', label: 'Ajuste a medida', price: 20 }],
    specs: [
      { label: 'Incluye', value: 'Chaleco de vestir + pantalon' },
      { label: 'Chaleco', value: 'Solapa de muesca, tres botones, dos bolsillos de vivo' },
    ],
    longDescription:
      'Conjunto de chaleco y pantalon en tono vinotinto. El chaleco es de solapa de muesca con tres botones y bolsillos de vivo; el pantalon es recto de tiro medio. Se puede usar con blusa debajo o solo. Confeccion a medida.',
    sizeChart: SC_TOP_DAMA,
  },
  {
    id: 'traje-sastre-dama-beige',
    slug: 'traje-sastre-dama-cuello-mao-beige',
    title: 'Traje Sastre Dama cuello mao beige',
    shortName: 'Traje sastre beige',
    line: 'gala',
    price: 95,
    images: [
      { kind: 'photo', src: '/img/gftextil/traje-sastre-beige-1.jpg', alt: 'Traje sastre beige de dama: chaqueta de cuello mao con cinco botones forrados y pantalon' },
    ],
    availability: { kind: 'made_to_order', leadDays: [15, 30] },
    specialties: [],
    occasions: ['graduacion', 'agradecimiento'],
    roles: ['anchor'],
    options: [
      { id: 'talla', label: 'Talla', values: ['XS', 'S', 'M', 'L', 'XL', 'A medida'], required: true },
      { id: 'color', label: 'Color', values: ['Beige', 'Gris perla', 'Negro', 'A elegir'], required: true },
    ],
    personalizations: [{ id: 'medida', label: 'Ajuste a medida', price: 25 }],
    specs: [
      { label: 'Incluye', value: 'Chaqueta de cuello mao + pantalon' },
      { label: 'Chaqueta', value: 'Cinco botones forrados, hombros estructurados, bolsillos de vivo' },
    ],
    longDescription:
      'Traje de chaqueta de cuello mao con cinco botones forrados y linea entallada, con pantalon a juego. Un corte sobrio y formal, sin solapa. Se confecciona a medida en el color elegido.',
    sizeChart: SC_TOP_DAMA,
  },

  // =====================================================================
  // ARTESIKA - piezas de bisuteria identificadas en las fotos.
  // =====================================================================
  {
    id: 'pulsera-ojo-turco-par',
    slug: 'pulseras-ojo-turco-tejidas-par',
    title: 'Pulseras de ojo turco tejidas (par en caja)',
    shortName: 'Pulseras ojo turco',
    line: 'artesania',
    price: 10,
    images: [
      { kind: 'photo', src: '/img/fotos_artesika/pulseras-ojo-turco-caja.jpg', alt: 'Par de pulseras negras tejidas con cuentas de madera y ojo turco, en caja dorada' },
      { kind: 'photo', src: '/img/fotos_artesika/pulsera-ojo-turco-muneca.jpg', alt: 'Pulsera negra tejida con ojo turco rojo puesta en la muneca' },
    ],
    availability: { kind: 'made_to_order', leadDays: [3, 6] },
    specialties: [],
    occasions: ['navidad', 'cumpleanos', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [
      { id: 'presentacion', label: 'Presentacion', values: ['Par en caja de regalo', 'Unidad'], required: true },
    ],
    personalizations: [],
    specs: [
      { label: 'Material', value: 'Hilo encerado tejido a mano, cuentas de madera y ojo turco de vidrio' },
      { label: 'Ajuste', value: 'Nudo corredizo regulable' },
    ],
    description: 'Par de pulseras de proteccion tejidas a mano, con ojo turco y cuentas de madera, en caja de regalo.',
    longDescription:
      'Pulseras tejidas a mano en hilo encerado, con macrame apretado, cuentas de madera y una cuenta de ojo turco de vidrio. Cierre de nudo corredizo que se ajusta a cualquier muneca. Se entregan como par en una caja de regalo o por unidad.',
  },
  {
    id: 'pulseras-piedras-serie',
    slug: 'pulseras-de-piedras-y-dijes-serie',
    title: 'Pulseras de piedras y dijes (serie artesanal)',
    shortName: 'Pulseras de piedras',
    line: 'artesania',
    price: 12,
    images: [
      { kind: 'photo', src: '/img/fotos_artesika/pulseras-piedras-serie.jpg', alt: 'Serie de pulseras artesanales con piedras naturales, cuentas de colores y dijes dorados' },
    ],
    availability: { kind: 'made_to_order', leadDays: [4, 8] },
    specialties: [],
    occasions: ['navidad', 'cumpleanos', 'agradecimiento'],
    roles: ['add_on', 'gift'],
    options: [
      { id: 'estilo', label: 'Estilo', values: ['Piedra grande engarzada', 'Cuentas de colores con dije', 'A eleccion de la artesana'], required: true },
    ],
    personalizations: [
      { id: 'color', label: 'Elegir gama de color', price: 0 },
    ],
    specs: [
      { label: 'Material', value: 'Piedras naturales, cristal, cuentas de vidrio y dijes de zamak' },
      { label: 'Hechura', value: 'Alambrismo y engarce a mano; cada pieza es unica' },
    ],
    description: 'Pulseras artesanales de piedras naturales y dijes, hechas con tecnica de alambrismo. Cada una es unica.',
    longDescription:
      'Serie de pulseras trabajadas a mano con alambrismo: piedras naturales engarzadas, cuentas de vidrio de colores y dijes de zamak (media luna, mano de Fatima, borlas). Por ser hechas una a una, no hay dos iguales; se puede pedir una gama de color y la artesana arma la pieza dentro de ese rango.',
  },
];

// ---------------------------------------------------------------------------
// KITS. anchorProductId es el producto en cuya ficha aparece el kit.
// El precio se calcula solo a partir de los componentes y discountPct.
// Regla: el ancla y TODOS los componentes deben ser de la misma marca
// (src/lib/catalog.ts descarta los kits que no cumplan). Estos son de GF Textil.
// ---------------------------------------------------------------------------

export const KITS: Kit[] = [
  {
    id: 'kit-consultorio-odontologia',
    title: 'Kit Consultorio - Odontologia',
    specialty: 'odontologia',
    anchorProductId: 'bata-clinica-antifluido',
    componentProductIds: ['gorro-quirurgico'],
    discountPct: 0.1,
    blurb: 'La bata clinica y el gorro quirurgico a juego, en un solo clic.',
  },
  {
    id: 'kit-clinico-enfermeria',
    title: 'Kit Clinico - Enfermeria',
    specialty: 'enfermeria',
    anchorProductId: 'conjunto-clinico-blanco',
    componentProductIds: ['gorro-panuelo-quirurgico'],
    discountPct: 0.1,
    blurb: 'El conjunto clinico blanco con el gorro tipo panuelo a juego.',
  },
  {
    id: 'kit-jogger-medicina',
    title: 'Kit Jogger - Medicina',
    specialty: 'medicina',
    anchorProductId: 'conjunto-jogger-clinico',
    componentProductIds: ['gorro-panuelo-quirurgico'],
    discountPct: 0.1,
    blurb: 'El conjunto jogger con chaqueta y el gorro panuelo a juego.',
  },
  {
    id: 'kit-cocina-gastronomia',
    title: 'Kit Cocina - Gastronomia',
    specialty: 'gastronomia',
    anchorProductId: 'filipina-chef',
    componentProductIds: ['gorro-cocina', 'delantal-cocina'],
    discountPct: 0.15,
    blurb: 'Filipina de chef, gorro de cocina y delantal a precio de paquete.',
  },
];
