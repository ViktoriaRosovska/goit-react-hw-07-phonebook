import { useDispatch, useSelector } from 'react-redux';
import { ModalContainer, Overlay } from './Modal.styled';
import { contactsSelector } from 'redux/selectors';
import { fetchContacts } from 'redux/operations';
import { useEffect, useState } from 'react';

export const ModalWindow = ({ onBackdropClose, contactId }) => {
  const { items, isLoading, error } = useSelector(contactsSelector);
  const [active, setActive] = useState(false);
  const [disabledBtn, setDisabledBtn] = useState(false);
  const name = items.find(el => el.id === contactId).name;
  const phone = items.find(el => el.id === contactId).phone;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const onBackdrop = e => {
    if (e.target === e.currentTarget) {
      onBackdropClose();
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const name = e.target.elements.name.value;
    const phone = e.target.elements.phone.value;
    setDisabledBtn(true);

    console.log(name, phone);
    //делаем запрос в базу что б обновить пользователя
    //dispatch(PutContacts)
  };
  return (
    <>
      <Overlay onClick={onBackdrop} id="Overlay">
        <ModalContainer>
          <h2>Edit contact </h2>
          <form onSubmit={onFormSubmit}>
            <input
              name="name"
              type="text"
              defaultValue={`${name}`}
              onFocus={() => setDisabledBtn(false)}
            />
            <input
              name="phone"
              type="text"
              defaultValue={`${phone}`}
              onFocus={() => setDisabledBtn(false)}
            />
            <button type="submit" disabled={disabledBtn}>
              Save
            </button>
          </form>
        </ModalContainer>
      </Overlay>
    </>
  );
};
