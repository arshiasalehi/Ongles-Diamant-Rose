import Container from '../components/ui/Container';
import GalleryGrid from '../components/GalleryGrid/GalleryGrid';
import gallery from '../data/gallery.json';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './GalleryPage.module.css';

export default function GalleryPage() {
  usePageMeta({
    title: 'Gallery',
    description:
      'Explorez notre galerie de designs: couleurs, ombré, chrome, nude, rouge et plus — Ongles Diamant Rose Montréal.'
  });

  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <h1 className={styles.h1}>Gallery</h1>
          <p className={styles.lead}>
            A minimal, frameless grid showcasing new designs and favorite finishes. Use filters to explore instantly.
          </p>
        </header>
        <GalleryGrid images={gallery} />
      </Container>
    </div>
  );
}

