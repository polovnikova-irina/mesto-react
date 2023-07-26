import React, { useEffect, useState } from "react";
import "../pages/index.css";
import { api } from "../utils/api";
import { Header } from "./Header";
import { Main } from "./Main";
import { Footer } from "./Footer";
import { ImagePopup } from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import { EditProfilePopup } from "./EditProfilePopup";
import { EditAvatarPopup } from "./EditAvatarPopup";
import { AddPlacePopup } from "./AddPlacePopup";
// import { ConfirmPopup } from './ConfirmPopup'

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  // const [isDeletePopupCard, setIsDeletePopupCard] = useState(false)
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopup, setIsImagePopup] = useState(false);

  const [currentUser, setСurrentUser] = useState({});
  const [cards, setCards] = useState([]);

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
    setIsImagePopup(true);
  };

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCards]) => {
        setСurrentUser({
          name: dataUser.name,
          about: dataUser.about,
          avatar: dataUser.avatar,
          _id: dataUser._id,
        });
        setCards(dataCards);
      })
      .catch((err) =>
        console.log("Ошибка при загрузке данных о пользователе:", err)
      );
  }, []);

  const handleUpdateUser = (userData) => {
    api
      .sentUsersData(userData)
      .then((data) => {
        setСurrentUser(data);
      })
      .catch((err) =>
        console.log("Ошибка при изменении данных о пользователе:", err)
      );
  };

  const handleUpdateAvatar = (data) => {
    api
      .addAvatar(data)
      .then((res) => {
        setСurrentUser(res);
      })
      .catch((err) =>
        console.log("Ошибка при изменении данных об аватаре:", err)
      );
  };

  const handleAddPlaceSubmit = (cardData) => {
    api
      .createCard(cardData)
      .then((newCards) => {
        setCards([newCards, ...cards]);
      })
      .catch((err) => console.log("Ошибка при добавлении карточки:", err));
  };

  const handleCardDelete = (card) => {
    api
      .deleteCard(card._id)
      .then(() => {
        //исключаем из массива state те карточки, у которых _id совпадает с _id переданной карточки card
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((error) => {
        console.error("Ошибка при удалении карточки:", error);
      });
  };

  const handleCardLike = (card) => {
    // есть ли уже лайк на этой карточке
    const isLiked = card.likes.some((item) => item._id === currentUser._id);
    // Отправляем запрос в API и получаем обновлённые данные карточки
    if (!isLiked) {
      api.addLike(card._id).then((newCard) => {
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        );
      });
    } else {
      api
        .deleteLike(card._id)
        .then((newCard) => {
          setCards((state) =>
            state.map((c) => (c._id === card._id ? newCard : c))
          );
        })
        .catch((error) => {
          console.error("Ошибка при удалении лайка:", error);
        });
    }
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsImagePopup(false);
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

        <AddPlacePopup
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlaceSubmit}
        />

        {/* <ConfirmPopup
        isOpen={isDeletePopupCard}
        onClose={closeAllPopups}
        onDelete={handleCardDelete}
      />  */}

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
