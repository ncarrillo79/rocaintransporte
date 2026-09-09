# Publicar: Cloudflare Pages + dominios en Namecheap

Una sola plataforma, dos marcas:

- **GF Textil** -> `gftextil.com`
- **Artesika** -> `artesika.com`

Ambos dominios apuntan al **mismo** proyecto de Cloudflare Pages (mismo codigo,
mismo carrito, mismo despacho). La marca se decide por el dominio
(`src/lib/brand.ts`).

---

## 1. Registrar los dominios (Namecheap)

namecheap.com -> buscar `gftextil.com` y `artesika.com`. Si `.com` no esta
disponible, `.com.ve`. Registrar ambos (~USD 10/ano c/u).

## 2. Crear el proyecto en Cloudflare Pages

1. Cuenta gratis en **dash.cloudflare.com**
2. **Workers & Pages** -> **Create** -> pestana **Pages** -> **Connect to Git**
3. Autoriza GitHub y elige `ncarrillo79/tienda-puente`
4. Configuracion de build:
   - Framework preset: **Vite**
   - Build command: `npm run build`
   - Build output directory: `dist`
5. **Save and Deploy**

Primer deploy -> te da una URL `tienda-puente.pages.dev`. Desde aca, **cada push
a `main` publica solo** (Cloudflare compila el proyecto, no hace falta ninguna
GitHub Action).

### Probar las dos marcas antes de tener dominios

- `tienda-puente.pages.dev` -> GF Textil (marca por defecto)
- `tienda-puente.pages.dev/?brand=artesika` -> Artesika (se recuerda en la sesion)

## 3. Conectar los dominios

La forma mas simple es que Cloudflare lleve el DNS de los dos dominios:

1. En Cloudflare: **Add a site** -> `gftextil.com` -> plan **Free**
2. Cloudflare te da **2 nameservers** (algo como `xxx.ns.cloudflare.com`)
3. En Namecheap: Domain List -> `gftextil.com` -> **Manage** -> *Nameservers* ->
   **Custom DNS** -> pega los 2 nameservers de Cloudflare -> guardar
4. Repite 1-3 con `artesika.com`
5. En el proyecto de Pages -> **Custom domains** -> **Set up a custom domain** ->
   agrega `gftextil.com`, `www.gftextil.com`, `artesika.com`, `www.artesika.com`.
   Cloudflare crea los registros solo.

La propagacion de nameservers puede tardar de minutos a 24 h.

> Alternativa sin cambiar nameservers: en Namecheap -> *Advanced DNS* agrega un
> `CNAME` de `www` -> `tienda-puente.pages.dev`, y para el dominio raiz usa el
> registro **ALIAS**/**CNAME** de Namecheap hacia el mismo destino. Cambiar los
> nameservers a Cloudflare es mas limpio y da HTTPS y CDN automaticos.

---

## Notas

- **HTTPS**: automatico en Cloudflare, sin configurar nada.
- **Rutas SPA**: `wrangler.jsonc` trae `not_found_handling: "single-page-application"`
  (manda cualquier ruta desconocida a `index.html`). El router usa `#/`, asi que
  funciona igual sin eso. No usar `public/_redirects`: el flujo Worker lo rechaza
  por "bucle infinito" en la regla `/* -> /index.html 200`.
- **Correo `@gftextil.com`**: Cloudflare no da buzones. Si los quieres, usa
  *Email Routing* de Cloudflare (reenvio gratis) o un servicio como Zoho Mail.
- **Cambiar de marca los textos/colores**: `src/data/brands.ts`.
- **Un solo despliegue**: no dupliques el repo. Los dos dominios -> un proyecto.
