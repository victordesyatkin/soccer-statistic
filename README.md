# Демо-проект Football-Statistic

[Online demo](https://victordesyatkin.github.io/soccer-statistic/index.html)

Football-Statistic - приложение для просмотра спортивной статистики ведущих европейских турниров по футболу. В качестве публичного API для получения данных использовался [football-data.org](https://www.football-data.org/). Используется free пакет, 10 запросов в минуту, сервис имеет ограниченное количество изображений для лиг, остальные генерируются на их основе.

### Проект выполнялся для получения базовых навыков работы с:

- [ReactJS](https://reactjs.org/);
- [Typescript](https://www.typescriptlang.org/);
- [React-Redux](https://react-redux.js.org/);
- [React-Router](https://reactrouter.com/);
- [React-Intl](https://formatjs.io/docs/getting-started/installation/);
- [React-Waypoint](https://github.com/civiccc/react-waypoint);
- [Redux-Thunk](https://github.com/reduxjs/redux-thunk);
- [Styled-Components](https://styled-components.com/);
- [Sass](https://sass-lang.com/);
- [BEM](https://en.bem.info/methodology/);
- [Axios API](https://github.com/axios/axios);
- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API);
- [React-Actions](https://github.com/redux-utilities/redux-actions);
- [GitHub Flavored Markdown](https://github.github.com/gfm/);
- [Webpack](https://webpack.js.org/);
- [ESLint](https://eslint.org/);

### Список страниц:

- Список Лиг;
- Список команд;
- Список матчей со статистикой;
- Иформация по конкретной команде;

На страницах реализовано поле фильтр с выпадающим списком (возможен любой необходимый дизайн пунктов списка).

На страницах реализован календарь и можно указать фильтр по дате (с, по)

На страницах реализован поиск и можно найти сущность по текстовому поиску.

### Особенности приложения:

Для отправки запросов и получения данных используется класс StatisticService, который принимает отдельные экземляры классов ClientRequestAxios - класс использующий библиотеку axios или ClientRequestFetch - класс использующий Fetch API. В приложение есть возможность переключаться между API. Для удобства переключения используется HOC withStatisticService (StatisticServiceProvider, StatisticServiceConsumer).

Хранения данных осуществляется посредством redux. Отдельные reducers для leagues, teams, conuntries, seasons, matches, errors и т.д. объединяются с помощью combineReducers. Для обработки асинхронных actions используется redux-thunk. Примером оптимизации, удобства использования и сокращения кода является reducer matches с использованием redux-actions.

Для стилизации приложения используются методология БЭМ, Styled Components и препроцессор Sass. Приложение имеет responsive дизайн.

Приложение разделенно на контейнеры и презентационный компоненты, все они построенны на hooks, упор делался на оптимизацию с useMemo, useCallback, для получения данных из store используется useSelector.

Для оптимизации приложения используется динамический импорт React.lazy, Suspense.

Для оптимизации запросов получения данных реализован пример ленивой подгрузки с использованием react-waypoint.

Модальные окна (возможно закрытие по timeout) и изменение title документа реализованно с помощью порталов.

Приложение локализованно на три языка (английский, немецкий, русский), для этого использовалась библиотека react-intl. Переключение языка возможно в любом компоненте приложения с помощью HOC withIntl (IntlProviderWrapper, IntlConsumer).

Для приобритения опыта работы с react-router для страницы mathes, после обновления страницы, данные фильтра (даты) сохраняются, т.е. параметры отображаются в адресной строке.

Для обработки ошибок приложения используется класс ErrorBoundary c componentDidCatch.

Для приобритения опыта интеграции jQuery приложения в react с typescript используется [air-datepicker](https://github.com/t1m0n/air-datepicker) и [air-datepicker.d.ts](https://github.com/victordesyatkin/air-datepicker.d.ts).

### Переменные окружения

Переменные окружения храняться в отдельном файле .env (dotenv-webpack) в корне проекта:
API_BASE=https://api.football-data.org/v2
API_KEY=...

### Установка

1. Установить совместимую версию Node.js v14.x (например v14.17.0 LTS)
2. Клонированить репозиторий
   <git clone git@github.com:victordesyatkin/toxin.git>
3. Установить зависимости
   <npm i>
4. Запуск приложения
   <npm run start>
5. В барузере открыть страницу по адресу http://localhost:8080/
6. Запуск сборки приложения
   <npm run build>
7. Развертывание приложения
   <npm run deploy>
