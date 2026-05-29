import { useState, useEffect, useRef } from 'react';
import Icon from '@/components/ui/icon';

const TELEGRAM_URL = 'https://t.me/volshebnitsaa';
const OKSANA_PHOTO = 'https://cdn.poehali.dev/projects/56a7f61f-7ee4-4360-8538-7f713b707ebd/files/47689bdb-9e34-4616-badd-21ed11440b5c.jpg';

// Target date: July 5, 2025
const TARGET_DATE = new Date('2025-07-05T10:00:00');

function useCountdown(target: Date) {
  const calc = () => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
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
    <div className="font-display text-5xl md:text-6xl font-light text-gold-gradient tabular-nums min-w-[64px] text-center">
      {String(value).padStart(2, '0')}
    </div>
    <div className="text-xs uppercase tracking-[0.2em] mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
  </div>
);

const SectionHeader = ({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) => {
  const { ref, inView } = useInView();
  return (
    <div ref={ref} className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {eyebrow && (
        <div className="text-xs uppercase tracking-[0.3em] mb-4 font-semibold" style={{ color: 'var(--gold)' }}>{eyebrow}</div>
      )}
      <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-5" style={{ color: 'var(--text-main)' }}>
        {title}
      </h2>
      <div className="section-divider mb-5" />
      {subtitle && (
        <p className="text-lg max-w-2xl mx-auto leading-relaxed" style={{ color: 'var(--text-muted)' }}>{subtitle}</p>
      )}
    </div>
  );
};

// Block 1: Hero
const HeroSection = () => {
  const time = useCountdown(TARGET_DATE);
  return (
    <section className="hero-gradient min-h-screen flex items-center relative overflow-hidden noise-overlay">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10"
          style={{ background: 'radial-gradient(ellipse at right top, rgba(155,28,28,0.6), transparent 70%)' }} />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 opacity-10"
          style={{ background: 'radial-gradient(ellipse at left bottom, rgba(201,168,76,0.5), transparent 70%)' }} />
      </div>

      <div className="container mx-auto px-6 py-24 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="text-xs uppercase tracking-[0.4em] mb-6 font-semibold animate-fade-in" style={{ color: 'var(--gold)' }}>
              Трансформационный тренинг
            </div>
            <h1 className="font-display text-7xl md:text-8xl lg:text-9xl font-light leading-none mb-6 animate-fade-in-up delay-100" style={{ letterSpacing: '-0.02em' }}>
              <span className="text-gold-gradient">ПЕРЕ-</span>
              <br />
              <span style={{ color: 'var(--text-main)' }}>ПРОШИВКА</span>
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-10 animate-fade-in-up delay-200" style={{ color: 'var(--text-muted)', fontFamily: 'Cormorant Garamond, serif', fontStyle: 'italic' }}>
              Глубокие изменения через тело, эмоции и осознанность
            </p>

            <div className="flex flex-wrap gap-6 text-sm mb-10 animate-fade-in-up delay-300">
              {[
                { icon: 'Calendar', text: '5 июля 2025' },
                { icon: 'MapPin', text: 'Москва' },
                { icon: 'Users', text: 'Только 15 мест' },
                { icon: 'Star', text: 'Живой офлайн' },
              ].map(({ icon, text }) => (
                <div key={text} className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                  <Icon name={icon} size={16} style={{ color: 'var(--gold)' }} />
                  <span>{text}</span>
                </div>
              ))}
            </div>

            <div className="mb-10 animate-fade-in-up delay-400">
              <div className="text-xs uppercase tracking-[0.25em] mb-4" style={{ color: 'var(--text-muted)' }}>До начала тренинга</div>
              <div className="flex items-center gap-4 md:gap-6">
                <TimerBlock value={time.days} label="дней" />
                <div className="font-display text-3xl" style={{ color: 'var(--gold)', opacity: 0.5 }}>:</div>
                <TimerBlock value={time.hours} label="часов" />
                <div className="font-display text-3xl" style={{ color: 'var(--gold)', opacity: 0.5 }}>:</div>
                <TimerBlock value={time.minutes} label="минут" />
                <div className="font-display text-3xl" style={{ color: 'var(--gold)', opacity: 0.5 }}>:</div>
                <TimerBlock value={time.seconds} label="секунд" />
              </div>
            </div>

            <div className="animate-fade-in-up delay-500">
              <CTAButton size="large" className="animate-pulse-gold">
                Забронировать место
                <Icon name="ArrowRight" size={20} />
              </CTAButton>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center animate-fade-in delay-200">
            <div className="relative">
              <div className="absolute -inset-4 rounded-sm opacity-20"
                style={{ background: 'linear-gradient(135deg, var(--gold) 0%, transparent 60%)' }} />
              <img
                src={OKSANA_PHOTO}
                alt="Оксана Панасенко — ведущая тренинга Перепрошивка"
                className="relative w-full max-w-sm md:max-w-md rounded-sm object-cover"
                style={{ aspectRatio: '3/4', filter: 'contrast(1.05) saturate(0.9)' }}
              />
              <div className="absolute bottom-6 left-6 right-6 glass-card rounded-sm p-4">
                <div className="font-display text-xl" style={{ color: 'var(--gold)' }}>Оксана Панасенко</div>
                <div className="text-sm mt-1" style={{ color: 'var(--text-muted)' }}>Сертифицированный тренер · 8 лет практики</div>
              </div>
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
    <section className="py-28" style={{ background: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Точка боли"
          title="Вы уже многое знаете. Но почему жизнь не меняется?"
        />
        <div ref={ref} className={`grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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
    <section className="py-28" style={{ background: 'var(--dark-card)' }}>
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Узнайте себя"
          title="Какой сценарий управляет вашей жизнью?"
        />
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
      <div className="text-2xl mb-3">{icon}</div>
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
    <section className="py-28" style={{ background: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Что такое Перепрошивка"
          title="Не лекция. Не теория. Живой опыт."
          subtitle="Практический трансформационный тренинг, где изменения происходят через тело, эмоции и осознанность — не через знания."
        />

        <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
          {[
            { icon: '🫀', label: 'Через тело' },
            { icon: '💧', label: 'Через эмоции' },
            { icon: '✨', label: 'Через осознание' },
            { icon: '🌊', label: 'Через состояние' },
            { icon: '⚡', label: 'Через действие' },
          ].map(({ icon, label }) => (
            <div key={label} className="glass-card rounded-sm p-5 flex items-center gap-4">
              <span className="text-3xl">{icon}</span>
              <span className="font-medium" style={{ color: 'var(--text-main)' }}>{label}</span>
            </div>
          ))}
        </div>

        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="text-xs uppercase tracking-[0.3em] font-semibold" style={{ color: 'var(--gold)' }}>Как проходит Перепрошивка</div>
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
    { label: 'Тело', icon: '🫀' },
    { label: 'Эмоции', icon: '💧' },
    { label: 'Состояние', icon: '✨' },
    { label: 'Мышление', icon: '🧠' },
    { label: 'Действия', icon: '⚡' },
    { label: 'Результат', icon: '🌟' },
  ];
  const { ref, inView } = useInView();
  return (
    <section className="py-28" style={{ background: 'var(--dark-card)' }}>
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Почему метод работает"
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
                <span className="text-2xl">{item.icon}</span>
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
    { before: 'Страх', after: 'Уверенность', icon: '🦋' },
    { before: 'Тревога', after: 'Спокойствие', icon: '🌊' },
    { before: 'Хаос', after: 'Ясность', icon: '✨' },
    { before: 'Усталость', after: 'Энергия', icon: '⚡' },
    { before: 'Сомнения', after: 'Действия', icon: '🚀' },
    { before: 'Обиды', after: 'Принятие', icon: '🌸' },
    { before: 'Пустота', after: 'Наполненность', icon: '💫' },
    { before: 'Зависимость', after: 'Свобода', icon: '🕊️' },
    { before: 'Злость', after: 'Сила', icon: '🔥' },
    { before: 'Закрытость', after: 'Открытость', icon: '💝' },
  ];
  return (
    <section className="py-28" style={{ background: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-6">
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
  <section className="py-28 relative overflow-hidden" style={{ background: 'var(--crimson)', }}>
    <div className="absolute inset-0 opacity-20"
      style={{ background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.8), transparent)' }} />
    <div className="container mx-auto px-6 relative z-10 text-center">
      <div className="font-display text-4xl md:text-6xl lg:text-7xl font-light leading-tight max-w-4xl mx-auto" style={{ color: 'var(--text-main)' }}>
        Перепрошивку невозможно понять.
        <br />
        <span style={{ opacity: 0.7 }}>Её можно только</span>{' '}
        <span className="italic">прожить.</span>
      </div>
      <div className="mt-12">
        <CTAButton size="large">
          Хочу прожить это
          <Icon name="Heart" size={20} />
        </CTAButton>
      </div>
    </div>
  </section>
);

// Block 9: About Oksana
const AboutSection = () => (
  <section className="py-28" style={{ background: 'var(--dark-bg)' }}>
    <div className="container mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div>
          <img
            src={OKSANA_PHOTO}
            alt="Оксана Панасенко"
            className="w-full rounded-sm object-cover"
            style={{ aspectRatio: '4/5', filter: 'saturate(0.85) contrast(1.1)' }}
          />
        </div>
        <div>
          <div className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: 'var(--gold)' }}>Ведущая тренинга</div>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--text-main)' }}>
            Оксана <span className="text-gold-gradient">Панасенко</span>
          </h2>
          <div className="section-divider mb-8" style={{ marginLeft: 0 }} />
          <div className="space-y-5 text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
            <p>Когда-то я тоже была в точке, где всё «правильно», но ничего не менялось. Читала книги, ходила на тренинги, «работала над собой». И оставалась в том же круге.</p>
            <p>Перелом случился, когда я поняла: <span style={{ color: 'var(--text-main)' }}>проблема живёт не в голове — она живёт в теле и в состоянии.</span></p>
            <p>Я прошла путь глубокой трансформации и создала метод, который работает там, где слова бессильны — через прямой опыт изменений.</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-10">
            {[
              { num: '8+', label: 'лет практики' },
              { num: '500+', label: 'участников тренингов' },
              { num: '12', label: 'сертификатов' },
              { num: '50+', label: 'групп трансформации' },
            ].map(({ num, label }) => (
              <div key={label} className="glass-card rounded-sm p-5 text-center">
                <div className="font-display text-4xl font-light text-gold-gradient">{num}</div>
                <div className="text-xs uppercase tracking-[0.15em] mt-1" style={{ color: 'var(--text-muted)' }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

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
    <section className="py-28" style={{ background: 'var(--dark-card)' }}>
      <div className="container mx-auto px-6">
        <SectionHeader
          eyebrow="Кейсы участников"
          title="Реальные истории изменений"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cases.map((c, i) => <CaseCard key={c.name} name={c.name} before={c.before} insight={c.insight} after={c.after} delay={i * 80} />)}
        </div>
      </div>
    </section>
  );
};

// Block 12: For whom
const ForWhomSection = () => (
  <section className="py-28" style={{ background: 'var(--dark-bg)' }}>
    <div className="container mx-auto px-6">
      <SectionHeader
        eyebrow="Кому подходит"
        title="Перепрошивка — для тех, кто готов"
      />
      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
  <section className="py-28" style={{ background: 'var(--dark-card)' }}>
    <div className="container mx-auto px-6">
      <SectionHeader
        eyebrow="Стоимость"
        title="Инвестиция в изменения"
      />
      <div className="max-w-2xl mx-auto">
        <div className="glass-card rounded-sm p-10 text-center" style={{ border: '1px solid rgba(201,168,76,0.3)' }}>
          <div className="text-sm uppercase tracking-[0.3em] mb-3" style={{ color: 'var(--text-muted)' }}>Полная стоимость</div>
          <div className="font-display text-7xl font-light text-gold-gradient mb-2">25 000 ₽</div>
          <div className="text-sm mb-8" style={{ color: 'var(--text-muted)' }}>Предоплата для бронирования: <span style={{ color: 'var(--gold)' }}>5 000 ₽</span></div>

          <div className="section-divider mb-8" />

          <div className="text-left space-y-3 mb-8">
            <div className="text-xs uppercase tracking-[0.25em] mb-4 font-semibold text-center" style={{ color: 'var(--gold)' }}>Что входит</div>
            {[
              '2 дня интенсивной трансформационной работы',
              'Индивидуальная обратная связь от Оксаны',
              'Материалы и рабочая тетрадь тренинга',
              'Поддержка в закрытом чате 30 дней после',
              'Сертификат участника',
            ].map(t => (
              <div key={t} className="flex items-center gap-3">
                <Icon name="Check" size={16} style={{ color: 'var(--gold)' }} />
                <span className="text-sm" style={{ color: 'var(--text-main)' }}>{t}</span>
              </div>
            ))}
          </div>

          <div className="rounded-sm p-5 mb-8" style={{ background: 'rgba(201,168,76,0.06)', border: '1px solid rgba(201,168,76,0.15)' }}>
            <div className="text-xs uppercase tracking-[0.25em] mb-3 font-semibold" style={{ color: 'var(--gold)' }}>Бонусы</div>
            <div className="space-y-2">
              {['Медитация "Перезагрузка" в подарок', 'Видеозапись вводного вебинара', 'Доступ к закрытому сообществу выпускников'].map(b => (
                <div key={b} className="flex items-center gap-2">
                  <span style={{ color: 'var(--gold)' }}>✦</span>
                  <span className="text-sm" style={{ color: 'var(--text-muted)' }}>{b}</span>
                </div>
              ))}
            </div>
          </div>

          <CTAButton size="large" className="w-full justify-center">
            Забронировать место
            <Icon name="ArrowRight" size={20} />
          </CTAButton>
          <p className="text-xs mt-4" style={{ color: 'var(--text-muted)' }}>Осталось 15 мест · Предоплата фиксирует место</p>
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
    <section className="py-28" style={{ background: 'var(--dark-bg)' }}>
      <div className="container mx-auto px-6">
        <SectionHeader eyebrow="Вопросы и ответы" title="Частые вопросы" />
        <div className="max-w-3xl mx-auto space-y-0">
          {faqs.map((f, i) => (
            <div key={i} className="faq-item py-6 cursor-pointer" onClick={() => setOpen(open === i ? null : i)}>
              <div className="flex items-center justify-between gap-4">
                <h3 className="font-semibold text-base pr-4" style={{ color: 'var(--text-main)' }}>{f.q}</h3>
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

// Block 15: Final CTA
const FinalSection = () => {
  const time = useCountdown(TARGET_DATE);
  return (
    <section className="py-32 relative overflow-hidden noise-overlay" style={{
      background: 'radial-gradient(ellipse at 50% 100%, rgba(155,28,28,0.2), transparent 60%), var(--dark-bg)'
    }}>
      <div className="container mx-auto px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="text-xs uppercase tracking-[0.4em] mb-6 font-semibold" style={{ color: 'var(--gold)' }}>Финальный шаг</div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-light leading-tight mb-6" style={{ color: 'var(--text-main)' }}>
            Через год ваша жизнь будет другой.
            <br />
            <span style={{ color: 'var(--text-muted)' }}>Вопрос только в том —</span>
            <br />
            <span className="text-gold-gradient italic">примете ли вы решение сегодня.</span>
          </h2>
          <div className="section-divider mb-10" />

          <div className="flex flex-wrap justify-center gap-6 text-sm mb-10">
            {[
              { icon: 'Calendar', text: '5 июля 2025' },
              { icon: 'MapPin', text: 'Москва' },
              { icon: 'Users', text: 'Только 15 мест' },
            ].map(({ icon, text }) => (
              <div key={text} className="flex items-center gap-2" style={{ color: 'var(--text-main)' }}>
                <Icon name={icon} size={16} style={{ color: 'var(--gold)' }} />
                <span>{text}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-center gap-4 md:gap-8 mb-12">
            <TimerBlock value={time.days} label="дней" />
            <div className="font-display text-3xl" style={{ color: 'var(--gold)', opacity: 0.4 }}>:</div>
            <TimerBlock value={time.hours} label="часов" />
            <div className="font-display text-3xl" style={{ color: 'var(--gold)', opacity: 0.4 }}>:</div>
            <TimerBlock value={time.minutes} label="минут" />
            <div className="font-display text-3xl" style={{ color: 'var(--gold)', opacity: 0.4 }}>:</div>
            <TimerBlock value={time.seconds} label="секунд" />
          </div>

          <CTAButton size="large" className="animate-pulse-gold">
            Забронировать место
            <Icon name="ArrowRight" size={22} />
          </CTAButton>
          <p className="text-sm mt-5" style={{ color: 'var(--text-muted)' }}>
            Нажимая кнопку, вы переходите в Telegram к Оксане
          </p>
        </div>
      </div>
    </section>
  );
};

// Footer
const Footer = () => (
  <footer className="py-10" style={{ background: 'var(--dark-card)', borderTop: '1px solid rgba(201,168,76,0.1)' }}>
    <div className="container mx-auto px-6 text-center">
      <div className="font-display text-2xl text-gold-gradient mb-2">ПЕРЕПРОШИВКА</div>
      <p className="text-xs" style={{ color: 'var(--text-muted)' }}>© 2025 Оксана Панасенко · Трансформационный тренинг</p>
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
        className="btn-gold flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold shadow-2xl"
        style={{ boxShadow: '0 8px 32px rgba(201,168,76,0.35)' }}
      >
        <Icon name="MessageCircle" size={18} />
        Забронировать место
      </a>
    </div>
  );
};

export default function Index() {
  return (
    <div className="min-h-screen" style={{ fontFamily: 'Golos Text, sans-serif', background: 'var(--dark-bg)' }}>
      <HeroSection />
      <PainSection />
      <ScenariosSection />
      <WhatIsSection />
      <WhyWorksSection />
      <ResultsSection />
      <EmotionalSection />
      <AboutSection />
      <CasesSection />
      <ForWhomSection />
      <PriceSection />
      <FAQSection />
      <FinalSection />
      <Footer />
      <StickyCTA />
    </div>
  );
}