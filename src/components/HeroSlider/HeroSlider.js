import { useEffect, useMemo, useState } from 'react';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import styles from './HeroSlider.module.css';

export default function HeroSlider({ images, intervalMs = 3000 }) {
  const reducedMotion = usePrefersReducedMotion();
  const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;
    if (safeImages.length <= 1) return;
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % safeImages.length);
    }, intervalMs);
    return () => window.clearInterval(id);
  }, [safeImages.length, intervalMs, reducedMotion]);

  if (!safeImages.length) return null;

  return (
    <div className={styles.frame} aria-label="Featured salon images">
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
    </div>
  );
}

