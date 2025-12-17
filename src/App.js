import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import PromoModal from './components/PromoModal/PromoModal';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <PromoModal />
      <div className="App">
        <Header />
        <main id="main" className="App-main">
          <Suspense
            fallback={
              <div className="App-loading" role="status" aria-live="polite">
                Loading…
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const GalleryPage = lazy(() => import('./pages/GalleryPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
