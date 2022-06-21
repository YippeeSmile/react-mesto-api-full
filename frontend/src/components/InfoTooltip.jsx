import React from "react";
import authErrorImage from '../images/auth-error.svg';
import authSuccessImage from '../images/auth-success.svg';

const InfoTooltip = ({ isSuccess, isError, isOpen, onClose}) => {

    return (

        <section className={`info-tooltip ${isOpen && "info-tooltip_opened"}`}
        onClick={onClose}>
        <div className="info-tooltip__container">
          <button className="info-tooltip__close-btn" />
          <img className="info-tooltip__image" src={isError ? authErrorImage : authSuccessImage} alt='info-icon'/>
          <p className="info-tooltip__text">
            {isSuccess &&  'Вы успешно зарегистрировались!'}
            {isError && 'Что-то пошло не так! Попробуйте ещё раз.'}
          </p>
        </div>
      </section>
    )
}

export default InfoTooltip;