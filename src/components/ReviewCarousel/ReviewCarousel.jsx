import { useEffect, useMemo, useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import { useI18n } from '../../i18n/I18nProvider';
import styles from './ReviewCarousel.module.css';

function Star({ filled }) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.3l2.7 5.7 6.2.9-4.5 4.3 1.1 6.2L12 17.9 6.5 20.4l1.1-6.2-4.5-4.3 6.2-.9L12 3.3Z"
        fill={filled ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ReviewCarousel({ reviews, intervalMs = 6000 }) {
  const { lang, t } = useI18n();
  const items = useMemo(() => (Array.isArray(reviews) ? reviews : []), [reviews]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length <= 1) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), intervalMs);
    return () => window.clearInterval(id);
  }, [items.length, intervalMs]);

  const current = items[index];
  if (!current) return null;

  const next = () => setIndex((i) => (i + 1) % items.length);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);

  return (
    <section className={styles.section} aria-label={t('carousel.reviewsLabel')}>
      <div className={styles.card}>
        <div className={styles.top}>
          <div
            className={styles.stars}
            aria-label={lang === 'fr' ? `${current.rating} sur 5` : `${current.rating} out of 5`}
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} filled={i < (current.rating || 0)} />
            ))}
          </div>
          <div className={styles.controls}>
            <button className={styles.controlButton} type="button" onClick={prev} aria-label={t('carousel.previous')}>
              ‹
            </button>
            <button className={styles.controlButton} type="button" onClick={next} aria-label={t('carousel.next')}>
              ›
            </button>
          </div>
        </div>

        <blockquote className={styles.quote}>
          <p className={styles.text}>{current.text}</p>
          <footer className={styles.footer}>
            <span className={styles.name}>{current.name}</span>
            <span className={styles.date}>{formatDate(current.date)}</span>
          </footer>
        </blockquote>
      </div>
    </section>
  );
}
