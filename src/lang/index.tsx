import English from './en.json';
import Russian from './ru.json';
import German from './de.json';

const languages = {
  en: English,
  de: German,
  ru: Russian,
};

export * from './defaultMessages';
export { English, Russian, German, languages };
