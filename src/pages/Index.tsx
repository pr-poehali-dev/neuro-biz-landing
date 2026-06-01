import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const NAV_LINKS = [
  { label: 'Сценарии', href: '#scenarios' },
  { label: 'Что такое Перепрошивка?', href: '#what-is' },
  { label: 'Как проходит тренинг', href: '#how-it-goes' },
  { label: 'Автор тренинга', href: '#author' },
  { label: 'Ведущая тренинга', href: '#trainer' },
  { label: 'Кейсы и отзывы', href: '#cases' },
  { label: 'Для кого', href: '#for-whom' },
  { label: 'Тарифы', href: '#prices' },
  { label: 'Вопросы и ответы', href: '#faq' },
  { label: 'Контакты', href: '#contacts' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  const handleClick = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}
      style={{ background: scrolled ? 'rgba(10,8,6,0.97)' : 'rgba(10,8,6,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(201,168,76,0.1)' }}>
      <div className="container mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
        <div className="font-display text-lg font-bold text-gold-gradient tracking-widest flex-shrink-0">ПЕРЕПРОШИВКА</div>
        {/* Desktop */}
        <div className="hidden xl:flex items-center gap-1 flex-wrap">
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => handleClick(l.href)}
              className="text-xs px-2 py-1.5 rounded transition-colors hover:text-yellow-400 whitespace-nowrap"
              style={{ color: 'var(--text-muted)' }}>
              {l.label}
            </button>
          ))}
        </div>
        <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
          className="hidden xl:flex btn-gold items-center gap-1.5 rounded-sm px-4 py-2 text-xs font-bold flex-shrink-0">
          Забронировать участие
        </a>
        {/* Burger */}
        <button className="xl:hidden flex flex-col gap-1.5 p-2" onClick={() => setOpen(v => !v)}>
          <span className={`block w-6 h-0.5 transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} style={{ background: 'var(--gold)' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${open ? 'opacity-0' : ''}`} style={{ background: 'var(--gold)' }} />
          <span className={`block w-6 h-0.5 transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} style={{ background: 'var(--gold)' }} />
        </button>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="xl:hidden border-t px-4 py-4 space-y-1" style={{ background: 'rgba(10,8,6,0.98)', borderColor: 'rgba(201,168,76,0.15)' }}>
          {NAV_LINKS.map(l => (
            <button key={l.href} onClick={() => handleClick(l.href)}
              className="block w-full text-left text-sm px-3 py-2.5 rounded transition-colors hover:text-yellow-400"
              style={{ color: 'var(--text-muted)' }}>
              {l.label}
            </button>
          ))}
          <a href={TELEGRAM_URL} target="_blank" rel="noopener noreferrer"
            className="btn-gold flex items-center justify-center gap-2 rounded-sm px-4 py-3 text-sm font-bold mt-2 w-full">
            Забронировать участие
          </a>
        </div>
      )}
    </nav>
  );
};

const TELEGRAM_URL = 'https://t.me/volshebnitsaa';
const OKSANA_PHOTO = 'https://cdn.poehali.dev/projects/56a7f61f-7ee4-4360-8538-7f713b707ebd/bucket/81ae1fdf-b495-4941-8cc8-cb6cfffc52fd.jpg';
const OKSANA_PHOTO2 = 'https://cdn.poehali.dev/projects/56a7f61f-7ee4-4360-8538-7f713b707ebd/bucket/89d43649-e02d-4a5c-b6a4-75108ef3f1e4.png';
const DMITRY_PHOTO = 'https://cdn.poehali.dev/projects/56a7f61f-7ee4-4360-8538-7f713b707ebd/bucket/435e1dd3-09d5-45c3-9cb7-abf60ed0f892.JPG';

// Target date: June 4, 2026
const TARGET_DATE = new Date('2026-06-04T16:00:00');

function calcTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    minutes: Math.floor((diff % 3600000) / 60000),
    seconds: Math.floor((diff % 60000) / 1000),
  };
}

function useCountdown(target: Date) {
  const [time, setTime] = useState(() => calcTimeLeft(target));
  useEffect(() => {
    const t = setInterval(() => setTime(calcTimeLeft(target)), 1000);
    return () => clearInterval(t);
  }, [target]);
  return time;
}

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

const CTAButton = ({ children, className = '', size = 'default' }: { children: React.ReactNode; className?: string; size?: 'default' | 'large' }) => (
  <a
    href={TELEGRAM_URL}
    target="_blank"
    rel="noopener noreferrer"
    className={`btn-gold inline-flex items-center gap-2 rounded-sm font-semibold tracking-wide transition-all duration-300 ${
      size === 'large' ? 'px-10 py-5 text-lg' : 'px-8 py-4 text-base'
    } ${className}`}
  >
    {children}
  </a>
);

const TimerBlock = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center">
    <div className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gold-gradient tabular-nums min-w-[44px] sm:min-w-[56px] md:min-w-[64px] text-center">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-[10px] sm:text-xs uppercase tracking-[0.15em] mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
  </div>
);

const SectionHeader = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`text-center mb-10 sm:mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {eyebrow && (
        <div className="text-xs sm:text-sm uppercase tracking-[0.2em] sm:tracking-[0.25em] mb-3 sm:mb-4 font-semibold" style={{ color: 'var(--gold)' }}>{eyebrow}</div>
      )}
      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 sm:mb-5 px-2" style={{ color: 'var(--text-main)' }}>
        {title}
      </h2>
      <div className="section-divider mb-4 sm:mb-5" />
      {subtitle && (
        <p className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </div>
  );
};

// Block 1: Hero
const HeroSection = () => {
  const time = useCountdown(TARGET_DATE);
  return (
    <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden noise-overlay pt-16">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: 'radial-gradient(ellipse at right top, rgba(155,28,28,0.6), transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10"
          style={{ background: 'radial-gradient(ellipse at left bottom, rgba(201,168,76,0.5), transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Фото — на мобиле сверху, компактнее */}
          <div className="order-1 md:order-2 flex justify-center animate-fade-in delay-200">
            <div className="relative w-full max-w-[280px] sm:max-w-sm md:max-w-md">
              <div className="absolute -inset-3 rounded-sm opacity-20"
                style={{ background: 'linear-gradient(135deg, var(--gold) 0%, transparent 60%)' }} />
              <img
                src={OKSANA_PHOTO2}
                alt="Оксана Панасенко — ведущая тренинга Перепрошивка"
                className="relative w-full rounded-sm object-cover object-top"
                style={{ aspectRatio: '3/4', filter: 'contrast(1.05) saturate(0.9)' }}
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-sm p-3"
                style={{ background: 'rgba(10,8,6,0.82)', backdropFilter: 'blur(8px)', border: '1px solid rgba(201,168,76,0.3)' }}>
                <div className="font-display text-lg sm:text-xl font-bold" style={{ color: '#fff' }}>Оксана Панасенко</div>
                <div className="text-xs sm:text-sm mt-1 font-medium" style={{ color: 'var(--gold)' }}>Сертифицированный тренер · Энергопрактик</div>
              </div>
            </div>
          </div>

          {/* Текст */}
          <div className="order-2 md:order-1">
            <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-4 sm:mb-6 font-semibold animate-fade-in" style={{ color: 'var(--gold)' }}>
              Трансформационный тренинг · Метод Дмитрия Хара
            </div>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold leading-none mb-4 sm:mb-6 animate-fade-in-up delay-100">
              <span className="text-gold-gradient">ПЕРЕ-</span>
              <br />
              <span style={{ color: 'var(--text-main)' }}>ПРОШИВКА</span>
            </h1>
            <p className="text-base sm:text-xl md:text-2xl font-light leading-relaxed mb-6 sm:mb-10 animate-fade-in-up delay-200"
              style={{ color: 'var(--text-muted)', fontStyle: 'italic' }}>
              Глубокие изменения через тело, эмоции и осознанность
            </p>

            <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:gap-6 text-xs sm:text-sm mb-6 sm:mb-10 animate-fade-in-up delay-300">
              {[
                { icon: 'Calendar', text: '4–7 июня 2026' },
                { icon: 'MapPin', text: 'Краснодар' },
                { icon: 'Home', text: 'Вилла Ра Хаус' },
                { icon: 'Star', text: 'Выездной формат' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <Icon name={icon} size={14} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="mb-6 sm:mb-10 animate-fade-in-up delay-400">
              <div className="text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-3 sm:mb-4" style={{ color: 'var(--text-muted)' }}>До начала тренинга</div>
              <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
                <TimerBlock value={time.days} label="дней" />
                <div className="font-display text-xl sm:text-3xl" style={{ color: 'var(--gold)', opacity: 0.5 }}>:</div>
                <TimerBlock value={time.hours} label="часов" />
                <div className="font-display text-xl sm:text-3xl" style={{ color: 'var(--gold)', opacity: 0.5 }}>:</div>
                <TimerBlock value={time.minutes} label="минут" />
                <div className="font-display text-xl sm:text-3xl" style={{ color: 'var(--gold)', opacity: 0.5 }}>:</div>
                <TimerBlock value={time.seconds} label="секунд" />
              </div>
            </div>

            <div className="animate-fade-in-up delay-500">
              <CTAButton size="large" className="animate-pulse-gold w-full sm:w-auto justify-center">
                Забронировать место
                <Icon name="ArrowRight" size={20} />
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Block 2: Pain point
const PainSection = () => {
  const { ref, inView } = useInView();
  const items = [
    'Читали книги и проходили курсы',
    'Смотрели мотивационные видео',
    'Понимаете, что именно нужно делать',
    'Ходили к психологу или на коучинг',
  ];
  const pains = [
    'Тревога не уходит',
    'Нет энергии на жизнь',
    'Одни и те же проблемы по кругу',
    'Отношения не меняются',
    'Доход топчется на месте',
    'Чувство, что жизнь проходит мимо',
  ];
  return (
    <section className="py-16 sm:py-28" style={{ background: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Точка боли"
          title="Вы уже многое знаете. Но почему жизнь не меняется?"
        />
        <div ref={ref} className={`grid md:grid-cols-2 gap-5 sm:gap-8 max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="glass-card rounded-sm p-8">
            <div className="text-xs uppercase tracking-[0.25em] mb-6 font-semibold" style={{ color: 'var(--gold)' }}>Уже было</div>
            <ul className="space-y-4">
              {items.map(i => (
                <li key={i} className="flex items-start gap-3">
                  <Icon name="Check" size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--gold)' }} />
                  <span style={{ color: 'var(--text-main)' }}>{i}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card rounded-sm p-8" style={{ borderColor: 'rgba(155,28,28,0.3)' }}>
            <div className="text-xs uppercase tracking-[0.25em] mb-6 font-semibold" style={{ color: 'var(--crimson-bright)' }}>Но остаётся</div>
            <ul className="space-y-4">
              {pains.map(p => (
                <li key={p} className="flex items-start gap-3">
                  <Icon name="X" size={18} className="mt-0.5 flex-shrink-0" style={{ color: 'var(--crimson-bright)' }} />
                  <span style={{ color: 'var(--text-main)' }}>{p}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center mt-14 max-w-2xl mx-auto">
          <p className="font-display text-2xl md:text-3xl font-light italic leading-relaxed" style={{ color: 'var(--text-main)' }}>
            «Проблема не в знаниях. Проблема в{' '}
            <span className="text-gold-gradient not-italic font-medium">старых сценариях</span>,
            которые управляют вашей жизнью.»
          </p>
        </div>
      </div>
    </section>
  );
};

const ScenarioCard = ({ title, behavior, consequence, delay }: { title: string; behavior: string; consequence: string; delay: number }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`scenario-card rounded-sm p-7 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display text-2xl mb-4 text-gold-gradient font-medium">{title}</div>
      <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-main)' }}>{behavior}</p>
      <div className="pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="text-xs uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--crimson-bright)' }}>Последствия</div>
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>{consequence}</p>
      </div>
    </div>
  );
};

// Block 3: Scenarios
const ScenariosSection = () => {
  const scenarios = [
    {
      title: 'Спасатель',
      behavior: 'Помогает всем вокруг, забывая о себе. Ставит чужие нужды выше своих.',
      consequence: 'Хроническая усталость, обиды, ощущение использованности',
    },
    {
      title: 'Контролёр',
      behavior: 'Всё должно быть по плану. Сложно доверять другим и отпускать контроль.',
      consequence: 'Постоянное напряжение, конфликты, невозможность расслабиться',
    },
    {
      title: 'Жертва',
      behavior: 'Жизнь происходит "со мной". Обстоятельства сильнее моих желаний.',
      consequence: 'Беспомощность, застой, потеря веры в собственные силы',
    },
    {
      title: 'Недостаточно хороший',
      behavior: 'Постоянное сравнение с другими, страх оценки, перфекционизм.',
      consequence: 'Прокрастинация, отказ от возможностей, внутренний критик',
    },
    {
      title: 'Сильная женщина',
      behavior: 'Справляется со всем сама. Просить о помощи — слабость.',
      consequence: 'Одиночество, эмоциональное выгорание, закрытость',
    },
    {
      title: 'Хорошая девочка',
      behavior: 'Всегда удобна для других. Не может сказать "нет", избегает конфликтов.',
      consequence: 'Потеря себя, накопленное раздражение, неспособность отстоять границы',
    },
  ];
  return (
    <section className="py-16 sm:py-28" style={{ background: 'var(--dark-card)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Узнайте себя" title="Какой сценарий управляет вашей жизнью?" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {scenarios.map((s, i) => <ScenarioCard key={s.title} title={s.title} behavior={s.behavior} consequence={s.consequence} delay={i * 80} />)}
        </div>
        <div className="text-center">
          <p className="font-display text-2xl md:text-3xl italic mb-8" style={{ color: 'var(--text-main)' }}>
            Узнали себя? Значит, пришло время{' '}
            <span className="text-gold-gradient not-italic">выйти из старого сценария.</span>
          </p>
          <CTAButton>Хочу изменений</CTAButton>
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ n, title, text, delay }: { n: string; title: string; text: string; delay: number }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`glass-card rounded-sm p-7 relative overflow-hidden transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="step-number">{n}</div>
      <div className="relative z-10">
        <div className="text-xs uppercase tracking-[0.2em] mb-3 font-semibold" style={{ color: 'var(--gold)' }}>Шаг {n}</div>
        <h4 className="font-display text-xl font-medium mb-3" style={{ color: 'var(--text-main)' }}>{title}</h4>
        <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{text}</p>
      </div>
    </div>
  );
};

const ResultCard = ({ before, after, icon, delay }: { before: string; after: string; icon: string; delay: number }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`before-after-card rounded-sm p-5 text-center transition-all duration-700 ${inView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <Icon name={icon} size={28} className="mx-auto mb-3" style={{ color: 'var(--gold)' }} />
      <div className="text-sm mb-2 line-through" style={{ color: 'var(--crimson-bright)', opacity: 0.7 }}>{before}</div>
      <div className="w-6 h-px mx-auto mb-2" style={{ background: 'var(--gold)' }} />
      <div className="text-sm font-semibold" style={{ color: 'var(--gold)' }}>{after}</div>
    </div>
  );
};

const CaseCard = ({ name, before, insight, after, delay }: { name: string; before: string; insight: string; after: string; delay: number }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`glass-card rounded-sm p-7 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display text-xl font-medium mb-5 text-gold-gradient">{name}</div>
      <div className="space-y-4">
        <div>
          <div className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: 'var(--crimson-bright)' }}>До</div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{before}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: 'var(--gold)', opacity: 0.7 }}>Осознание</div>
          <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-main)', opacity: 0.8 }}>{insight}</p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.2em] mb-2 font-semibold" style={{ color: 'var(--gold)' }}>После</div>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-main)' }}>{after}</p>
        </div>
      </div>
    </div>
  );
};

// Block 4+5: What is Pereprogramming + Steps
const WhatIsSection = () => {
  const steps = [
    { n: '01', title: 'Осознание ограничений', text: 'Видим, что именно держит вас на месте — сценарии, убеждения, реакции' },
    { n: '02', title: 'Выявление сценариев', text: 'Находим корень повторяющихся паттернов в вашей жизни' },
    { n: '03', title: 'Работа через тело', text: 'Освобождаем зажимы и блоки, которые живут в теле, а не в голове' },
    { n: '04', title: 'Освобождение эмоций', text: 'Даём пространство подавленным чувствам — безопасно и экологично' },
    { n: '05', title: 'Новое состояние', text: 'Формируем ресурсное состояние, из которого рождаются действия' },
    { n: '06', title: 'Интеграция', text: 'Закрепляем изменения и переносим новое состояние в реальную жизнь' },
  ];
  return (
    <section className="py-16 sm:py-28" style={{ background: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Что такое Перепрошивка?"
          title="Не лекция. Не теория. Живой опыт."
          subtitle="Практический трансформационный тренинг, где изменения происходят через тело, эмоции и осознанность — не через знания."
        />

        <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          {[
            { icon: 'Activity', label: 'Через тело' },
            { icon: 'Droplets', label: 'Через эмоции' },
            { icon: 'Eye', label: 'Через осознание' },
            { icon: 'Waves', label: 'Через состояние' },
            { icon: 'Zap', label: 'Через действие' },
          ].map(({ icon, label }) => (
            <div key={label} className="glass-card rounded-sm p-5 flex items-center gap-4">
              <Icon name={icon} size={28} style={{ color: 'var(--gold)', flexShrink: 0 }} />
              <span className="font-medium" style={{ color: 'var(--text-main)' }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: 'var(--gold)' }}>Как проходит Перепрошивка?</div>
            <h3 className="font-display text-3xl md:text-4xl font-light mt-3" style={{ color: 'var(--text-main)' }}>6 шагов трансформации</h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((s, i) => <StepCard key={s.n} n={s.n} title={s.title} text={s.text} delay={i * 100} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

// Block 6: Why it works
const WhyWorksSection = () => {
  const chain = [
    { label: 'Тело', icon: 'Activity' },
    { label: 'Эмоции', icon: 'Droplets' },
    { label: 'Состояние', icon: 'Sparkles' },
    { label: 'Мышление', icon: 'Brain' },
    { label: 'Действия', icon: 'Zap' },
    { label: 'Результат', icon: 'Star' },
  ];
  const { ref, inView } = useInView();
  return (
    <section className="py-16 sm:py-28" style={{ background: 'var(--dark-card)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Почему метод работает?"
          title="Изменения начинаются не в голове"
          subtitle="Традиционные методы работают с мыслями. Перепрошивка начинается с тела и состояния — там, где живут настоящие ограничения."
        />
        <div
          ref={ref}
          className={`flex flex-wrap justify-center items-center gap-3 md:gap-4 max-w-5xl mx-auto transition-all duration-700 ${inView ? 'opacity-100' : 'opacity-0'}`}
        >
          {chain.map((item, i) => (
            <div key={item.label} className="flex items-center gap-3 md:gap-4">
              <div
                className="flex flex-col items-center gap-2 glass-card rounded-sm px-5 py-5 transition-all duration-500"
                style={{ transitionDelay: `${i * 100}ms`, minWidth: 100 }}
              >
                <Icon name={item.icon} size={24} style={{ color: 'var(--gold)' }} />
                <span className="font-semibold text-sm" style={{ color: 'var(--text-main)' }}>{item.label}</span>
              </div>
              {i < chain.length - 1 && (
                <Icon name="ArrowRight" size={20} style={{ color: 'var(--gold)', opacity: 0.5, flexShrink: 0 }} />
              )}
            </div>
          ))}
        </div>
        <div className="text-center mt-14">
          <p className="font-display text-xl md:text-2xl italic" style={{ color: 'var(--text-muted)' }}>
            «Когда меняется состояние — меняется всё остальное само собой.»
          </p>
        </div>
      </div>
    </section>
  );
};

// Block 7: Before → After
const ResultsSection = () => {
  const results = [
    { before: 'Страх', after: 'Уверенность', icon: 'ShieldCheck' },
    { before: 'Тревога', after: 'Спокойствие', icon: 'Waves' },
    { before: 'Хаос', after: 'Ясность', icon: 'Sparkles' },
    { before: 'Усталость', after: 'Энергия', icon: 'Zap' },
    { before: 'Сомнения', after: 'Действия', icon: 'ArrowUpRight' },
    { before: 'Обиды', after: 'Принятие', icon: 'HeartHandshake' },
    { before: 'Пустота', after: 'Наполненность', icon: 'Sun' },
    { before: 'Зависимость', after: 'Свобода', icon: 'Wind' },
    { before: 'Злость', after: 'Сила', icon: 'Flame' },
    { before: 'Закрытость', after: 'Открытость', icon: 'Unlock' },
  ];
  return (
    <section className="py-16 sm:py-28" style={{ background: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader
          eyebrow="Результаты участников"
          title="Было → Стало"
          subtitle="Реальные изменения, которые происходят с участниками тренинга"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {results.map((r, i) => <ResultCard key={r.before} before={r.before} after={r.after} icon={r.icon} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
};

// Block 8: Emotional quote
const EmotionalSection = () => (
  <section className="py-16 sm:py-28 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #b8902a 0%, #c9a84c 40%, #a07820 100%)' }}>
    <div className="absolute inset-0 opacity-20"
      style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.6), transparent)' }} />
    <div className="container mx-auto px-4 sm:px-6 relative z-10 text-center">
      <div className="font-display text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold leading-tight max-w-4xl mx-auto" style={{ color: '#0a0806' }}>
        Перепрошивку невозможно понять.
        <br />
        <span style={{ opacity: 0.75 }}>Её можно только</span>{' '}
        <span className="italic">прожить.</span>
      </div>
      <div className="mt-8 sm:mt-12">
        <a
          href={TELEGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm font-semibold tracking-wide transition-all duration-300 px-10 py-5 text-lg w-full sm:w-auto justify-center"
          style={{ background: 'var(--crimson)', color: '#fff' }}
        >
          Хочу прожить это
          <Icon name="Heart" size={20} />
        </a>
      </div>
    </div>
  </section>
);

// Block 9: About Dmitry Hara (author of method)
const AboutDmitrySection = () => (
  <section className="py-16 sm:py-28" style={{ background: 'var(--dark-card)' }}>
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
        <div className="order-2 md:order-1">
          <div className="text-xs uppercase tracking-[0.3em] font-semibold mb-3 sm:mb-4" style={{ color: 'var(--gold)' }}>Автор метода</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6" style={{ color: 'var(--text-main)' }}>
            Дмитрий <span className="text-gold-gradient">Хара</span>
          </h2>
          <div className="section-divider mb-8" style={{ marginLeft: 0 }} />
          <div className="space-y-4 mb-8">
            {[
              { icon: '📖', text: 'Автор бестселлера «Перепрошивка. Новая жизнь»' },
              { icon: '🎯', text: 'Автор трансформационного тренинга «Перепрошивка»' },
              { icon: '🌀', text: 'Автор практики ШОДХАН' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-start gap-4 glass-card rounded-sm p-4">
                <span className="text-2xl flex-shrink-0">{icon}</span>
                <span className="text-base" style={{ color: 'var(--text-main)' }}>{text}</span>
              </div>
            ))}
          </div>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <p>Дмитрий Хара создал уникальный метод работы с глубинными программами человека — через тело, эмоции и осознанность.</p>
            <p>Метод «Перепрошивка» прошли тысячи людей по всему миру. <span style={{ color: 'var(--text-main)' }}>Это не теория — это живая практика изменений.</span></p>
          </div>
        </div>
        <div className="order-1 md:order-2">
          <div className="relative">
            <div className="absolute -inset-4 rounded-sm opacity-10"
              style={{ background: 'linear-gradient(135deg, var(--gold) 0%, transparent 60%)' }} />
            <img
              src={DMITRY_PHOTO}
              alt="Дмитрий Хара — автор метода Перепрошивка"
              className="relative w-full rounded-sm object-cover"
              style={{ aspectRatio: '3/4', filter: 'contrast(1.02) saturate(0.95)' }}
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// Block 10: About Oksana
const AboutSection = () => (
  <section className="py-16 sm:py-28" style={{ background: 'var(--dark-bg)' }}>
    <div className="container mx-auto px-4 sm:px-6">
      <div className="grid md:grid-cols-2 gap-8 sm:gap-16 items-center">
        <div>
          <img
            src={OKSANA_PHOTO2}
            alt="Оксана Панасенко"
            className="w-full rounded-sm object-cover object-top"
            style={{ aspectRatio: '3/4', filter: 'saturate(0.9) contrast(1.05)' }}
          />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: 'var(--gold)' }}>Ведущая тренинга</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-3" style={{ color: 'var(--text-main)' }}>
            Оксана <span className="text-gold-gradient">Панасенко</span>
          </h2>
          <div className="section-divider mb-6" style={{ marginLeft: 0 }} />
          <div className="flex flex-wrap gap-2 mb-6">
            {[
              'Сертифицированный тренер',
              'Мастер телесной терапии',
              'Натуропат',
              'Автор практик и программ по развитию личности',
              'Инструктор Шодхан',
              'Рекордсмен Книги Рекордов Гиннеса',
            ].map(tag => (
              <span key={tag} className="text-xs px-3 py-1 rounded-sm"
                style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.25)', color: 'var(--gold)' }}>
                {tag}
              </span>
            ))}
          </div>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <p>Оксана прошла путь глубокой личной трансформации и стала сертифицированным тренером метода Дмитрия Хара.</p>
            <p>Также она ведёт практику ШОДХАН и другие телесно-эмоциональные процессы, <span style={{ color: 'var(--text-main)' }}>помогая людям находить ресурс там, где они перестали его искать.</span></p>
            <p>Этот тренинг — это живое пространство трансформации, которое Оксана создаёт для каждого участника.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[
              { num: '500+', label: 'участников' },
              { num: '3+', label: 'года практики' },
              { num: '50+', label: 'групп' },
              { num: '6', label: 'авторских практик' },
            ].map(({ num, label }) => (
              <div key={label} className="glass-card rounded-sm p-5 text-center">
                <div className="font-display text-4xl font-bold text-gold-gradient">{num}</div>
                <div className="text-xs uppercase tracking-[0.15em] mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

const RUTUBE_REELS = [
  { id: '37e49f403c08f385fa59ef1c4ad7e7de', thumb: 'https://rutube.ru/api/video/37e49f403c08f385fa59ef1c4ad7e7de/thumbnail/' },
  { id: 'fbb8d0c1592243fd2ae3b2e7235647ae', thumb: 'https://rutube.ru/api/video/fbb8d0c1592243fd2ae3b2e7235647ae/thumbnail/' },
];

const ReelsSection = () => (
  <section className="py-16 sm:py-20" style={{ background: 'var(--dark-bg)' }}>
    <div className="container mx-auto px-4 sm:px-6">
      <div className="text-center mb-10">
        <div className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: 'var(--gold)' }}>Атмосфера тренинга</div>
        <h3 className="font-display text-2xl md:text-3xl font-light" style={{ color: 'var(--text-main)' }}>Почувствуй, как это бывает</h3>
      </div>
      <div className="flex justify-center gap-4 sm:gap-8">
        {RUTUBE_REELS.map(v => (
          <div key={v.id} className="w-full max-w-[260px]">
            <VideoReviewCard id={v.id} thumb={v.thumb} />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const RUTUBE_REVIEWS = [
  { id: '8ebf651a2a02efc2fe365e0e39c3acd1', thumb: 'https://rutube.ru/api/video/8ebf651a2a02efc2fe365e0e39c3acd1/thumbnail/' },
  { id: '6716da385323f48fe40630ef02138961', thumb: 'https://rutube.ru/api/video/6716da385323f48fe40630ef02138961/thumbnail/' },
  { id: '22bcabce7d9f0982bccf900ae4f8798f', thumb: 'https://rutube.ru/api/video/22bcabce7d9f0982bccf900ae4f8798f/thumbnail/' },
  { id: '1a5adfb2b80d05c7f37d79230f295789', thumb: 'https://rutube.ru/api/video/1a5adfb2b80d05c7f37d79230f295789/thumbnail/' },
];

const VideoReviewCard = ({ id, thumb }: { id: string; thumb: string }) => {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="glass-card rounded-sm overflow-hidden" style={{ aspectRatio: '9/16' }}>
      {playing ? (
        <iframe
          src={`https://rutube.ru/play/embed/${id}?autoplay=1`}
          width="100%" height="100%"
          allow="autoplay; fullscreen"
          allowFullScreen
          style={{ border: 'none', display: 'block', width: '100%', height: '100%' }}
        />
      ) : (
        <button className="relative w-full h-full group" onClick={() => setPlaying(true)}>
          <img src={thumb} alt="Видеоотзыв" className="w-full h-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center"
            style={{ background: 'rgba(10,8,6,0.45)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
              style={{ background: 'rgba(201,168,76,0.9)' }}>
              <Icon name="Play" size={28} style={{ color: '#0a0806', marginLeft: 3 }} />
            </div>
          </div>
        </button>
      )}
    </div>
  );
};

// Block 10: Cases
const CasesSection = () => {
  const cases = [
    {
      name: 'Марина, 34',
      before: 'Жила в постоянной тревоге, не могла принять ни одного решения без страха ошибиться',
      insight: 'Осознала, что тревога — это привычка тела, не реальная угроза',
      after: 'Открыла собственное дело. Принимает решения спокойно и уверенно',
    },
    {
      name: 'Елена, 41',
      before: 'Три года не могла выйти из токсичных отношений',
      insight: 'Увидела сценарий "я недостаточно хороша" — корень всех отношений',
      after: 'Построила новые отношения с человеком, который её ценит',
    },
    {
      name: 'Светлана, 38',
      before: 'Доход застрял на одной отметке 5 лет. Работала больше — результат тот же',
      insight: 'Обнаружила страх успеха — подсознательный запрет "мне нельзя зарабатывать больше"',
      after: 'Через 3 месяца подняла ценник в 2 раза. Клиенты есть',
    },
    {
      name: 'Ирина, 29',
      before: 'Выгорание. Хотела бросить всё и уехать — лишь бы не чувствовать эту пустоту',
      insight: 'Тело давало сигнал: "я потеряла себя в угоду другим"',
      after: 'Нашла своё дело, энергия вернулась, жизнь снова имеет смысл',
    },
    {
      name: 'Наталья, 45',
      before: 'Чувствовала вину за любое удовольствие. Отдых воспринимался как лень',
      insight: '"Хорошая девочка" — усвоенная с детства программа жертвенности',
      after: 'Научилась отдыхать без вины. Отношения с детьми стали теплее',
    },
    {
      name: 'Юлия, 36',
      before: 'Контролировала всё и всех. Муж, дети, работа — всё было обязано идти по плану',
      insight: 'Контроль = страх. Под ним — глубокое недоверие к жизни',
      after: 'Отпустила контроль. В семье стало больше тепла и меньше конфликтов',
    },
  ];
  return (
    <section className="py-16 sm:py-28" style={{ background: 'var(--dark-card)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Кейсы и отзывы участников" title="Реальные истории изменений" />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {cases.map((c, i) => <CaseCard key={c.name} name={c.name} before={c.before} insight={c.insight} after={c.after} delay={i * 80} />)}
        </div>
        <div className="text-center mb-10">
          <div className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: 'var(--gold)' }}>Видеоотзывы</div>
          <h3 className="font-display text-2xl md:text-3xl font-light" style={{ color: 'var(--text-main)' }}>Участники говорят сами</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {RUTUBE_REVIEWS.map(v => <VideoReviewCard key={v.id} id={v.id} thumb={v.thumb} />)}
        </div>
      </div>
    </section>
  );
};

// Block 12: For whom
const ForWhomSection = () => (
  <section className="py-16 sm:py-28" style={{ background: 'var(--dark-bg)' }}>
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader eyebrow="Кому подходит" title="Перепрошивка — для тех, кто готов" />
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] mb-6 font-semibold" style={{ color: 'var(--gold)' }}>Подходит</div>
          <ul className="space-y-5">
            {[
              'Готовы к настоящим изменениям, не только к пониманию',
              'Берёте ответственность за свою жизнь',
              'Хотите выйти из повторяющихся сценариев',
              'Готовы работать через тело и эмоции',
              'Ищете глубину, а не поверхностные советы',
            ].map(t => (
              <li key={t} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid var(--gold)' }}>
                  <Icon name="Check" size={12} style={{ color: 'var(--gold)' }} />
                </div>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-main)' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.25em] mb-6 font-semibold" style={{ color: 'var(--text-muted)' }}>Не подходит</div>
          <ul className="space-y-5">
            {[
              'Ищете быстрое решение без усилий',
              'Не готовы брать ответственность',
              'Хотите только слушать теорию',
              'Ожидаете, что тренер решит ваши проблемы за вас',
            ].map(t => (
              <li key={t} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <Icon name="Minus" size={12} style={{ color: 'var(--text-muted)' }} />
                </div>
                <span className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  </section>
);

// Block 13: Price
const PriceSection = () => (
  <section className="py-16 sm:py-28" style={{ background: 'var(--dark-card)' }}>
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader eyebrow="Тарифы" title="Выберите свой формат участия" />

      {/* Masterclass standalone */}
      <div className="max-w-3xl mx-auto mb-8">
        <div className="rounded-sm p-8 flex flex-col md:flex-row md:items-center gap-6 justify-between"
          style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="flex-1">
            <div className="text-xs uppercase tracking-[0.25em] mb-2 font-semibold" style={{ color: 'var(--gold)' }}>Отдельный билет</div>
            <h3 className="font-display text-2xl font-bold mb-2" style={{ color: 'var(--text-main)' }}>Мастер-класс «Привычка быть счастливым»</h3>
            <p className="text-sm mb-3" style={{ color: 'var(--text-muted)' }}>4 июня 2026 · четверг · 16:00–21:00 · Краснодар</p>
            <div className="flex flex-wrap gap-x-6 gap-y-1">
              {[
                'Как перестать злиться на близких',
                'Как избавиться от стресса в теле',
                'Как сделать радость ежедневной привычкой',
              ].map(t => (
                <div key={t} className="flex items-center gap-2 text-sm" style={{ color: 'var(--text-muted)' }}>
                  <span style={{ color: 'var(--gold)' }}>·</span> {t}
                </div>
              ))}
            </div>
          </div>
          <div className="flex flex-col items-center gap-3 flex-shrink-0">
            <div className="font-display text-5xl font-bold text-gold-gradient">5 000 ₽</div>
            <CTAButton>Записаться</CTAButton>
          </div>
        </div>
      </div>

      {/* Main tariffs */}
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {/* Standard */}
        <div className="glass-card rounded-sm p-8 flex flex-col" style={{ border: '1px solid rgba(201,168,76,0.2)' }}>
          <div className="text-xs uppercase tracking-[0.25em] mb-3 font-semibold" style={{ color: 'var(--gold)' }}>Стандарт</div>
          <h3 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text-main)' }}>Перепрошивка</h3>
          <div className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Выездной формат · 4 дня · 4–7 июня 2026</div>
          <div className="font-display text-6xl font-bold text-gold-gradient mb-1">60 000 ₽</div>
          <div className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Предоплата: <span style={{ color: 'var(--gold)' }}>10 000 ₽</span>
            <span className="ml-3 text-xs">· Питание и проживание +10 000 ₽</span>
          </div>
          <div className="section-divider mb-6" style={{ marginLeft: 0 }} />
          <div className="space-y-3 flex-1 mb-8">
            {[
              'Мастер-класс «Привычка быть счастливым»',
              'Тренинг ПереПроШивка (полный)',
              'Раздаточный материал',
              'Пользование сауной и бассейном с подогревом',
            ].map(t => (
              <div key={t} className="flex items-start gap-3">
                <Icon name="Check" size={16} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
                <span className="text-sm" style={{ color: 'var(--text-main)' }}>{t}</span>
              </div>
            ))}
          </div>
          <CTAButton size="large" className="w-full justify-center">
            Забронировать
            <Icon name="ArrowRight" size={18} />
          </CTAButton>
        </div>

        {/* VIP */}
        <div className="rounded-sm p-8 flex flex-col relative overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.12) 0%, rgba(201,168,76,0.04) 100%)', border: '1px solid rgba(201,168,76,0.5)' }}>
          <div className="absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-sm"
            style={{ background: 'var(--gold)', color: '#0A0A0A' }}>ВИП</div>
          <div className="text-xs uppercase tracking-[0.25em] mb-3 font-semibold" style={{ color: 'var(--gold)' }}>Максимум</div>
          <h3 className="font-display text-3xl font-bold mb-1" style={{ color: 'var(--text-main)' }}>Перепрошивка VIP</h3>
          <div className="text-sm mb-5" style={{ color: 'var(--text-muted)' }}>Выездной формат · 4 дня · 4–7 июня 2026</div>
          <div className="font-display text-6xl font-bold text-gold-gradient mb-1">100 000 ₽</div>
          <div className="text-sm mb-6" style={{ color: 'var(--text-muted)' }}>
            Предоплата: <span style={{ color: 'var(--gold)' }}>20 000 ₽</span>
            <span className="ml-3 text-xs">· Питание и проживание +10 000 ₽</span>
          </div>
          <div className="section-divider mb-6" style={{ marginLeft: 0 }} />
          <div className="space-y-3 flex-1 mb-8">
            {[
              'Мастер-класс «Привычка быть счастливым»',
              'Тренинг ПереПроШивка (полный)',
              'Раздаточный материал',
              'Подарочный мерч + книга Дмитрия Хара «Перепрошивка»',
              'Пользование сауной и бассейном с подогревом',
              'Трансфер из Краснодара до места проведения',
              'Месячное сопровождение тренера (4 индивидуальные сессии)',
              'Расчёт индивидуальной Матрицы Судьбы',
            ].map(t => (
              <div key={t} className="flex items-start gap-3">
                <span className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }}>✦</span>
                <span className="text-sm" style={{ color: 'var(--text-main)' }}>{t}</span>
              </div>
            ))}
          </div>
          <CTAButton size="large" className="w-full justify-center animate-pulse-gold">
            Забронировать VIP
            <Icon name="ArrowRight" size={18} />
          </CTAButton>
        </div>
      </div>
    </div>
  </section>
);

// Block 14: FAQ
const FAQSection = () => {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    {
      q: 'Подойдёт ли мне, если я никогда не была на тренингах?',
      a: 'Да. Тренинг не требует никакого предыдущего опыта. Напротив, отсутствие стереотипов часто помогает войти в процесс глубже. Важна только готовность к изменениям.',
    },
    {
      q: 'Нужен ли опыт работы с психологом или телесными практиками?',
      a: 'Не нужен. Все практики проводятся под руководством Оксаны в безопасном пространстве. Вы получите все необходимые инструкции на месте.',
    },
    {
      q: 'Что взять с собой?',
      a: 'Удобную одежду для движения, коврик для йоги (при наличии), воду, блокнот и ручку. Подробный список вы получите после регистрации.',
    },
    {
      q: 'Есть ли ограничения по здоровью?',
      a: 'Если у вас есть психиатрические диагнозы или острые состояния — свяжитесь с нами для консультации. В остальных случаях ограничений нет.',
    },
    {
      q: 'Каковы условия возврата?',
      a: 'Предоплата возвращается в полном объёме при отмене не позднее чем за 7 дней до тренинга. При более поздней отмене предоплата не возвращается, но место можно передать другому человеку.',
    },
    {
      q: 'Как быстро появятся результаты?',
      a: 'Часть участников отмечает изменения состояния уже в первый день. Глубокие изменения закрепляются в течение 2–4 недель после тренинга при использовании полученных инструментов.',
    },
  ];
  return (
    <section className="py-16 sm:py-28" style={{ background: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-4 sm:px-6">
        <SectionHeader eyebrow="Вопросы и ответы" title="Частые вопросы" />
        <div className="max-w-3xl mx-auto space-y-0">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item py-5 sm:py-6 cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <h3 className="font-semibold text-sm sm:text-base pr-2" style={{ color: 'var(--text-main)' }}>{f.q}</h3>
                <div className="flex-shrink-0 transition-transform duration-300" style={{ transform: open === i ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  <Icon name="Plus" size={20} style={{ color: 'var(--gold)' }} />
                </div>
              </div>
              {open === i && (
                <p className="text-sm leading-relaxed mt-4 animate-fade-in" style={{ color: 'var(--text-muted)' }}>{f.a}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Block: Contacts
const ContactsSection = () => (
  <section id="contacts" className="py-16 sm:py-24" style={{ background: 'var(--dark-card)' }}>
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader
        eyebrow="Контакты"
        title="Остались вопросы?"
        subtitle="Если вы не нашли ответ на свой вопрос, задайте его напрямую тренеру"
      />
      <div className="max-w-2xl mx-auto">
        {/* Phone */}
        <div className="glass-card rounded-sm p-6 mb-6 flex items-center gap-5">
          <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
            style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
            <Icon name="Phone" size={22} style={{ color: 'var(--gold)' }} />
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] mb-1 font-semibold" style={{ color: 'var(--text-muted)' }}>Телефон</div>
            <a href="tel:+79615918581" className="font-display text-xl font-bold hover:opacity-80 transition-opacity" style={{ color: 'var(--text-main)' }}>
              +7 961 591-85-81
            </a>
          </div>
        </div>

        {/* Messengers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          {/* Telegram Оксана */}
          <a href="https://t.me/volshebnitsaa" target="_blank" rel="noopener noreferrer"
            className="glass-card rounded-sm p-5 flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <Icon name="Send" size={18} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>Telegram</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>@volshebnitsaa</div>
            </div>
          </a>

          {/* WhatsApp Оксана */}
          <a href="https://wa.me/79615918581" target="_blank" rel="noopener noreferrer"
            className="glass-card rounded-sm p-5 flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <Icon name="MessageCircle" size={18} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>WhatsApp</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>+7 961 591-85-81</div>
            </div>
          </a>

          {/* WhatsApp Макс */}
          <a href="https://wa.me/79064347978" target="_blank" rel="noopener noreferrer"
            className="glass-card rounded-sm p-5 flex items-center gap-4 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <Icon name="MessageCircle" size={18} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>WhatsApp (Макс)</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>+7 906 434-79-78</div>
            </div>
          </a>

          {/* Instagram */}
          <div className="glass-card rounded-sm p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <Icon name="Instagram" size={18} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>Instagram*</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>@volshebnitsa_krd</div>
            </div>
          </div>
        </div>

        {/* Telegram group */}
        <a href="https://t.me/telopraktiki_krd" target="_blank" rel="noopener noreferrer"
          className="glass-card rounded-sm p-5 flex items-center justify-between gap-4 hover:opacity-80 transition-opacity w-full">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
              style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.3)' }}>
              <Icon name="Users" size={18} style={{ color: 'var(--gold)' }} />
            </div>
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.15em]" style={{ color: 'var(--text-muted)' }}>Telegram-группа</div>
              <div className="text-sm font-medium" style={{ color: 'var(--text-main)' }}>Телесно-эмоциональные практики</div>
            </div>
          </div>
          <span className="text-xs px-3 py-1.5 rounded-sm font-semibold flex-shrink-0"
            style={{ background: 'rgba(201,168,76,0.15)', border: '1px solid rgba(201,168,76,0.3)', color: 'var(--gold)' }}>
            Подробнее
          </span>
        </a>
      </div>
    </div>
  </section>
);

// Block 15: Final CTA
const FinalSection = () => {
  const time = useCountdown(TARGET_DATE);
  return (
    <section className="py-20 sm:py-32 relative overflow-hidden noise-overlay" style={{
      background: 'radial-gradient(ellipse at 50% 100%, rgba(155,28,28,0.2), transparent 60%), var(--dark-bg)'
    }}>
      <div className="container mx-auto px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.3em] mb-4 sm:mb-6 font-semibold" style={{ color: 'var(--gold)' }}>Финальный шаг</div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-5 sm:mb-6" style={{ color: 'var(--text-main)' }}>
            Через год ваша жизнь будет другой.
            <br />
            <span style={{ color: 'var(--text-muted)' }}>Вопрос только в том —</span>
            <br />
            <span className="text-gold-gradient italic">примете ли вы решение сегодня.</span>
          </h2>
          <div className="section-divider mb-6 sm:mb-10" />

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm mb-6 sm:mb-10">
            {[
              { icon: 'Calendar', text: '4–7 июня 2026' },
              { icon: 'MapPin', text: 'Краснодар' },
              { icon: 'Home', text: 'Вилла Ра Хаус' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <Icon name={icon} size={14} style={{ color: 'var(--gold)' }} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 sm:gap-4 md:gap-8 mb-8 sm:mb-12">
            <TimerBlock value={time.days} label="дней" />
            <div className="font-display text-xl sm:text-3xl" style={{ color: 'var(--gold)', opacity: 0.4 }}>:</div>
            <TimerBlock value={time.hours} label="часов" />
            <div className="font-display text-xl sm:text-3xl" style={{ color: 'var(--gold)', opacity: 0.4 }}>:</div>
            <TimerBlock value={time.minutes} label="минут" />
            <div className="font-display text-xl sm:text-3xl" style={{ color: 'var(--gold)', opacity: 0.4 }}>:</div>
            <TimerBlock value={time.seconds} label="секунд" />
          </div>

          <CTAButton size="large" className="animate-pulse-gold w-full sm:w-auto justify-center">
            Забронировать место
            <Icon name="ArrowRight" size={22} />
          </CTAButton>
          <p className="text-xs sm:text-sm mt-4 sm:mt-5" style={{ color: 'var(--text-muted)' }}>
            Нажимая кнопку, вы переходите в Telegram к Оксане
          </p>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-12" style={{ background: 'var(--dark-card)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
    <div className="container mx-auto px-6">
      <div className="text-center mb-8">
        <div className="font-display text-2xl text-gold-gradient mb-1">ПЕРЕПРОШИВКА</div>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2026 Оксана Панасенко · Трансформационный тренинг</p>
      </div>

      {/* Disclaimer */}
      <div className="max-w-3xl mx-auto rounded-sm p-5 mb-6 text-xs leading-relaxed space-y-3"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)', color: 'var(--text-muted)' }}>
        <p>❗ Все мероприятия и практики не являются медицинскими, психотерапевтическими или эзотерическими услугами.</p>
        <p>Мы используем методы, основанные на телесной работе, дыхании, движении, фокусе внимания и коммуникации, направленные на развитие навыков саморегуляции и осознанности.</p>
        <p>
          Участие осуществляется по{' '}
          <a href="/dogovor-oferta.pdf" target="_blank" rel="noopener noreferrer"
            className="underline hover:opacity-80 transition-opacity" style={{ color: 'var(--gold)' }}>
            договору-оферте
          </a>
          , при наличии полного согласия с условиями участия и противопоказаниями.
        </p>
        <p>*Компания Meta Platforms Inc., владеющая социальными сетями Facebook и Instagram, по решению суда от 21.03.2022 признана экстремистской организацией, ее деятельность на территории России запрещена.</p>
      </div>

      {/* Legal */}
      <div className="text-center text-xs space-y-1" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
        <p>ИП Панасенко Оксана Сергеевна</p>
        <p>ИНН 231123507319 · ОГРН 325237500096091</p>
      </div>
    </div>
  </footer>
);

// Sticky CTA
const StickyCTA = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const handler = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return (
    <div className={`sticky-cta transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}>
      <a
        href={TELEGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-gold flex items-center justify-center gap-2 rounded-full px-6 py-3 sm:py-3 text-sm font-bold shadow-2xl"
        style={{ boxShadow: '0 8px 32px rgba(201,168,76,0.35)', minHeight: 48 }}
      >
        <Icon name="MessageCircle" size={18} />
        Забронировать место
      </a>
    </div>
  );
};

// Location block
const LocationSection = () => (
  <section className="py-20" style={{ background: 'var(--dark-bg)' }}>
    <div className="container mx-auto px-4 sm:px-6">
      <SectionHeader eyebrow="Место проведения" title="Вилла Ра Хаус" subtitle="Ст. Новодмитриевская, ул. Казачья, 3 · Краснодар" />
      <div className="max-w-3xl mx-auto">
        <div className="glass-card rounded-sm overflow-hidden">
          <iframe
            src="https://yandex.ru/map-widget/v1/?text=%D0%A1%D1%82.%20%D0%9D%D0%BE%D0%B2%D0%BE%D0%B4%D0%BC%D0%B8%D1%82%D1%80%D0%B8%D0%B5%D0%B2%D1%81%D0%BA%D0%B0%D1%8F%2C%20%D1%83%D0%BB.%20%D0%9A%D0%B0%D0%B7%D0%B0%D1%87%D1%8C%D1%8F%2C%203&z=15&l=map"
            width="100%"
            height="280"
            frameBorder="0"
            title="Вилла Ра Хаус на карте"
            style={{ display: 'block', filter: 'grayscale(0.3) contrast(1.05)' }}
            allowFullScreen
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
          {[
            { icon: 'MapPin', title: 'Адрес', text: 'Ст. Новодмитриевская, ул. Казачья, 3' },
            { icon: 'Waves', title: 'На территории', text: 'Сауна · Бассейн с подогревом' },
            { icon: 'Calendar', title: 'Даты', text: '4–7 июня 2026 · 4 дня' },
          ].map(({ icon, title, text }) => (
            <div key={title} className="glass-card rounded-sm p-5 flex items-start gap-3">
              <Icon name={icon} size={20} className="flex-shrink-0 mt-0.5" style={{ color: 'var(--gold)' }} />
              <div>
                <div className="font-semibold text-sm mb-1" style={{ color: 'var(--gold)' }}>{title}</div>
                <div className="text-sm" style={{ color: 'var(--text-muted)' }}>{text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default function Index() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Montserrat, sans-serif', background: 'var(--dark-bg)' }}>
      <Navbar />
      <div id="hero"><HeroSection /></div>
      <PainSection />
      <div id="scenarios"><ScenariosSection /></div>
      <div id="what-is"><WhatIsSection /></div>
      <div id="how-it-goes"><WhyWorksSection /></div>
      <ResultsSection />
      <EmotionalSection />
      <div id="author"><AboutDmitrySection /></div>
      <div id="trainer"><AboutSection /></div>
      <div id="cases"><CasesSection /></div>
      <div id="for-whom"><ForWhomSection /></div>
      <ReelsSection />
      <LocationSection />
      <div id="prices"><PriceSection /></div>
      <div id="faq"><FAQSection /></div>
      <ContactsSection />
      <FinalSection />
      <Footer />
      <StickyCTA />
    </div>
  );
}