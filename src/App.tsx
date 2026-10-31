import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import styles from './TransportPage.module.css';

const WHATSAPP = '584127400296';
const WHATSAPP_2 = '584243018032';
const PHONE = '+58 424 301 8032';
const EMAIL = 'rocaintransporte1@gmail.com';
// Destino del formulario. PRUEBA: volver a EMAIL cuando se confirme que funciona.
const FORM_EMAIL = 'ncarrillo79@gmail.com';

const services = [
  {
    number: '01',
    title: 'Traslados ejecutivos',
    text: 'Movilidad discreta y puntual para directivos, equipos de trabajo y visitantes.',
    icon: '↗',
  },
  {
    number: '02',
    title: 'Aeropuerto',
    text: 'Te esperamos, monitoreamos tu vuelo y te llevamos directo a tu destino.',
    icon: '✦',
  },
  {
    number: '03',
    title: 'Turismo y eventos',
    text: 'Recorre Aragua y Venezuela con comodidad, seguridad y atención personalizada.',
    icon: '◌',
  },
];

const fleet = [
  { name: 'SUV 4x4 Cherokee', detail: 'Aventura y capacidad', image: '/img/rocain/cherokee2.jpg' },
  { name: 'Sedán Aveo', detail: 'Confort para cada trayecto', image: '/img/rocain/aveo.jpg' },
  { name: 'Camioneta ejecutiva', detail: 'Equipos y traslados', image: '/img/rocain/camionetachina.jpg' },
  { name: 'Kia Pregio', detail: 'Traslados para grupos', image: '/img/rocain/pregio.jpg' },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function whatsapp(message: string, number = WHATSAPP) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// FormSubmit reenvía el formulario al correo de Rocain sin abrir la app de correo del cliente.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_EMAIL}`;

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');

  useEffect(() => {
    document.title = 'Rocain | Transporte ejecutivo';
  }, []);

  // Escape cierra el aviso de solicitud enviada.
  useEffect(() => {
    if (status !== 'sent') return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setStatus('idle'); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status]);

  const closeMenu = () => setMenuOpen(false);

  const formRef = useRef<HTMLFormElement>(null);

  // Lleva al formulario con desplazamiento suave y deja el cursor en "Nombre".
  function goToForm(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    const form = formRef.current;
    if (!form) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    form.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'center' });
    window.setTimeout(() => form.querySelector<HTMLInputElement>('input[name="name"]')?.focus({ preventScroll: true }), reduceMotion ? 0 : 700);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const field = (key: string) => String(form.get(key) ?? '').trim();

    setStatus('sending');
    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: 'Solicitud de cotización - Rocain',
          _template: 'table',
          _captcha: 'false',
          Nombre: field('name'),
          'Teléfono': field('phone'),
          Servicio: field('service'),
          'Fecha estimada': field('date') || 'No indicada',
          Detalles: field('details') || 'Sin detalles',
        }),
      });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      setStatus('sent');
      formElement.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <a className={styles.logo} href="#inicio" onClick={closeMenu} aria-label="Rocain, ir al inicio">
          <span className={styles.logoMark}>R</span>
          <span><strong>ROCAIN</strong><small>TRANSPORTE & EJECUTIVOS</small></span>
        </a>
        <button className={styles.menuButton} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Abrir menú">
          <span /><span />
        </button>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Navegación principal">
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#flota" onClick={closeMenu}>Nuestra flota</a>
          <a href="#nosotros" onClick={closeMenu}>Nosotros</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
          <a className={styles.navCta} href={whatsapp('Hola Rocain, quiero solicitar un traslado.')} target="_blank" rel="noreferrer" onClick={closeMenu}>Cotizar traslado <span>↗</span></a>
        </nav>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroContent}>
            <p className={styles.eyebrow}><span /> La Victoria, Aragua · Atención 24 horas</p>
            <h1>Tu tiempo.<br /><em>Nuestro compromiso.</em></h1>
            <p className={styles.heroLead}>Transporte ejecutivo pensado para quienes valoran llegar a tiempo, viajar seguros y sentirse bien atendidos.</p>
            <div className={styles.heroActions}>
              <a className={styles.heroWhatsapp} href={whatsapp('Hola Rocain, necesito información sobre un traslado.')} target="_blank" rel="noreferrer"><WhatsAppIcon className={styles.waIcon} /> Planifica tu viaje</a>
              <a className={styles.textButton} href="#servicios">Conoce nuestros servicios <span>↓</span></a>
            </div>
            <a className={styles.quoteCta} href="#cotizar" onClick={goToForm}>
              <span className={styles.quoteCtaDot} aria-hidden="true" />
              <span className={styles.quoteCtaText}>
                <small>Sin compromiso · Respuesta rápida</small>
                <strong>Solicita tu cotización en 1 minuto</strong>
              </span>
              <span className={styles.quoteCtaArrow} aria-hidden="true">→</span>
            </a>
            <div className={styles.heroMeta}>
              <span><strong>24/7</strong> disponibilidad</span>
              <span><strong>RIF</strong> J-295074251</span>
              <span><strong>NACIONAL</strong> cobertura</span>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroImage} />
            <div className={styles.heroBadge}><span>R</span><strong>Viaja tranquilo.<br />Nosotros nos encargamos.</strong></div>
            <div className={styles.heroLocation}><span>●</span> La Victoria, Aragua</div>
          </div>
        </section>

        <section className={styles.servicesSection} id="servicios">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>Lo hacemos simple</p>
            <h2>Un servicio a la altura<br /><em>de tu destino.</em></h2>
          </div>
          <div className={styles.serviceGrid}>
            {services.map((service) => (
              <article className={styles.serviceCard} key={service.number}>
                <div className={styles.serviceTop}><span>{service.number}</span><b>{service.icon}</b></div>
                <h3>{service.title}</h3>
                <p>{service.text}</p>
                <a href={whatsapp(`Hola Rocain, me interesa el servicio de ${service.title}.`)} target="_blank" rel="noreferrer">Solicitar servicio <span>↗</span></a>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.fleetSection} id="flota">
          <div className={styles.sectionIntro}>
            <p className={styles.eyebrow}>La flota Rocain</p>
            <h2>El vehículo correcto<br /><em>para cada ocasión.</em></h2>
          </div>
          <div className={styles.fleetGrid}>
            {fleet.map((car) => (
              <article className={styles.fleetCard} key={car.name}>
                <img src={car.image} alt={car.name} loading="lazy" />
                <div><p>{car.detail}</p><h3>{car.name}</h3></div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.aboutSection} id="nosotros">
          <div className={styles.aboutVisual}><div className={styles.aboutImage} /><span>01 — 03</span></div>
          <div className={styles.aboutCopy}>
            <p className={styles.eyebrow}>Más que transporte</p>
            <h2>La tranquilidad<br /><em>también se transporta.</em></h2>
            <p>En Rocain entendemos que un traslado es mucho más que ir de un punto a otro. Es cuidar tu tiempo, anticiparnos a tus necesidades y hacer que cada recorrido sea cómodo.</p>
            <p>Atendemos empresas, ejecutivos, familias y viajeros desde La Victoria, Aragua, con cobertura nacional y coordinación directa.</p>
            <a className={styles.outlineButton} href="#contacto">Conoce Rocain <span>↗</span></a>
          </div>
        </section>

        <section className={styles.contactSection} id="contacto">
          <div>
            <p className={styles.eyebrow}>¿Tienes un viaje en mente?</p>
            <h2>Hablemos de<br /><em>tu próximo destino.</em></h2>
          </div>
          <div className={styles.contactDetails}>
            <p>Cuéntanos qué necesitas y te ayudaremos a planificarlo.</p>
            <div className={styles.contactNumbers}>
              <a className={styles.contactLink} href={whatsapp('Hola Rocain, quiero cotizar un traslado.')} target="_blank" rel="noreferrer"><WhatsAppIcon className={styles.waIcon} /> +58 412 740 0296</a>
              <a className={styles.contactLink} href={whatsapp('Hola Rocain, quiero cotizar un traslado.', WHATSAPP_2)} target="_blank" rel="noreferrer"><WhatsAppIcon className={styles.waIcon} /> {PHONE}</a>
            </div>
            <a className={styles.contactMail} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <form className={styles.contactForm} id="cotizar" ref={formRef} onSubmit={handleSubmit}>
            <label>
              Nombre completo
              <input name="name" type="text" placeholder="¿Cómo te llamas?" required />
            </label>
            <label>
              Teléfono
              <input name="phone" type="tel" placeholder="+58 000 000 0000" required />
            </label>
            <label>
              ¿Qué servicio necesitas?
              <select name="service" defaultValue="" required>
                <option value="" disabled>Selecciona una opción</option>
                <option>Traslado ejecutivo</option>
                <option>Traslado al aeropuerto</option>
                <option>Turismo y eventos</option>
                <option>Servicio corporativo</option>
              </select>
            </label>
            <label>
              <span>Fecha estimada <small>(opcional)</small></span>
              <input name="date" type="date" />
            </label>
            <label className={styles.formWide}>
              <span>Cuéntanos un poco más <small>(opcional)</small></span>
              <textarea name="details" rows={3} placeholder="Origen, destino, cantidad de pasajeros..." />
            </label>
            <button className={styles.formButton} type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando...' : <>Solicitar cotización <span>↗</span></>}
            </button>
            {status === 'error' && (
              <p className={styles.formSuccess} role="alert">
                No pudimos enviar tu solicitud. Escríbenos por <a href={whatsapp('Hola Rocain, quiero cotizar un traslado.')} target="_blank" rel="noreferrer">WhatsApp</a>.
              </p>
            )}
          </form>
        </section>
      </main>

      {status === 'sent' && (
        <div className={styles.modalBackdrop} onClick={() => setStatus('idle')}>
          <div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
            <span className={styles.modalIcon} aria-hidden="true">✓</span>
            <h3 id="modal-title">¡Solicitud enviada!</h3>
            <p>Gracias por escribirnos. Recibimos tu solicitud y te contactaremos muy pronto.</p>
            <button className={styles.formButton} type="button" onClick={() => setStatus('idle')} autoFocus>Entendido</button>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <a className={styles.logo} href="#inicio"><span className={styles.logoMark}>R</span><span><strong>ROCAIN</strong><small>TRANSPORTE & EJECUTIVOS</small></span></a>
        <p>© {new Date().getFullYear()} Rocain Transporte y Ejecutivos, S.A. · RIF J-295074251</p>
        <a href="#inicio" className={styles.backTop}>Volver arriba ↑</a>
      </footer>
      <a
        className={styles.whatsappFloat}
        href={whatsapp('Hola Rocain, quiero cotizar un traslado.')}
        target="_blank"
        rel="noreferrer"
        aria-label="Cotizar traslado por WhatsApp"
      >
        <WhatsAppIcon className={styles.whatsappIcon} />
        <span className={styles.whatsappText}>Cotiza por WhatsApp</span>
      </a>
    </div>
  );
}
