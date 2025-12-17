import Container from '../components/ui/Container';
import ButtonLink from '../components/ui/ButtonLink';
import Reveal from '../components/ui/Reveal';
import { BOOKING_URL } from '../constants';
import siteEn from '../data/site.en.json';
import siteFr from '../data/site.fr.json';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/I18nProvider';
import styles from './ContactPage.module.css';

const FORMSPREE_ENDPOINT =
  process.env.REACT_APP_FORMSPREE_ENDPOINT || 'https://formspree.io/f/yourFormId';

export default function ContactPage() {
  const { lang, t } = useI18n();
  const site = lang === 'fr' ? siteFr : siteEn;

  usePageMeta({
    title: t('contact.metaTitle'),
    description: t('contact.metaDescription')
  });

  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Reveal>
            <h1 className={styles.h1}>{t('contact.title')}</h1>
          </Reveal>
          <Reveal delayMs={90}>
            <p className={styles.lead}>{t('contact.lead')}</p>
          </Reveal>
          <Reveal delayMs={140}>
            <div className={styles.headerCtas}>
              <ButtonLink href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
                {t('common.bookNow')}
              </ButtonLink>
            </div>
          </Reveal>
        </header>

        <div className={styles.layout}>
          <Reveal as="section" className={styles.info} aria-label={t('contact.infoLabel')} delayMs={80}>
            <div className={styles.infoCard}>
              <h2 className={styles.h2}>{t('contact.salonInfo')}</h2>
              <div className={styles.infoRow}>
                <span className={styles.label}>{t('contact.address')}</span>
                <span className={styles.value}>{site.address}</span>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>{t('contact.phone')}</span>
                <a className={styles.link} href={`tel:${site.phoneE164}`}>
                  {site.phoneDisplay}
                </a>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>{t('contact.email')}</span>
                <a className={styles.link} href={`mailto:${site.email}`}>
                  {site.email}
                </a>
              </div>
              <div className={styles.infoRow}>
                <span className={styles.label}>{t('contact.instagram')}</span>
                <a className={styles.link} href={site.instagramUrl} target="_blank" rel="noreferrer">
                  {t('contact.visitProfile')}
                </a>
              </div>
            </div>

            <div className={styles.infoCard}>
              <h2 className={styles.h2}>{t('contact.workingHours')}</h2>
              <ul className={styles.hours}>
                {site.workingHours.map((row) => (
                  <li key={row.label} className={styles.hoursRow}>
                    <span className={styles.hoursLabel}>{row.label}</span>
                    <span className={styles.hoursValue}>{row.value}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal as="section" className={styles.formWrap} aria-label={t('contact.formLabel')} delayMs={140}>
            <div className={styles.formCard}>
              <h2 className={styles.h2}>{t('contact.sendMessage')}</h2>
              <p className={styles.formLead}>{t('contact.formLead')}</p>

              <form className={styles.form} action={FORMSPREE_ENDPOINT} method="POST">
                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="name">
                    {t('contact.name')}
                  </label>
                  <input className={styles.input} id="name" name="name" autoComplete="name" required />
                </div>

                <div className={styles.fieldRow}>
                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="email">
                      {t('contact.email')}
                    </label>
                    <input
                      className={styles.input}
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                    />
                  </div>

                  <div className={styles.field}>
                    <label className={styles.fieldLabel} htmlFor="phone">
                      {t('contact.phone')}
                    </label>
                    <input className={styles.input} id="phone" name="phone" type="tel" autoComplete="tel" />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.fieldLabel} htmlFor="message">
                    {t('contact.message')}
                  </label>
                  <textarea className={styles.textarea} id="message" name="message" rows={6} required />
                </div>

                <input type="hidden" name="_subject" value={t('contact.subject')} />

                <div className={styles.formActions}>
                  <button className={styles.submit} type="submit">
                    {t('contact.send')}
                  </button>
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </Container>
    </div>
  );
}
