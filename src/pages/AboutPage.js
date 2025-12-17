import Container from '../components/ui/Container';
import ReviewCarousel from '../components/ReviewCarousel/ReviewCarousel';
import reviews from '../data/reviews.json';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './AboutPage.module.css';

export default function AboutPage() {
  usePageMeta({
    title: 'About Us',
    description:
      'Ongles Diamant Rose — salon de manucure à Montréal. Une expérience moderne, féminine, propre et attentionnée.'
  });

  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <h1 className={styles.h1}>About Ongles Diamant Rose</h1>
          <p className={styles.lead}>
            We’re a Montréal nail salon focused on clean technique, comfort, and modern design. From
            classic looks to bold seasonal trends, our goal is simple: you leave feeling polished and confident.
          </p>
        </header>

        <section className={styles.content} aria-label="About our salon">
          <div className={styles.card}>
            <h2 className={styles.h2}>Our Philosophy</h2>
            <p className={styles.p}>
              We believe great nails start with great care: thoughtful prep, hygiene-first tools, and a finish that looks
              effortless. Every appointment is personalized to your style and your day-to-day comfort.
            </p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.h2}>Design, Color, Detail</h2>
            <p className={styles.p}>
              Love chrome, ombré, or clean nude sets? We keep our work modern and minimal — always with subtle, smooth
              details and a luxury feel.
            </p>
          </div>
        </section>

        <section className={styles.reviews}>
          <h2 className={styles.h2}>Customer Reviews</h2>
          <ReviewCarousel reviews={reviews} />
        </section>
      </Container>
    </div>
  );
}

