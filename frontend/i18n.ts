import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      "products_found": "{{count}} products found",
      "sort_low_high": "Price: Low-High",
      "sort_high_low": "Price: High-Low",
      "grid": "Grid",
      "list": "List",
      "quick_add": "Quick Add to Cart",
      "no_products": "No products found.",
      "retry": "Retry",
      "error_loading": "Error loading products"
    }
  },
  es: {
    translation: {
      "products_found": "{{count}} productos encontrados",
      "sort_low_high": "Precio: Menor-Mayor",
      "sort_high_low": "Precio: Mayor-Menor",
      "grid": "Cuadrícula",
      "list": "Lista",
      "quick_add": "Añadir rápido al carrito",
      "no_products": "No se encontraron productos.",
      "retry": "Reintentar",
      "error_loading": "Error al cargar productos"
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
