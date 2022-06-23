import React, { useContext} from 'react';
import Card from './Card';
import { CurrentUserContext } from '../context/CurrentUserContext';

function Main(props) {
  const currentUser = useContext(CurrentUserContext) // подписываемся на контекст
  return (
    <div className="Main">
      <main className="content">
        <section className="profile">
          <div className="profile__avatar">
            <button
              className="profile__avatar-button"
              onClick={props.onEditAvatar}
            ></button>
            <img
              src={currentUser.avatar}
              className="profile__image"
              alt="Аватар"
            />
          </div>
          <div className="profile__info">
            <div className="profile__text">
              <h1 className="profile__name">{currentUser.name}</h1>
              <button
                className="profile__edit-button"
                onClick={props.onEditProfile}
              ></button>
            </div>
            <p className="profile__further">{currentUser.about}</p>
          </div>
          <button
            className="profile__add-button"
            onClick={props.onAddPlace}
          ></button>
        </section>
        <section className="gallery">
          <ul className="gallery__items">
            {props.cards.map((element) => {
              return (
                <Card
                  card={element}
                  key={element._id}
                  handleCardClick={props.handleCardClick}
                  onCardLike={props.handleCardLike}
                  onCardDelete={props.handleCardDelete}
                />
              )
            })}
          </ul>
        </section>
      </main>
    </div>
  )
}

export default Main
