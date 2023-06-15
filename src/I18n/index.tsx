import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en';

export const lpInstance = i18n.createInstance();
const resources = {
  en: {
    content: en.content,
  },
};

lpInstance.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
});
