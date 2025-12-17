import { useEffect, useMemo, useRef, useState } from 'react';
import ButtonLink from '../ui/ButtonLink';
import { BOOKING_URL } from '../../constants';
import { useI18n } from '../../i18n/I18nProvider';
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
  const { t } = useI18n();
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
    <div className={styles.layer} role="dialog" aria-modal="true" aria-label={t('promo.label')}>
      <button className={styles.backdrop} type="button" aria-label={t('common.close')} onClick={dismiss} />
      <div className={styles.modal}>
        <div className={styles.badge}>{t('promo.badge')}</div>
        <h2 className={styles.title}>{t('promo.title')}</h2>
        <p className={styles.text}>{t('promo.text')}</p>
        <div className={styles.actions}>
          <ButtonLink href={BOOKING_URL} target="_blank" rel="noreferrer" variant="primary">
            {t('common.bookNow')}
          </ButtonLink>
          <button ref={closeRef} type="button" className={styles.close} onClick={dismiss}>
            {t('common.close')}
          </button>
        </div>
        <p className={styles.note}>{t('promo.note')}</p>
      </div>
    </div>
  );
}
