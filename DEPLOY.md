# Publicar la tienda

Esta tienda es un **proyecto aparte** (repo aparte, proyecto de Vercel aparte,
dominio aparte). No se mezcla con `redeven.org` ni con el sitio de campana.

Ya usas Vercel con integracion Git ("push = actualiza al instante"). Vercel
compila proyectos Vite **sin configuracion**, asi que el mismo flujo aplica aca.

---

## Pasos (una sola vez)

### 1. Repo propio en GitHub

```bash
cd tienda-puente
git init
git add .
git commit -m "Tienda: version inicial"
git branch -M main
git remote add origin https://github.com/ncarrillo79/tienda-puente.git
git push -u origin main
```

(crea antes el repo vacio `tienda-puente` en github.com/new)

### 2. Importar en Vercel

1. vercel.com -> **Add New** -> **Project**
2. Elige el repo `tienda-puente`
3. Vercel detecta **Vite** solo. No cambies nada:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. **Deploy**

Desde aca, **cada push a `main` publica automaticamente**. Los pull requests
generan una preview con su propia URL.

### 3. Dominio

En el proyecto de Vercel -> **Settings -> Domains** -> agrega el dominio o
subdominio de la tienda (p.ej. `tienda.tudominio.com`).

Vercel te muestra un registro **CNAME**. Lo agregas en Namecheap:
Domain List -> Manage -> **Advanced DNS** -> Add New Record -> `CNAME`
(host = `tienda`, value = el que indique Vercel).

---

## Cosas utiles

- **Variables de entorno**: si mas adelante usas `.env` (tasa Bs, claves de un
  backend, etc.), se cargan en Vercel -> Settings -> Environment Variables.
- **Backend / formularios reales**: Vercel ejecuta funciones serverless si creas
  una carpeta `api/` (igual que en tu otro repo). Hoy el formulario de
  cotizacion solo genera texto para WhatsApp / correo, no necesita backend.
- **`vercel.json`**: incluido. Solo agrega un rewrite a `index.html` como red de
  seguridad; el router actual usa `#/` y funciona sin el.

---

## Alternativa: hosting de Namecheap (no recomendada)

Si en vez de Vercel quisieras servir desde el hosting cPanel de Namecheap,
tendrias que compilar (`npm run build`) y subir solo el contenido de `dist/` a
`public_html/`, por FTP o con una GitHub Action. Es mas trabajo y pierdes las
previews. Con Vercel ya tienes el flujo que quieres.
