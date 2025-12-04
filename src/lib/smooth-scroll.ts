/**
 * Smooth scroll utility for anchor links
 * Enhanced with better error handling and retry logic
 */
export function smoothScrollToElement(elementId: string, offset = 80, retries = 3) {
  if (typeof window === 'undefined') return;

  // Clean elementId - remove any leading # or path
  const cleanId = elementId.replace(/^#/, '').split('#').pop() || elementId;
  
  const element = document.getElementById(cleanId);
  
  if (!element) {
    // If element not found and we have retries, wait a bit and try again
    // This helps with dynamically loaded content
    if (retries > 0) {
      setTimeout(() => {
        smoothScrollToElement(cleanId, offset, retries - 1);
      }, 200);
      return;
    }
    
    // Last resort: try to find element by data-id or name attribute
    const fallbackElement = document.querySelector(`[data-id="${cleanId}"]`) as HTMLElement ||
                           document.querySelector(`[name="${cleanId}"]`) as HTMLElement ||
                           document.querySelector(`[id*="${cleanId}"]`) as HTMLElement;
    
    if (fallbackElement) {
      const elementPosition = fallbackElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
      return;
    }
    
    console.warn(`Element with id "${cleanId}" not found`);
    return;
  }

  // Calculate position with offset
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  // Smooth scroll to element
  window.scrollTo({
    top: Math.max(0, offsetPosition), // Ensure we don't scroll to negative position
    behavior: 'smooth',
  });
}

/**
 * Handle anchor link clicks for smooth scrolling
 * Enhanced to work with React Router navigation
 */
export function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>,
  href: string,
  offset = 80
) {
  // Prevent default to handle navigation manually
  e.preventDefault();
  e.stopPropagation();
  
  // Handle both anchor-only links (#section) and full path with hash (/page#section)
  if (!href) {
    return;
  }

  // Extract path and hash
  let path = '';
  let hash = '';
  let elementId = '';

  if (href.startsWith('#')) {
    // Just an anchor link on current page
    hash = href;
    elementId = href.substring(1);
  } else if (href.includes('#')) {
    // Full path with hash
    const hashIndex = href.indexOf('#');
    path = href.substring(0, hashIndex);
    hash = href.substring(hashIndex);
    elementId = hash.substring(1);
  } else {
    // Regular path without hash - let React Router handle it
    return;
  }

  // If we need to navigate to a different page, use React Router
  // This will be handled by the component using this function
  // For same-page anchors, scroll immediately
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
  
  if (!path || path === currentPath || path === '/') {
    // Same page - scroll immediately
    smoothScrollToElement(elementId, offset);
    
    // Update URL hash
    if (typeof window !== 'undefined' && window.history.pushState) {
      window.history.pushState(null, '', hash || window.location.pathname);
    }
  } else {
    // Different page - return info for navigation
    // The calling component should handle navigation
    return { path, hash, elementId };
  }
}

