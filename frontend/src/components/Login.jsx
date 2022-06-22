import React, { useState} from 'react';

const Login = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
      };
    
      const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
      
      const handlePasswordChange = (e) => {
        setPassword(e.target.value);
      };


    return (
        <section className="auth">
            <h1 className="auth__title">Вход</h1>
            <form className="auth__form" onSubmit={handleSubmit}>
                <input 
                className="auth__input"
                type="email"
                placeholder="Email"
                required
                value={email || ''}
                onChange={handleEmailChange}/>
                <input 
                className="auth__input"
                type="password"
                placeholder="Пароль"
                value={password || ''}
                onChange={handlePasswordChange}/>
            <button type='submit'
            className="auth__button">Войти</button>
            </form>
        </section> 
    )
}

export default Login;