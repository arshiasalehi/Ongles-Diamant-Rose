import Container from '../components/ui/Container';
import ButtonLink from '../components/ui/ButtonLink';
import { usePageMeta } from '../hooks/usePageMeta';
import { useI18n } from '../i18n/I18nProvider';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  const { t } = useI18n();

  usePageMeta({
    title: t('notFound.metaTitle'),
    description: t('notFound.metaDescription')
  });

  return (
    <div className={styles.page}>
      <Container className={styles.inner}>
        <h1 className={styles.h1}>{t('notFound.title')}</h1>
        <p className={styles.text}>{t('notFound.text')}</p>
        <ButtonLink to="/" variant="primary">
          {t('notFound.backHome')}
        </ButtonLink>
      </Container>
    </div>
  );
}
