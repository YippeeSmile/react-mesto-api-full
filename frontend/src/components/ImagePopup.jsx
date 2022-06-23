import React from "react";

function ImagePopup({card, onClose, isOpen}) { //props
  return (
    <section 
      className={`popup ${
        isOpen && "popup_opened"
      }`}
    >
      <div className="popup__image-container">
        <button className="popup__close" onClick={() => onClose} />
        <img
          className="popup__image"
          src={card.link}
          alt={card.name}
        />
        <figcaption className="popup__image-name">
          {card.name}
        </figcaption>
      </div>
    </section>
  );
}

export default ImagePopup;
