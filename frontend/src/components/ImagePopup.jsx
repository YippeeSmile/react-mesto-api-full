import React from "react";

function ImagePopup({card, onClose, isOpen}) { 
  return (
    <section onClick={(evt) => {
      if (evt.target.classList.contains('popup_opened')
      || evt.target.classList.contains('popup__close')
    ) onClose();
    }}
      className={`popup ${
        isOpen && "popup_opened"
      }`}
    >
      <div className="popup__image-container">
        <button className="popup__close" />
        <img
          className="popup__image"
          src={card?.link}
          alt={card?.name}
        />
        <figcaption className="popup__image-name">
          {card?.name}
        </figcaption>
      </div>
    </section>
  );
}

export default ImagePopup;
