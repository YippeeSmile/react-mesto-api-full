import React from 'react';
import {useEffect, useState, useContext} from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../context/CurrentUserContext';

function EditProfilePopup(props) {
  const currentUser = useContext(CurrentUserContext) // подписываемся на контекст
  const [name, setName] = useState(currentUser.name)
  const [description, setDescription] = useState(currentUser.about)

  useEffect(() => {
    setName(currentUser.name)
    setDescription(currentUser.about)
  }, [currentUser, props.isOpen])

  function handleSubmit(e) {
    e.preventDefault() // Запрещаем браузеру переходить по адресу формы

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    })
  }

  return (
    <PopupWithForm
      name="profile-edit"
      title="Редактировать профиль"
      submitButtonValue="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      formName="profile-form"
    >
      <input
        id="username"
        required
        name="username"
        value={name || ''}
        onChange={(e) => setName(e.target.value)}
        placeholder="Имя"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_name"
      />
      <span
        id="username-error"
        className="error-message error-message_visible"
      />
      <input
        id="usertext"
        required
        name="userjob"
        value={description || ''}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="О себе"
        minLength="2"
        maxLength="200"
        className="popup__input popup__input_about"
      />
      <span
        id="usertext-error"
        className="error-message error-message_visible"
      />
    </PopupWithForm>
  )
}

export default EditProfilePopup
