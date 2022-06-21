import React from 'react'
import PopupWithForm from './PopupWithForm'
import { useState } from 'react'

function AddPlacePopup(props) {
  const [name, setName] = useState('')
  const [link, setLink] = useState('')

  function handleSubmit(e) {
    e.preventDefault()

    props.onAddPlaceSubmit({
      name,
      link,
    })
  }

  React.useEffect(() => {
    setName('')
    setLink('')
  }, [props.isOpen])

  return (
    <PopupWithForm
      name="card-edit"
      title="Новое место"
      submitButtonValue="Создать"
      onClose={props.onClose}
      isOpen={props.isOpen}
      onSubmit={handleSubmit}
      formName="edit-card"
    >
      <input
        id="cardname"
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Название"
        minLength="2"
        maxLength="40"
        className="popup__input popup__input_card-name"
        required
      />
      <span
        id="cardname-error"
        className="error-message error-message_visible"
      />
      <input
        id="cardlink"
        type="url"
        name="link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        placeholder="Ссылка на картинку"
        className="popup__input popup__input_card-link"
        required
      />
      <span
        id="cardlink-error"
        className="error-message error-message_visible"
      />
    </PopupWithForm>
  )
}

export default AddPlacePopup
