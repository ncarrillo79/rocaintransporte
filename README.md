# Tienda Puente - dos tiendas (GF Textil / Artesika) en una plataforma

React + TypeScript (Vite). Un solo repo y un solo Worker de Cloudflare sirven
**dos tiendas independientes** decididas por dominio: **GF Textil** (confeccion
profesional) y **Artesika** (artesania y regalos). Cada marca tiene su catalogo,
navegacion, home y cross-sell propios y **no cruza a la otra**; el unico enlace
entre marcas es un texto discreto en el footer.

Incluye:

- **Home por marca**: categorias con foto real + mundos de la marca. GF Textil con
  bloque "lo fabricamos a medida"; Artesika con "regala por profesion" y Navidad.
- **Mega-menu por marca** (`src/store/MegaMenu.tsx`): sin puentes a la otra marca
- **Paginas de coleccion** con filtros por mundo, especialidad, precio y disponibilidad
- **Ficha de producto**: galeria, caja de compra, **tabla de talles**, descripcion
  ampliada, **"Fotos de nuestras clientas"**, y cross-sell / kits **de la misma marca**
- **Selector de especialidad** que reordena los complementos y cambia el kit sin recargar
- **Presupuesto** (`#/cotizar`, GF Textil) y **preventa navidena** (`#/preventa`, Artesika)
- **Paginas** `#/pago` (formas de pago) y `#/contacto`
- **Sin carrito**: cada producto y cada accion de compra abre WhatsApp con un
  texto ya armado (`src/lib/whatsapp.ts`). No hay checkout.
- **Solo se muestran productos con foto real** (`VISIBLE_POOL` en `catalog.ts`);
  los que tienen dibujo de linea quedan ocultos hasta que se les cargue una foto.

Todo el catalogo y las colecciones se administran en archivos de datos: no hay
que tocar componentes.

## Rutas (router de hash, sin dependencias)

| URL | Pagina | Marca |
|---|---|---|
| `#/` | Home | ambas |
| `#/c/<id>` | Coleccion (ids en `src/data/collections.ts`) | ambas |
| `#/p/<slug>` | Ficha de producto (slugs en `src/data/products.ts`) | ambas |
| `#/preventa` | Preventa navidena: lotes con cupo y anticipo | solo Artesika |
| `#/cotizar` / `#/cotizar/<tipoPrenda>` | Solicitar presupuesto (confeccion por volumen) | solo GF Textil |
| `#/otros` | Fabricacion a medida: consulta por WhatsApp | GF Textil |
| `#/pago` | Formas de pago (informativa) | ambas |
| `#/contacto` | WhatsApp, correo, horario | ambas |

Ejemplos: `#/c/salud`, `#/c/gastronomia`, `#/c/gala`, `#/c/regalar-odontologia`
(Artesika), `#/preventa` (Artesika), `#/cotizar/linea-medica` (GF Textil).

La ruta `#/b2b` (catalogo de kits corporativos de Navidad) **se elimino**: el
cross-sell entre marcas se retiro por completo.

La tienda tiene cuatro mundos (**trabajo · oficio · gala · navidad**). El mundo
de cada producto se deriva de su linea (`src/data/lines.ts`), no se escribe en
cada producto.

### Dos tiendas, una plataforma (importante)

`src/lib/catalog.ts` **acota el catalogo a los `worlds` de la marca activa**
(`src/data/brands.ts`), asi que:

- **GF Textil** (`gftextil.com`): solo mundos `trabajo` y `gala`. No ve
  artesania, Navidad, preventa, "regalar por profesion" ni el cross-sell
  navideno en ningun punto.
- **Artesika** (`artesika.com`): solo mundos `oficio` y `navidad`. No ve
  uniformes, gala, presupuesto ni "a medida" textil.

La navegacion (`src/store/MegaMenu.tsx`) tiene un menu por marca. El unico enlace
entre marcas es un texto discreto en el footer (`src/store/StoreChrome.tsx`).
La diferencia visual Shein/Etsy se hace con CSS `html[data-brand='artesika']` en
`HomePage/ProductCard/*.module.css`.

### Campana navidena

La campana navidena es **exclusiva de Artesika** (mundo `navidad`).

| Archivo | Que controla |
|---|---|
| `src/data/presale.ts` | Lotes de preventa (fecha, cupo) y fechas limite de la campana |
| `src/data/corporate.ts` | Tipos de prenda y ciudades para el presupuesto de GF Textil |
| `CONFIG.season` en `config.ts` | Anticipo (%), cupos por semana, texto de fecha limite; `christmasEnabled: false` apaga el bloque de Navidad |
| `whatsapp` en `src/data/brands.ts` | Numero de WhatsApp por marca (presupuesto, a medida, contacto) |
| `CONFIG.paymentMethods` en `config.ts` | Metodos de pago que lista `#/pago` y el carrito |

El formulario de cotizacion no envia nada: genera un resumen de texto y ofrece
copiarlo, abrirlo en WhatsApp (`wa.me`) o en el cliente de correo (`mailto:`).

---

## Requisitos

- Node.js 18 o superior
- npm (o pnpm / yarn)

## Puesta en marcha

```bash
npm install
npm run dev        # http://localhost:5173
```

## Scripts

| Comando | Que hace |
|---|---|
| `npm run dev` | Servidor de desarrollo con recarga en caliente |
| `npm run build` | Chequeo de tipos + build de produccion en `dist/` |
| `npm run preview` | Sirve `dist/` localmente para revisar el build |
| `npm run typecheck` | Solo verifica los tipos |

---

## Dos marcas, una plataforma

- **GF Textil** (confeccion profesional: trabajo + gala) -> `gftextil.com`
- **Artesika** (artesania y regalos: oficio + navidad) -> `artesika.com`

Mismo repo, mismo Worker. **La experiencia esta separada**: cada marca tiene su
catalogo, navegacion, home y cross-sell propios y no cruza a la otra (ver "Dos
tiendas, una plataforma" arriba). La marca se decide por el dominio en
`src/lib/brand.ts`; textos, color, `worlds` y `whatsapp` por marca en
`src/data/brands.ts`. En local, prueba la otra con `?brand=artesika`.

## Desplegar

Ya esta en produccion: **Cloudflare Worker** `tienda-puente` (solo assets
estaticos, gratis, uso comercial permitido). El repo esta conectado a Git, asi
que **cada push a `main` buildea y publica solo** en 1-2 min. Config del deploy
en `wrangler.jsonc` (evita la autodeteccion de framework de `wrangler deploy`).
Pasos historicos y de dominios en [`DEPLOY.md`](./DEPLOY.md).

Dominios activos, los 4 con HTTPS, apuntando al mismo Worker:
`gftextil.com`, `www.gftextil.com`, `artesika.com`, `www.artesika.com`.
Nameservers de ambos dominios movidos de Namecheap a Cloudflare.

URL directa del Worker (util para probar sin dominio):
`https://tienda-puente.ncarrillo79.workers.dev` (agrega `?brand=artesika` para
ver la otra marca).

No hay backend ni checkout: los pedidos entran por WhatsApp. Si en el futuro se
quiere una tienda real, ver "Conectar a una tienda real" mas abajo.

### Pendiente para el lanzamiento

- [ ] **Redireccion `www` -> raiz**: hoy `gftextil.com` y `www.gftextil.com`
  responden por separado. Unificar (mejor SEO) con Cloudflare -> dominio ->
  *Rules -> Redirect Rules* -> "redirect www to root". Idem `artesika.com`.
- [ ] **Pedidos por WhatsApp**: cargar el numero real por marca en
  `src/data/brands.ts` (`whatsapp`). Hoy las dos usan el mismo placeholder.
- [ ] **Correo `contacto@gftextil.com` / `contacto@artesika.com`**: activar
  *Email Routing* de Cloudflare en cada dominio (reenvio gratis a un Gmail).
- [ ] **Campana navidena (Artesika)**: revisar fechas en `CONFIG.season` y
  `presale.ts`. Vigentes al 2026-09-10; `christmasEnabled: true`.
- [ ] **Fotos**: subir fotos de los productos ocultos para que aparezcan
  (ver `CONTENIDO-PENDIENTE.md`).
- [ ] **Limpiar runs viejos de GitHub Actions**: quedaron 2 en rojo del deploy
  por FTP a Namecheap (ya eliminado). Solo es cosmetico:
  `gh run delete <id>` para cada uno.
- [ ] **Numero de WhatsApp real por marca** en `src/data/brands.ts` (`whatsapp`).
  Hoy las dos usan el mismo placeholder.
- [ ] **Contenido de las dos tiendas**: ver [`CONTENIDO-PENDIENTE.md`](./CONTENIDO-PENDIENTE.md)
  (precios y telas de ejemplo en las fichas nuevas de GF Textil, tablas de talles
  reales, fotos de clientas, metodos de pago, texto "sobre el taller" de Artesika).

### Separacion GF Textil / Artesika (hecho)

- [x] Catalogo, home, menu y cross-sell acotados por marca en `src/lib/catalog.ts`.
- [x] `#/b2b` (kits corporativos de Navidad) eliminado; `#/cotizar` reconvertido a
  presupuesto de confeccion de GF Textil.
- [x] "Regala por profesion" y la preventa navidena solo en Artesika.
- [x] Ficha de producto con tabla de talles, descripcion ampliada y "Fotos de
  nuestras clientas"; paginas `#/pago` y `#/contacto`.
- [x] Fichas de GF Textil generadas desde fotos reales (`public/img/gftextil/`).

---

## Estructura

```
src/
  types.ts                 Modelo de datos (leer esto primero)
  data/
    products.ts            CATALOGO: productos y kits  <- administracion diaria
    brands.ts              GF Textil / Artesika: nombre, color, portada
    lines.ts               Lineas de producto -> mundo
    collections.ts         Colecciones (cada una es un filtro del catalogo)
    specialties.ts         Lista de profesiones
    presale.ts             Lotes de preventa + fechas limite de campana
    corporate.ts           Kits corporativos + ciudades
    config.ts              Envio gratis, tasa Bs, Navidad, couriers, WhatsApp
    README.md              Guia detallada de administracion
  lib/
    catalog.ts             Consultas + AISLAMIENTO POR MARCA (BRAND_POOL).
                           getProduct, getCrossSell, priceKit, filterProducts, ...
    format.ts              Formato de precios (USD / Bs)
    brand.ts               Marca activa segun el dominio (BRAND, applyBrand)
    router.tsx             Router minimo de hash + <Link>
  store/
    HomePage.tsx           Home por marca: categorias con foto + mundos + bandas
    MegaMenu.tsx           Navegacion: un menu por marca (GFTEXTIL_MENU / ARTESIKA_MENU)
    CollectionPage.tsx     Grilla + facetas (mundo / especialidad / precio / stock)
    ProductCard.tsx        Tarjeta de producto (variante visual por data-brand)
    ProductPage.tsx        Ficha: galeria, tabla de talles, "Consultar por WhatsApp"
    CrossSell.tsx          Complementos + kit (intra-marca), sin carrito
    PresalePage.tsx        Preventa Artesika: fechas + lotes, "Reservar por WhatsApp"
    InfoPages.tsx          #/pago (formas de pago) y #/contacto
    QuoteForm.tsx          Presupuesto GF Textil: pagina guia + boton de WhatsApp
    CustomOrderPage.tsx    "A medida": consulta por WhatsApp (#/otros)
    StoreChrome.tsx        Encabezado (con link a WhatsApp) + footer
    ui.tsx                 Primitivas (Pill, ImagePanel, Glyph)
    *.module.css           Estilos por componente
  styles/
    tokens.css             Color y tipografia (temas claro / oscuro / sistema)
    global.css             Reset y base
```

### Por que esta separacion

Los componentes **solo** hablan con `src/lib/catalog.ts`, nunca con los datos
crudos. Eso permite cambiar el origen de datos sin tocar la interfaz.

---

## Conectar a una tienda real (Shopify / headless / CMS)

La estrategia recomienda **Shopify** por gestion remota. Ruta de integracion:

1. **Datos**: reemplaza el contenido de `src/data/products.ts` por llamadas a la
   API (Shopify Storefront API, o un CMS como Sanity / Strapi). Mapea:

   | Campo del modelo | En Shopify |
   |---|---|
   | `specialties`, `occasions`, `roles` | metafields de tipo lista |
   | `kit` | app de bundles (p. ej. Shopify Bundles) o metafield del producto ancla |
   | `availability` | politica de inventario + metafield `made_to_order` / `presale` |
   | `personalizations` | line item properties |

2. **`src/lib/catalog.ts`**: cambia las funciones para que consulten esa API.
   La **firma** (`getProduct`, `getCrossSell`, `priceKit`, ...) no cambia, asi
   que los componentes siguen igual.

3. **Carrito**: sustituye el reducer de `Cart.tsx` por el carrito de Shopify
   (mutations `cartCreate` / `cartLinesAdd`). `FreeShippingBar` y `CartDrawer`
   se mantienen; solo cambian de donde leen las lineas.

4. **Checkout**: el boton "Ir a pagar" redirige al `checkoutUrl` de Shopify.

Los tres puentes, el selector de especialidad y la barra de envio no se tocan.

---

## Temas

`tokens.css` define la paleta para los tres estados del tema del navegador:
sin marca (segun el sistema operativo), `data-theme="light"` y `data-theme="dark"`.
Para forzar uno, agrega el atributo al `<html>`.

## Accesibilidad

- Botones reales, `aria-pressed` en los selectores, `role="dialog"` + Escape en el carrito.
- Foco visible y `prefers-reduced-motion` respetado en `global.css`.
