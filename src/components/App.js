import React,  { useEffect, useState } from "react";
import '../pages/index.css';
import { api } from "../utils/api";
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'
import { PopupWithForm } from './PopupWithForm'
import { ImagePopup } from './ImagePopup'
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  const [isDeleteCard, setIsDeleteCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)

  const [currentUser, setСurrentUser] = useState({})
  const [cards, setCards] = useState([])

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
    .then(([dataUser, dataCards]) => {
      setСurrentUser({
          name: dataUser.name,
          about: dataUser.about,
          avatar: dataUser.avatar,
          _id: dataUser._id,
      })
      setCards(dataCards)
    })
      .catch((err) =>
        console.log("Ошибка при загрузке данных о пользователе:", err)
      );
  }, []);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true)
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true)
  }

  const  handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true)
  }

  const handleCardClick = (card) => {
    setSelectedCard(card)
    setIsImagePopup(true)
  }

  const handleCardDelete = () => {
    setIsDeleteCard(true)
  }

  const handleCardLike = (card) => {
    // есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
} 

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
    setIsDeleteCard(false)
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
    <Header />

    <Main 
    onEditProfile={handleEditProfileClick}
    onAddPlace={handleAddPlaceClick}
    onEditAvatar={handleEditAvatarClick}
    onCardClick={handleCardClick}
    onDelete={handleCardDelete}
    onCardLike={handleCardLike}
    cards={cards}
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

      <PopupWithForm
        isDelete={isDeleteCard}
        onClose={closeAllPopups}
          name="confirm"
          title="Вы уверены?"
          buttonName = "Да">
      </PopupWithForm>
  
      <ImagePopup 
      card={selectedCard}
      isOpen={isImagePopup}
      onClose={closeAllPopups} 
      />
  </div>
  </CurrentUserContext.Provider>
  );
}

export default App;
