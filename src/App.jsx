import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import { useLocation } from 'react-router';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PromoModal from './components/PromoModal/PromoModal';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { I18nProvider, useI18n } from './i18n/I18nProvider';

const baseUrl = import.meta.env.BASE_URL || '/';
const routerBasename =
  import.meta.env.VITEST || baseUrl === '/' ? '' : baseUrl.replace(/\/$/, '');

function App() {
  return (
    <I18nProvider>
      <BrowserRouter basename={routerBasename}>
        <AppShell />
      </BrowserRouter>
    </I18nProvider>
  );
}

export default App;

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

function AppShell() {
  const location = useLocation();
  const { t } = useI18n();

  return (
    <>
      <ScrollToTop />
      <PromoModal />
      <div className="App">
        <Header />
        <main id="main" className="App-main">
          <Suspense
            fallback={
              <div className="App-loading" role="status" aria-live="polite">
                {t('common.loading')}
              </div>
            }
          >
            <div className="App-page" key={location.pathname}>
              <Routes location={location}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/gallery" element={<GalleryPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </div>
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
}
