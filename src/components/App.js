import React,  { useEffect, useState } from "react";
import '../pages/index.css';
import { api } from "../utils/api";
import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'
import { PopupWithForm } from './PopupWithForm'
import { ImagePopup } from './ImagePopup'
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from './EditProfilePopup'
import { EditAvatarPopup} from './EditAvatarPopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
  // const [isDeletePopupCard, setIsDeletePopupCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState({})
  const [isImagePopup, setIsImagePopup] = useState(false)

  const [currentUser, setСurrentUser] = useState({})
  const [cards, setCards] = useState([])

  //выполнение Загрузка информации о пользователе с сервера и Добавление карточек с сервера
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

  //Обновление новых данных пользователя 
  const handleUpdateUser = (userData) => {
    api.sentUsersData(userData)
    .then((data) => {
      setСurrentUser(data)
    })
    .catch((err) =>
        console.log("Ошибка при изменении данных о пользователе:", err)
      );
  }

  //Обновление аватара
  const handleUpdateAvatar = (data) => {
    api.addAvatar(data.avatar)
    .then((res) => {
      setСurrentUser(res)
    })
    .catch((err) =>
        console.log("Ошибка при изменении данных об аватаре:", err)
      );
  }

  //Удаление карточки
  const handleCardDelete = (card) => {
    // setIsDeletePopupCard(true);
    api.deleteCard(card._id)
      .then(() => {
        //исключаем из массива state те карточки, у которых _id совпадает с _id переданной карточки card
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.error('Ошибка при удалении карточки:', error);
      });
  };

  //Постановка и снятие лайка
  const handleCardLike = (card) => {
    // есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(item => item._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if(!isLiked) {
      api.addLike(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c))
      })
    } else {
      api.deleteLike(card._id)
        .then((newCard) => {
          setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
        })
        .catch(error => {
          console.error('Ошибка при удалении лайка:', error);
        });
    }
  }

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setIsImagePopup(false)
    // setIsDeletePopupCard(false)
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
    onCardDelete={handleCardDelete}
    onCardLike={handleCardLike}
    cards={cards}
    />

    <Footer />

    <EditAvatarPopup 
      isOpen={isEditAvatarPopupOpen}
      onClose={closeAllPopups}
      onUpdateAvatar={handleUpdateAvatar}
    />

    <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser}
      /> 
       

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

      {/* <PopupWithForm
        isDelete={isDeleteCard}
        onClose={closeAllPopups}
          name="confirm"
          title="Вы уверены?"
          buttonName = "Да">
      </PopupWithForm> */}
  
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
