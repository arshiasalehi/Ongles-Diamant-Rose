import styles from './Marquee.module.css';

export default function Marquee({ text }) {
  const items = Array.from({ length: 14 });

  return (
    <div className={styles.wrap} aria-label={text}>
      <div className={styles.scroller} aria-hidden="true">
        <div className={styles.track}>
          {items.map((_, idx) => (
            <span key={idx} className={styles.chunk}>
              <span className={styles.item}>{text}</span>
              <span className={styles.dot}>•</span>
            </span>
          ))}
        </div>
        <div className={styles.track} aria-hidden="true">
          {items.map((_, idx) => (
            <span key={idx} className={styles.chunk}>
              <span className={styles.item}>{text}</span>
              <span className={styles.dot}>•</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
