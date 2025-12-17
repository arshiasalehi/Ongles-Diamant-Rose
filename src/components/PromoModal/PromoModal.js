import { useEffect, useMemo, useRef, useState } from 'react';
import ButtonLink from '../ui/ButtonLink';
import { BOOKING_URL } from '../../constants';
import styles from './PromoModal.module.css';

const STORAGE_KEY = 'odr_promo_dismissed_at';
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

function shouldShowNow(now = Date.now()) {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return true;
    const dismissedAt = Number(raw);
    if (!Number.isFinite(dismissedAt)) return true;
    return now - dismissedAt > ONE_DAY_MS;
  } catch {
    return true;
  }
}

export default function PromoModal() {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  const initial = useMemo(() => shouldShowNow(), []);

  useEffect(() => {
    if (!initial) return;
    const id = window.setTimeout(() => setOpen(true), 400);
    return () => window.clearTimeout(id);
  }, [initial]);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') dismiss();
    };
    window.addEventListener('keydown', onKeyDown);

    const focusTimer = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
      window.clearTimeout(focusTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch {
      // ignore
    }
    setOpen(false);
  };

  if (!open) return null;

  return (
    <div className={styles.layer} role="dialog" aria-modal="true" aria-label="Promotion">
      <button className={styles.backdrop} type="button" aria-label="Close promotion" onClick={dismiss} />
      <div className={styles.modal}>
        <div className={styles.badge}>Limited-time</div>
        <h2 className={styles.title}>A little sparkle, on us.</h2>
        <p className={styles.text}>
          Book today and ask about our seasonal promotion. We’ll help you find the perfect shape, color, and finish.
        </p>
        <div className={styles.actions}>
          <ButtonLink href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
            Book Now
          </ButtonLink>
          <button ref={closeRef} type="button" className={styles.close} onClick={dismiss}>
            Close
          </button>
        </div>
        <p className={styles.note}>This message won’t show again for 24 hours.</p>
      </div>
    </div>
  );
}

