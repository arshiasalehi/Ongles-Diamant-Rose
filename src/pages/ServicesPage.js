import Container from '../components/ui/Container';
import ButtonLink from '../components/ui/ButtonLink';
import Reveal from '../components/ui/Reveal';
import ServicesAccordion from '../components/ServicesAccordion/ServicesAccordion';
import { BOOKING_URL } from '../constants';
import servicesEn from '../data/services.en.json';
import servicesFr from '../data/services.fr.json';
import { getFeaturedNails } from '../data/featuredNails';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/I18nProvider';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  const { lang, t } = useI18n();
  const services = lang === 'fr' ? servicesFr : servicesEn;
  const featuredNails = getFeaturedNails(lang);

  usePageMeta({
    title: t('services.metaTitle'),
    description: t('services.metaDescription')
  });

  const randomNail = featuredNails[Math.floor(Math.random() * featuredNails.length)];
  const randomSupportNail = featuredNails[Math.floor(Math.random() * featuredNails.length)];

  return (
    <div className={styles.page}>
      <Container>
        <section className={styles.intro}>
          <Reveal className={styles.introTop}>
            <img
              src={randomNail.src}
              alt={randomNail.alt}
              className={styles.introImage}
              loading="lazy"
              decoding="async"
            />
          </Reveal>
          <div className={styles.introContent}>
            <Reveal delayMs={60}>
              <h1 className={styles.h1}>{t('services.headline')}</h1>
            </Reveal>
            <Reveal delayMs={110}>
              <p className={styles.lead}>{t('services.lead')}</p>
            </Reveal>

            <Reveal delayMs={160}>
              <div className={styles.highlights} aria-label={t('services.highlightsLabel')}>
                <div className={styles.highlight}>
                  <div className={styles.highlightValue}>{t('services.highlights.yearsValue')}</div>
                  <div className={styles.highlightLabel}>{t('services.highlights.yearsLabel')}</div>
                </div>
                <div className={styles.highlight}>
                  <div className={styles.highlightValue}>{t('services.highlights.proValue')}</div>
                  <div className={styles.highlightLabel}>{t('services.highlights.proLabel')}</div>
                </div>
                <div className={styles.highlight}>
                  <div className={styles.highlightValue}>{t('services.highlights.fairValue')}</div>
                  <div className={styles.highlightLabel}>{t('services.highlights.fairLabel')}</div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={210}>
              <div className={styles.ctas}>
                <ButtonLink href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
                  {t('common.bookNow')}
                </ButtonLink>
                <ButtonLink to="/gallery" variant="secondary">
                  {t('services.viewGallery')}
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.list}>
          <Reveal>
            <h2 className={styles.h2}>{t('services.ourServices')}</h2>
          </Reveal>
          <Reveal delayMs={90}>
            <p className={styles.note}>{t('services.note')}</p>
          </Reveal>
          <Reveal delayMs={140}>
            <ServicesAccordion
              services={services}
              supportingImageSrc={randomSupportNail.src}
              supportingImageAlt={randomSupportNail.alt}
            />
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
