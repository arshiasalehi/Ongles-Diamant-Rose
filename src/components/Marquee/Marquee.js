import styles from './Marquee.module.css';

export default function Marquee({ text }) {
  return (
    <div className={styles.wrap} aria-label={text}>
      <div className={styles.track} aria-hidden="true">
        <span className={styles.item}>{text}</span>
        <span className={styles.dot}>•</span>
        <span className={styles.item}>{text}</span>
        <span className={styles.dot}>•</span>
        <span className={styles.item}>{text}</span>
        <span className={styles.dot}>•</span>
        <span className={styles.item}>{text}</span>
      </div>
    </div>
  );
}

