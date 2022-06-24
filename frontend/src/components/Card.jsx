import React from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Card({ card, handleCardClick, onCardLike, onCardDelete }) {

  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id || card.owner === currentUser._id;

  const cardDeleteButtonClassName = `gallery__delete-button ${
    isOwn ? 'gallery__delete-button_visible' : 'gallery__delete-button_hidden'
  }`

  const isLiked = card.likes.some(i => i._id === currentUser._id || i === currentUser._id);

  const cardLikeButtonClassName = `gallery__like-button ${
    isLiked ? 'gallery__like-button_field' : ''
  }`

  function handleClick() {
    handleCardClick(card) //{ src: card.link, title: card.name }
  }

  function handleDeleteClick(card) {
    onCardDelete(card)
  }

  return (
    <div className="card">
      <li className="gallery__item card">
      <button
          type="button"
          className={cardDeleteButtonClassName}
          onClick={() => handleDeleteClick(card)}
        />
        <img
          className="gallery__image"
          onClick={() => handleClick()}
          src={card.link}
          alt={card.name}
        />
        <div className="gallery__description">
          <h2 className="gallery__title">{card.name}</h2>
          <div className="gallery__description_side-right">
            <button
              type="button"
              className={cardLikeButtonClassName}
              onClick={() => onCardLike(card)}
            />
            <span className="gallery__like-button_count">
              {card.likes.length}
            </span>
          </div>
        </div>
      </li>
    </div>
  )
}

export default Card;
