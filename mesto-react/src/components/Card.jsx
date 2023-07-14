import React from "react";

export function Card(props) {
  function handleClick() {
    props.onCardClick({ link: props.card.link, name: props.card.name });
  }

  return (
    <>
      <li className="photo__cell">
        <img
          onClick={handleClick}
          className="photo__image"
          src={props.card.link}
          alt={`Изображение ${props.card.name}`}
        />
        <div className="photo__caption">
          <h2 className="photo__title">{props.card.name}</h2>
          <div className="photo__like-container">
            <button className="photo__like" type="button" />
            <span className="photo__like-count">{props.card.likes.length}</span>
          </div>
          <button className="photo__delete" type="button" />
        </div>
      </li>
    </>
  );
}
