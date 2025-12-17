import Container from '../components/ui/Container';
import ButtonLink from '../components/ui/ButtonLink';
import HeroSlider from '../components/HeroSlider/HeroSlider';
import Marquee from '../components/Marquee/Marquee';
import ReviewCarousel from '../components/ReviewCarousel/ReviewCarousel';
import { CalendarIcon, ShieldCheckIcon } from '../components/ui/icons';
import { BOOKING_URL } from '../constants';
import reviews from '../data/reviews.json';
import { featuredNails } from '../data/featuredNails';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './HomePage.module.css';

export default function HomePage() {
  usePageMeta({
    title: 'Home',
    description:
      'Ongles Diamant Rose à Montréal — services de manucure & pédicure, galerie de designs et réservation en ligne.'
  });

  return (
    <>
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <div className={styles.heroLeft}>
            <p className={styles.kicker}>Montréal • Nails Studio</p>
            <h1 className={styles.h1}>Best Nails for Best Moments</h1>
            <div className={styles.divider} aria-hidden="true" />
            <p className={styles.subtext}>
              Book online in seconds and let our
              licensed specialists handle the details.
            </p>
            <div className={styles.heroCtas}>
              <ButtonLink href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
                Book Now
              </ButtonLink>
              <ButtonLink to="/services" variant="secondary">
                View All Services
              </ButtonLink>
            </div>

            <div className={styles.advantages} aria-label="Our advantages">
              <div className={styles.advCard}>
                <span className={styles.advIcon} aria-hidden="true">
                  <CalendarIcon />
                </span>
                <div className={styles.advText}>
                  <div className={styles.advTitle}>Online Booking</div>
                  <div className={styles.advBody}>Fast, simple, and always available.</div>
                </div>
              </div>
              <div className={styles.advCard}>
                <span className={styles.advIcon} aria-hidden="true">
                  <ShieldCheckIcon />
                </span>
                <div className={styles.advText}>
                  <div className={styles.advTitle}>Licensed Specialists</div>
                  <div className={styles.advBody}>Professional care with a clean finish.</div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.heroRight}>
            <HeroSlider images={featuredNails} />
          </div>
        </Container>
      </section>

      <Marquee text="5+ Years of Experience" />

      <section className={styles.studio}>
        <Container>
          <h2 className={styles.h2}>Imagine Yourself In Our Studio</h2>
          <p className={styles.sectionLead}>
            A calm, clean space designed for comfort — with modern techniques
          </p>
          <div className={styles.studioFrame}>
            <img
              src="/images/studio/studio.svg"
              alt="Salon studio interior"
              className={styles.studioImage}
              loading="lazy"
              decoding="async"
            />
          </div>
        </Container>
      </section>

      <section className={styles.reviews}>
        <Container>
          <h2 className={styles.h2}>Hear What Our Customers Have To Say</h2>
          <ReviewCarousel reviews={reviews} />
        </Container>
      </section>
    </>
  );
}
