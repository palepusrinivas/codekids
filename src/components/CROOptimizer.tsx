import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Phone, MessageCircle, Clock, CheckCircle, TrendingUp, Users, Award, Sparkles, Star } from 'lucide-react';

interface CROOptimizerProps {
  showExitIntent?: boolean;
  showUrgencyBanner?: boolean;
  showTrustSignals?: boolean;
}

export default function CROOptimizer({ 
  showExitIntent = true, 
  showUrgencyBanner = true,
  showTrustSignals = true 
}: CROOptimizerProps) {
  const [showExitIntentPopup, setShowExitIntentPopup] = useState(false);
  const [showUrgencyBannerState, setShowUrgencyBannerState] = useState(true);
  const [hasShownExitIntent, setHasShownExitIntent] = useState(false);
  const [showTrustSignalsState, setShowTrustSignalsState] = useState(true);

  // Check localStorage for user preference
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const hidden = localStorage.getItem('trustSignalsHidden');
    if (hidden === 'true') {
      setShowTrustSignalsState(false);
    }
  }, []);

  // Save user preference to localStorage
  const handleHideTrustSignals = () => {
    setShowTrustSignalsState(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('trustSignalsHidden', 'true');
    }
  };

  const CONTACT_PHONE = '+918008937902';
  const CONTACT_PHONE_CLEAN = '918008937902';
  const WHATSAPP_MESSAGE = 'Hello! I\'m interested in CodeKids Technologies courses. Can you please provide more information?';

  // Exit Intent Detection - Optimized with passive listener
  useEffect(() => {
    if (typeof window === 'undefined' || typeof document === 'undefined') return;
    if (!showExitIntent || hasShownExitIntent) return;

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitIntent) {
        setShowExitIntentPopup(true);
        setHasShownExitIntent(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [showExitIntent, hasShownExitIntent]);

  // Urgency Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 30,
    seconds: 0,
  });

  useEffect(() => {
    if (!showUrgencyBanner) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        } else {
          // Reset timer
          return { hours: 2, minutes: 30, seconds: 0 };
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showUrgencyBanner]);

  const handleWhatsApp = () => {
    if (typeof window === 'undefined') return;
    const url = `https://wa.me/${CONTACT_PHONE_CLEAN}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
    window.open(url, '_blank');
  };

  const handleCall = () => {
    if (typeof window === 'undefined') return;
    window.location.href = `tel:${CONTACT_PHONE_CLEAN}`;
  };

  return (
    <>
      {/* Urgency Banner */}
      {showUrgencyBanner && showUrgencyBannerState && (
        <motion.div
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ y: -100 }}
          className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#FF4FD8] via-purple-600 to-[#00E0FF] text-white px-3 sm:px-4 py-2 sm:py-3 shadow-lg"
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap justify-center sm:justify-start w-full sm:w-auto">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Clock className="h-4 w-4 sm:h-5 sm:w-5 animate-pulse flex-shrink-0" />
                <span className="font-semibold text-xs sm:text-sm">Limited Time:</span>
                <span className="font-mono font-bold text-sm sm:text-lg">
                  {String(timeLeft.hours).padStart(2, '0')}:
                  {String(timeLeft.minutes).padStart(2, '0')}:
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
              </div>
              <span className="hidden md:inline text-sm">⏰ Enroll Today - Get 20% Off + Free Demo Session!</span>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleWhatsApp}
                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white text-[#FF4FD8] rounded-full font-semibold text-xs sm:text-sm hover:shadow-lg transition-shadow flex items-center gap-1.5 sm:gap-2 min-h-[40px] sm:min-h-[44px] touch-manipulation"
              >
                <MessageCircle className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                <span className="hidden xs:inline">WhatsApp Now</span>
                <span className="xs:hidden">WhatsApp</span>
              </motion.button>
              <button
                onClick={() => setShowUrgencyBannerState(false)}
                className="p-1.5 sm:p-2 hover:bg-white/20 rounded-full transition-colors min-h-[40px] sm:min-h-[44px] min-w-[40px] sm:min-w-[44px] flex items-center justify-center touch-manipulation"
                aria-label="Close banner"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitIntentPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
            onClick={() => setShowExitIntentPopup(false)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-lg w-full p-8 relative overflow-hidden"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF4FD8]/10 via-purple-600/10 to-[#00E0FF]/10" />
              
              <button
                onClick={() => setShowExitIntentPopup(false)}
                className="absolute top-4 right-4 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full transition-colors z-10"
                aria-label="Close popup"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-16 w-16 rounded-full bg-gradient-to-br from-[#FF4FD8] to-purple-600 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Wait! 🎓</h3>
                    <p className="text-gray-600 dark:text-gray-400">Don't miss out on this opportunity!</p>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Get a FREE Demo Session</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Experience our courses before you commit</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">20% Early Bird Discount</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Limited time offer - expires soon!</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">Placement Assistance Included</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Job-ready skills with guaranteed support</p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWhatsApp}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-full font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleCall}
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-[#FF4FD8] to-[#00E0FF] text-white rounded-full font-semibold hover:shadow-lg transition-shadow flex items-center justify-center gap-2"
                  >
                    <Phone className="h-5 w-5" />
                    Call Now
                  </motion.button>
                </div>

                <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                  📞 {CONTACT_PHONE} | Usually responds in 2 minutes
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trust Signals Bar - Floating */}
      <AnimatePresence>
        {showTrustSignals && showTrustSignalsState && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 2 }}
            className="fixed bottom-24 left-2 right-2 sm:left-4 sm:right-4 md:left-auto md:right-6 md:w-auto z-40 hidden md:block"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 p-3 sm:p-4 backdrop-blur-lg relative">
              {/* Close Button */}
              <button
                onClick={handleHideTrustSignals}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors z-10 min-h-[32px] min-w-[32px] touch-manipulation"
                aria-label="Hide trust signals"
                title="Hide this widget"
              >
                <X className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300" />
              </button>

              <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                    <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Trusted by</p>
                    <p className="font-bold text-gray-900 dark:text-white">1,250+ Students</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-700" />
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-yellow-100 dark:bg-yellow-900 flex items-center justify-center">
                    <Star className="h-6 w-6 text-yellow-600 dark:text-yellow-400 fill-current" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Rated</p>
                    <p className="font-bold text-gray-900 dark:text-white">4.9/5 ⭐</p>
                  </div>
                </div>
                <div className="h-8 w-px bg-gray-300 dark:bg-gray-700" />
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                    <Award className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Certified</p>
                    <p className="font-bold text-gray-900 dark:text-white">20+ Schools</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Trust Signals */}
      <AnimatePresence>
        {showTrustSignals && showTrustSignalsState && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ delay: 2 }}
            className="fixed bottom-24 left-2 right-2 z-40 block md:hidden"
          >
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-gray-200 dark:border-gray-800 p-2.5 sm:p-3 relative">
              {/* Close Button for Mobile */}
              <button
                onClick={handleHideTrustSignals}
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center transition-colors z-10 min-h-[32px] min-w-[32px] touch-manipulation"
                aria-label="Hide trust signals"
                title="Hide this widget"
              >
                <X className="h-3.5 w-3.5 text-gray-600 dark:text-gray-300" />
              </button>

              <div className="flex items-center justify-around gap-1 sm:gap-2">
                <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                  <Users className="h-4 w-4 sm:h-5 sm:w-5 text-[#FF4FD8]" />
                  <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white">1,250+</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">Students</p>
                </div>
                <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                  <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-500 fill-current" />
                  <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white">4.9/5</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">Rating</p>
                </div>
                <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                  <Award className="h-4 w-4 sm:h-5 sm:w-5 text-blue-500" />
                  <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white">20+</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">Schools</p>
                </div>
                <div className="flex flex-col items-center gap-0.5 sm:gap-1">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                  <p className="text-[10px] sm:text-xs font-bold text-gray-900 dark:text-white">90%</p>
                  <p className="text-[9px] sm:text-[10px] text-gray-500 dark:text-gray-400">Success</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
