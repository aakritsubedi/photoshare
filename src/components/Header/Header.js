import React from "react";
import Avatar from "react-avatar";

import { logo } from "assets/image";
import "assets/css/Header.css";

function Header({
  user,
  username,
  avatar,
  onLoginClick,
  onSignUpClick,
  onLogoutClick,
}) {
  return (
    <div className="header-wrapper">
      <div className="header-logo-container">
        <img src={logo} className="header-logo" alt="PhotoShare" />
        <h1 className="header-title">PhotoShare</h1>
      </div>
      <div className="header-info-container">
        {!user ? (
          <>
            <button onClick={onLoginClick}> Login </button>
            <button onClick={onSignUpClick}> Sign up </button>
          </>
        ) : (
          <div> 
            <Avatar
              size="35"
              name={user.displayName}
              src={avatar}
              className="post-user-img"
              round={true}
            />
            {user.displayName}
            <button onClick={onLogoutClick}> Logout </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
