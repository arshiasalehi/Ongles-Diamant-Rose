import { useEffect, useRef, useState } from 'react';
import styles from './Reveal.module.css';

export default function Reveal({
  as: Component = 'div',
  children,
  className = '',
  delayMs = 0,
  once = true,
  style,
  ...props
}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (visible && once) return;

    if (typeof window === 'undefined' || typeof window.IntersectionObserver !== 'function') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            if (!once) setVisible(false);
            continue;
          }
          window.requestAnimationFrame(() => setVisible(true));
          if (once) observer.disconnect();
        }
      },
      { root: null, threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once, visible]);

  return (
    <Component
      ref={ref}
      className={[styles.reveal, visible ? styles.visible : '', className].filter(Boolean).join(' ')}
      style={{ '--reveal-delay': `${Math.max(0, delayMs)}ms`, ...style }}
      {...props}
    >
      {children}
    </Component>
  );
}
