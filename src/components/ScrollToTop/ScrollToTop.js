import { useEffect } from 'react';
import { useLocation } from 'react-router';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window?.navigator?.userAgent?.includes?.('jsdom')) return;
    try {
      window.scrollTo({ top: 0, behavior: 'auto' });
    } catch {
      // jsdom and some environments do not implement scrollTo
    }
  }, [pathname]);

  return null;
}
