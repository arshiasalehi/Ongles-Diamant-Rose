import { useMemo, useState } from 'react';
import styles from './GalleryGrid.module.css';

const DEFAULT_CATEGORIES = [
  'New Designs',
  'New Colors',
  'Ombré',
  'Nude',
  'Red',
  'Clear',
  'Chrome',
  'Orange',
  'Pink',
  'Neon',
  'Yellow',
  'Aqua',
  'White'
];

export default function GalleryGrid({ images, categories = DEFAULT_CATEGORIES, initialCount = 25, step = 25 }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(initialCount);

  const items = useMemo(() => (Array.isArray(images) ? images : []), [images]);

  const filtered = useMemo(() => {
    if (activeCategory === 'All') return items;
    const wanted = activeCategory.toLowerCase();
    return items.filter((img) =>
      Array.isArray(img.categories)
        ? img.categories.some((c) => String(c).toLowerCase() === wanted)
        : false
    );
  }, [items, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const canLoadMore = visible.length < filtered.length;

  const onPick = (category) => {
    setActiveCategory(category);
    setVisibleCount(initialCount);
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="tablist" aria-label="Gallery filters">
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'All'}
          className={[styles.filter, activeCategory === 'All' ? styles.active : ''].join(' ')}
          onClick={() => onPick('All')}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={activeCategory === c}
            className={[styles.filter, activeCategory === c ? styles.active : ''].join(' ')}
            onClick={() => onPick(c)}
          >
            {c}
          </button>
        ))}
      </div>

      <div className={styles.grid} aria-label="Image gallery">
        {visible.map((img, idx) => {
          const variant = idx % 9;
          return (
          <figure key={img.id} className={[styles.card, styles[`v${variant}`]].filter(Boolean).join(' ')}>
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              decoding="async"
              className={styles.image}
            />
          </figure>
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty} role="status">
          No images found for this filter.
        </div>
      ) : null}

      {canLoadMore ? (
        <div className={styles.loadMore}>
          <button type="button" className={styles.loadButton} onClick={() => setVisibleCount((c) => c + step)}>
            Load More
          </button>
        </div>
      ) : null}
    </div>
  );
}
