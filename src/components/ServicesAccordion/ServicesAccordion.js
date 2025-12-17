import { useId, useMemo, useState } from 'react';
import ButtonLink from '../ui/ButtonLink';
import { BOOKING_URL } from '../../constants';
import styles from './ServicesAccordion.module.css';

export default function ServicesAccordion({ services, supportingImageSrc, supportingImageAlt }) {
  const items = useMemo(() => (Array.isArray(services) ? services : []), [services]);
  const [openId, setOpenId] = useState(items[0]?.id ?? null);
  const groupId = useId();

  return (
    <div className={styles.layout}>
      <div className={styles.left}>
        <div className={styles.accordion} role="region" aria-label="Services list">
          {items.map((service) => {
            const isOpen = service.id === openId;
            const panelId = `${groupId}-panel-${service.id}`;
            const buttonId = `${groupId}-button-${service.id}`;

            return (
              <div key={service.id} className={[styles.item, isOpen ? styles.open : ''].join(' ')}>
                <button
                  id={buttonId}
                  type="button"
                  className={styles.trigger}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenId((current) => (current === service.id ? null : service.id))}
                >
                  <span className={styles.titleWrap}>
                    <span className={styles.title}>{service.title}</span>
                    {service.subtitle ? <span className={styles.subtitle}>{service.subtitle}</span> : null}
                  </span>
                  <span className={styles.meta} aria-hidden="true">
                    <span className={styles.price}>{service.price}</span>
                    <span className={styles.chev}>{isOpen ? '−' : '+'}</span>
                  </span>
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={styles.panel}
                  data-open={isOpen}
                >
                  <div className={styles.panelInner}>
                    <div className={styles.details}>
                      {service.duration ? (
                        <div className={styles.detailRow}>
                          <span className={styles.detailLabel}>Duration</span>
                          <span className={styles.detailValue}>{service.duration}</span>
                        </div>
                      ) : null}
                      {service.details ? <p className={styles.description}>{service.details}</p> : null}
                    </div>
                    <div className={styles.cta}>
                      <ButtonLink
                        href={BOOKING_URL}
                        target="_blank"
                        rel="noreferrer"
                        variant="primary"
                        size="sm"
                      >
                        Book Now
                      </ButtonLink>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.right} aria-label="Supporting image">
        <div className={styles.imageFrame}>
          <img
            src={supportingImageSrc}
            alt={supportingImageAlt}
            className={styles.image}
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  );
}

