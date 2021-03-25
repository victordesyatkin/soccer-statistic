import React from 'react';

import LogoImage from '../logo-image';
import type { LogoImageType } from '../logo-image';
import Link from '../link';
import type { LinkType } from '../link';
import './logo-link.scss';

type LogoLinkType = {
  logoImage?: LogoImageType;
  link?: LinkType;
  slogan?: string;
};

const LogoLink: React.FC<LogoLinkType> = ({ link, logoImage }) => {
  return (
    <div className="logo-link">
      <Link {...link}>
        <LogoImage {...logoImage} />
      </Link>
    </div>
  );
};

export type { LogoLinkType };
export default LogoLink;
