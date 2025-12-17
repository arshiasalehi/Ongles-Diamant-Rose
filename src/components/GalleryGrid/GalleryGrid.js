import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Reveal from '../ui/Reveal';
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

function fileNameFromSrc(src) {
  try {
    const clean = String(src || '').split('?')[0].split('#')[0];
    const base = clean.split('/').pop();
    if (base) return base;
  } catch {
    // ignore
  }
  return 'image';
}

export default function GalleryGrid({ images, categories = DEFAULT_CATEGORIES, initialCount = 25, step = 25 }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [columns, setColumns] = useState(2);
  const [selected, setSelected] = useState(null);
  const closeRef = useRef(null);

  const items = useMemo(() => (Array.isArray(images) ? images : []), [images]);

  useEffect(() => {
    const update = () => {
      setColumns(window.innerWidth >= 720 ? 3 : 2);
    };
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  useEffect(() => {
    if (!selected) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', onKeyDown);

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
  }, [selected]);

  useEffect(() => {
    setSelected(null);
  }, [activeCategory]);

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

  const lightbox = selected ? (
    <div className={styles.lightboxLayer} role="dialog" aria-modal="true" aria-label="Image preview">
      <button
        type="button"
        className={styles.lightboxBackdrop}
        aria-label="Close image preview"
        onClick={() => setSelected(null)}
      />
      <div className={styles.lightboxModal}>
        <div className={styles.lightboxTop}>
          <div className={styles.lightboxTitle}>{selected.alt || 'Gallery image'}</div>
          <button
            ref={closeRef}
            type="button"
            className={styles.lightboxClose}
            onClick={() => setSelected(null)}
          >
            Close
          </button>
        </div>
        <div className={styles.lightboxImageWrap}>
          <img
            src={selected.src}
            alt={selected.alt}
            className={styles.lightboxImage}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className={styles.lightboxActions}>
          <a
            className={styles.lightboxAction}
            href={selected.src}
            download={fileNameFromSrc(selected.src)}
          >
            Download
          </a>
        </div>
      </div>
    </div>
  ) : null;

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
          const col = columns > 0 ? idx % columns : 0;
          const row = columns > 0 ? Math.floor(idx / columns) : 0;
          const delayMs = row * 110 + col * 20;
          return (
            <Reveal
              as="figure"
              key={img.id}
              delayMs={delayMs}
              className={[styles.card, styles[`v${variant}`]].filter(Boolean).join(' ')}
            >
              <button
                type="button"
                className={styles.cardButton}
                onClick={() => setSelected(img)}
                aria-label={`Open image: ${img.alt || 'Gallery image'}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  decoding="async"
                  className={styles.image}
                />
              </button>
            </Reveal>
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

      {typeof document !== 'undefined' && lightbox ? createPortal(lightbox, document.body) : null}
    </div>
  );
}
