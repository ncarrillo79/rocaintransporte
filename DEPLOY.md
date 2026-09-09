# Publicar la tienda en Namecheap

## Lo primero: este proyecto se compila

No subas `src/` al hosting. El flujo es:

```
npm run build   ->   genera dist/   ->   se publica el contenido de dist/
```

`dist/` es HTML/CSS/JS estatico. Funciona en cualquier hosting sin Node en el
servidor. El router usa rutas con `#/` (hash), asi que **no hace falta
configurar el servidor ni .htaccess**.

## Necesitas un plan de HOSTING de Namecheap (cPanel)

Namecheap vende dos cosas distintas:

- **Dominio + DNS**: solo apunta un nombre a algun servidor. No aloja archivos.
- **Hosting** (Stellar / Stellar Plus / Stellar Business): cPanel, aloja los
  archivos. **Esto es lo que hace falta.**

Comprueba en tu cuenta Namecheap -> *Dashboard* si tienes un producto de
**Hosting**. Si solo tienes el dominio, o compras un plan de hosting, o vuelves
a Vercel (gratis para esto).

---

## Opcion A (recomendada): GitHub Actions + FTP

Ya incluida en `.github/workflows/deploy.yml`. Cada push a `main` compila y sube
`dist/` al hosting. Mantiene el "push = actualiza al instante".

### 1. Crear una cuenta FTP en cPanel

Namecheap -> *cPanel* -> **FTP Accounts**. Crea una cuenta cuyo *Directory* sea
`public_html` (o la carpeta del dominio). Anota:

- **servidor / host**: aparece en cPanel -> *FTP Accounts* -> "Configure FTP
  Client" (algo como `ftp.tudominio.com` o `serverNNN.web-hosting.com`)
- **usuario** (suele ser `algo@tudominio.com`)
- **contrasena**

### 2. Guardar los datos como secrets en GitHub

Repo -> *Settings* -> *Secrets and variables* -> *Actions* -> *New repository secret*:

| Secret | Valor |
|---|---|
| `FTP_HOST` | el servidor FTP |
| `FTP_USERNAME` | el usuario |
| `FTP_PASSWORD` | la contrasena |

### 3. Ajustar `server-dir` en `deploy.yml`

- Si la cuenta FTP ya apunta a `public_html`: `server-dir: ./`
- Cuenta principal de cPanel: `server-dir: ./public_html/`
- Subdominio o subcarpeta: `server-dir: ./public_html/tienda/`
  (funciona porque `vite.config.ts` usa `base: './'`)

### 4. `git push` a `main`

La pestana **Actions** del repo muestra el progreso. Si el paso de FTP falla con
un error de certificado TLS, cambia en `deploy.yml` `protocol: ftps` por
`protocol: ftp`.

> Aviso: la accion **sincroniza** `server-dir` (borra del servidor lo que no
> este en `dist/`). Si en esa carpeta hay otra web, usa un subdominio o
> subcarpeta propia para la tienda.

---

## Opcion B: manual (sin automatizacion)

1. `npm run build`
2. cPanel -> *File Manager* -> entra a `public_html`
3. Sube **el contenido** de `dist/` (no la carpeta, su contenido)
4. Cada vez que cambies algo, repite

Sencillo pero sin "push = live".

---

## Opcion C: cPanel Git Version Control

Si prefieres empujar a un repo dentro de cPanel:

1. Quita `dist` de `.gitignore` y quita la linea `vite.config.js` / `.d.ts`.
2. `npm run build` **antes de cada push** y commitea `dist/`.
3. `.cpanel.yml` en la raiz (reemplaza `USUARIO` por tu usuario de cPanel):

   ```yaml
   ---
   deployment:
     tasks:
       - export DEPLOYPATH=/home/USUARIO/public_html/
       - /bin/cp -R dist/. $DEPLOYPATH
   ```

Menos comodo porque el build lo haces tu a mano.

---

## Dominio

Si el sitio va en el dominio principal del plan de hosting, no hay que tocar
nada. Si va en un subdominio (`tienda.tudominio.com`):

cPanel -> *Domains* / *Subdomains* -> crea `tienda` apuntando a
`public_html/tienda`, y en `deploy.yml` pon `server-dir: ./public_html/tienda/`.

---

## Si mas adelante quieres URLs sin `#`

Cambiar el router a modo `history` y poner este `.htaccess` en la raiz del sitio:

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

Con el router actual (`#/`) no hace falta.
