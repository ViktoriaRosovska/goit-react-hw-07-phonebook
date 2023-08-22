import { createPortal } from 'react-dom';
import { ModalWindow } from './ModalWindow';

export const Modal = ({ onBackdropClose, contactId }) => {
  return createPortal(
    <ModalWindow onBackdropClose={onBackdropClose} contactId={contactId} />,

    document.querySelector('#modal-root')
  );
};
