import { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import Image from './Image';
import { smoothScrollToElement } from '@/lib/smooth-scroll';

const menuGroups = {
  Programs: [
    { label: 'CodeKids_Jr (For Schools)', href: '/codekids-jr' },
    { label: 'CodeKids_Pro (For Graduates)', href: '/codekids-pro' },
    { label: 'Labs & Services', href: '/labs-services' },
  ],
  Pricing: [
    { label: 'CodeKids_JR Pricing', href: '/codekids-jr/pricing' },
    { label: 'CodeKids_Pro Pricing', href: '/codekids-pro/pricing' },
  ],
  'For Schools': [
    { label: 'JR Program Overview', href: '/codekids-jr' },
    { label: 'STEM Labs', href: '/labs-services' },
    { label: 'Teacher Training', href: '/labs-services#teachers' },
  ],
  'For Students': [],
  Resources: [],
};

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;

  // Throttled scroll handler for better performance
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle anchor link navigation with smooth scrolling
  const handleLinkClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    // Close mobile menu on link click
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);

    // Handle anchor links
    if (href.startsWith('#')) {
      e.preventDefault();
      const elementId = href.substring(1);
      
      // If on different page, navigate first then scroll
      if (pathname !== '/') {
        navigate(`/#${elementId}`);
        setTimeout(() => smoothScrollToElement(elementId, 80, 5), 500);
      } else {
        smoothScrollToElement(elementId, 80, 5);
        // Update URL hash
        if (typeof window !== 'undefined' && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    } else if (href.includes('#')) {
      // Handle cross-page anchor links
      const [path, hash] = href.split('#');
      const elementId = hash;
      
      if (pathname !== path) {
        e.preventDefault();
        navigate(href);
        setTimeout(() => smoothScrollToElement(elementId, 80, 5), 500);
      } else {
        // Same page, just scroll
        e.preventDefault();
        smoothScrollToElement(elementId, 80, 5);
        if (typeof window !== 'undefined' && window.history.pushState) {
          window.history.pushState(null, '', href);
        }
      }
    }
    // For regular links without hash, let React Router handle it normally
  }, [navigate, pathname]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 dark:bg-[#0F1419]/80 backdrop-blur-xl shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link 
            to="/" 
            className="flex items-center gap-2 sm:gap-3 group"
          >
            <div className="relative h-10 w-10 sm:h-12 sm:w-12 rounded-lg sm:rounded-xl overflow-hidden ring-2 ring-primary/20 group-hover:ring-primary/50 transition-all">
              <Image
                src="/assest/codekids_finallogo.jpg"
                alt="CodeKids"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 40px, 48px"
                priority
              />
            </div>
            <span className="text-lg sm:text-xl font-bold font-heading text-foreground">
              Code<span className="bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] bg-clip-text text-transparent">Kids</span>
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium transition-colors py-2 ${
                pathname === '/' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Home
            </Link>
            {Object.entries(menuGroups)
              .filter(([_, items]) => items.length > 0)
              .map(([groupName, items]) => (
                <div
                  key={groupName}
                  className="relative"
                  onMouseEnter={() => setOpenDropdown(groupName)}
                  onMouseLeave={() => setOpenDropdown(null)}
                >
                  <button className="flex items-center gap-1 text-sm font-medium text-foreground hover:text-primary transition-colors py-2">
                    {groupName}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  <AnimatePresence>
                    {openDropdown === groupName && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-[#0F1419] backdrop-blur-xl shadow-xl border border-border rounded-xl p-2 z-[60]"
                      >
                        {items.map((item) => (
                          <Link
                            key={item.href}
                            to={item.href}
                            onClick={(e) => handleLinkClick(e, item.href)}
                            className="block px-4 py-2 text-sm text-foreground hover:text-primary hover:bg-secondary/50 rounded-lg transition-colors duration-200"
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors py-2 ${
                pathname === '/contact' 
                  ? 'text-primary' 
                  : 'text-foreground hover:text-primary'
              }`}
            >
              Contact Us
            </Link>
            <Link
              to="/ai-bootcamps"
              onClick={(e) => handleLinkClick(e, '/ai-bootcamps')}
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white hover:shadow-lg hover:shadow-[#FF4B8F]/50 hover:scale-105 transition-all duration-200 active:scale-95"
            >
              AI Bootcamps
            </Link>
            <Link
              to="/codekids-jr"
              onClick={(e) => handleLinkClick(e, '/codekids-jr')}
              className="px-6 py-2.5 text-sm font-semibold rounded-full bg-ck-gradient-main text-white hover:shadow-lg hover:scale-105 transition-all duration-200 active:scale-95"
            >
              For Schools
            </Link>
            <Link
              to="/codekids-pro"
              onClick={(e) => handleLinkClick(e, '/codekids-pro')}
              className="px-6 py-2.5 text-sm font-semibold rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-200 active:scale-95"
            >
              For Graduates
            </Link>
            <ThemeToggle />
          </div>

          <div className="lg:hidden flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-foreground p-2 -mr-2 sm:mr-0 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 dark:bg-[#0F1419]/95 backdrop-blur-xl border-t border-border max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
              <Link
                to="/"
                onClick={(e) => {
                  handleLinkClick(e, '/');
                  setIsMobileMenuOpen(false);
                }}
                className={`block text-base font-medium transition-colors mb-3 py-2 min-h-[44px] flex items-center ${
                  pathname === '/' 
                    ? 'text-primary' 
                    : 'text-foreground hover:text-primary'
                }`}
              >
                Home
              </Link>
              {Object.entries(menuGroups)
                .filter(([_, items]) => items.length > 0)
                .map(([groupName, items]) => (
                  <div key={groupName} className="pb-2">
                    <h3 className="font-semibold text-foreground mb-3 text-base">{groupName}</h3>
                    <div className="space-y-1 pl-2">
                      {items.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={(e) => {
                            handleLinkClick(e, item.href);
                            setIsMobileMenuOpen(false);
                          }}
                          className="block text-sm sm:text-base text-muted-foreground hover:text-primary transition-colors duration-200 py-2 min-h-[44px] flex items-center"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

              <div className="flex flex-col gap-3 pt-4 border-t border-border">
                <Link
                  to="/contact"
                  onClick={(e) => {
                    handleLinkClick(e, '/contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block text-base font-medium transition-colors py-2 min-h-[44px] flex items-center ${
                    pathname === '/contact' 
                      ? 'text-primary' 
                      : 'text-foreground hover:text-primary'
                  }`}
                >
                  Contact Us
                </Link>
                <Link
                  to="/ai-bootcamps"
                  onClick={(e) => {
                    handleLinkClick(e, '/ai-bootcamps');
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-6 py-3.5 text-center font-semibold rounded-full bg-gradient-to-r from-[#FF4B8F] via-[#7B3DFF] to-[#2ED0FF] text-white transition-all duration-200 active:scale-95 min-h-[48px] flex items-center justify-center touch-manipulation"
                >
                  AI Bootcamps
                </Link>
                <Link
                  to="/codekids-jr"
                  onClick={(e) => {
                    handleLinkClick(e, '/codekids-jr');
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-6 py-3.5 text-center font-semibold rounded-full bg-ck-gradient-main text-white transition-all duration-200 active:scale-95 min-h-[48px] flex items-center justify-center touch-manipulation"
                >
                  For Schools
                </Link>
                <Link
                  to="/codekids-pro"
                  onClick={(e) => {
                    handleLinkClick(e, '/codekids-pro');
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-6 py-3.5 text-center font-semibold rounded-full border-2 border-primary text-primary transition-all duration-200 active:scale-95 min-h-[48px] flex items-center justify-center touch-manipulation"
                >
                  For Graduates
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

