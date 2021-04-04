import React from 'react';

import './header-section.scss';

type HeaderSectionProps = Partial<{
  content: string;
}>;

const HeaderSection: React.FC<HeaderSectionProps> = ({ content }) => {
  const className = 'header-section';
  return <div className={className}>{content}</div>;
};

export type { HeaderSectionProps };
export default HeaderSection;
