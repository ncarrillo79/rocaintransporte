import { useEffect, useRef, useState, type FormEvent, type MouseEvent } from 'react';
import styles from './TransportPage.module.css';

const WHATSAPP = '584127400296';
const WHATSAPP_2 = '584243018032';
const PHONE = '+58 424 301 8032';
const EMAIL = 'rocaintransporte1@gmail.com';
// Destino del formulario (FormSubmit pide activarlo una vez desde este correo).
const FORM_EMAIL = EMAIL;

// EDITAR: cifras de ejemplo. Reemplazar por datos reales de Rocain antes de publicar.
const stats = [
  { value: '24/7', label: 'Atención todos los días, a cualquier hora' },
  { value: '+500', label: 'Traslados realizados' },
  { value: '+10', label: 'Años de experiencia' },
  { value: 'Nacional', label: 'Cobertura en toda Venezuela' },
];

const services = [
  {
    title: 'Aeropuerto',
    text: 'Te esperamos en Maiquetía con tu nombre, seguimos tu vuelo y te llevamos directo a tu destino.',
    image: '/img/rocain/aeropuerto.jpg',
    size: 'large',
  },
  {
    title: 'Hoteles y reuniones',
    text: 'Puntuales a la puerta del hotel, la oficina o la sala de conferencias.',
    image: '/img/rocain/hotel.jpg',
    size: 'tall',
  },
  { title: 'Residencia del ejecutivo', text: 'Rutas fijas casa–oficina para directivos y equipos.', size: 'small' },
  { title: 'Turismo', text: 'Recorre Aragua y Venezuela con chofer y vehículo a tu medida.', size: 'small' },
  { title: 'Centros comerciales', text: 'Compras y diligencias sin preocuparte por estacionar.', size: 'small' },
  { title: 'Conferencias y eventos', text: 'Traslado de grupos e invitados con horario coordinado.', size: 'wide' },
];

const steps = [
  { title: 'Escríbenos', text: 'Por WhatsApp o con el formulario. Dinos origen, destino, fecha y cuántos viajan.' },
  { title: 'Confirmamos', text: 'Te enviamos precio, vehículo y nombre del chofer. Sin sorpresas.' },
  { title: 'Te buscamos', text: 'Llegamos antes de la hora acordada y te llevamos directo a tu destino.' },
];

const fleet = [
  { name: 'Jeep Grand Cherokee', detail: '4x4 · hasta 4 pasajeros', image: '/img/rocain/cherokee2.jpg' },
  { name: 'Chevrolet Aveo', detail: 'Sedán · hasta 4 pasajeros', image: '/img/rocain/aveo.jpg' },
  { name: 'Camioneta ejecutiva', detail: 'Equipos y equipaje', image: '/img/rocain/camionetachina.jpg' },
  { name: 'Kia Pregio', detail: 'Grupos · hasta 12 pasajeros', image: '/img/rocain/pregio.jpg' },
];

// EDITAR: testimonios de ejemplo. Reemplazar por opiniones reales de clientes antes de publicar.
const testimonials = [
  { quote: 'Llegaron antes que mi vuelo y el chofer ya sabía que venía retrasado. Así da gusto viajar.', name: 'Nombre del cliente', role: 'Gerente comercial · Maracay' },
  { quote: 'Los usamos para mover a nuestros invitados en cada evento. Puntuales y muy atentos.', name: 'Nombre del cliente', role: 'Coordinadora de eventos · Caracas' },
  { quote: 'Mi ruta diaria a la oficina dejó de ser un problema. Siempre el mismo chofer, siempre a tiempo.', name: 'Nombre del cliente', role: 'Director de planta · La Victoria' },
];

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

// Fecha local de hoy en formato AAAA-MM-DD, para que el calendario no permita días pasados.
function today() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function whatsapp(message: string, number = WHATSAPP) {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

// FormSubmit reenvía el formulario al correo de Rocain sin abrir la app de correo del cliente.
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${FORM_EMAIL}`;

type FormStatus = 'idle' | 'sending' | 'sent' | 'error';

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [status, setStatus] = useState<FormStatus>('idle');
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    document.title = 'Rocain | Transporte ejecutivo';
  }, []);

  // El menú pasa a fondo sólido al bajar de la portada.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Aparición suave de los bloques marcados con data-reveal al entrar en pantalla.
  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>('[data-reveal]');
    if (!('IntersectionObserver' in window)) {
      items.forEach((item) => item.setAttribute('data-reveal', 'in'));
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.setAttribute('data-reveal', 'in');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.15 });
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, []);

  // Escape cierra el aviso de solicitud enviada.
  useEffect(() => {
    if (status !== 'sent') return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') setStatus('idle'); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [status]);

  const closeMenu = () => setMenuOpen(false);

  // Lleva al formulario con desplazamiento suave y deja el cursor en "Nombre".
  function goToForm(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault();
    closeMenu();
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
      <header className={`${styles.header} ${scrolled || menuOpen ? styles.headerSolid : ''}`}>
        <a className={styles.logo} href="#inicio" onClick={closeMenu} aria-label="Rocain, ir al inicio">
          <span className={styles.logoMark}>R</span>
          <span><strong>Rocain</strong><small>Transporte & Ejecutivos</small></span>
        </a>
        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`} aria-label="Navegación principal">
          <a href="#servicios" onClick={closeMenu}>Servicios</a>
          <a href="#como-funciona" onClick={closeMenu}>Cómo funciona</a>
          <a href="#flota" onClick={closeMenu}>Flota</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>
          <a className={styles.navCta} href="#cotizar" onClick={goToForm}>Cotizar</a>
        </nav>
        <button className={styles.menuButton} type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}>
          <span /><span />
        </button>
      </header>

      <main>
        <section className={styles.hero} id="inicio">
          <div className={styles.heroMedia} aria-hidden="true" />
          <div className={styles.heroInner}>
            <p className={styles.heroTag}><span className={styles.liveDot} aria-hidden="true" /> Disponibles ahora · La Victoria, Aragua</p>
            <h1>Llegar a tiempo es <em>nuestro trabajo.</em></h1>
            <p className={styles.heroLead}>Traslados ejecutivos al aeropuerto de Maiquetía, hoteles, reuniones y viajes por todo el país. Chofer profesional y vehículo a tu medida, las 24 horas.</p>
            <div className={styles.heroActions}>
              <a className={styles.btnWhatsapp} href={whatsapp('Hola Rocain, necesito información sobre un traslado.')} target="_blank" rel="noreferrer"><WhatsAppIcon className={styles.waIcon} /> Planifica tu viaje</a>
              <a className={styles.quoteCta} href="#cotizar" onClick={goToForm}>
                <span className={styles.quoteCtaText}>
                  <small>Sin compromiso</small>
                  <strong>Cotiza en 1 minuto</strong>
                </span>
                <span className={styles.quoteCtaArrow} aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className={styles.statsBand} aria-label="Rocain en cifras">
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.label} data-reveal>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section className={styles.section} id="servicios">
          <div className={styles.sectionHead} data-reveal>
            <h2>¿A dónde te <em>llevamos?</em></h2>
            <p>Del aeropuerto a la reunión, de la casa a la oficina. Un solo número para todos tus traslados.</p>
          </div>
          <div className={styles.bento}>
            {services.map((service) => (
              <a
                key={service.title}
                className={`${styles.bentoCard} ${styles[service.size]} ${service.image ? styles.bentoPhoto : ''}`}
                href={whatsapp(`Hola Rocain, me interesa el servicio de ${service.title}.`)}
                target="_blank"
                rel="noreferrer"
                data-reveal
              >
                {service.image && <img src={service.image} alt="" loading="lazy" />}
                <div className={styles.bentoBody}>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
                <span className={styles.bentoArrow} aria-hidden="true">→</span>
              </a>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.stepsSection}`} id="como-funciona">
          <div className={styles.sectionHead} data-reveal>
            <h2>Reservar es <em>así de simple.</em></h2>
          </div>
          <ol className={styles.steps}>
            {steps.map((step, index) => (
              <li className={styles.step} key={step.title} data-reveal>
                <span className={styles.stepNumber}>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={styles.section} id="flota">
          <div className={styles.sectionHead} data-reveal>
            <h2>Nuestra <em>flota.</em></h2>
            <p>Elegimos el vehículo según cuántos viajan y cuánto equipaje llevan.</p>
          </div>
          <div className={styles.fleetGrid}>
            {fleet.map((car) => (
              <article className={styles.fleetCard} key={car.name} data-reveal>
                <div className={styles.fleetImage}><img src={car.image} alt={car.name} loading="lazy" /></div>
                <h3>{car.name}</h3>
                <p>{car.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={`${styles.section} ${styles.testimonialsSection}`} id="opiniones">
          <div className={styles.sectionHead} data-reveal>
            <h2>Lo que dicen <em>nuestros clientes.</em></h2>
          </div>
          <div className={styles.testimonials}>
            {testimonials.map((item) => (
              <figure className={styles.testimonial} key={item.quote} data-reveal>
                <blockquote>“{item.quote}”</blockquote>
                <figcaption><strong>{item.name}</strong><span>{item.role}</span></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className={styles.contactSection} id="contacto">
          <div className={styles.contactIntro} data-reveal>
            <h2>¿Tienes un viaje en <em>mente?</em></h2>
            <p>Escríbenos por WhatsApp o déjanos tus datos. Respondemos rápido, a cualquier hora.</p>
            <div className={styles.contactNumbers}>
              <a className={styles.contactLink} href={whatsapp('Hola Rocain, quiero cotizar un traslado.')} target="_blank" rel="noreferrer"><WhatsAppIcon className={styles.waIcon} /> +58 412 740 0296</a>
              <a className={styles.contactLink} href={whatsapp('Hola Rocain, quiero cotizar un traslado.', WHATSAPP_2)} target="_blank" rel="noreferrer"><WhatsAppIcon className={styles.waIcon} /> {PHONE}</a>
            </div>
            <a className={styles.contactMail} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <form className={styles.contactForm} id="cotizar" ref={formRef} onSubmit={handleSubmit} data-reveal>
            <h3>Solicita tu cotización</h3>
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
                <option>Traslado al aeropuerto</option>
                <option>Traslado ejecutivo</option>
                <option>Turismo y eventos</option>
                <option>Servicio corporativo</option>
                <option>Otro</option>
              </select>
            </label>
            <label>
              <span>Fecha estimada <small>(opcional)</small></span>
              <input name="date" type="date" min={today()} />
            </label>
            <label className={styles.formWide}>
              <span>Cuéntanos un poco más <small>(opcional)</small></span>
              <textarea name="details" rows={3} placeholder="Origen, destino, cantidad de pasajeros..." />
            </label>
            <button className={styles.formButton} type="submit" disabled={status === 'sending'}>
              {status === 'sending' ? 'Enviando...' : <>Solicitar cotización <span aria-hidden="true">→</span></>}
            </button>
            {status === 'error' && (
              <p className={styles.formError} role="alert">
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
        <a className={styles.logo} href="#inicio"><span className={styles.logoMark}>R</span><span><strong>Rocain</strong><small>Transporte & Ejecutivos</small></span></a>
        <p>© {new Date().getFullYear()} Rocain Transporte y Ejecutivos, S.A. · RIF J-295074251 · La Victoria, Aragua</p>
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
