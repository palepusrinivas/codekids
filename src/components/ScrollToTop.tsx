import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { smoothScrollToElement } from '@/lib/smooth-scroll';

/**
 * ScrollToTop component that automatically scrolls to the top of the page
 * when the route changes, unless there's a hash in the URL (for anchor links)
 */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash, scroll to the anchor element
    if (hash) {
      const elementId = hash.substring(1);
      // Use multiple retries to handle dynamically loaded content
      const timer = setTimeout(() => {
        smoothScrollToElement(elementId, 80, 5);
      }, 100);
      return () => clearTimeout(timer);
    } else {
      // No hash - scroll to top smoothly
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      });
    }
  }, [pathname, hash]);

  return null;
}
