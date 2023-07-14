import React,  { useState } from "react";
import '../pages/index.css';
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'
import { PopupWithForm } from './PopupWithForm'
import { ImagePopup } from './ImagePopup'

function App() {
  const [isEditProfilePopupOpen, setisEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setisAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setisEditAvatarPopupOpen] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)

  const handleEditAvatarClick = () => {
    setisEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setisEditProfilePopupOpen(true)
  }

  const  handleAddPlaceClick = () => {
    setisAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsImagePopup(true)
  }

  const closeAllPopups = () => {
    setisEditAvatarPopupOpen(false)
    setisEditProfilePopupOpen(false)
    setisAddPlacePopupOpen(false)
    setIsImagePopup(false)
  };

  return (
    <div className="page">
    <Header />

    <Main 
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    />

    <Footer />

    <PopupWithForm
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
        name="popup__title" 
        title="Обновить аватар"
        buttonName = "Сохранить">
           <label className="popup__form-element">
              <input
                id="avatar-input"
                type="text"
                className="popup__item popup__item_el_link"
                name="avatar"
                placeholder="Ссылка на картинку"
                pattern="https?://.*\.(png|jpg|jpeg|gif)"
                required=""
              />
              <span className="avatar-input-error popup__input-error" />
            </label>
      </PopupWithForm> 

    <PopupWithForm
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        name="edit-profile" 
        title="Редактировать профиль" 
        buttonName = "Сохранить"
      >
     <label className="popup__form-element">
            <input
              id="name-input"
              type="text"
              className="popup__item popup__item_el_title"
              name="name"
              minLength={2}
              maxLength={40}
              placeholder="Имя"
              required=""
            />
            <span className="name-input-error popup__input-error" />
          </label>
          <label className="popup__form-element">
            <input
              id="about-input"
              type="text"
              className="popup__item popup__item_el_subtitle"
              name="job"
              minLength={2}
              maxLength={200}
              placeholder="О себе"
              required=""
            />
            <span className="about-input-error popup__input-error" />
          </label>    
      </PopupWithForm>

      <PopupWithForm
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
        name="add-card"
        title="Новое место"
        buttonName = "Создать"
      >
        <label className="popup__form-element">
          <input
            id="photo-name-input"
            type="text"
            className="popup__item popup__item_el_photo-name"
            name="name"
            placeholder="Название"
            minLength={2}
            maxLength={30}
            required=""
          />
          <span className="photo-name-input-error popup__input-error" />
        </label>
        <label className="popup__form-element">
          <input
            id="photo-link-input"
            type="text"
            className="popup__item popup__item_el_link"
            name="link"
            placeholder="Ссылка на картинку"
            pattern="https?://.*\.(png|jpg|jpeg|gif)"
            required=""
          />
          <span className="photo-link-input-error popup__input-error" />
        </label>
      </PopupWithForm>
  
      <ImagePopup 
      card={selectedCard}
      isOpen={isImagePopup}
      onClose={closeAllPopups} 
      />
  </div>
  );
}

export default App;
