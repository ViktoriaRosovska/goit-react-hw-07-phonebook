import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  CloseModalButton,
  FormButtonSave,
  ModalContainer,
  ModalHeader,
  ModalLabel,
  Overlay,
} from './Modal.styled';
import { contactsSelector } from 'redux/selectors';
import { editContact } from 'redux/operations';
import { useState } from 'react';
import { FormInput } from 'components/ContactForm/ContactForm.styled';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

export const ModalWindow = ({ onBackdropClose, contactId }) => {
  const items = useSelector(contactsSelector);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const name = items.find(el => el.id === contactId)?.name ?? '';
  const phone = items.find(el => el.id === contactId)?.phone ?? '';

  const dispatch = useDispatch();

  const onBackdrop = e => {
    if (e.target === e.currentTarget) {
      onBackdropClose();
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const user = {
      name: e.target.elements.name.value,
      phone: e.target.elements.phone.value,
      id: contactId,
    };
    setDisabledBtn(true);
    dispatch(editContact(user));
    onBackdropClose();
  };
  return (
    <>
      <Overlay onClick={onBackdrop} id="Overlay">
        <ModalContainer>
          <ModalHeader>Edit contact </ModalHeader>
          <form onSubmit={onFormSubmit}>
            <ModalLabel htmlFor="name">Name</ModalLabel>
            <FormInput
              name="name"
              id="name"
              type="text"
              defaultValue={`${name}`}
              onFocus={() => setDisabledBtn(false)}
            />
            <ModalLabel htmlFor="phone">Phone</ModalLabel>
            <FormInput
              id="phone"
              name="phone"
              type="text"
              defaultValue={`${phone}`}
              onFocus={() => setDisabledBtn(false)}
            />
            <FormButtonSave type="submit" disabled={disabledBtn}>
              Save
            </FormButtonSave>
          </form>
          <CloseModalButton onClick={() => onBackdropClose()}>
            <CloseRoundedIcon />
          </CloseModalButton>
        </ModalContainer>
      </Overlay>
    </>
  );
};
ModalWindow.propTypes = {
  onBackdropClose: PropTypes.func.isRequired,
  contactId: PropTypes.string.isRequired,
};
