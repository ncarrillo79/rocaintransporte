# Como administrar el catalogo

Todo el contenido de la tienda vive en esta carpeta. No hace falta tocar componentes.

| Archivo | Que controla |
|---|---|
| `products.ts` | Productos y kits. Es el archivo del dia a dia. |
| `lines.ts` | Lineas de producto y a que mundo pertenece cada una. |
| `collections.ts` | Colecciones: cada una es un filtro del catalogo (lo que enlaza el menu). |
| `specialties.ts` | Lista de profesiones (etiquetas). |
| `config.ts` | Envio gratis, tasa Bs, campana de Navidad, envoltorios, couriers, WhatsApp. |

## Mundos y lineas

La tienda tiene cuatro mundos: **trabajo · oficio · gala · navidad**.
El mundo de un producto NO se escribe: se deriva de su `line` (ver `lines.ts`).

| Linea | Mundo |
|---|---|
| `salud`, `gastronomia`, `escolar`, `corporativo`, `industrial`, `otros` | trabajo |
| `gala` | gala |
| `artesania`, `decoracion` | oficio |

Lo que se sale del patron: ponlo en la pagina "A medida" (`#/otros`,
`src/store/CustomOrderPage.tsx`) en vez de forzarlo en una linea.

---

## Agregar un producto

Copia un bloque dentro de `PRODUCTS` en `products.ts` y ajusta los campos.

```ts
{
  id: 'pulsera-lapiz',                 // unico, sin espacios
  slug: 'pulsera-tematica-lapiz',      // va en la URL
  title: 'Pulsera tematica - lapiz',
  shortName: 'Pulsera lapiz',          // se ve en las tiras y kits
  line: 'artesania',                   // el mundo se deriva de aqui (lines.ts)
  price: 9,                            // USD
  images: [{ kind: 'placeholder', glyph: 'pulsera', caption: 'FOTO - pulsera lapiz' }],
  availability: { kind: 'made_to_order', leadDays: [3, 6] },
  specialties: ['docencia'],           // <- conecta esta pieza con esa profesion
  occasions: ['navidad', 'agradecimiento'],
  roles: ['add_on', 'gift'],           // add_on = aparece en "Combina con..."
  options: [],
  personalizations: [],
  specs: [{ label: 'Material', value: 'Hilo encerado + dije de zamak' }],
  description: 'Pulsera artesanal tejida a mano con dije de lapiz.',
}
```

Glyphs disponibles para el marcador de foto: `bata`, `gorro`, `delantal`,
`camisa`, `vestido`, `pulsera`, `llavero`, `lampara`, `cocuiza`, `caja`.

### Que hace que una pieza aparezca en "Combina con tu especialidad"

Las dos condiciones juntas:

1. `roles` incluye `'add_on'`
2. `specialties` incluye la especialidad seleccionada en la ficha

Si no hay suficientes, el hueco se rellena con piezas que tengan
`specialties: []` y `occasions` con `'navidad'` (regalos universales).

### Poner una foto real

1. Copia la imagen a `public/img/` (por ej. `public/img/pulsera-lapiz.jpg`).
2. Cambia el `images` del producto:

```ts
images: [{ kind: 'photo', src: 'img/pulsera-lapiz.jpg', alt: 'Pulsera con dije de lapiz' }],
```

---

## Crear un kit (combo)

En `KITS`, dentro de `products.ts`:

```ts
{
  id: 'kit-docencia',
  title: 'Kit Docencia',
  specialty: 'docencia',
  anchorProductId: 'bata-clinica-antifluido', // ficha donde aparece el kit
  componentProductIds: ['gorro-quirurgico', 'pulsera-lapiz'],
  discountPct: 0.15,                           // 15 %
  blurb: 'La bata, el gorro y la pulsera tematica en un clic.',
}
```

El precio del kit se calcula solo: suma de las piezas menos `discountPct`.

---

## Agregar una especialidad nueva

1. En `src/types.ts`, agregala al tipo `Specialty`.
2. En `specialties.ts`, agrega la fila con su `label` y `world`.

## Agregar una linea nueva

1. En `src/types.ts`, agregala al tipo `ProductLine`.
2. En `lines.ts`, agrega la fila con su `label` y el `world` al que pertenece.

---

## Crear una coleccion (pagina + link de menu)

En `collections.ts`:

```ts
{
  id: 'regalar-docencia',            // va en la URL: #/c/regalar-docencia
  title: 'Para una maestra',
  kicker: 'Regalar por profesion',
  blurb: 'Detalles con la etiqueta de docencia.',
  world: 'hub',                      // 'hub' muestra el aviso "mezcla mundos"
  filter: { specialties: ['docencia'] },
}
```

Filtros disponibles (se combinan con Y): `worlds`, `lines`, `specialties`,
`occasions`, `roles`, `maxPrice`. Luego enlaza el `id` desde el menu en
`src/store/MegaMenu.tsx` o desde la home en `src/store/HomePage.tsx`.

---

## Ajustes rapidos (`config.ts`)

| Quiero... | Cambio |
|---|---|
| Subir/bajar el umbral de envio gratis | `freeShippingThreshold` |
| Mostrar precios en bolivares | `bsRate: 40` (numero de la tasa) |
| Apagar TODO el bloque de Navidad | `season.christmasEnabled: false` |
| Cambiar los cupos que se muestran | `season.weeklySlots` |
| Cambiar el anticipo de preventa | `season.depositPct` (0.5 = 50 %) |
| Editar couriers o ciudad de retiro | `couriers`, `pickupCities` |
| Cambiar el WhatsApp de cotizaciones y "a medida" | `whatsapp` (formato internacional sin `+`) |
