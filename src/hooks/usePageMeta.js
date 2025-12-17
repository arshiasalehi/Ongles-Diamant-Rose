import { useEffect } from 'react';
import { SALON_NAME } from '../constants';

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
  useEffect(() => {
    const nextTitle = title ? `${title} | ${SALON_NAME}` : SALON_NAME;
    document.title = nextTitle;
    upsertMetaTag(
      'description',
      description ||
        'Salon de manucure et pédicure à Montréal. Découvrez nos services, notre galerie et réservez en ligne.'
    );
  }, [title, description]);
}

