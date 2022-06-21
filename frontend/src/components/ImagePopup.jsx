import React from "react";

function ImagePopup(card, onClose, isOpen) { //props
  return (
    <section onClick={() => onClose} 
      className={`popup ${
        isOpen && "popup_opened"
      }`}
    >
      <div className="popup__image-container">
        <button className="popup__close" />
        <img
          className="popup__image"
          src={card?.src}
          alt={card?.title}
        />
        <figcaption className="popup__image-name">
          {card?.title}
        </figcaption>
      </div>
    </section>
  );
}

export default ImagePopup;
