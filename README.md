# Rocain Transporte y Ejecutivos

Landing responsive de transporte ejecutivo construida con React, TypeScript y
Vite. Presenta servicios, flota, información institucional y un formulario de
cotización que envía los datos a WhatsApp.

- Worker de Cloudflare: `rocaintransporte`
- Dominio previsto: `rocaintransporte.com`
- WhatsApp: `+58 412 740 0296`
- Teléfono: `+58 424 301 8032`
- Correo: `rocaintransporte1@gmail.com`

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173).

## Scripts

| Comando | Uso |
|---|---|
| `npm run dev` | Servidor local con recarga |
| `npm run build` | Verificación de tipos y build de producción |
| `npm run preview` | Vista previa del build |
| `npm run typecheck` | Verificación de tipos |

## Despliegue

El detalle de configuración de Cloudflare está en [DEPLOY.md](./DEPLOY.md).

```bash
npm run build
npx wrangler deploy
```

## Estructura

```text
src/
  App.tsx                  Landing y formulario de contacto
  TransportPage.module.css Diseño responsive
  main.tsx                 Punto de entrada de React
  styles/global.css        Estilos base
```
