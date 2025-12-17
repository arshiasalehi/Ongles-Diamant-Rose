import { useEffect, useMemo, useState } from 'react';
import { useI18n } from '../../i18n/I18nProvider';
import styles from './HeroSlider.module.css';

export default function HeroSlider({ images, intervalMs = 3000 }) {
  const { lang, t } = useI18n();
  const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (safeImages.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % safeImages.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [safeImages.length, intervalMs]);

  if (!safeImages.length) return null;

  return (
    <div className={styles.frame} aria-label={t('home.heroImagesLabel')}>
      {safeImages.map((img, i) => (
        <img
          key={img.src}
          src={img.src}
          alt={img.alt}
          className={[styles.image, i === index ? styles.active : styles.inactive]
            .filter(Boolean)
            .join(' ')}
          loading={i === 0 ? 'eager' : 'lazy'}
          decoding="async"
        />
      ))}

      {safeImages.length > 1 ? (
        <div className={styles.dots} role="tablist" aria-label={t('a11y.heroSelection')}>
          {safeImages.map((img, i) => (
            <button
              key={img.src}
              type="button"
              role="tab"
              aria-selected={i === index}
              aria-label={lang === 'fr' ? `Aller à la diapositive ${i + 1}` : `Go to slide ${i + 1}`}
              className={[styles.dot, i === index ? styles.dotActive : ''].filter(Boolean).join(' ')}
              onClick={() => setIndex(i)}
            >
              <span className={styles.dotLabel}>
                {lang === 'fr' ? `Aller à la diapositive ${i + 1}` : `Go to slide ${i + 1}`}
              </span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
