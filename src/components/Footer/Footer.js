import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import { BOOKING_URL, SALON_NAME } from '../../constants';
import site from '../../data/site.json';
import styles from './Footer.module.css';

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' }
];

export default function Footer() {
  const encodedAddress = encodeURIComponent(site.address);
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.mapLayer} aria-hidden="true">
        <iframe
          className={styles.mapFrame}
          title="Map"
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
        />
      </div>
      <Container className={styles.inner}>
        <div className={styles.hoursCircle} aria-label="Working hours">
          <div className={styles.circleTitle}>Working Hours</div>
          <ul className={styles.hours}>
            {site.workingHours.map((row) => (
              <li key={row.label} className={styles.hoursRow}>
                <span className={styles.hoursLabel}>{row.label}</span>
                <span className={styles.hoursValue}>{row.value}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.footerBar} aria-label={`${SALON_NAME} footer`}>
          <div className={styles.footerTop}>
            <div className={styles.brand}>
              <div className={styles.brandName}>{SALON_NAME}</div>
              <div className={styles.brandCity}>Montréal</div>
            </div>

            <div className={styles.columns}>
              <div className={styles.col}>
                <div className={styles.colTitle}>Contact</div>
                <a className={styles.link} href={mapOpenUrl} target="_blank" rel="noreferrer">
                  {site.address}
                </a>
                <a className={styles.link} href={`tel:${site.phoneE164}`}>
                  {site.phoneDisplay}
                </a>
                <a className={styles.link} href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>

              <div className={styles.col}>
                <div className={styles.colTitle}>Explore</div>
                <nav aria-label="Footer navigation" className={styles.footerNav}>
                  {footerLinks.map((item) => (
                    <Link key={item.to} className={styles.footerNavLink} to={item.to}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className={styles.col}>
                <div className={styles.colTitle}>Links</div>
                <a className={styles.footerNavLink} href={BOOKING_URL} target="_blank" rel="noreferrer">
                  Book Now
                </a>
                <a className={styles.footerNavLink} href={site.instagramUrl} target="_blank" rel="noreferrer">
                  Instagram
                </a>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <span className={styles.small}>
              © {new Date().getFullYear()} {SALON_NAME}. All rights reserved.
            </span>
            <span className={styles.small}>Designed with care.</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
