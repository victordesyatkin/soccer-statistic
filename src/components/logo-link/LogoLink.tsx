import React from 'react';

import LogoImage from '../logo-image';
import type { LogoImageType } from '../logo-image';
import Link from '../link';
import type { LinkProps } from '../link';
import './logo-link.scss';

type LogoLinkProps = {
  logoImage?: LogoImageType;
  link?: LinkProps;
  slogan?: string;
};

const LogoLink: React.FC<LogoLinkProps> = ({ link, logoImage }) => {
  return (
    <div className="logo-link">
      <Link {...link}>
        <LogoImage {...logoImage} />
      </Link>
    </div>
  );
};

export type { LogoLinkProps };
export default LogoLink;
