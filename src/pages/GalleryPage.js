import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
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
          <Reveal>
            <h1 className={styles.h1}>Gallery</h1>
          </Reveal>
          <Reveal delayMs={90}>
            <p className={styles.lead}>
              A minimal, frameless grid showcasing new designs and favorite finishes. Use filters to explore instantly.
            </p>
          </Reveal>
        </header>
        <Reveal delayMs={140}>
          <GalleryGrid images={gallery} />
        </Reveal>
      </Container>
    </div>
  );
}
