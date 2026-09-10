# Contenido pendiente de tu parte

Lo que falta para dejar las dos tiendas listas para publicar. Nada de esto bloquea
el resto del trabajo; son datos que tienes que confirmar tú.

> **El sitio ya NO tiene carrito.** Cada producto y cada acción de compra abre
> WhatsApp con un texto ya armado (nombre del producto + opciones). La preventa y
> el presupuesto también son un botón de WhatsApp, sin formulario.
>
> **Solo se muestran los productos que tienen foto real.** Los que están con
> dibujo de línea quedan ocultos y reaparecen solos cuando les cargues una foto
> en `src/data/products.ts` (`images: [{ kind: 'photo', src: '/img/...' }]`).

## 1. Números de WhatsApp reales por marca  ← lo más importante
`src/data/brands.ts` → campo `whatsapp` de cada marca. Hoy las dos usan
`584243018032` como placeholder. Cargar:

- **GF Textil**: número real.
- **Artesika**: número real (si es distinto).

Se usa en **todo**: el botón "Consultar por WhatsApp" de cada ficha, el link
"WhatsApp" del encabezado, la preventa, el presupuesto, "a medida" y contacto.

## 2. Métodos y datos de pago  ✅ cargado
`src/data/config.ts` → `paymentMethods`. Ahora:
`Pago Movil · Transferencia bancaria (Banesco, Mercantil) · Efectivo (retiro en tienda)`.

- Son **cuentas personales** por ahora. Los **números de cuenta** NO están en el
  código; se le pasan al cliente al confirmar el pedido por WhatsApp. La página
  `#/pago` y la nota del carrito solo listan los métodos.
- Si más adelante se agregan Zelle / Binance u otra cuenta, se suma a esa lista.

## 3. Fechas de la campaña de Navidad (Artesika)
`src/data/config.ts` → `CONFIG.season.deadlineNote` y `src/data/presale.ts`
(`CAMPAIGN_MILESTONES` + `PRESALE_LOTS`).

- A la fecha de este trabajo (2026-09-10) las fechas están **vigentes**
  (28-nov / 20-dic; hitos 2026-11-21 … 2026-12-23) y `christmasEnabled: true`.
- Ya **no** hay lógica de cupos ni anticipo: la preventa es un texto + botón de
  WhatsApp. `weeklySlots` y `slotsTaken` quedaron en los datos pero no se muestran.

## 3b. Productos ocultos por falta de foto — subir foto para que aparezcan
Estos ya tienen ficha completa pero **no se ven** hasta que les pongas una foto
real en `src/data/products.ts`. Varios son importantes:

- **GF Textil**: Kimono odontológico, Filipina de chef, Delantal de cocina,
  Gorro de cocina, Mandil de mesonero, Camisa escolar, Mono deportivo escolar,
  Bata de laboratorio escolar, Chemise corporativa, Blusa administrativa,
  Overol industrial, Chaleco de seguridad, **Vestido de gala**, **Liqui liqui
  (dama y caballero)**, Gorro quirúrgico.
- **Artesika**: Pulsera Molar / Caduceo / Lámpara / Chef, Llavero de diente,
  Cocuiza clásica, Lámpara de madera, Organizador de consultorio.

Poné la foto en `public/img/gftextil/` o `public/img/fotos_artesika/` y cambiá el
`images` del producto de `{ kind: 'placeholder', ... }` a
`{ kind: 'photo', src: '/img/...' }`. Reaparece solo.

## 4. Fotos de clientas (GF Textil)
Las fichas nuevas llevan una sección **"Fotos de nuestras clientas"**. Como
ejemplo se usa una foto real de una prenda GF Textil puesta
(`/img/gftextil/conjunto-jogger-1.jpg`) y, en `camisa-trabajo-dotacion`, la foto
del lote listo para entregar. Reemplazar por la foto de la compradora **con ese
producto** en `src/data/products.ts` → campo `customerPhotos`.

Varias de tus fotos ya muestran la prenda puesta o el lote real y se usan como
imagen de galería (jogger vinotinto, traje institucional en pareja, pulsera en la
muñeca, lote de camisas).

## 5. Texto "Sobre el taller" de Artesika (storytelling tipo Etsy)  ✅ borrador puesto
Hay un texto **placeholder** en la home de Artesika (`src/store/HomePage.tsx`,
sección `story`, marcada con comentario). Es estilo Etsy adaptado a Venezuela,
para que lo cambies por el tuyo real (quién teje, dónde, desde cuándo).

## 6. Fichas de GF Textil generadas automáticamente — revisar textos y precios
En `src/data/products.ts`, bloque **"GF TEXTIL - fichas generadas a partir de
fotos reales"**. Se armó la estructura completa (título, línea, opciones, tabla
de talles, descripción) a partir de tus fotos. Falta que revises:

- **Precios**: se hizo un estudio rápido del mercado venezolano (MercadoLibre VE,
  Uniformes Caracas, World Medic's, ferias escolares 2024-2025) y se ajustaron a
  valores **competitivos para confección local a pedido** (por debajo de las
  marcas importadas): conjunto clínico ~$28-30, jogger clínico ~$40, filipina
  ~$22, bata ~$24-26, gorro ~$4-5, delantal con logo ~$14, camisa Columbia ~$22,
  camisa corporativa ~$20, blusa ~$18, deportivo escolar ~$16-18, camisa escolar
  ~$9, traje sastre dama ~$80-105, traje institucional ~$95, chaqueta de
  mezclilla ~$30, pantalón táctico ~$26. **Igual conviene que los confirmes.**
- **Telas y composición**: puestas como "(ejemplo)". Confirmar.
- **Tablas de talles**: las medidas en cm son referenciales
  (`SC_TOP_DAMA`, `SC_CAMISA`, `SC_PANTALON`, `SC_CONJUNTO_CLINICO` al inicio del
  archivo). Reemplazar por las medidas reales del taller.
- **Línea asignada**: la mayoría es clara.
  - `traje-institucional-mao` (fotos 11.37.26/27): movido a **`gala`** como
    pediste (traje de protocolo a medida).
  - `conjunto-clinico-bordado-institucional` y `camisa-corporativa-logo`:
    quedaron en su línea clínica / corporativa, pero son sobre todo pedidos por
    lote. Si prefieres tratarlos solo como "presupuesto", quítalos del catálogo.

## 7. (Resuelto) Conjunto de bebé a crochet
Se había creado como producto de Artesika a partir de `IMG-20230212-WA0040.jpg`.
**Lo retiraste**: la ficha y la foto (`conjunto-bebe-crochet.jpg`) ya no están en
el catálogo ni en el deploy. El archivo original queda en `_fotos-fuente/`.

## 8. Fotos disponibles sin ficha

La carpeta original que tenías en `public/img/fotos_gfTextil/` se movió a
**`_fotos-fuente/gftextil/`** (fuera de `public/`, para que el video y las fotos
personales NO se publiquen). Las fotos que sí se usan se copiaron con nombres
limpios a `public/img/gftextil/` y `public/img/fotos_artesika/`.

Quedaron sin usar en `_fotos-fuente/gftextil/`:

- **No son producto**: `IMG-20230218-WA0027.jpg` (foto de carnaval),
  `Screenshot_20220611-214053_Office.jpg` (certificado personal),
  `WhatsApp Image 2026-09-10 at 10.46.36.jpeg` (banner promocional GF Textil),
  `WhatsApp Video 2026-09-09 at 22.55.23.mp4`,
  `WhatsApp Unknown 2026-09-09 at 23.58.54`.
- **Fotos del taller** (útiles para "sobre nosotros" / confianza, no como
  producto): `12.29.49`, `12.29.49 (1)` (usada como placeholder), `12.29.52`,
  `12.30.08`.
- **Bisutería que quedó como Artesika**: `IMG-20230211-WA0008.jpg` (serie de
  pulseras de piedras) → ficha `pulseras-piedras-serie`.
- **Blazer caballero doble botonadura** (`10.46.43.jpeg`, copiado como
  `gftextil/blazer-medida-1.jpg`): sin ficha propia; si quieres venderlo, crea
  una entrada en `gala` similar a los trajes sastre.
- Varias fotos son duplicados o tomas de detalle ya incluidas en la galería de
  su producto.

## 9. Decisiones abiertas (tu confirmación)
- **"Regala por profesión"**: hoy quitado de GF Textil y recreado en Artesika
  filtrado solo a artesanía. OK según lo acordado.
- **B2B / corporativo**: se eliminó el catálogo `#/b2b` de kits navideños;
  `#/cotizar` es ahora "presupuesto de confección" de GF Textil. Artesika no
  tiene flujo corporativo. Si Artesika necesita "regalos corporativos", hay que
  diseñarlo aparte.
- **GF Textil "pedidos corporativos de fin de año" (textil)**: no se creó, tal
  como pediste. Avísame si lo quieres.
- **Correos**: `#/contacto` ya muestra `contacto@gftextil.com` y
  `contacto@artesika.com`. Falta **activar Cloudflare Email Routing** en cada
  dominio (Email → Email Routing → Enable → destino `rosicarri66@gmail.com` →
  Catch-all), si no, esos correos rebotan. Ver el chat para los pasos.
- **Horario** en `#/contacto`: "Lunes a viernes, 9:00 a 17:00". Ajustar si es otro.
