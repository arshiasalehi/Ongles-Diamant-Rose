import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Reveal from '../ui/Reveal';
import { useI18n } from '../../i18n/I18nProvider';
import { toPublicUrl } from '../../utils/publicUrl';
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
  const { t } = useI18n();
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(initialCount);
  const [columns, setColumns] = useState(() => (typeof window !== 'undefined' && window.innerWidth >= 720 ? 3 : 2));
  const [selected, setSelected] = useState(null);
  const closeRef = useRef(null);

  const items = useMemo(() => (Array.isArray(images) ? images : []), [images]);
  const safeCategories = useMemo(() => {
    const arr = Array.isArray(categories) ? categories : DEFAULT_CATEGORIES;
    return arr
      .map((c) => {
        if (typeof c === 'string') return { key: c, label: c };
        if (c && typeof c === 'object') return { key: c.key, label: c.label ?? c.key };
        return null;
      })
      .filter((c) => c && c.key);
  }, [categories]);

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
    const wanted = String(activeCategory).toLowerCase();
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
    <div
      className={styles.lightboxLayer}
      role="dialog"
      aria-modal="true"
      aria-label={t('gallery.imagePreview')}
    >
      <button
        type="button"
        className={styles.lightboxBackdrop}
        aria-label={t('gallery.closePreview')}
        onClick={() => setSelected(null)}
      />
      <div className={styles.lightboxModal}>
        <div className={styles.lightboxTop}>
          <div className={styles.lightboxTitle}>{selected.alt || t('gallery.imageFallback')}</div>
          <button
            ref={closeRef}
            type="button"
            className={styles.lightboxClose}
            onClick={() => setSelected(null)}
          >
            {t('common.close')}
          </button>
        </div>
        <div className={styles.lightboxImageWrap}>
          <img
            src={toPublicUrl(selected.src)}
            alt={selected.alt}
            className={styles.lightboxImage}
            loading="eager"
            decoding="async"
          />
        </div>
        <div className={styles.lightboxActions}>
          <a
            className={styles.lightboxAction}
            href={toPublicUrl(selected.src)}
            download={fileNameFromSrc(selected.src)}
          >
            {t('gallery.download')}
          </a>
        </div>
      </div>
    </div>
  ) : null;

  return (
    <div className={styles.wrap}>
      <div className={styles.filters} role="tablist" aria-label={t('gallery.filtersLabel')}>
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === 'All'}
          className={[styles.filter, activeCategory === 'All' ? styles.active : ''].join(' ')}
          onClick={() => onPick('All')}
        >
          {t('gallery.all')}
        </button>
        {safeCategories.map((c) => (
          <button
            key={c.key}
            type="button"
            role="tab"
            aria-selected={activeCategory === c.key}
            className={[styles.filter, activeCategory === c.key ? styles.active : ''].join(' ')}
            onClick={() => onPick(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className={styles.grid} aria-label={t('gallery.gridLabel')}>
        {visible.map((img, idx) => {
          const variant = idx % 9;
          const col = columns > 0 ? idx % columns : 0;
          const row = columns > 0 ? Math.floor(idx / columns) : 0;
          const delayMs = Math.max(0, row - 1) * 110 + col * 20;

          const cardInner = (
            <button
              type="button"
              className={styles.cardButton}
              onClick={() => setSelected(img)}
              aria-label={`${t('gallery.openImage')}: ${img.alt || t('gallery.imageFallback')}`}
            >
              <img
                src={toPublicUrl(img.src)}
                alt={img.alt}
                loading="lazy"
                decoding="async"
                className={styles.image}
              />
            </button>
          );

          return (
            row === 0 ? (
              <figure key={img.id} className={[styles.card, styles[`v${variant}`]].filter(Boolean).join(' ')}>
                {cardInner}
              </figure>
            ) : (
              <Reveal
                as="figure"
                key={img.id}
                delayMs={delayMs}
                className={[styles.card, styles[`v${variant}`]].filter(Boolean).join(' ')}
              >
                {cardInner}
              </Reveal>
            )
          );
        })}
      </div>

      {filtered.length === 0 ? (
        <div className={styles.empty} role="status">
          {t('gallery.noImages')}
        </div>
      ) : null}

      {canLoadMore ? (
        <div className={styles.loadMore}>
          <button type="button" className={styles.loadButton} onClick={() => setVisibleCount((c) => c + step)}>
            {t('gallery.loadMore')}
          </button>
        </div>
      ) : null}

      {typeof document !== 'undefined' && lightbox ? createPortal(lightbox, document.body) : null}
    </div>
  );
}
