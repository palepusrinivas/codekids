import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/ThemeProvider';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WebsiteLoader from './components/WebsiteLoader';
import ScrollToTop from './components/ScrollToTop';
import WhatsAppFloat from './components/WhatsAppFloat';
import ChatbotLauncher from './components/ChatbotLauncher';
import CROOptimizer from './components/CROOptimizer';
import { Toaster } from './components/ui/toaster';
import { CursorFollower } from './components/effects';

// Pages - Lazy loaded for better performance
import { lazy, Suspense } from 'react';

const Home = lazy(() => import('./pages/Home'));
const Contact = lazy(() => import('./pages/Contact'));
const CodeKids = lazy(() => import('./pages/CodeKids'));
const CodeKidsJr = lazy(() => import('./pages/CodeKidsJr'));
const CodeKidsJrPricing = lazy(() => import('./pages/CodeKidsJrPricing'));
const CodeKidsPro = lazy(() => import('./pages/CodeKidsPro'));
const CodeKidsProPricing = lazy(() => import('./pages/CodeKidsProPricing'));
const LabsServices = lazy(() => import('./pages/LabsServices'));
const AIBootcamps = lazy(() => import('./pages/AIBootcamps'));

// Loading component - Optimized with memo
const PageLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" aria-label="Loading" />
  </div>
);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="light"
        enableSystem
        disableTransitionOnChange={false}
      >
        <Router
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <div className="relative min-h-screen bg-ck-hero">
            <WebsiteLoader />
            <Navbar />
            <main className="pt-16 sm:pt-20" role="main">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/codekids" element={<CodeKids />} />
                  <Route path="/codekids-jr" element={<CodeKidsJr />} />
                  <Route path="/codekids-jr/pricing" element={<CodeKidsJrPricing />} />
                  <Route path="/codekids-pro" element={<CodeKidsPro />} />
                  <Route path="/codekids-pro/pricing" element={<CodeKidsProPricing />} />
                  <Route path="/labs-services" element={<LabsServices />} />
                  <Route path="/ai-bootcamps" element={<AIBootcamps />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
            <ChatbotLauncher />
            <ScrollToTop />
            <WhatsAppFloat />
            <CursorFollower />
            <CROOptimizer showExitIntent={true} showUrgencyBanner={true} showTrustSignals={true} />
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

