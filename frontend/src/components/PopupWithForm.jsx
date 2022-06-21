import React from "react";

function PopupWithForm({ name, title, formName, submitButtonValue,
  isOpen, children, onClose, onSubmit}) {
    
  return (
    <div className="PopupWithForm" 
    onClick={(evt) => {
      if (evt.target.classList.contains('popup_opened')
      || evt.target.classList.contains('popup__close')
    ) onClose();
    }}
    >
      <section className={`popup popup_${name} ${isOpen && "popup_opened"}`}>
        <div className="popup__container">
          <button className="popup__close" />
          <h2 className="popup__title"> {title} </h2>
          <form onSubmit={onSubmit} className="popup__form" name={formName} noValidate>
            {children}
            <button
              type="submit"
              className="popup__save-button"
              value={submitButtonValue}
            >
              {submitButtonValue}
            </button>
          </form>
        </div>
      </section>
   </div>
  );
}

export default PopupWithForm;
