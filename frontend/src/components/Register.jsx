import React, { useState} from 'react';
import { Link } from 'react-router-dom';

const Register = ({ onRegister }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onRegister({ email, password });
      };

      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };


    return (
        <section className="auth">
            <h1 className="auth__title">Регистрация</h1>
            <form className="auth__form" name="form-auth" onSubmit={handleSubmit}>
                <input 
                className="auth__input"
                type="email"
                placeholder="Email"
                value={email || ''}
                onChange={handleEmailChange}/>
                <input 
                className="auth__input"
                type="password"
                placeholder="Пароль"
                value={password || ''}
                onChange={handlePasswordChange}/>
            <button 
            className="auth__button"
            type="submit">Зарегистрироваться</button>
            </form>
            <div className="auth__signin">
          <p>Уже зарегистрированы?</p>
          <Link to="/signin" className="auth__login-link">Войти</Link>
        </div>
        </section>
    )
}

export default Register;