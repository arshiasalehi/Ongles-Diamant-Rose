import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import ReviewCarousel from '../components/ReviewCarousel/ReviewCarousel';
import reviewsEn from '../data/reviews.en.json';
import reviewsFr from '../data/reviews.fr.json';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/I18nProvider';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  const { lang, t } = useI18n();
  const reviews = lang === 'fr' ? reviewsFr : reviewsEn;

  usePageMeta({
    title: t('about.metaTitle'),
    description: t('about.metaDescription')
  });

  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Reveal>
            <h1 className={styles.h1}>{t('about.title')}</h1>
          </Reveal>
          <Reveal delayMs={90}>
            <p className={styles.lead}>{t('about.lead')}</p>
          </Reveal>
        </header>

        <section className={styles.content} aria-label={t('a11y.aboutSection')}>
          <Reveal delayMs={120}>
            <div className={styles.card}>
              <h2 className={styles.h2}>{t('about.philosophyTitle')}</h2>
              <p className={styles.p}>{t('about.philosophyBody')}</p>
            </div>
          </Reveal>

          <Reveal delayMs={170}>
            <div className={styles.card}>
              <h2 className={styles.h2}>{t('about.designTitle')}</h2>
              <p className={styles.p}>{t('about.designBody')}</p>
            </div>
          </Reveal>
        </section>

        <section className={styles.reviews}>
          <Reveal>
            <h2 className={styles.h2}>{t('about.reviewsTitle')}</h2>
          </Reveal>
          <Reveal delayMs={120}>
            <ReviewCarousel reviews={reviews} />
          </Reveal>
        </section>
      </Container>
    </div>
  );
}
