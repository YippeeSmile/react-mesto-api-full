import React from 'react';
import logo from '../images/mesto-logo.svg';
import { Link, useLocation } from 'react-router-dom';


function Header({ email, handleSignOut }) {
  const location = useLocation();


  return (
    <header className="header">
      <img src={logo} alt='Логотип Mesto' className='logo'  />

      <div className="header__links">
        {location.pathname === '/signin' && (
          <Link to='/signup' className="header__link">
            Регистрация
          </Link>
        )}
        {location.pathname === '/signup' && (
          <Link to='/signin' className="header__link">
            Войти
          </Link>
        )}
        {location.pathname === '/' && (
          <>
          {email && <span className="header__email">{email}</span>}
          <button className="header__link" onClick={handleSignOut}>
            Выйти
          </button>
          </>
        )}
      </div>
    </header>
  );
}
export default Header;
