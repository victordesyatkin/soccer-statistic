import React, {
  createContext,
  FC,
  useState,
  ComponentClass,
  useCallback,
} from 'react';
import { IntlProvider } from 'react-intl';

import { IntlContextProps } from '../../modules/types';
import { prepareDisplayNameComponent } from '../../helpers';
import { languages } from '../../lang';

const prepareLocale = (locale: string): string => {
  let readyLocale = locale as keyof typeof languages;
  const readyLanguages = Object.keys(languages);
  if (readyLanguages.indexOf(readyLocale) === -1) {
    readyLocale = 'en';
  }
  return readyLocale;
};

const switcherLanguages = (locale: string): Record<string, string> => {
  const readyLocale = prepareLocale(locale) as keyof typeof languages;
  return languages[readyLocale] || languages.en;
};

const local = prepareLocale(navigator.language);
const lang = switcherLanguages(local);

const intlContextDefaultValue: IntlContextProps = {
  locale: local,
};
const { Provider, Consumer: IntlConsumer } = createContext(
  intlContextDefaultValue
);

const IntlProviderWrapper: FC = ({ children }) => {
  const [locale, setLocale] = useState(local);
  const [messages, setMessages] = useState(lang);
  const selectLanguage = useCallback(
    (value?: string) => {
      if (value) {
        const newLocale = value;
        const readyNewLocale = newLocale as keyof typeof languages;
        if (locale !== newLocale && languages[readyNewLocale]) {
          setLocale(newLocale);
          setMessages(switcherLanguages(newLocale));
        }
      }
    },
    [setLocale, setMessages, locale]
  );
  return (
    <Provider value={{ locale, selectLanguage }}>
      <IntlProvider locale={locale} messages={messages}>
        {children}
      </IntlProvider>
    </Provider>
  );
};

const withIntl = <T,>() => (
  Component: ComponentClass<IntlContextProps & T> | FC<IntlContextProps & T>
): FC<IntlContextProps & T> => {
  const WithIntlProvider: FC<IntlContextProps & T> = (props) => {
    return (
      <IntlConsumer>
        {({ locale, selectLanguage }) => {
          return (
            <Component
              locale={locale}
              {...props}
              selectLanguage={selectLanguage}
            />
          );
        }}
      </IntlConsumer>
    );
  };
  WithIntlProvider.displayName = prepareDisplayNameComponent(Component);
  return WithIntlProvider;
};

export { IntlProviderWrapper, IntlConsumer, withIntl };
