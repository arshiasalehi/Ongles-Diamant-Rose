import { useEffect } from 'react';
import { SALON_NAME } from '../constants';
import { useI18n } from '../i18n/I18nProvider';

function upsertMetaTag(name, content) {
  if (!content) return;
  const selector = `meta[name="${name}"]`;
  let tag = document.head.querySelector(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute('name', name);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

export function usePageMeta({ title, description }) {
  const { t } = useI18n();

  useEffect(() => {
    const nextTitle = title ? `${title} | ${SALON_NAME}` : SALON_NAME;
    document.title = nextTitle;
    upsertMetaTag(
      'description',
      description ||
        t(
          'home.metaDescription'
        )
    );
  }, [title, description, t]);
}
