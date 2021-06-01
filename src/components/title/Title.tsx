import { FC } from 'react';
import ReactDOM from 'react-dom';
import upperFirst from 'lodash.upperfirst';

const Title: FC<{ title?: string; titleSite?: string }> = ({
  title = '',
  titleSite = 'football-statistic',
}) => {
  const titleDomNode = document.getElementsByTagName('title')[0] || null;
  const correctTitle = upperFirst((title || '').trim());
  let readyTitle = upperFirst(titleSite);
  if (correctTitle) {
    readyTitle += ` - ${correctTitle}`;
  }
  return (
    (titleDomNode &&
      readyTitle &&
      ReactDOM.createPortal(readyTitle, titleDomNode)) ||
    null
  );
};

export default Title;
