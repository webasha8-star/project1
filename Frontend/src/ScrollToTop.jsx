import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'auto' });
    };

    // Try immediate scroll
    scrollToTop();

    // Fallback: retry after a short delay to bypass rendering
    const timeoutId = setTimeout(() => {
      scrollToTop();
    }, 0);

    // Use requestAnimationFrame for smoother execution
    const rafId = requestAnimationFrame(scrollToTop);

    return () => {
      clearTimeout(timeoutId);
      cancelAnimationFrame(rafId);
    };
  }, [pathname]);

  return null;
}