import React from 'react';

import { logo } from 'assets/image';
import 'assets/css/Header.css';

function Header() {
  return (
    <div className="header-wrapper">
      <img src={logo} className='header-logo' alt='PhotoShare' />
      <h1 className='header-title'>PhotoShare</h1>
    </div>
  );
}

export default Header;
