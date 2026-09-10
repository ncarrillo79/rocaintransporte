// ---------------------------------------------------------------------------
// Nombre de color -> valor CSS para el cuadrito de muestra en la ficha.
// Claves en minuscula y sin acentos. Si un color no esta aqui (o es del tipo
// "a convenir"), se muestra un cuadrito rayado y el cliente indica el tono
// exacto al solicitar presupuesto.
// ---------------------------------------------------------------------------

const MAP: Record<string, string> = {
  blanco: '#fbfbf8',
  negro: '#1c1c1c',
  gris: '#9aa0a6',
  'gris azulado': '#7d8a99',
  'gris perla': '#d7d3ca',
  perla: '#ece7db',
  beige: '#d6c3a1',
  mostaza: '#c9a227',
  marfil: '#f1e9d6',
  'verde quirurgico': '#4a8f7b',
  'verde menta': '#a8d5c2',
  verde: '#3f7d3f',
  'verde oliva': '#6b6b3a',
  azul: '#2f5fa8',
  'azul cielo': '#8fc1e3',
  'azul petroleo': '#1f5c66',
  'azul marino': '#1e2a4a',
  'azul rey': '#1f3fa8',
  'azul noche': '#232b3d',
  'azul escolar': '#1f4e9c',
  celeste: '#b7d7ea',
  rojo: '#c0392b',
  coral: '#e2725b',
  naranja: '#e07b1f',
  amarillo: '#e8c33a',
  vino: '#6e1f2e',
  vinotinto: '#5c1a2b',
  rosado: '#e8a4bf',
  magenta: '#a83279',
  morado: '#5b2a86',
  esmeralda: '#1f7a5a',
};

/** Devuelve el CSS del cuadrito, o null si el color no se puede representar. */
export function swatchColor(name: string): string | null {
  // Los valores de color en products.ts se escriben sin acentos, igual que las
  // claves de MAP, asi que basta con minusculas + trim.
  const key = name.toLowerCase().trim();
  if (MAP[key]) return MAP[key];
  // "rojo con vivo blanco", "azul rey / celeste" -> usa el primer color conocido
  for (const token of Object.keys(MAP)) {
    if (key.startsWith(`${token} `) || key.startsWith(`${token}/`)) return MAP[token];
  }
  return null;
}
