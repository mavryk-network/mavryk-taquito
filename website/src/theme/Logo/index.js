/**
 * SPDX-License-Identifier: Apache-2.0
 * This file has been modified for the WebMavryk fork of Taquito by Mavryk Dynamics (2025).
 * Original project: Taquito by ECAD Labs Inc.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { useThemeConfig } from '@docusaurus/theme-common';

export default function Logo() {
  const {
    siteConfig: { title },
  } = useDocusaurusContext();
  const {
    navbar: { logo },
  } = useThemeConfig();

  const logoLink = useBaseUrl(logo?.href || '/');
  const logoImageUrl = useBaseUrl(logo?.src || '');
  const logoAlt = logo?.alt || title || 'Logo';

  return (
    <Link to={logoLink} className="navbar__brand">
      <div className="navbar__logo">
        <img src={logoImageUrl} alt={logoAlt} />
      </div>
    </Link>
  );
}
