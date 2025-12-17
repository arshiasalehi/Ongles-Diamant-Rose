import Container from '../components/ui/Container';
import ButtonLink from '../components/ui/ButtonLink';
import Reveal from '../components/ui/Reveal';
import ServicesAccordion from '../components/ServicesAccordion/ServicesAccordion';
import { BOOKING_URL } from '../constants';
import services from '../data/services.json';
import { featuredNails } from '../data/featuredNails';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './ServicesPage.module.css';

export default function ServicesPage() {
  usePageMeta({
    title: 'Services',
    description:
      'Découvrez les services Ongles Diamant Rose: manucure, pédicure, acrylique et nail art. Réservation en ligne.'
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
              <h1 className={styles.h1}>The Best Place For A Makeover</h1>
            </Reveal>
            <Reveal delayMs={110}>
              <p className={styles.lead}>Let us help you put a little sparkle back into your life.</p>
            </Reveal>

            <Reveal delayMs={160}>
              <div className={styles.highlights} aria-label="Service highlights">
                <div className={styles.highlight}>
                  <div className={styles.highlightValue}>5+</div>
                  <div className={styles.highlightLabel}>Years of Experience</div>
                </div>
                <div className={styles.highlight}>
                  <div className={styles.highlightValue}>Pro</div>
                  <div className={styles.highlightLabel}>Professional Staff</div>
                </div>
                <div className={styles.highlight}>
                  <div className={styles.highlightValue}>Fair</div>
                  <div className={styles.highlightLabel}>Affordable Care Price</div>
                </div>
              </div>
            </Reveal>

            <Reveal delayMs={210}>
              <div className={styles.ctas}>
                <ButtonLink href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
                  Book Now
                </ButtonLink>
                <ButtonLink to="/gallery" variant="secondary">
                  View Gallery
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </section>

        <section className={styles.list}>
          <Reveal>
            <h2 className={styles.h2}>Our Services</h2>
          </Reveal>
          <Reveal delayMs={90}>
            <p className={styles.note}>
              Click on each service to see more details and pricing information.
            </p>
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
