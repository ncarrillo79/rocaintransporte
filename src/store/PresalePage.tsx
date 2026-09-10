import { CAMPAIGN_MILESTONES, PRESALE_LOTS } from '../data/presale';
import { CONFIG } from '../lib/catalog';
import { usd } from '../lib/format';
import { Link } from '../lib/router';
import { waLink } from '../lib/whatsapp';
import { Glyph } from './ui';
import styles from './PresalePage.module.css';

function daysUntil(iso: string): number {
  const target = new Date(`${iso}T23:59:59`);
  return Math.ceil((target.getTime() - Date.now()) / 86_400_000);
}

export function PresalePage() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Navidad</p>
        <h1 className={styles.title}>Preventa artesanal</h1>
        <p className={styles.blurb}>
          {CONFIG.season.deadlineNote} La produccion es por lotes, con fecha comprometida.
          Para reservar, escribinos por WhatsApp y coordinamos el anticipo.
        </p>
      </header>

      <section className={styles.milestones} aria-label="Fechas limite">
        <h2 className={styles.h2}>Fechas limite de la campana</h2>
        <ul className={styles.mlist}>
          {CAMPAIGN_MILESTONES.map((m) => {
            const d = daysUntil(m.dateISO);
            return (
              <li key={m.label} className={styles.mrow}>
                <span className={`${styles.mdays} ${d <= 0 ? styles.mdaysClosed : ''}`}>
                  {d > 0 ? `faltan ${d} dias` : 'cerrado'}
                </span>
                <span className={styles.mlabel}>{m.label}</span>
                <span className={styles.mnote}>{m.note}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section aria-label="Lotes en preventa">
        <h2 className={styles.h2}>Lotes disponibles</h2>
        <ul className={styles.lots}>
          {PRESALE_LOTS.map((lot) => {
            const wa = waLink(
              `Hola, quiero reservar en la preventa de Navidad: ${lot.title} (entrega ${lot.deliveryLabel}, ${usd(lot.unitPrice)}).`,
            );
            return (
              <li key={lot.id} className={styles.lot}>
                <div className={styles.lotMedia}>
                  <Glyph name={lot.glyph} />
                </div>
                <div className={styles.lotBody}>
                  <h3 className={styles.lotTitle}>{lot.title}</h3>
                  <p className={styles.lotText}>{lot.description}</p>
                  <p className={styles.lotMeta}>
                    Entrega: {lot.deliveryLabel} &nbsp;·&nbsp; Precio: {usd(lot.unitPrice)}
                  </p>
                </div>
                <div className={styles.lotAction}>
                  <a className={styles.reserveBtn} href={wa} target="_blank" rel="noreferrer">
                    Reservar por WhatsApp
                  </a>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <p className={styles.foot}>
        Dudas sobre un lote o un pedido a medida? <Link to="/contacto">Escribinos</Link>.
      </p>
    </div>
  );
}
