import React from 'react';
import PopupWithForm from './PopupWithForm';
import { useRef, useEffect } from 'react';

function EditAvatarPopup(props) {
  //onClose, isOpen, onUpdateAvatar
  const avatarRef = useRef()

  function handleSubmit(e) {
    e.preventDefault()

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    })
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [props.isOpen]);

  return (
    <PopupWithForm
      name="popup popup_avatar-edit"
      title="Обновить аватар"
      formName="avatar-form"
      submitButtonValue="Сохранить"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
    >
      <input
        id="avatarlink"
        type="url"
        ref={avatarRef}
        name="avatarlink"
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_avatar-link"
        required
      />
      <span
        id="avatarlink-error"
        className="error-message error-message_visible"
      />
    </PopupWithForm>
  )
}

export default EditAvatarPopup;
