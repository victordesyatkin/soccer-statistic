import React from 'react';

import { LogoLinkProps } from '../../modules/types';
import LogoImage from '../logo-image';
import Link from '../link';
import './logo-link.scss';

const LogoLink: React.FC<LogoLinkProps> = ({ link, logoImage }) => {
  return (
    <div className="logo-link">
      <Link {...link}>
        <LogoImage {...logoImage} />
      </Link>
    </div>
  );
};

export default LogoLink;
