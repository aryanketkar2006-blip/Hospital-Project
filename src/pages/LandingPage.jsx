import { useNavigate } from 'react-router-dom';
import { LANDING } from '../constants/strings.js';

/**
 * LandingPage — Full-page marketing landing page for MediQueue.
 * Contains sticky navbar, hero section with CTA, stats row, how-it-works cards, and footer.
 * Route: /
 */
export default function LandingPage() {
  const navigate = useNavigate();

  /** Navigates to the authentication page */
  const handleGetStarted = () => navigate('/auth');

  return (
    <div className="min-h-screen bg-white">
      {/* ─── STICKY NAVBAR ─── */}
      <nav className="sticky top-0 z-20 bg-white border-b border-border h-16 flex items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-2">
          {/* Blue cross icon */}
          <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </div>
          <span className="text-xl font-semibold text-dark-text">{LANDING.BRAND}</span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/auth')}
            className="px-5 py-2.5 text-sm font-medium text-primary border border-primary rounded-lg hover:bg-primary-light cursor-pointer"
          >
            Log In
          </button>
          <button
            onClick={handleGetStarted}
            className="px-5 py-2.5 text-sm font-medium text-white bg-primary rounded-lg hover:bg-primary-dark cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </nav>

      {/* ─── HERO SECTION ─── */}
      <section className="pt-[100px] pb-16 text-center px-6">
        {/* Pill badge */}
        <span className="inline-block bg-primary-light text-primary border border-primary-border rounded-full text-[13px] px-4 py-1.5 font-medium">
          {LANDING.PILL_BADGE}
        </span>

        {/* Heading */}
        <h1 className="text-[32px] md:text-[52px] font-bold text-dark-text leading-[1.15] max-w-[700px] mx-auto mt-4">
          {LANDING.HERO_TITLE}
        </h1>

        {/* Description */}
        <p className="text-lg text-muted max-w-[540px] mx-auto mt-5 leading-[1.7]">
          {LANDING.HERO_DESCRIPTION}
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-3 mt-9">
          <button
            onClick={handleGetStarted}
            className="px-7 py-3.5 text-base font-medium text-white bg-primary rounded-lg hover:bg-primary-dark cursor-pointer"
          >
            {LANDING.CTA_PRIMARY}
          </button>
          <button className="px-7 py-3.5 text-base font-medium text-body-text bg-white border-[1.5px] border-border rounded-lg hover:border-muted cursor-pointer">
            {LANDING.CTA_SECONDARY}
          </button>
        </div>
      </section>

      {/* ─── STATS ROW ─── */}
      <section className="border-t border-border mt-20 py-12 flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-6">
        {LANDING.STATS.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="text-4xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted mt-1">{stat.label}</div>
          </div>
        ))}
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="bg-page-bg py-20 px-6 lg:px-10">
        <h2 className="text-[28px] font-semibold text-dark-text text-center">
          {LANDING.HOW_IT_WORKS_TITLE}
        </h2>
        <p className="text-base text-muted text-center mb-12">
          {LANDING.HOW_IT_WORKS_SUBTITLE}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-[1000px] mx-auto">
          {LANDING.STEPS.map((step, index) => (
            <div
              key={step.title}
              className="bg-white border border-border rounded-xl p-7"
            >
              {/* Icon square */}
              <div className="w-12 h-12 bg-primary-light rounded-lg flex items-center justify-center mb-4">
                {index === 0 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
                {index === 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                )}
                {index === 2 && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                )}
              </div>
              <h3 className="text-base font-semibold text-dark-text mb-2">{step.title}</h3>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="bg-sidebar py-7 text-center">
        <p className="text-[13px] text-white/60">{LANDING.FOOTER}</p>
      </footer>
    </div>
  );
}
