# Fotos de producto

Copiá acá los archivos de imagen. Vite los publica en la raiz del sitio, asi
que una foto `public/img/vela-navidena.jpg` queda accesible como
`/img/vela-navidena.jpg` (ese es el `src` que va en `src/data/products.ts`).

## Reglas de nombre

- Todo en minusculas, sin espacios, sin tildes ni enies. Guiones para separar.
- Ideal: el mismo id del producto. Ej: producto `id: 'llavero-resina'` ->
  `llavero-resina.jpg` (y `llavero-resina-2.jpg` para la segunda foto).

## Formato y peso

- JPG o WebP.
- Ancho ~1200-1600 px. No hace falta mas para la ficha.
- Comprimidas: apuntar a < 300-400 KB por foto. Muchas fotos pesadas = sitio
  lento (y el limite total del deploy es 25 MB).

## Como se conectan

En `src/data/products.ts`, el campo `images` de cada producto pasa de:

    images: [{ kind: 'placeholder', glyph: 'llavero', caption: 'FOTO - ...' }]

a:

    images: [{ kind: 'photo', src: '/img/llavero-resina.jpg', alt: 'Llavero de resina con caduceo' }]

Eso lo hago yo cuando me pases la lista de archivo -> producto.
