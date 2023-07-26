import { PopupWithForm } from "./PopupWithForm";

export function ConfirmPopup({ isOpen, onClose, onDelete }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    onDelete();
    onClose();
  };

  return (
    <PopupWithForm
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      name="confirm"
      title="Вы уверены?"
      buttonName="Да"
    ></PopupWithForm>
  );
}
