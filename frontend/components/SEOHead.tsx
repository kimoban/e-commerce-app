import React from 'react';

// Only rendered on web
const SEOHead: React.FC<{ title?: string; description?: string; ogImage?: string }> = ({ title, description, ogImage }) => {
  if (typeof document === 'undefined') return null;
  if (title) document.title = title;
  if (description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('name', 'description');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', description);
  }
  if (ogImage) {
    let meta = document.querySelector('meta[property="og:image"]');
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', 'og:image');
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', ogImage);
  }
  return null;
};

export default SEOHead;
