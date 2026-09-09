import { CONFIG, filterProducts } from '../lib/catalog';
import { Link } from '../lib/router';
import { ProductCard } from './ProductCard';
import styles from './HomePage.module.css';

const DOORS = [
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
    text: 'Regalos personales y detalles corporativos. Preventa con anticipo y cupos.',
    to: '/c/navidad',
  },
] as const;

const BY_PROFESSION = [
  { label: 'Para un odontologo', to: '/c/regalar-odontologia' },
  { label: 'Para enfermeria', to: '/c/regalar-enfermeria' },
  { label: 'Para un chef', to: '/c/regalar-gastronomia' },
  { label: 'Detalles hasta $10', to: '/c/regalos-hasta-10' },
];

export function HomePage() {
  const featured = [
    ...filterProducts({ roles: ['anchor'] }),
    ...filterProducts({ roles: ['gift'] }),
  ].slice(0, 6);

  return (
    <div className={styles.home}>
      <section className={styles.intro}>
        <p className={styles.kicker}>Creado desde Brasil - producido y despachado en Venezuela</p>
        <h1 className={styles.h1}>Una sola tienda, varios mundos</h1>
        <p className={styles.lead}>
          Uniformes y textil profesional, gala y tradicion, artesania y Navidad. Todo unido por un
          puente: el regalo con intencion profesional.
        </p>
        <div className={styles.doors}>
          {DOORS.map((d) => (
            <Link key={d.world} to={d.to} className={styles.door} data-world={d.world}>
              <span className={styles.doorTitle}>{d.title}</span>
              <span className={styles.doorText}>{d.text}</span>
              <span className={styles.doorGo}>Ver &rarr;</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.trust}>
        <span>
          Envio nacional: <strong>{CONFIG.couriers.join(', ')}</strong>
        </span>
        <span>
          Retiro en tienda: <strong>{CONFIG.pickupCities.join(', ')}</strong>
        </span>
        <span>Cambios de talla en 7 dias</span>
      </section>

      <section className={styles.band}>
        <h2 className={styles.h2}>Regala por profesion</h2>
        <div className={styles.chips}>
          {BY_PROFESSION.map((p) => (
            <Link key={p.to} to={p.to} className={styles.chip}>
              {p.label}
            </Link>
          ))}
        </div>
        <p className={styles.custom}>
          Necesitas algo que no ves en el catalogo?{' '}
          <Link to="/otros">Lo fabricamos a medida &rarr;</Link>
        </p>
      </section>

      {CONFIG.season.christmasEnabled && (
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
              Regalos
            </Link>
            <Link to="/preventa" className={styles.xmasBtnAlt}>
              Preventa
            </Link>
            <Link to="/b2b" className={styles.xmasBtnAlt}>
              Empresas
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
