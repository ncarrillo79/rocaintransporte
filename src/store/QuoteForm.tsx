import { useMemo, useState, type FormEvent } from 'react';
import { CITIES, CORPORATE_KITS } from '../data/corporate';
import { CONFIG } from '../lib/catalog';
import { round2, usd } from '../lib/format';
import { Link } from '../lib/router';
import styles from './QuoteForm.module.css';

const depositPct = CONFIG.season.depositPct;

export function QuoteForm({ kitId }: { kitId?: string }) {
  const preset = CORPORATE_KITS.find((k) => k.id === kitId);

  const [kit, setKit] = useState(preset?.id ?? CORPORATE_KITS[0].id);
  const selectedKit = CORPORATE_KITS.find((k) => k.id === kit) ?? CORPORATE_KITS[0];

  const [empresa, setEmpresa] = useState('');
  const [contacto, setContacto] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cantidad, setCantidad] = useState(selectedKit.minUnits);
  const [fecha, setFecha] = useState('');
  const [ciudad, setCiudad] = useState(CITIES[0]);
  const [logo, setLogo] = useState(true);
  const [logoNota, setLogoNota] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const estimate = round2(cantidad * selectedKit.unitPriceFrom);
  const deposit = round2(estimate * depositPct);

  const valid =
    empresa.trim() !== '' &&
    contacto.trim() !== '' &&
    (email.trim() !== '' || telefono.trim() !== '') &&
    cantidad >= selectedKit.minUnits;

  const errors: string[] = [];
  if (submitted && !valid) {
    if (!empresa.trim()) errors.push('Falta el nombre de la empresa o institucion.');
    if (!contacto.trim()) errors.push('Falta la persona de contacto.');
    if (!email.trim() && !telefono.trim()) errors.push('Deja al menos un correo o un telefono.');
    if (cantidad < selectedKit.minUnits)
      errors.push(`La cantidad minima para este kit es ${selectedKit.minUnits}.`);
  }

  const summary = useMemo(
    () =>
      [
        'COTIZACION - Regalos corporativos de Navidad',
        `Kit: ${selectedKit.title}`,
        `Cantidad: ${cantidad} (minimo ${selectedKit.minUnits})`,
        `Personalizacion con logo: ${logo ? 'Si' : 'No'}${
          logo && logoNota ? ` - ${logoNota}` : ''
        }`,
        `Fecha de entrega deseada: ${fecha || 'a definir'}`,
        `Ciudad: ${ciudad}`,
        `Empresa / institucion: ${empresa || '-'}`,
        `Contacto: ${contacto || '-'}`,
        `Correo: ${email || '-'}`,
        `Telefono: ${telefono || '-'}`,
        mensaje ? `Mensaje: ${mensaje}` : '',
        `Estimado: desde ${usd(estimate)} (anticipo ${Math.round(
          depositPct * 100,
        )} %: ${usd(deposit)})`,
      ]
        .filter(Boolean)
        .join('\n'),
    [selectedKit, cantidad, logo, logoNota, fecha, ciudad, empresa, contacto, email, telefono, mensaje, estimate, deposit],
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setCopied(false);
  }

  function changeKit(id: string) {
    setKit(id);
    const k = CORPORATE_KITS.find((x) => x.id === id);
    if (k && cantidad < k.minUnits) setCantidad(k.minUnits);
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(summary);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const showSummary = submitted && valid;
  const wa = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(summary)}`;
  const mail = `mailto:?subject=${encodeURIComponent(
    'Cotizacion regalos corporativos',
  )}&body=${encodeURIComponent(summary)}`;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Corporativo - Navidad</p>
        <h1 className={styles.title}>Solicitar cotizacion</h1>
        <p className={styles.blurb}>
          Completa los datos y genera un resumen para enviar por WhatsApp Business o correo. Nada
          se envia de forma automatica.
        </p>
      </header>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.grid}>
          <label className={styles.field}>
            <span>Kit</span>
            <select value={kit} onChange={(e) => changeKit(e.target.value)}>
              {CORPORATE_KITS.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.title}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Cantidad (min. {selectedKit.minUnits})</span>
            <input
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value) || 0)}
            />
          </label>
          <label className={styles.field}>
            <span>Fecha de entrega deseada</span>
            <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Ciudad</span>
            <select value={ciudad} onChange={(e) => setCiudad(e.target.value)}>
              {CITIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Empresa o institucion</span>
            <input value={empresa} onChange={(e) => setEmpresa(e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Persona de contacto</span>
            <input value={contacto} onChange={(e) => setContacto(e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Correo</span>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </label>
          <label className={styles.field}>
            <span>Telefono / WhatsApp</span>
            <input value={telefono} onChange={(e) => setTelefono(e.target.value)} />
          </label>
        </div>

        <label className={styles.check}>
          <input type="checkbox" checked={logo} onChange={(e) => setLogo(e.target.checked)} />
          Personalizar con logo
        </label>
        {logo && (
          <label className={styles.field}>
            <span>Nota sobre el logo (colores, ubicacion, formato del archivo)</span>
            <input value={logoNota} onChange={(e) => setLogoNota(e.target.value)} />
          </label>
        )}
        <label className={styles.field}>
          <span>Mensaje (opcional)</span>
          <textarea rows={3} value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        </label>

        <p className={styles.estimate}>
          Estimado: <strong>desde {usd(estimate)}</strong> &nbsp;·&nbsp; anticipo{' '}
          {Math.round(depositPct * 100)} %: {usd(deposit)}
          <span className={styles.estNote}> — referencial, se confirma en la cotizacion</span>
        </p>

        {errors.length > 0 && (
          <ul className={styles.errors}>
            {errors.map((er) => (
              <li key={er}>{er}</li>
            ))}
          </ul>
        )}

        <button type="submit" className={styles.submit}>
          Generar resumen
        </button>
      </form>

      {showSummary && (
        <section className={styles.result} aria-live="polite">
          <h2 className={styles.h2}>Resumen listo para enviar</h2>
          <pre className={styles.summary}>{summary}</pre>
          <div className={styles.actions}>
            <button type="button" className={styles.copyBtn} onClick={copy}>
              {copied ? 'Copiado' : 'Copiar resumen'}
            </button>
            <a className={styles.waBtn} href={wa} target="_blank" rel="noreferrer">
              Enviar por WhatsApp
            </a>
            <a className={styles.mailBtn} href={mail}>
              Enviar por correo
            </a>
          </div>
          <p className={styles.note}>
            El numero y el correo de destino se configuran en <code>src/data/config.ts</code>.
          </p>
        </section>
      )}

      <p className={styles.foot}>
        <Link to="/b2b">Volver al catalogo corporativo</Link>
      </p>
    </div>
  );
}
