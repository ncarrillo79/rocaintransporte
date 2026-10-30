import { useEffect, useState, type FormEvent } from 'react';
import styles from './TransportPage.module.css';

const WHATSAPP = '584127400296';
const PHONE = '+58 424 301 8032';
const EMAIL = 'rocaintransporte1@gmail.com';

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

function whatsapp(message: string) {
  return `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
}

function emailRequest(subject: string, body: string) {
  return `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    document.title = 'Rocain | Transporte ejecutivo';
  }, []);

  const closeMenu = () => setMenuOpen(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const phone = String(form.get('phone') ?? '').trim();
    const service = String(form.get('service') ?? '').trim();
    const date = String(form.get('date') ?? '').trim();
    const details = String(form.get('details') ?? '').trim();
    const message = [
      'Hola Rocain, quiero solicitar un traslado.',
      `Nombre: ${name}`,
      `Teléfono: ${phone}`,
      `Servicio: ${service}`,
      date ? `Fecha estimada: ${date}` : '',
      details ? `Detalles: ${details}` : '',
    ].filter(Boolean).join('\n');

    setSubmitted(true);
    window.location.href = emailRequest('Solicitud de cotización - Rocain', message);
    event.currentTarget.reset();
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
              <a className={styles.primaryButton} href={whatsapp('Hola Rocain, necesito información sobre un traslado.')} target="_blank" rel="noreferrer">Planifica tu viaje <span>↗</span></a>
              <a className={styles.textButton} href="#servicios">Conoce nuestros servicios <span>↓</span></a>
            </div>
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
            <a className={styles.contactLink} href={whatsapp('Hola Rocain, quiero cotizar un traslado.')} target="_blank" rel="noreferrer">+58 412 740 0296 <span>↗</span></a>
            <a className={styles.contactPhone} href="tel:+584243018032">{PHONE}</a>
            <a className={styles.contactMail} href={`mailto:${EMAIL}`}>{EMAIL}</a>
          </div>
          <form className={styles.contactForm} onSubmit={handleSubmit}>
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
              Fecha estimada <span>(opcional)</span>
              <input name="date" type="date" />
            </label>
            <label className={styles.formWide}>
              Cuéntanos un poco más <span>(opcional)</span>
              <textarea name="details" rows={3} placeholder="Origen, destino, cantidad de pasajeros..." />
            </label>
            <button className={styles.formButton} type="submit">Solicitar cotización <span>↗</span></button>
            {submitted && <p className={styles.formSuccess} role="status">Se abrió tu correo con la solicitud preparada para enviarla.</p>}
          </form>
        </section>
      </main>

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
        <span className={styles.whatsappIcon} aria-hidden="true">WA</span>
        <span className={styles.whatsappText}>Cotiza por WhatsApp</span>
      </a>
    </div>
  );
}
