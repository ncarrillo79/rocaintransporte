import { CONFIG } from '../lib/catalog';
import { Link } from '../lib/router';
import styles from './CustomOrderPage.module.css';

const NEED_TO_KNOW = [
  'Prenda y uso (uniforme, linea medica, gastronomia, escolar, corporativa, gala, traje tipico...)',
  'Cantidad aproximada',
  'Tela o acabado deseado, y colores',
  'Tallas (o si es confeccion a medida)',
  'Fecha para la que la necesitas',
  'Si lleva bordado, logo o estampado',
];

const WA_TEXT =
  'Hola, quiero consultar por una confeccion a medida. Prenda / uso: ; Cantidad: ; Tela y color: ; Tallas: ; Fecha: ; Bordado o logo: ';

export function CustomOrderPage() {
  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(WA_TEXT)}`;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>A medida</p>
        <h1 className={styles.title}>Fabricacion a medida</h1>
        <p className={styles.blurb}>
          Fabricamos casi cualquier prenda textil: linea medica y quirurgica, gastronomia,
          uniformes escolares y corporativos, camisas tipo Columbia, vestidos de gala y trajes
          tradicionales como el liqui liqui. Si no encuentras algo en el catalogo, lo hacemos
          para ti.
        </p>
      </header>

      <section className={styles.block}>
        <h2 className={styles.h2}>Que necesitamos saber</h2>
        <ul className={styles.list}>
          {NEED_TO_KNOW.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className={styles.cta}>
        <p className={styles.ctaText}>
          Escribenos con esos datos y te respondemos con propuesta y tiempo de entrega.
        </p>
        <a className={styles.waBtn} href={wa} target="_blank" rel="noreferrer">
          Consultar por WhatsApp
        </a>
        <p className={styles.note}>
          El numero se configura en <code>src/data/config.ts</code>.
        </p>
      </section>

      <p className={styles.foot}>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
