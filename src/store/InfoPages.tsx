import { BRAND } from '../lib/brand';
import { CONFIG } from '../lib/catalog';
import { Link } from '../lib/router';
import styles from './InfoPages.module.css';

// ---------------------------------------------------------------------------
// Paginas informativas compartidas: forma de pago (#/pago) y contacto
// (#/contacto). No procesan nada; solo informan.
// ---------------------------------------------------------------------------

export function PaymentPage() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Como comprar</p>
        <h1 className={styles.title}>Formas de pago</h1>
        <p className={styles.blurb}>
          Aceptamos estos metodos. Los datos de cada cuenta se comparten al confirmar el
          pedido por WhatsApp; el pago se verifica antes de despachar.
        </p>
      </header>

      <ul className={styles.methods}>
        {CONFIG.paymentMethods.map((m) => (
          <li key={m} className={styles.method}>
            {m}
          </li>
        ))}
      </ul>

      <section className={styles.block}>
        <h2 className={styles.h2}>Como es el proceso</h2>
        <ol className={styles.steps}>
          <li>Elegis los productos y envias el pedido por WhatsApp.</li>
          <li>Te confirmamos disponibilidad, total y datos para el pago.</li>
          <li>Envias el comprobante; verificamos el pago.</li>
          <li>Producimos (si es a pedido) y despachamos por {CONFIG.couriers.join(', ')} o coordinamos retiro en tienda.</li>
        </ol>
      </section>

      <p className={styles.note}>
        Por ahora las cuentas son personales (Banesco y Mercantil). No publicamos numeros
        de cuenta en el sitio: te los pasamos al confirmar el pedido.
      </p>

      <p className={styles.foot}>
        <Link to="/">Volver al inicio</Link> &nbsp;·&nbsp; <Link to="/contacto">Contacto</Link>
      </p>
    </div>
  );
}

export function ContactPage() {
  const wa = `https://wa.me/${BRAND.whatsapp}`;
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Contacto</p>
        <h1 className={styles.title}>Hablemos</h1>
        <p className={styles.blurb}>
          {BRAND.name}. Escribinos y te respondemos con propuesta y tiempo de entrega.
        </p>
      </header>

      <ul className={styles.contactList}>
        <li>
          <span className={styles.cLabel}>WhatsApp</span>
          <a className={styles.cValue} href={wa} target="_blank" rel="noreferrer">
            +{BRAND.whatsapp}
          </a>
        </li>
        <li>
          <span className={styles.cLabel}>Correo</span>
          <span className={styles.cValue}>
            {BRAND.id === 'artesika' ? 'hola@artesika.com' : 'hola@gftextil.com'} (por confirmar)
          </span>
        </li>
        <li>
          <span className={styles.cLabel}>Horario</span>
          <span className={styles.cValue}>Lunes a viernes, 9:00 a 17:00 (por confirmar)</span>
        </li>
        <li>
          <span className={styles.cLabel}>Retiro en tienda</span>
          <span className={styles.cValue}>{CONFIG.pickupCities.join(', ')}</span>
        </li>
      </ul>

      <p className={styles.foot}>
        <Link to="/">Volver al inicio</Link> &nbsp;·&nbsp; <Link to="/pago">Formas de pago</Link>
      </p>
    </div>
  );
}
