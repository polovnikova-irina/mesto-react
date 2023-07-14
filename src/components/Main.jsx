import React, { useEffect, useState } from "react";
import { api } from "../utils/api";
import { Card } from "./Card";

export function Main(props) {
  const [userName, setUserName] = useState("");
  const [userDescription, setUserDescription] = useState("");
  const [userAvatar, setUserAvatar] = useState("");
  const [cards, setСards] = useState([]);

  useEffect(() => {
    Promise.all([api.getInfo(), api.getCards()])
      .then(([dataUser, dataCard]) => {
        setUserName(dataUser.name);
        setUserDescription(dataUser.about);
        setUserAvatar(dataUser.avatar);
        setСards(dataCard);
      })
      .catch((err) =>
        console.log("Ошибка при загрузке данных о пользователе:", err)
      );
  }, []);

  return (
    <main className="content">
      <section className="profile">
        <div className="profile__edit">
          <img className="profile__avatar" src={userAvatar} alt="Аватар" />
          <div className="profile__overlay">
            <button
              onClick={props.onEditAvatar}
              className="profile__avatar-btn"
              type="button"
              aria-label="Изменить аватар"
            />
          </div>
        </div>
        <div className="profile__info-wrapper">
          <div className="profile__info">
            <h1 className="profile__title">{userName}</h1>
            <button
              onClick={props.onEditProfile}
              className="profile__edit-button"
              type="button"
              aria-label="Редактировать профиль"
            />
          </div>
          <p className="profile__subtitle">{userDescription}</p>
        </div>
        <button
          onClick={props.onAddPlace}
          className="profile__add-button"
          type="button"
          aria-label="Добавить карточку"
        />
      </section>
      <section className="photos" aria-label="Фото-контейнер">
        <ul className="photo">
          {cards.map((card) => (
            <Card key={card._id} card={card} onCardClick={props.onCardClick} />
          ))}
        </ul>
      </section>
    </main>
  );
}
