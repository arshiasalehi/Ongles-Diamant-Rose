import { NavLink } from 'react-router-dom';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Container from '../ui/Container';
import ButtonLink from '../ui/ButtonLink';
import { DiamondIcon } from '../ui/icons';
import { BOOKING_URL, SALON_NAME } from '../../constants';
import styles from './Header.module.css';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' }
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const drawerId = useId();
  const firstLinkRef = useRef(null);

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
        aria-label="Close menu"
        onClick={() => setMobileOpen(false)}
      />
      <div className={styles.drawer} id={drawerId} role="dialog" aria-modal="true" aria-label="Menu">
        <div className={styles.drawerHeader}>
          <span className={styles.drawerTitle}>Menu</span>
        </div>
        <nav className={styles.navMobile} aria-label="Mobile primary">
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
          <ButtonLink
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            className={styles.bookMobile}
          >
            Book Now
          </ButtonLink>
        </div>
      </div>
    </div>
  );

  return (
    <header className={[styles.header, scrolled ? styles.scrolled : ''].filter(Boolean).join(' ')}>
      <a className={styles.skipLink} href="#main">
        Skip to content
      </a>
      <Container className={styles.inner}>
        <div className={styles.brand}>
          <NavLink
            to="/"
            className={styles.brandLink}
            aria-label={`${SALON_NAME} — Home`}
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

        <nav className={styles.navDesktop} aria-label="Primary">
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
            Book Now
          </ButtonLink>

          <button
            type="button"
            className={styles.hamburger}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
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
