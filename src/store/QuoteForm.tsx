import { useMemo, useState, type FormEvent } from 'react';
import { CITIES, GARMENT_TYPES } from '../data/corporate';
import { BRAND } from '../lib/brand';
import { round2, usd } from '../lib/format';
import { Link } from '../lib/router';
import styles from './QuoteForm.module.css';

// ---------------------------------------------------------------------------
// Solicitar presupuesto (GF Textil): pedidos por volumen o confeccion a medida.
// No envia nada: arma un resumen de texto para WhatsApp Business o correo.
// ---------------------------------------------------------------------------

export function QuoteForm({ garmentId }: { garmentId?: string }) {
  const preset = GARMENT_TYPES.find((g) => g.id === garmentId);

  const [tipo, setTipo] = useState(preset?.id ?? GARMENT_TYPES[0].id);
  const selected = GARMENT_TYPES.find((g) => g.id === tipo) ?? GARMENT_TYPES[0];

  const [empresa, setEmpresa] = useState('');
  const [contacto, setContacto] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');
  const [cantidad, setCantidad] = useState(selected.minUnits);
  const [tallas, setTallas] = useState('');
  const [telaColor, setTelaColor] = useState('');
  const [fecha, setFecha] = useState('');
  const [ciudad, setCiudad] = useState(CITIES[0]);
  const [logo, setLogo] = useState(false);
  const [logoNota, setLogoNota] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const estimate = selected.unitPriceFrom > 0 ? round2(cantidad * selected.unitPriceFrom) : 0;

  const valid =
    contacto.trim() !== '' &&
    (email.trim() !== '' || telefono.trim() !== '') &&
    cantidad >= 1;

  const errors: string[] = [];
  if (submitted && !valid) {
    if (!contacto.trim()) errors.push('Falta la persona de contacto.');
    if (!email.trim() && !telefono.trim()) errors.push('Deja al menos un correo o un telefono.');
    if (cantidad < 1) errors.push('Indica una cantidad.');
  }

  const summary = useMemo(
    () =>
      [
        'SOLICITUD DE PRESUPUESTO - GF Textil',
        `Tipo de prenda: ${selected.label}`,
        `Cantidad: ${cantidad}`,
        `Tallas: ${tallas || 'a definir'}`,
        `Tela y color: ${telaColor || 'a definir'}`,
        `Bordado / logo: ${logo ? 'Si' : 'No'}${logo && logoNota ? ` - ${logoNota}` : ''}`,
        `Fecha de entrega deseada: ${fecha || 'a definir'}`,
        `Ciudad: ${ciudad}`,
        `Empresa / institucion: ${empresa || '-'}`,
        `Contacto: ${contacto || '-'}`,
        `Correo: ${email || '-'}`,
        `Telefono: ${telefono || '-'}`,
        mensaje ? `Mensaje: ${mensaje}` : '',
        estimate > 0
          ? `Estimado referencial: desde ${usd(estimate)} (se confirma en la cotizacion)`
          : '',
      ]
        .filter(Boolean)
        .join('\n'),
    [selected, cantidad, tallas, telaColor, logo, logoNota, fecha, ciudad, empresa, contacto, email, telefono, mensaje, estimate],
  );

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    setCopied(false);
  }

  function changeTipo(id: string) {
    setTipo(id);
    const g = GARMENT_TYPES.find((x) => x.id === id);
    if (g && cantidad < g.minUnits) setCantidad(g.minUnits);
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
  const wa = `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(summary)}`;
  const mail = `mailto:?subject=${encodeURIComponent(
    'Solicitud de presupuesto - GF Textil',
  )}&body=${encodeURIComponent(summary)}`;

  return (
    <div className={styles.page}>
      <header className={styles.head}>
        <p className={styles.kicker}>Presupuesto</p>
        <h1 className={styles.title}>Solicitar presupuesto</h1>
        <p className={styles.blurb}>
          Para pedidos por volumen o prendas a medida que no estan en el catalogo. Completa
          los datos y genera un resumen para enviar por WhatsApp o correo. Nada se envia de
          forma automatica.
        </p>
      </header>

      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.grid}>
          <label className={styles.field}>
            <span>Tipo de prenda</span>
            <select value={tipo} onChange={(e) => changeTipo(e.target.value)}>
              {GARMENT_TYPES.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.label}
                </option>
              ))}
            </select>
          </label>
          <label className={styles.field}>
            <span>Cantidad{selected.minUnits > 1 ? ` (sugerido min. ${selected.minUnits})` : ''}</span>
            <input
              type="number"
              min={1}
              value={cantidad}
              onChange={(e) => setCantidad(Number(e.target.value) || 0)}
            />
          </label>
          <label className={styles.field}>
            <span>Tallas (rango o desglose)</span>
            <input value={tallas} onChange={(e) => setTallas(e.target.value)} placeholder="Ej: 4 S, 6 M, 3 L / o a medida" />
          </label>
          <label className={styles.field}>
            <span>Tela y color deseados</span>
            <input value={telaColor} onChange={(e) => setTelaColor(e.target.value)} />
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
            <span>Empresa o institucion (opcional)</span>
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
          Lleva bordado o logo
        </label>
        {logo && (
          <label className={styles.field}>
            <span>Nota sobre el bordado / logo (texto, colores, ubicacion, formato del archivo)</span>
            <input value={logoNota} onChange={(e) => setLogoNota(e.target.value)} />
          </label>
        )}
        <label className={styles.field}>
          <span>Mensaje / referencia de diseno (opcional)</span>
          <textarea rows={3} value={mensaje} onChange={(e) => setMensaje(e.target.value)} />
        </label>

        {estimate > 0 && (
          <p className={styles.estimate}>
            Estimado: <strong>desde {usd(estimate)}</strong>
            <span className={styles.estNote}> — referencial, se confirma en la cotizacion</span>
          </p>
        )}

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
        </section>
      )}

      <p className={styles.foot}>
        <Link to="/">Volver al inicio</Link>
      </p>
    </div>
  );
}
