# Publicar Rocain en Cloudflare

## Datos del proyecto

- Worker: `rocaintransporte`
- Dominio principal: `rocaintransporte.com`
- Dominio alternativo: `www.rocaintransporte.com`
- Build command: `npm run build`
- Directorio de salida: `dist`

## Cambiar el nombre del Worker

1. En Cloudflare abre **Workers & Pages**.
2. Selecciona el Worker actual `tienda-puente` (o `rocaintransporteyejecutivos`
   si ya aplicaste el nombre anterior).
3. En **Settings > General > Rename**, cambia el nombre a
   `rocaintransporte`.
4. Guarda los cambios.

El archivo `wrangler.jsonc` ya está actualizado con ese nombre. Si publicas desde
la terminal, el siguiente comando creará o actualizará el Worker con el nombre
nuevo:

```bash
npm run build
npx wrangler deploy
```

## Conectar el dominio

En **Workers & Pages > rocaintransporte > Settings > Domains &
Routes**:

1. Selecciona **Add Custom Domain**.
2. Añade `rocaintransporte.com`.
3. Repite el proceso con `www.rocaintransporte.com`.
4. Si Cloudflare muestra una opción de redirección, configura `www` para
   redirigir al dominio principal.

Si el dominio está registrado fuera de Cloudflare, Cloudflare mostrará los
nameservers que debes copiar en el registrador. Si ya está en Cloudflare, los
registros DNS se crean automáticamente.

## Verificación

Comprueba que ambos dominios carguen la landing y que:

- tengan certificado HTTPS activo;
- el botón de WhatsApp abra el número `+58 414 943 5766`;
- `www.rocaintransporte.com` redirija al dominio principal;
- el despliegue más reciente esté asociado al Worker nuevo.
