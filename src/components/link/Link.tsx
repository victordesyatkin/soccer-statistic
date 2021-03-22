import React from 'react';

type Props = {
  href: string;
  title?: string;
  target?: string;
  rel?: string;
  isCurrent?: boolean;
  children?: JSX.Element | string;
};

function Link({
  href,
  title,
  target,
  rel,
  children,
  isCurrent,
}: Props): JSX.Element {
  const className = 'link';
  let classNames = className;
  classNames += isCurrent ? ` ${className}_current` : '';
  let readyRel = rel ? `${rel} ` : '';
  if (target === '_blank') {
    readyRel += 'noopener noreferrer';
  }
  return (
    <a href={href} className={classNames} rel={readyRel} title={title}>
      {children}
    </a>
  );
}

Link.defaultProps = {
  title: undefined,
  target: undefined,
  rel: undefined,
  isCurrent: undefined,
  children: undefined,
};

export default Link;
