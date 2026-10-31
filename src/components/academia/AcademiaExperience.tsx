"use client";

import { useEffect, useState, type FormEvent } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock3,
  CreditCard,
  Download,
  FileText,
  GraduationCap,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  NotebookPen,
  Play,
  ReceiptText,
  ShieldCheck,
  Sparkles,
  TrendingUp,
  X,
} from "lucide-react";

type PlanId = "esencial" | "pro" | "elite";
type Modal = "checkout" | "success" | "aula" | null;
type AulaTab = "cursos" | "facturacion";

const plans = [
  {
    id: "esencial" as const,
    label: "Esencial",
    price: 19,
    strap: "Aprende con una ruta clara",
    description: "Para empezar con fundamentos y practicar a tu ritmo.",
    features: [
      "Biblioteca de clases grabadas",
      "Ruta de aprendizaje paso a paso",
      "Plantillas y ejercicios de práctica",
      "Seguimiento de progreso en el aula",
    ],
  },
  {
    id: "pro" as const,
    label: "Pro",
    price: 39,
    strap: "El equilibrio para avanzar",
    description: "Aprendizaje y práctica con mayor continuidad.",
    features: [
      "Todo lo incluido en Esencial",
      "Sesiones grupales de análisis en vivo",
      "Acceso a comunidad de alumnos",
      "Nuevos análisis y materiales periódicos",
    ],
    popular: true,
  },
  {
    id: "elite" as const,
    label: "Elite",
    price: 79,
    strap: "Más acompañamiento",
    description: "Para quienes buscan una experiencia más cercana.",
    features: [
      "Todo lo incluido en Pro",
      "Sesiones grupales de preguntas y respuestas",
      "Talleres de revisión de escenarios",
      "Material adicional de profundización",
    ],
  },
] as const;

const courses = [
  {
    number: "01",
    category: "EL PUNTO DE PARTIDA",
    title: "Fundamentos del mercado",
    copy: "Comprende la estructura del precio y cómo preparar una sesión antes de observar el gráfico.",
    lessons: "8 lecciones · Ejemplo",
    art: "grid",
    icon: Layers3,
  },
  {
    number: "02",
    category: "LECTURA DEL PRECIO",
    title: "Oro, Forex y escenarios",
    copy: "Identifica zonas, estructura de mercado y posibles escenarios sin depender de promesas.",
    lessons: "12 lecciones · Ejemplo",
    art: "lines",
    icon: TrendingUp,
  },
  {
    number: "03",
    category: "EL ELEMENTO CLAVE",
    title: "Gestión del riesgo",
    copy: "Aprende a definir límites, registrar decisiones y evaluar el riesgo de cada operación.",
    lessons: "6 lecciones · Ejemplo",
    art: "rings",
    icon: ShieldCheck,
  },
  {
    number: "04",
    category: "DEL CONCEPTO AL HÁBITO",
    title: "Plan y diario de trading",
    copy: "Construye rutinas, registra tus ejercicios y revisa lo aprendido con disciplina.",
    lessons: "9 lecciones · Ejemplo",
    art: "bars",
    icon: NotebookPen,
  },
] as const;

const steps = [
  { number: "01", icon: CheckCircle2, title: "Elige tu membresía", body: "Selecciona el nivel de formación que mejor se ajuste a ti." },
  { number: "02", icon: CreditCard, title: "Paga de forma segura", body: "En la versión real, cobro mensual con una pasarela compatible." },
  { number: "03", icon: Mail, title: "Recibe tu factura", body: "El sistema enviará la factura fiscal al correo registrado." },
  { number: "04", icon: GraduationCap, title: "Entra a tu aula", body: "Accede al contenido disponible en tu plan mientras esté activo." },
] as const;

const currency = (value: number) => `$${value}`;

function AcademyLogo() {
  return (
    <Link href="/academia" className="aca-logo" aria-label="Club de Traders Academia, inicio">
      <span className="aca-logo-icon">
        <Image src="/clubtraders-logo.png" width={45} height={45} alt="" />
      </span>
      <span className="aca-logo-wordmark">
        <span>CLUB<span className="aca-text-cyan">TRADERS</span></span>
        <small>ACADEMIA DIGITAL</small>
      </span>
    </Link>
  );
}

function ChartArtwork() {
  const candles = [
    [34, 70, 43, 89, true], [59, 51, 36, 82, false], [84, 63, 40, 85, false],
    [109, 47, 27, 68, true], [134, 50, 33, 69, true], [159, 35, 18, 55, false],
    [184, 43, 24, 66, true], [209, 34, 20, 57, true], [234, 26, 12, 48, false],
    [259, 38, 19, 56, true], [284, 24, 8, 50, true], [309, 20, 6, 45, false],
  ] as const;

  return (
    <svg viewBox="0 0 340 120" className="aca-chart" role="img" aria-label="Gráfico decorativo de velas; no representa datos reales">
      {[20, 45, 70, 95].map(y => <line key={y} x1="0" y1={y} x2="340" y2={y} stroke="#29556a" strokeWidth=".6" strokeDasharray="3 6" opacity=".5" />)}
      {[40, 95, 150, 205, 260, 315].map(x => <line key={x} x1={x} y1="0" x2={x} y2="120" stroke="#29556a" strokeWidth=".6" opacity=".35" />)}
      <path d="M0 100 C40 87 52 98 80 82 S132 91 164 62 S222 72 258 37 S309 43 340 11" fill="none" stroke="#03d6f6" strokeWidth="2.3" opacity=".9" />
      {candles.map(([x, body, high, low, up]) => (
        <g key={x} stroke={up ? "#27e2c2" : "#f39078"} fill={up ? "#27e2c2" : "#f39078"}>
          <line x1={x} y1={high} x2={x} y2={low} strokeWidth="1.3" />
          <rect x={x - 4} y={Math.min(body, body + (up ? 12 : -12))} width="8" height="12" rx="1" opacity=".85" />
        </g>
      ))}
    </svg>
  );
}

export default function AcademiaExperience() {
  const [modal, setModal] = useState<Modal>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanId>("pro");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [aulaTab, setAulaTab] = useState<AulaTab>("cursos");
  const [menuOpen, setMenuOpen] = useState(false);
  const plan = plans.find(item => item.id === selectedPlan) ?? plans[1];

  useEffect(() => {
    if (!modal) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setModal(null);
    };
    document.addEventListener("keydown", onKeyDown);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previous;
    };
  }, [modal]);

  const showCheckout = (id: PlanId) => {
    setSelectedPlan(id);
    setMenuOpen(false);
    setModal("checkout");
  };

  const showAula = () => {
    setAulaTab("cursos");
    setMenuOpen(false);
    setModal("aula");
  };

  const simulateCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModal("success");
  };

  return (
    <main className="aca-root" id="inicio">
      <div className="aca-demo-ribbon">
        <span className="aca-ribbon-pulse" />
        PROTOTIPO INTERACTIVO
        <span className="aca-ribbon-divider" />
        <span>Sin cobros reales ni envíos de correo</span>
      </div>

      <header className="aca-header">
        <div className="aca-container aca-header-content">
          <AcademyLogo />
          <nav className={`aca-nav ${menuOpen ? "aca-nav-open" : ""}`} aria-label="Navegación principal">
            <a href="#formacion" onClick={() => setMenuOpen(false)}>Formación</a>
            <a href="#experiencia" onClick={() => setMenuOpen(false)}>Cómo funciona</a>
            <a href="#planes" onClick={() => setMenuOpen(false)}>Membresías</a>
            <a href="#preguntas" onClick={() => setMenuOpen(false)}>Preguntas</a>
            <button className="aca-nav-mobile-aula" onClick={showAula}>Ver aula del alumno</button>
          </nav>
          <div className="aca-header-actions">
            <button className="aca-header-login" onClick={showAula}>Vista del alumno <ArrowUpRight size={15} /></button>
            <a className="aca-btn aca-btn-primary aca-header-join" href="#planes">Explorar planes <ArrowRight size={16} /></a>
            <button className="aca-menu-toggle" type="button" aria-expanded={menuOpen} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} onClick={() => setMenuOpen(open => !open)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      <section className="aca-hero">
        <div className="aca-hero-glow" />
        <div className="aca-container aca-hero-layout">
          <div className="aca-hero-content">
            <div className="aca-eyebrow"><span className="aca-eyebrow-line" /> EL SIGUIENTE PASO EN TU FORMACIÓN</div>
            <h1>El mercado cambia.<br /><span>Tu forma de aprender</span> también.</h1>
            <p>Domina los fundamentos, practica el análisis de Oro y Forex y construye un método propio. Una academia digital para aprender con estructura, disciplina y acompañamiento.</p>
            <div className="aca-hero-buttons">
              <a href="#planes" className="aca-btn aca-btn-primary aca-btn-lg">Conocer las membresías <ArrowRight size={19} /></a>
              <button className="aca-btn aca-btn-secondary aca-btn-lg" onClick={showAula}><Play size={17} fill="currentColor" /> Explorar el aula</button>
            </div>
            <div className="aca-hero-notes">
              <span><CheckCircle2 size={17} /> Formación a tu ritmo</span>
              <span><CheckCircle2 size={17} /> Acceso mensual</span>
              <span><CheckCircle2 size={17} /> Gestión de tu suscripción</span>
            </div>
          </div>

          <div className="aca-hero-visual" aria-label="Presentación visual de la academia">
            <div className="aca-portrait-panel">
              <Image src="/richard-profesional.webp" fill priority sizes="(min-width: 1120px) 440px, (min-width: 750px) 360px, 85vw" alt="Richard Veintimilla, instructor de Club de Traders" />
              <div className="aca-portrait-shade" />
              <div className="aca-portrait-label">
                <span className="aca-small-label">APRENDE CON</span>
                <strong>Richard Veintimilla</strong>
                <span>Fundador e instructor de Club de Traders</span>
              </div>
            </div>
            <div className="aca-floating-chart">
              <div className="aca-floating-chart-head"><span>ANÁLISIS DE MERCADO</span><span className="aca-chart-dot" /></div>
              <ChartArtwork />
              <div className="aca-floating-chart-foot"><span>Oro · Forex</span><span>Gráfico ilustrativo</span></div>
            </div>
            <div className="aca-floating-lesson">
              <div className="aca-floating-lesson-icon"><Play size={16} fill="currentColor" /></div>
              <div><small>CONTINÚA APRENDIENDO</small><strong>Tu próxima lección</strong><span>Disponible en el aula de ejemplo</span></div>
            </div>
          </div>
        </div>
        <div className="aca-hero-bottom-line" />
      </section>

      <div className="aca-benefit-strip">
        <div className="aca-container aca-benefits">
          <div><BookOpen size={20} /><span>Lecciones organizadas</span></div>
          <div><CalendarDays size={20} /><span>Sesiones en directo*</span></div>
          <div><MessageCircle size={20} /><span>Comunidad de aprendizaje*</span></div>
          <div><ReceiptText size={20} /><span>Facturación por email*</span></div>
        </div>
      </div>

      <section className="aca-section aca-why-section" id="metodo">
        <div className="aca-container">
          <div className="aca-section-heading aca-heading-split">
            <div><div className="aca-kicker">UNA FORMA DIFERENTE DE APRENDER</div><h2>Menos ruido.<br /><span>Más método.</span></h2></div>
            <p>El trading se aprende mejor cuando cada concepto tiene un orden, cada ejercicio un propósito y cada decisión un proceso. Así imaginamos el Club de Traders del futuro.</p>
          </div>
          <div className="aca-value-grid">
            <div className="aca-value-card"><span className="aca-value-number">01 / APRENDER</span><BookOpen size={27} /><h3>De la base a la práctica</h3><p>Una ruta organizada para no saltar de un vídeo a otro sin saber qué estudiar después.</p></div>
            <div className="aca-value-card"><span className="aca-value-number">02 / APLICAR</span><TrendingUp size={27} /><h3>Escenarios, no promesas</h3><p>Ejercicios sobre lectura del mercado, planificación y riesgos de operar.</p></div>
            <div className="aca-value-card"><span className="aca-value-number">03 / EVOLUCIONAR</span><NotebookPen size={27} /><h3>Mejora continua</h3><p>Materiales, sesiones y recursos que acompañan tus hábitos de estudio.</p></div>
          </div>
        </div>
      </section>

      <section className="aca-section aca-courses-section" id="formacion">
        <div className="aca-container">
          <div className="aca-section-heading aca-courses-heading">
            <div><div className="aca-kicker">BIBLIOTECA DE APRENDIZAJE</div><h2>Todo empieza por <span>entender.</span></h2></div>
            <p>Una propuesta inicial de módulos. Temario, cantidad de clases y disponibilidad se definirán junto al instructor.</p>
          </div>
          <div className="aca-course-grid">
            {courses.map(course => {
              const Icon = course.icon;
              return <article className="aca-course-card" key={course.number}>
                <div className={`aca-course-art aca-course-art-${course.art}`}>
                  <span className="aca-course-number">{course.number}</span>
                  <Icon className="aca-course-art-icon" size={69} strokeWidth={1.15} />
                  <div className="aca-art-sheen" />
                </div>
                <div className="aca-course-info">
                  <span className="aca-course-category">{course.category}</span>
                  <h3>{course.title}</h3><p>{course.copy}</p>
                  <div className="aca-course-foot"><span><BookOpen size={14} /> {course.lessons}</span><ChevronRight size={19} /></div>
                </div>
              </article>;
            })}
          </div>
          <div className="aca-courses-caption"><Sparkles size={16} /> Cursos y lecciones mostrados a modo de propuesta visual.</div>
        </div>
      </section>

      <section className="aca-section aca-experience-section" id="experiencia">
        <div className="aca-container aca-experience-layout">
          <div className="aca-experience-copy">
            <div className="aca-kicker">TU ESPACIO PRIVADO</div>
            <h2>Tu academia.<br /><span>Tu ritmo.</span></h2>
            <p>Imagina iniciar sesión y tener todo lo que necesitas en un mismo lugar: tus cursos, tu avance, las próximas clases y tus facturas.</p>
            <div className="aca-experience-points">
              <div><span><Check size={16} /></span><div><strong>Panel de alumno</strong><p>Lecciones por módulos y seguimiento del avance.</p></div></div>
              <div><span><Check size={16} /></span><div><strong>Próximas sesiones</strong><p>Agenda de actividades y materiales del plan.</p></div></div>
              <div><span><Check size={16} /></span><div><strong>Suscripción bajo control</strong><p>Consultar pagos, descargar facturas y gestionar la renovación.</p></div></div>
            </div>
            <button onClick={showAula} className="aca-btn aca-btn-primary aca-btn-lg">Probar el área del alumno <ArrowUpRight size={18} /></button>
          </div>
          <button type="button" onClick={showAula} className="aca-dashboard-visual" aria-label="Abrir demostración del área del alumno">
            <div className="aca-dashboard-top"><span className="aca-dashboard-welcome">MI AULA / CLUB DE TRADERS</span><span className="aca-dashboard-avatar">RV</span></div>
            <div className="aca-dashboard-welcome-title">¡Bienvenido a tu espacio!</div>
            <div className="aca-dashboard-subtitle">Continúa donde lo dejaste.</div>
            <div className="aca-dashboard-preview-card">
              <div className="aca-dashboard-preview-thumbnail"><Play fill="currentColor" size={19} /></div>
              <div><span>RUTA DE APRENDIZAJE · EJEMPLO</span><strong>Cómo leer la estructura del precio</strong><div className="aca-dashboard-bar"><i /></div><small>40% completado · Progreso ilustrativo</small></div>
            </div>
            <div className="aca-dashboard-list-title">Tus siguientes pasos</div>
            <div className="aca-dashboard-mini-row"><span className="aca-mini-icon"><BookOpen size={17} /></span><span>Gestión del riesgo: primera lección</span><ChevronRight size={17} /></div>
            <div className="aca-dashboard-mini-row"><span className="aca-mini-icon"><CalendarDays size={17} /></span><span>Próxima sesión del Club</span><ChevronRight size={17} /></div>
            <div className="aca-dashboard-open">Abrir el aula de ejemplo <ArrowUpRight size={16} /></div>
          </button>
        </div>
      </section>

      <section className="aca-section aca-pricing-section" id="planes">
        <div className="aca-container">
          <div className="aca-section-heading aca-center-heading">
            <div className="aca-kicker">MEMBRESÍAS MENSUALES</div>
            <h2>Un plan para cada <span>etapa.</span></h2>
            <p>La misma filosofía de aprendizaje, diferentes niveles de acceso. Sin permanencia en esta propuesta de ejemplo.</p>
            <div className="aca-pricing-term"><span className="aca-term-dot" /> Facturación mensual · USD · Precios ilustrativos</div>
          </div>
          <div className="aca-pricing-grid">
            {plans.map(item => (
              <article key={item.id} className={`aca-pricing-card ${"popular" in item && item.popular ? "aca-pricing-popular" : ""}`}>
                {"popular" in item && item.popular ? <div className="aca-popular-pill"><Sparkles size={13} /> OPCIÓN DESTACADA</div> : null}
                <span className="aca-plan-name">PLAN {item.label.toUpperCase()}</span>
                <h3>{item.strap}</h3><p className="aca-plan-description">{item.description}</p>
                <div className="aca-price"><strong>{currency(item.price)}</strong><span>USD / mes</span></div>
                <div className="aca-price-caption">Importe de ejemplo, impuestos no calculados.</div>
                <button className={`aca-btn ${"popular" in item && item.popular ? "aca-btn-primary" : "aca-btn-plan"}`} onClick={() => showCheckout(item.id)}>
                  Elegir {item.label} <ArrowRight size={17} />
                </button>
                <div className="aca-plan-rule" />
                <div className="aca-plan-includes">QUÉ INCLUIRÍA</div>
                <ul>{item.features.map(feature => <li key={feature}><Check size={16} />{feature}</li>)}</ul>
              </article>
            ))}
          </div>
          <p className="aca-pricing-notice"><ShieldCheck size={17} /> Este es un prototipo. Los planes, precios, condiciones y contenidos requieren aprobación del negocio antes de aceptar pagos.</p>
        </div>
      </section>

      <section className="aca-section aca-steps-section" id="como-funciona">
        <div className="aca-container">
          <div className="aca-section-heading aca-center-heading"><div className="aca-kicker">DE LA SUSCRIPCIÓN A TU PRIMERA CLASE</div><h2>Simple para el alumno.<br /><span>Automático para el Club.</span></h2></div>
          <div className="aca-step-grid">
            {steps.map(step => { const Icon = step.icon; return <div className="aca-step-card" key={step.number}><span className="aca-step-number">{step.number}</span><div className="aca-step-icon"><Icon size={23} /></div><h3>{step.title}</h3><p>{step.body}</p></div>; })}
          </div>
          <div className="aca-automation-note"><LockKeyhole size={18} /><span>En producción: pasarela de cobro recurrente compatible con el país del negocio + facturación electrónica + acceso condicionado a una suscripción activa.</span></div>
        </div>
      </section>

      <section className="aca-section aca-faq-section" id="preguntas">
        <div className="aca-container aca-faq-layout">
          <div><div className="aca-kicker">RESOLVEMOS TUS DUDAS</div><h2>Preguntas<br /><span>frecuentes.</span></h2><p>Las respuestas reflejan el funcionamiento previsto para la plataforma, sujeto a definir las condiciones definitivas.</p></div>
          <div className="aca-faq-items">
            <details><summary>¿La suscripción se renueva automáticamente?<span>+</span></summary><p>La propuesta utiliza pagos recurrentes mensuales. Antes de confirmar el pago real, cada alumno verá el importe y las condiciones de renovación.</p></details>
            <details><summary>¿Puedo cancelar mi membresía?<span>+</span></summary><p>La idea es que puedas gestionar tu suscripción desde tu área de facturación. El acceso al contenido se ajustaría a las condiciones del plan contratado.</p></details>
            <details><summary>¿Recibiré una factura en mi correo?<span>+</span></summary><p>En la versión final, los pagos se registrarán en el sistema y se configurará el envío de facturas o recibos por email según los datos fiscales del negocio y la normativa aplicable.</p></details>
            <details><summary>¿Las clases se pueden ver desde el móvil?<span>+</span></summary><p>El aula está diseñada para móvil, tableta y ordenador. Los materiales estarán disponibles de acuerdo con el plan activo.</p></details>
            <details><summary>¿En esta demostración se cobra dinero?<span>+</span></summary><p>No. Este prototipo enseña el recorrido del usuario, pero no recoge datos de tarjetas, no realiza cargos y no envía correos reales.</p></details>
          </div>
        </div>
      </section>

      <section className="aca-last-cta">
        <div className="aca-container aca-last-cta-inner"><div className="aca-last-cta-orb" />
          <div className="aca-kicker">¿LISTO PARA VER CÓMO FUNCIONARÍA?</div>
          <h2>Una academia para aprender.<br /><span>Un club para seguir creciendo.</span></h2>
          <p>Explora las membresías y prueba el recorrido de alta como si fueras un alumno.</p>
          <a href="#planes" className="aca-btn aca-btn-primary aca-btn-lg">Explorar las membresías <ArrowRight size={18} /></a>
        </div>
      </section>

      <footer className="aca-footer"><div className="aca-container">
        <div className="aca-footer-main"><div><AcademyLogo /><p>Una propuesta de academia digital de formación en trading con Richard Veintimilla.</p></div><div className="aca-footer-links"><a href="#formacion">Formación</a><a href="#planes">Membresías</a><a href="#preguntas">Preguntas frecuentes</a><Link href="/">Web del Bootcamp <ArrowUpRight size={14} /></Link></div></div>
        <div className="aca-footer-warning">El trading en Forex, oro y productos apalancados implica riesgo elevado, incluida la pérdida total del capital. El contenido es educativo y no constituye asesoramiento financiero ni promesa de rentabilidad. Los cursos, precios, sesiones y funcionalidades de esta página son una demostración sujeta a validación.</div>
        <div className="aca-footer-bottom"><span>© Club de Traders · Propuesta de academia</span><span>Diseño de prototipo · No se procesan pagos</span></div>
      </div></footer>

      {modal ? (
        <div className="aca-modal-backdrop" role="presentation" onMouseDown={event => { if (event.target === event.currentTarget) setModal(null); }}>
          <div className={`aca-modal ${modal === "aula" ? "aca-modal-wide" : ""}`} role="dialog" aria-modal="true" aria-labelledby="aca-modal-title">
            <button className="aca-modal-close" onClick={() => setModal(null)} aria-label="Cerrar ventana"><X size={21} /></button>

            {modal === "checkout" ? <div className="aca-checkout">
              <div className="aca-modal-eyebrow">SIMULACIÓN DE SUSCRIPCIÓN · PASO 1 DE 2</div>
              <h2 id="aca-modal-title">Tu siguiente paso<br /><span>empieza aquí.</span></h2>
              <p className="aca-modal-intro">Estás a punto de probar cómo sería la contratación de una membresía mensual.</p>
              <div className="aca-checkout-summary"><div><span>PLAN SELECCIONADO</span><strong>{plan.label}</strong></div><div className="aca-checkout-summary-price">{currency(plan.price)}<small>USD / mes</small></div></div>
              <form onSubmit={simulateCheckout}>
                <label htmlFor="aca-fullname">Nombre del alumno</label>
                <input id="aca-fullname" type="text" autoComplete="name" minLength={2} maxLength={100} placeholder="Ej.: Juan Pérez" value={fullName} onChange={event => setFullName(event.target.value)} required />
                <label htmlFor="aca-email">Correo para tu cuenta y facturación</label>
                <input id="aca-email" type="email" autoComplete="email" maxLength={254} placeholder="nombre@correo.com" value={email} onChange={event => setEmail(event.target.value)} required />
                <div className="aca-payment-method"><CreditCard size={21} /><div><strong>Pago mensual con tarjeta</strong><span>Pasarela real pendiente de elección y alta.</span></div><span className="aca-payment-demo">DEMO</span></div>
                <button type="submit" className="aca-btn aca-btn-primary aca-btn-full">Simular suscripción de {currency(plan.price)}/mes <ArrowRight size={17} /></button>
              </form>
              <p className="aca-modal-safety"><LockKeyhole size={15} /> No se solicita tarjeta. Los datos de este formulario no salen de tu navegador.</p>
            </div> : null}

            {modal === "success" ? <div className="aca-success">
              <div className="aca-success-icon"><CheckCircle2 size={34} /></div>
              <div className="aca-modal-eyebrow">SIMULACIÓN COMPLETADA · PASO 2 DE 2</div>
              <h2 id="aca-modal-title">¡Así de fácil<br /><span>sería empezar!</span></h2>
              <p>La suscripción <strong>{plan.label}</strong> de {currency(plan.price)}/mes se ha simulado para <strong>{fullName}</strong>. No se ha realizado ningún cargo.</p>
              <div className="aca-invoice-preview"><div className="aca-invoice-top"><ReceiptText size={23} /><span>VISTA PREVIA DEL EMAIL</span></div><strong>Confirmación de tu membresía Club de Traders</strong><p>Destinatario: {email}</p><div className="aca-invoice-line"><span>Plan {plan.label} · Periodicidad mensual</span><strong>{currency(plan.price)} USD</strong></div><small>Documento ilustrativo · DEMO-001 · La factura electrónica real se emitirá desde un sistema fiscal autorizado cuando se configure el negocio.</small></div>
              <button onClick={showAula} className="aca-btn aca-btn-primary aca-btn-full">Explorar mi aula de ejemplo <ArrowRight size={17} /></button>
              <button className="aca-text-button" onClick={() => setModal(null)}>Volver a la academia</button>
            </div> : null}

            {modal === "aula" ? <div className="aca-aula">
              <div className="aca-aula-header"><div><div className="aca-modal-eyebrow">VISTA DE DEMOSTRACIÓN · ÁREA PRIVADA</div><h2 id="aca-modal-title">Mi aula <span>Club de Traders</span></h2></div><span className="aca-aula-avatar">AL</span></div>
              <div className="aca-aula-tabs" role="tablist" aria-label="Secciones del aula">
                <button role="tab" aria-selected={aulaTab === "cursos"} className={aulaTab === "cursos" ? "aca-aula-active" : ""} onClick={() => setAulaTab("cursos")}><BookOpen size={17} /> Mis cursos</button>
                <button role="tab" aria-selected={aulaTab === "facturacion"} className={aulaTab === "facturacion" ? "aca-aula-active" : ""} onClick={() => setAulaTab("facturacion")}><ReceiptText size={17} /> Facturación</button>
              </div>
              {aulaTab === "cursos" ? <div className="aca-aula-content" role="tabpanel">
                <div className="aca-aula-greeting"><div><h3>Continúa aprendiendo</h3><p>Este panel muestra contenido ilustrativo del futuro campus.</p></div><span className="aca-aula-plan"><span className="aca-aula-plan-dot" /> PLAN PRO · EJEMPLO</span></div>
                <div className="aca-aula-feature-course"><div className="aca-aula-course-art"><Play size={29} fill="currentColor" /></div><div><span>CURSO 01 · FUNDAMENTOS</span><h4>La estructura del precio</h4><p>Lección 3 de 8 · Material de demostración</p><div className="aca-progress"><i /></div><small>40% completado · dato de ejemplo</small></div></div>
                <div className="aca-aula-section-title">Tu biblioteca</div>
                <div className="aca-aula-course-list">{courses.slice(1).map(course => <div key={course.number}><span className="aca-aula-course-icon"><course.icon size={20} /></span><div><strong>{course.title}</strong><small>{course.lessons}</small></div><ChevronRight size={19} /></div>)}</div>
                <div className="aca-aula-hint"><CalendarDays size={17} /> Sesiones en vivo: calendario disponible al activar el servicio real.</div>
              </div> : <div className="aca-aula-content" role="tabpanel">
                <div className="aca-aula-greeting"><div><h3>Mi suscripción</h3><p>Así vería el alumno su estado, sus pagos y sus documentos.</p></div><span className="aca-aula-plan"><span className="aca-aula-plan-dot" /> DEMO</span></div>
                <div className="aca-billing-card"><div><span>PLAN ACTIVO · EJEMPLO</span><h4>Club de Traders Pro</h4><p>Renovación mensual automática (simulación)</p></div><strong>$39 <small>USD/mes</small></strong></div>
                <div className="aca-aula-section-title">Historial de documentos de ejemplo</div>
                <div className="aca-billing-row"><span><FileText size={19} /> DEMO-001 · Factura ilustrativa</span><span><Download size={17} /> Sin descarga real</span></div>
                <div className="aca-billing-info"><ShieldCheck size={20} /><p>En producción, esta sección permitirá consultar facturas electrónicas, gestionar el método de pago y cancelar la suscripción según las capacidades del proveedor elegido.</p></div>
              </div>}
              <div className="aca-aula-footer"><button className="aca-text-button" onClick={() => setModal(null)}><ArrowLeft size={16} /> Volver a la web</button><span>Prototipo · Sin cuenta real</span></div>
            </div> : null}
          </div>
        </div>
      ) : null}
    </main>
  );
}
