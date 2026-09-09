import { CAMPAIGN_MILESTONES, PRESALE_LOTS } from '../data/presale';
import { CONFIG } from '../lib/catalog';
import { round2, usd } from '../lib/format';
import { Link } from '../lib/router';
import { useCart } from './Cart';
import { Glyph } from './ui';
import styles from './PresalePage.module.css';

function daysUntil(iso: string): number {
  const target = new Date(`${iso}T23:59:59`);
  return Math.ceil((target.getTime() - Date.now()) / 86_400_000);
}

export function PresalePage() {
  const { add } = useCart();
  const depositPct = CONFIG.season.depositPct;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Mundo 3 - Navidad</p>
        <h1 className={styles.title}>Preventa artesanal</h1>
        <p className={styles.blurb}>
          Produccion programada por lotes, con fecha comprometida y cupo real. Reservas con{' '}
          {Math.round(depositPct * 100)} % de anticipo; el saldo se paga contra despacho.
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
            const left = Math.max(0, lot.slotsTotal - lot.slotsTaken);
            const pct = Math.round((lot.slotsTaken / lot.slotsTotal) * 100);
            const deposit = round2(lot.unitPrice * depositPct);
            const balance = round2(lot.unitPrice - deposit);
            const soldOut = left === 0;
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
                  <div className={styles.slotTrack} aria-hidden="true">
                    <span className={styles.slotFill} style={{ width: `${pct}%` }} />
                  </div>
                  <p className={styles.slotText}>
                    {soldOut
                      ? 'Lote completo - lista de espera'
                      : `Quedan ${left} de ${lot.slotsTotal} en este lote`}
                  </p>
                </div>
                <div className={styles.lotAction}>
                  <span className={styles.deposit}>Anticipo {usd(deposit)}</span>
                  <span className={styles.balance}>saldo {usd(balance)}</span>
                  <button
                    type="button"
                    className={styles.reserveBtn}
                    disabled={soldOut}
                    onClick={() =>
                      add({
                        kind: 'reservation',
                        refId: lot.id,
                        title: `Reserva Navidad - ${lot.title}`,
                        unitPrice: deposit,
                        note: `Anticipo ${Math.round(depositPct * 100)} % - saldo ${usd(
                          balance,
                        )} - entrega ${lot.deliveryLabel}`,
                      })
                    }
                  >
                    {soldOut ? 'Sin cupo' : `Reservar (${usd(deposit)})`}
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <p className={styles.foot}>
        Regalos para equipos con logo: <Link to="/b2b">ver el catalogo corporativo</Link>.
      </p>
    </div>
  );
}
