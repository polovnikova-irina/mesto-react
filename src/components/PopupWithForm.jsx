import React from "react";

export function PopupWithForm(props) {
  return (
    <div
      className={`popup popup_type_${props.name} ${
        props.isOpen ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_type_frame">
        <button
          onClick={props.onClose}
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
        />
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" name={props.name} noValidate="">
          {props.children}
          <button className="popup__save-button" type="submit" disabled={true}>
            {props.buttonName}
          </button>
        </form>
      </div>
    </div>
  );
}

// <PopupWithForm
//   name="confirm"
//   title="Вы уверены?"
//   buttonName = "Да">
// </PopupWithForm>