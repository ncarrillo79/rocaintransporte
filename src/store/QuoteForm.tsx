import { CITIES, GARMENT_TYPES } from '../data/corporate';
import { BRAND } from '../lib/brand';
import { Link } from '../lib/router';
import { waLink } from '../lib/whatsapp';
import styles from './QuoteForm.module.css';

// ---------------------------------------------------------------------------
// Solicitar presupuesto (GF Textil): pedidos por volumen o a medida.
// Sin formulario: se manda todo por WhatsApp con un texto guia.
// ---------------------------------------------------------------------------

const NEED_TO_KNOW = [
  'Tipo de prenda y uso',
  'Cantidad aproximada',
  'Tallas (rango o desglose) o si es a medida',
  'Tela y color deseados',
  'Fecha para la que la necesitas',
  'Si lleva bordado o logo (y el archivo del logo)',
  'Ciudad de entrega',
];

export function QuoteForm({ garmentId }: { garmentId?: string }) {
  const preset = GARMENT_TYPES.find((g) => g.id === garmentId);
  const wa = waLink(
    `Hola ${BRAND.name}, quiero un presupuesto por volumen.` +
      (preset ? ` Tipo de prenda: ${preset.label};` : ' Tipo de prenda: ;') +
      ' Cantidad: ; Tallas: ; Tela y color: ; Fecha: ; Bordado/logo: ; Ciudad: ',
  );

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Presupuesto</p>
        <h1 className={styles.title}>Solicitar presupuesto</h1>
        <p className={styles.blurb}>
          Para pedidos por volumen o prendas a medida que no estan en el catalogo. Enviamos
          propuesta y tiempo de entrega por WhatsApp.
        </p>
      </header>

      <section className={styles.block}>
        <h2 className={styles.h2}>Que confeccionamos</h2>
        <ul className={styles.list}>
          {GARMENT_TYPES.filter((g) => g.id !== 'otro').map((g) => (
            <li key={g.id}>{g.label}</li>
          ))}
          <li>Y cualquier otra prenda a medida.</li>
        </ul>
      </section>

      <section className={styles.block}>
        <h2 className={styles.h2}>Que necesitamos saber</h2>
        <ul className={styles.list}>
          {NEED_TO_KNOW.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className={styles.note}>Retiro / entrega en {CITIES.join(', ')}.</p>
      </section>

      <section className={styles.result}>
        <a className={styles.waBtn} href={wa} target="_blank" rel="noreferrer">
          Pedir presupuesto por WhatsApp
        </a>
      </section>

      <p className={styles.foot}>
        <Link to="/">Volver al inicio</Link> &nbsp;·&nbsp; <Link to="/otros">Fabricacion a medida</Link>
      </p>
    </div>
  );
}
