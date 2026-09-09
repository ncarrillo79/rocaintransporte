# Tienda Puente - ficha de producto con venta cruzada

Implementacion en React + TypeScript (Vite) de la ficha de producto de la
estrategia **"Del kimono a la pulsera"**: resuelve primero la compra de trabajo
y despues abre tres puentes ordenados hacia la artesania y la Navidad.

Incluye:

- **Home** con los tres mundos (Trabajo / Oficio / Navidad) y "Regala por profesion"
- **Mega-menu** por mundo, con el puente ("Es para regalar?") dentro del menu de trabajo
- **Paginas de coleccion** con filtros por mundo, especialidad, precio y disponibilidad
- **Ficha de producto** (galeria + caja de compra + bloque de confianza logistica)
- **Selector de especialidad** que reordena los complementos y cambia el kit sin recargar
- **Puente 1** - tira "Combina con tu especialidad" (se llena por etiqueta)
- **Puente 2** - Kit / combo a precio de paquete, con precio calculado solo
- **Puente 3** - Navidad: envoltorio artesanal + reserva con anticipo y cupos
- **Carrito** (Context + `localStorage`) con **barra de envio nacional gratis**

Todo el catalogo y las colecciones se administran en archivos de datos: no hay
que tocar componentes.

## Rutas (router de hash, sin dependencias)

| URL | Pagina |
|---|---|
| `#/` | Home |
| `#/c/<id>` | Coleccion (ids en `src/data/collections.ts`) |
| `#/p/<slug>` | Ficha de producto (slugs en `src/data/products.ts`) |
| `#/preventa` | Preventa navidena: lotes con cupo y anticipo |
| `#/b2b` | Catalogo de regalos corporativos |
| `#/b2b/cotizar` / `#/b2b/cotizar/<kitId>` | Formulario de cotizacion |
| `#/otros` | Fabricacion a medida: consulta por WhatsApp |

Ejemplos: `#/c/salud`, `#/c/gastronomia`, `#/c/gala`, `#/preventa`, `#/b2b/cotizar/kit-consultorio`.

La tienda tiene cuatro mundos (**trabajo · oficio · gala · navidad**). El mundo
de cada producto se deriva de su linea (`src/data/lines.ts`), no se escribe en
cada producto.

### Campana navidena

| Archivo | Que controla |
|---|---|
| `src/data/presale.ts` | Lotes de preventa (fecha, cupo) y fechas limite de la campana |
| `src/data/corporate.ts` | Kits corporativos y lista de ciudades |
| `CONFIG.season` en `config.ts` | Anticipo (%), cupos por semana, texto de fecha limite; `christmasEnabled: false` apaga el bloque de Navidad de la home |
| `CONFIG.whatsapp` | Numero destino del boton "Enviar por WhatsApp" de la cotizacion |

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

## Desplegar

Destino: **hosting de Namecheap (cPanel)**. Pasos detallados en
[`DEPLOY.md`](./DEPLOY.md).

En corto: `npm run build` genera `dist/` estatico; la GitHub Action en
`.github/workflows/deploy.yml` lo compila y lo sube por FTP a `public_html/` en
cada push a `main`. (El archivo `vercel.json` queda sin efecto en Namecheap; se
mantiene por si algun dia se usa Vercel.)

No hay backend: el boton "Ir a pagar" es un marcador. Ver la seccion siguiente
para conectarlo a una tienda real.

---

## Estructura

```
src/
  types.ts                 Modelo de datos (leer esto primero)
  data/
    products.ts            CATALOGO: productos y kits  <- administracion diaria
    lines.ts               Lineas de producto -> mundo
    collections.ts         Colecciones (cada una es un filtro del catalogo)
    specialties.ts         Lista de profesiones
    presale.ts             Lotes de preventa + fechas limite de campana
    corporate.ts           Kits corporativos + ciudades
    config.ts              Envio gratis, tasa Bs, Navidad, couriers, WhatsApp
    README.md              Guia detallada de administracion
  lib/
    catalog.ts             Consultas: getProduct, getCrossSell, priceKit,
                           filterProducts, getCollection, productWorld, ...
    format.ts              Formato de precios (USD / Bs)
    router.tsx             Router minimo de hash + <Link>
  store/
    HomePage.tsx           Home: 3 mundos + regala por profesion + destacados
    MegaMenu.tsx           Navegacion principal + mega-menu (menu como datos)
    CollectionPage.tsx     Grilla + facetas (mundo / especialidad / precio / stock)
    ProductCard.tsx        Tarjeta de producto para grillas
    ProductPage.tsx        Ficha: galeria, caja de compra, confianza logistica
    CrossSell.tsx          Los 3 puentes + selector de especialidad
    PresalePage.tsx        Preventa: fechas limite + lotes con cupo y anticipo
    B2BCatalog.tsx         Kits corporativos para equipos
    QuoteForm.tsx          Cotizacion -> resumen para WhatsApp / correo
    CustomOrderPage.tsx    "A medida": consulta por WhatsApp (#/otros)
    Cart.tsx               Estado del carrito + cajon + barra de envio gratis
    StoreChrome.tsx        Encabezado de la tienda
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
