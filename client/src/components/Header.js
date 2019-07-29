import React from 'react';
import fetchUser from '../actions/fetchUser';

const Header = () => {
  return (
    <header>
      FeedbackFast
      <a href="/auth/google">Google</a>
      <button onClick={fetchUser}>Log user info</button>
    </header>
  );
};

export default Header;
