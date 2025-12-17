import Container from '../components/ui/Container';
import ButtonLink from '../components/ui/ButtonLink';
import Reveal from '../components/ui/Reveal';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import Marquee from '../components/Marquee/Marquee';
import ReviewCarousel from '../components/ReviewCarousel/ReviewCarousel';
import { CalendarIcon, ShieldCheckIcon } from '../components/ui/icons';
import { BOOKING_URL } from '../constants';
import reviewsEn from '../data/reviews.en.json';
import reviewsFr from '../data/reviews.fr.json';
import { getFeaturedNails } from '../data/featuredNails';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/I18nProvider';
import styles from './HomePage.module.css';

export default function HomePage() {
  const { lang, t } = useI18n();
  const reviews = lang === 'fr' ? reviewsFr : reviewsEn;
  const featuredNails = getFeaturedNails(lang);

  usePageMeta({
    title: t('home.metaTitle'),
    description: t('home.metaDescription')
  });

  return (
    <>
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <Reveal delayMs={40}>
              <p className={styles.kicker}>{t('home.kicker')}</p>
            </Reveal>
            <Reveal delayMs={90}>
              <h1 className={styles.h1}>{t('home.headline')}</h1>
            </Reveal>
            <Reveal delayMs={130}>
              <div className={styles.divider} aria-hidden="true" />
            </Reveal>
            <Reveal delayMs={170}>
              <p className={styles.subtext}>{t('home.subtext')}</p>
            </Reveal>
            <Reveal delayMs={210}>
              <div className={styles.heroCtas}>
                <ButtonLink href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
                  {t('common.bookNow')}
                </ButtonLink>
                <ButtonLink to="/services" variant="secondary">
                  {t('home.viewAllServices')}
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delayMs={260}>
              <div className={styles.advantages} aria-label={t('home.advantagesLabel')}>
                <div className={styles.advCard}>
                  <span className={styles.advIcon} aria-hidden="true">
                    <CalendarIcon />
                  </span>
                  <div className={styles.advText}>
                    <div className={styles.advTitle}>{t('home.advantages.onlineBookingTitle')}</div>
                    <div className={styles.advBody}>{t('home.advantages.onlineBookingBody')}</div>
                  </div>
                </div>
                <div className={styles.advCard}>
                  <span className={styles.advIcon} aria-hidden="true">
                    <ShieldCheckIcon />
                  </span>
                  <div className={styles.advText}>
                    <div className={styles.advTitle}>{t('home.advantages.licensedTitle')}</div>
                    <div className={styles.advBody}>{t('home.advantages.licensedBody')}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal className={styles.heroRight} delayMs={160}>
            <HeroSlider images={featuredNails} intervalMs={2000} />
          </Reveal>
        </Container>
      </section>

      <Marquee text={t('home.marquee')} />

      <section className={styles.studio}>
        <Container>
          <Reveal>
            <h2 className={styles.h2}>{t('home.studioTitle')}</h2>
          </Reveal>
          <Reveal delayMs={90}>
            <p className={styles.sectionLead}>{t('home.studioLead')}</p>
          </Reveal>
          <Reveal delayMs={140}>
            <div className={styles.studioFrame}>
              <img
                src="/images/studio/studio.svg"
                alt={t('home.studioImageAlt')}
                className={styles.studioImage}
                loading="lazy"
                decoding="async"
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className={styles.reviews}>
        <Container>
          <Reveal>
            <h2 className={styles.h2}>{t('home.reviewsTitle')}</h2>
          </Reveal>
          <Reveal delayMs={120}>
            <ReviewCarousel reviews={reviews} />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
