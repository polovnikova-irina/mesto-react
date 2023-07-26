import React, { useRef } from "react";
import { PopupWithForm } from "./PopupWithForm";

export function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const inputRef = useRef(null);

  function handleSubmit(e) {
    e.preventDefault();
    const inputValue = inputRef.current.value;
    onUpdateAvatar({
      avatar: inputValue,
    });
    onClose();
    inputRef.current.value = "";
  }

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="popup__title"
      title="Обновить аватар"
      buttonName="Сохранить"
    >
      <label className="popup__form-element">
        <input
          id="avatar-input"
          type="text"
          className="popup__item popup__item_el_link"
          name="avatar"
          placeholder="Ссылка на картинку"
          pattern="https?://.*\.(png|jpg|jpeg|gif)"
          required={true}
          defaultValue=""
          ref={inputRef}
        />
        <span className="avatar-input-error popup__input-error" />
      </label>
    </PopupWithForm>
  );
}
