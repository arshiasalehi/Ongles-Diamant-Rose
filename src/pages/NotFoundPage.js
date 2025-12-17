import Container from '../components/ui/Container';
import ButtonLink from '../components/ui/ButtonLink';
import { usePageMeta } from '../hooks/usePageMeta';
import styles from './NotFoundPage.module.css';

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found',
    description: 'The requested page could not be found.'
  });

  return (
    <div className={styles.page}>
      <Container className={styles.inner}>
        <h1 className={styles.h1}>404</h1>
        <p className={styles.text}>The page you’re looking for doesn’t exist.</p>
        <ButtonLink to="/" variant="primary">
          Back to Home
        </ButtonLink>
      </Container>
    </div>
  );
}

