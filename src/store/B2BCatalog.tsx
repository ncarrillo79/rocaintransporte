import { CORPORATE_KITS } from '../data/corporate';
import { usd } from '../lib/format';
import { Link, navigate } from '../lib/router';
import { Glyph } from './ui';
import styles from './B2BCatalog.module.css';

export function B2BCatalog() {
  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Corporativo - Navidad</p>
        <h1 className={styles.title}>Regalos para equipos</h1>
        <p className={styles.blurb}>
          El ticket mas alto de la temporada. Aqui se pide una cotizacion, no un carrito:
          personalizamos con logo y coordinamos una fecha de entrega. Respuesta en 24-48 h.
        </p>
      </header>

      <ul className={styles.grid}>
        {CORPORATE_KITS.map((k) => (
          <li key={k.id} className={styles.card}>
            <div className={styles.media}>
              <Glyph name={k.glyph} />
            </div>
            <div className={styles.body}>
              <h2 className={styles.name}>{k.title}</h2>
              <p className={styles.forWho}>Para {k.forWho}</p>
              <ul className={styles.includes}>
                {k.includes.map((i) => (
                  <li key={i}>{i}</li>
                ))}
              </ul>
              <p className={styles.price}>
                Desde <strong>{usd(k.unitPriceFrom)}</strong> / persona &nbsp;·&nbsp; minimo{' '}
                {k.minUnits}
                {k.logo ? ' · admite logo' : ''}
              </p>
              <button
                type="button"
                className={styles.cta}
                onClick={() => navigate(`/b2b/cotizar/${k.id}`)}
              >
                Solicitar cotizacion
              </button>
            </div>
          </li>
        ))}
      </ul>

      <p className={styles.foot}>
        Tambien puedes <Link to="/b2b/cotizar">enviar una cotizacion libre</Link> sin elegir un kit.
      </p>
    </div>
  );
}
