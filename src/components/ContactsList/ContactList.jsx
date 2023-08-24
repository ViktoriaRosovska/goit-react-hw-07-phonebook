import PropTypes from 'prop-types';
import {
  ContactsListContainer,
  ContactListRender,
  Button,
  SortOptions,
  List,
  Span,
} from './ContactList.styled';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import { SvgIcon } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useDispatch, useSelector } from 'react-redux';

import * as services from 'services/notify';

import { sortOrderConst } from 'constants';
import { sortOrder } from 'redux/sortSlice';

import {
  contactsSelector,
  errorSelector,
  filterSelector,
  isLoadingSelector,
  sortSelector,
} from 'redux/selectors';
import { useEffect } from 'react';
import { deleteContact, fetchContacts } from 'redux/operations';
import { Loader } from 'components/Loader';

export function ContactList({ onShowModalClick }) {
  const isShowModal = contactId => onShowModalClick(contactId);
  const dispatch = useDispatch();

  const items = useSelector(contactsSelector);
  const isLoading = useSelector(isLoadingSelector);
  const error = useSelector(errorSelector);

  const filter = useSelector(filterSelector).toLowerCase();
  const order = useSelector(sortSelector);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const filterFunc =
    filter === '' ? _ => true : el => el.name.toLowerCase().includes(filter);

  const sortFunc =
    order === sortOrderConst.sortAZ
      ? (a, b) => a.name.localeCompare(b.name)
      : (a, b) => b.name.localeCompare(a.name);

  const filtered = items.filter(filterFunc).sort(sortFunc);

  const onDeleteContact = (user, e) => {
    e.stopPropagation();
    services.Confirm.show(
      `Delete contact`,
      `Are you sure you want to delete contact ${user.name}?`,
      'Yes',
      'No',
      () => {
        services.Notify.info(`Contact ${user.name} was deleted`);
        dispatch(deleteContact(user.id));
      }
    );
  };

  const onSortContacts = order => {
    return dispatch(sortOrder(order));
  };

  return (
    <ContactsListContainer>
      <SortOptions>
        <span>Sort contacts by:</span>
        <Button
          type="button"
          onClick={() => onSortContacts(sortOrderConst.sortAZ)}
          title="sort by A-Z"
          aria-label="sort by A-Z"
        >
          <SvgIcon component={KeyboardArrowDownIcon}></SvgIcon>
        </Button>
        <Button
          type="button"
          onClick={() => onSortContacts(sortOrderConst.sortZA)}
          title="sort by Z-A"
          aria-label="sort by Z-A"
        >
          <SvgIcon component={KeyboardArrowUpIcon}></SvgIcon>
        </Button>
      </SortOptions>

      <ContactListRender>
        {isLoading && <Loader />}
        {error && <p>{error}</p>}

        {!isLoading && !error && (
          <ul>
            {filtered.map(contact => (
              <List key={contact.id}>
                <Span>{contact.name}</Span> <Span>{contact.phone}</Span>
                <Button type="button" onClick={() => isShowModal(contact.id)}>
                  <SvgIcon
                    style={{ fontSize: 'medium' }}
                    component={EditRoundedIcon}
                  ></SvgIcon>
                </Button>
                <Button
                  type="button"
                  onClick={e => onDeleteContact(contact, e)}
                >
                  <SvgIcon component={DeleteForeverIcon}></SvgIcon>
                </Button>
              </List>
            ))}
          </ul>
        )}
        {!Boolean(items.length) && !isLoading && (
          <p>There are no contacts in your phonebook</p>
        )}
        {!Boolean(filtered.length) && Boolean(items.length) && (
          <p>No more contacts found</p>
        )}
      </ContactListRender>
    </ContactsListContainer>
  );
}

ContactList.propTypes = {
  onShowModalClick: PropTypes.func.isRequired,
};
