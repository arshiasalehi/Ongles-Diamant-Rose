import { NavLink } from 'react-router-dom';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Container from '../ui/Container';
import ButtonLink from '../ui/ButtonLink';
import { DiamondIcon } from '../ui/icons';
import { BOOKING_URL, SALON_NAME } from '../../constants';
import { useI18n } from '../../i18n/I18nProvider';
import styles from './Header.module.css';

export default function Header() {
  const { lang, toggleLang, t } = useI18n();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerId = useId();
  const firstLinkRef = useRef(null);

  const navItems = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') }
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);

    const focusTimer = window.setTimeout(() => firstLinkRef.current?.focus(), 0);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [mobileOpen]);

  const mobileMenu = (
    <div className={[styles.mobileLayer, mobileOpen ? styles.open : ''].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={styles.backdrop}
        aria-label={t('common.close')}
        onClick={() => setMobileOpen(false)}
      />
      <div className={styles.drawer} id={drawerId} role="dialog" aria-modal="true" aria-label={t('header.menu')}>
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>{t('header.menu')}</span>
        </div>
        <nav className={styles.navMobile} aria-label={t('header.mobilePrimary')}>
          {navItems.map((item, index) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              ref={index === 0 ? firstLinkRef : undefined}
              className={({ isActive }) =>
                [styles.mobileLink, isActive ? styles.activeMobile : ''].filter(Boolean).join(' ')
              }
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className={styles.drawerFooter}>
          <button type="button" className={styles.langToggleMobile} onClick={toggleLang} aria-label={t('common.language')}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>
          <ButtonLink
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            className={styles.bookMobile}
          >
            {t('common.bookNow')}
          </ButtonLink>
        </div>
      </div>
    </div>
  );

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      <a className={styles.skipLink} href="#main">
        {t('common.skipToContent')}
      </a>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <NavLink
            to="/"
            className={styles.brandLink}
            aria-label={`${SALON_NAME} — ${t('nav.home')}`}
            onClick={() => setMobileOpen(false)}
          >
            <span className={styles.brandIcon} aria-hidden="true">
              <DiamondIcon size={18} />
            </span>
            <span className={styles.brandText}>
              <span className={styles.brandName}>Ongles</span>
              <span className={styles.brandAccent}>Diamant Rose</span>
            </span>
          </NavLink>
        </div>

        <nav className={styles.navDesktop} aria-label={t('header.primary')}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) =>
                [styles.navLink, isActive ? styles.active : ''].filter(Boolean).join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className={styles.actions}>
          <ButtonLink
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            size="sm"
            className={styles.bookDesktop}
          >
            {t('common.bookNow')}
          </ButtonLink>

          <button type="button" className={styles.langToggle} onClick={toggleLang} aria-label={t('common.language')}>
            {lang === 'fr' ? 'EN' : 'FR'}
          </button>

          <button
            type="button"
            className={styles.hamburger}
            aria-label={mobileOpen ? t('header.closeMenu') : t('header.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls={drawerId}
            onClick={() => setMobileOpen((open) => !open)}
          >
            <span className={styles.hamburgerLines} aria-hidden="true" data-open={mobileOpen}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </Container>
      {typeof document !== 'undefined' ? createPortal(mobileMenu, document.body) : null}
    </header>
  );
}
