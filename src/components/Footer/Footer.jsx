import { Link } from 'react-router-dom';
import Container from '../ui/Container';
import { BOOKING_URL, SALON_NAME } from '../../constants';
import siteEn from '../../data/site.en.json';
import siteFr from '../../data/site.fr.json';
import { useI18n } from '../../i18n/I18nProvider';
import styles from './Footer.module.css';

export default function Footer() {
  const { lang, toggleLang, t } = useI18n();
  const site = lang === 'fr' ? siteFr : siteEn;

  const footerLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/gallery', label: t('nav.gallery') },
    { to: '/about', label: t('nav.about') },
    { to: '/contact', label: t('nav.contact') }
  ];

  const encodedAddress = encodeURIComponent(site.address);
  const mapEmbedUrl = `https://www.google.com/maps?q=${encodedAddress}&output=embed`;
  const mapOpenUrl = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

  return (
    <footer className={styles.footer}>
      <div className={styles.mapLayer} aria-hidden="true">
        <iframe
          className={styles.mapFrame}
          title={t('footer.mapTitle')}
          src={mapEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
        />
      </div>
      <Container className={styles.inner}>
        <div className={styles.hoursCircle} aria-label={t('footer.workingHours')}>
          <div className={styles.circleTitle}>{t('footer.workingHours')}</div>
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
              <div className={styles.brandCity}>{site.city}</div>
            </div>

            <div className={styles.columns}>
              <div className={styles.col}>
                <div className={styles.colTitle}>{t('footer.contact')}</div>
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
                <div className={styles.colTitle}>{t('footer.explore')}</div>
                <nav aria-label={t('a11y.footerNavigation')} className={styles.footerNav}>
                  {footerLinks.map((item) => (
                    <Link key={item.to} className={styles.footerNavLink} to={item.to}>
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>

              <div className={styles.col}>
                <div className={styles.colTitle}>{t('footer.links')}</div>
                <a className={styles.footerNavLink} href={BOOKING_URL} target="_blank" rel="noreferrer">
                  {t('common.bookNow')}
                </a>
                <a className={styles.footerNavLink} href={site.instagramUrl} target="_blank" rel="noreferrer">
                  {t('footer.instagram')}
                </a>
                <button type="button" className={styles.langButton} onClick={toggleLang} aria-label={t('common.language')}>
                  {lang === 'fr' ? 'EN' : 'FR'}
                </button>
              </div>
            </div>
          </div>

          <div className={styles.bottom}>
            <span className={styles.small}>
              © {new Date().getFullYear()} {SALON_NAME}. {t('footer.rights')}
            </span>
            <span className={styles.small}>{t('footer.designedWithCare')}</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
