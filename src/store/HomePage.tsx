import { BRAND } from '../lib/brand';
import { CONFIG, getCollectionProducts } from '../lib/catalog';
import { Link } from '../lib/router';
import type { BrandId, ProductImage, World } from '../types';
import { ProductCard } from './ProductCard';
import { ImagePanel } from './ui';
import styles from './HomePage.module.css';

interface Door {
  world: World;
  title: string;
  text: string;
  to: string;
}

const DOORS: Door[] = [
  {
    world: 'trabajo',
    title: 'Trabajo',
    text: 'Uniformes de salud, gastronomia, escolar, corporativo e industrial. Por talla y color.',
    to: '/c/uniformes',
  },
  {
    world: 'gala',
    title: 'Gala',
    text: 'Vestidos de fiesta y graduacion, liqui liqui de dama y caballero. Confeccion a medida.',
    to: '/c/gala',
  },
  {
    world: 'oficio',
    title: 'Oficio',
    text: 'Artesania, pulseras por profesion y lamparas de madera. Hecho a mano en Venezuela.',
    to: '/c/artesania',
  },
  {
    world: 'navidad',
    title: 'Navidad',
    text: 'Decoracion y regalos hechos a mano. Preventa con anticipo y cupos por semana.',
    to: '/c/navidad',
  },
];

// Categorias con foto real en la primera pantalla, por marca.
const CATEGORIES: Record<BrandId, { label: string; collectionId: string }[]> = {
  gftextil: [
    { label: 'Salud y quirurgico', collectionId: 'salud' },
    { label: 'Gastronomia', collectionId: 'gastronomia' },
    { label: 'Escolar', collectionId: 'escolar' },
    { label: 'Corporativo y Columbia', collectionId: 'uniformes-corporativo' },
    { label: 'Seguridad industrial', collectionId: 'industrial' },
    { label: 'Gala y tradicion', collectionId: 'gala' },
  ],
  artesika: [
    { label: 'Bisuteria y pulseras', collectionId: 'bisuteria' },
    { label: 'Decoracion', collectionId: 'decoracion' },
    { label: 'Regalos', collectionId: 'regalar-detalles' },
    { label: 'Navidad', collectionId: 'navidad' },
  ],
};


/** Imagen representativa de una categoria: la primera foto real que encuentre. */
function categoryImage(collectionId: string): ProductImage {
  const products = getCollectionProducts(collectionId);
  for (const p of products) {
    const photo = p.images.find((i) => i.kind === 'photo');
    if (photo) return photo;
  }
  if (products[0]) return products[0].images[0];
  return { kind: 'placeholder', glyph: 'caja', caption: 'FOTO por subir' };
}

export function HomePage() {
  const isArtesika = BRAND.id === 'artesika';
  const hasChristmas = BRAND.worlds.includes('navidad');
  const doors = DOORS.filter((d) => BRAND.worlds.includes(d.world));
  const categories = CATEGORIES[BRAND.id];
  // Destacados: primero los que tienen foto real, sin cambiar el orden relativo.
  const hasPhoto = (p: { images: { kind: string }[] }) => p.images.some((i) => i.kind === 'photo');
  const featured = [...getCollectionProducts(BRAND.homeCollectionId)]
    .sort((a, b) => Number(hasPhoto(b)) - Number(hasPhoto(a)))
    .slice(0, isArtesika ? 6 : 8);

  return (
    <div className={styles.home}>
      <section className={styles.intro}>
        <p className={styles.kicker}>Producido y despachado en Venezuela</p>
        <h1 className={styles.h1}>{BRAND.heroTitle}</h1>
        <p className={styles.lead}>{BRAND.tagline}</p>
      </section>

      <section className={styles.catGrid} aria-label="Categorias">
        {categories.map((c) => (
          <Link key={c.collectionId} to={`/c/${c.collectionId}`} className={styles.catCard}>
            <span className={styles.catMedia}>
              <ImagePanel image={categoryImage(c.collectionId)} ratio={isArtesika ? '4 / 5' : '4 / 3'} compact />
            </span>
            <span className={styles.catLabel}>{c.label}</span>
          </Link>
        ))}
      </section>

      {doors.length > 1 && (
        <section className={styles.doors}>
          {doors.map((d) => (
            <Link key={d.world} to={d.to} className={styles.door} data-world={d.world}>
              <span className={styles.doorTitle}>{d.title}</span>
              <span className={styles.doorText}>{d.text}</span>
              <span className={styles.doorGo}>Ver &rarr;</span>
            </Link>
          ))}
        </section>
      )}

      <section className={styles.trust}>
        <span>
          Envio nacional: <strong>{CONFIG.couriers.join(', ')}</strong>
        </span>
        <span>
          Retiro en tienda: <strong>{CONFIG.pickupCities.join(', ')}</strong>
        </span>
        <span>Cambios de talla en 7 dias</span>
      </section>

      {!isArtesika && (
        <section className={styles.made}>
          <div>
            <h2 className={styles.h2}>Lo fabricamos a medida</h2>
            <p className={styles.madeText}>
              GF Textil es un taller de confeccion, no una tienda de stock fijo. Si no ves
              lo que necesitas, o es un pedido por volumen para tu equipo, lo producimos
              para ti.
            </p>
          </div>
          <div className={styles.madeLinks}>
            <Link to="/otros" className={styles.madeBtn}>
              Pedir a medida
            </Link>
            <Link to="/cotizar" className={styles.madeBtnAlt}>
              Solicitar presupuesto
            </Link>
          </div>
        </section>
      )}

      {isArtesika && (
        <section className={styles.story}>
          {/* PLACEHOLDER - texto tipo Etsy adaptado a Venezuela. Cambiar por el tuyo. */}
          <h2 className={styles.h2}>Hecho a mano, aqui</h2>
          <p className={styles.storyText}>
            En Artesika cada pieza sale de manos venezolanas. Tejemos las pulseras, engarzamos
            las piedras, tallamos la madera y armamos las cocuizas una por una, sin prisa y en
            casa. Lo que llega a tus manos no salio de una maquina: lo hizo una artesana a la
            que conocemos por su nombre.
          </p>
          <p className={styles.storyText}>
            Trabajamos con lo que da la region &mdash; hilo encerado, semillas, fibras
            naturales, madera de saqui-saqui &mdash; y casi todo se puede personalizar con un
            nombre, unas iniciales o el color que quieras regalar. Piezas pensadas para durar y
            para contar una historia.
          </p>
        </section>
      )}

      {hasChristmas && CONFIG.season.christmasEnabled && (
        <section className={styles.xmas}>
          <div>
            <h2 className={styles.h2}>Navidad - preventa abierta</h2>
            <p className={styles.xmasText}>
              {CONFIG.season.deadlineNote} Cupos de produccion esta semana:{' '}
              <strong>{CONFIG.season.weeklySlots}</strong>.
            </p>
          </div>
          <div className={styles.xmasLinks}>
            <Link to="/c/navidad" className={styles.xmasBtn}>
              Ver Navidad
            </Link>
            <Link to="/preventa" className={styles.xmasBtnAlt}>
              Preventa
            </Link>
          </div>
        </section>
      )}

      <section className={styles.band}>
        <h2 className={styles.h2}>Destacados</h2>
        <div className={styles.grid}>
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
}
