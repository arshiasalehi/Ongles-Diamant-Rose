import Container from '../components/ui/Container';
import Reveal from '../components/ui/Reveal';
import GalleryGrid from '../components/GalleryGrid/GalleryGrid';
import galleryEn from '../data/gallery.en.json';
import galleryFr from '../data/gallery.fr.json';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/I18nProvider';
import styles from './GalleryPage.module.css';

export default function GalleryPage() {
  const { lang, t } = useI18n();
  const gallery = lang === 'fr' ? galleryFr : galleryEn;

  usePageMeta({
    title: t('gallery.metaTitle'),
    description: t('gallery.metaDescription')
  });

  const categories = [
    { key: 'New Designs', label: t('gallery.categories.newDesigns') },
    { key: 'New Colors', label: t('gallery.categories.newColors') },
    { key: 'Ombré', label: t('gallery.categories.ombre') },
    { key: 'Nude', label: t('gallery.categories.nude') },
    { key: 'Red', label: t('gallery.categories.red') },
    { key: 'Clear', label: t('gallery.categories.clear') },
    { key: 'Chrome', label: t('gallery.categories.chrome') },
    { key: 'Orange', label: t('gallery.categories.orange') },
    { key: 'Pink', label: t('gallery.categories.pink') },
    { key: 'Neon', label: t('gallery.categories.neon') },
    { key: 'Yellow', label: t('gallery.categories.yellow') },
    { key: 'Aqua', label: t('gallery.categories.aqua') },
    { key: 'White', label: t('gallery.categories.white') }
  ];

  return (
    <div className={styles.page}>
      <Container>
        <header className={styles.header}>
          <Reveal>
            <h1 className={styles.h1}>{t('gallery.title')}</h1>
          </Reveal>
          <Reveal delayMs={90}>
            <p className={styles.lead}>{t('gallery.lead')}</p>
          </Reveal>
        </header>
        <GalleryGrid images={gallery} categories={categories} />
      </Container>
    </div>
  );
}
