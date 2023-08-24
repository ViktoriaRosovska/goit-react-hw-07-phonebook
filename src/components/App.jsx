import {
  AddContactWrapper,
  ContactsWrapper,
  Container,
  HeaderApp,
  HeaderContacts,
} from './App.styled';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactsList/ContactList';
import { Modal } from 'components/Modal/Modal';
import { useState } from 'react';

export function App() {
  const [showModal, setShowModal] = useState(false);
  const [contactId, setContactId] = useState(null);

  const onShowModalClick = contactId => {
    setContactId(contactId);
    setShowModal(true);
  };

  const onBackdropClose = () => {
    setShowModal(false);
  };
  return (
    <>
      <Container>
        <AddContactWrapper>
          <HeaderApp>Phonebook</HeaderApp>
          <ContactForm />
        </AddContactWrapper>
        <ContactsWrapper>
          <Filter />
          <HeaderContacts>Contacts</HeaderContacts>
          <ContactList onShowModalClick={onShowModalClick} />
        </ContactsWrapper>
      </Container>

      {showModal && (
        <Modal onBackdropClose={onBackdropClose} contactId={contactId} />
      )}
    </>
  );
}
