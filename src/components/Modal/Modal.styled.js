import styled from '@emotion/styled';
import { FormButton } from 'components/ContactForm/ContactForm.styled';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(50, 50, 50, 0.4);

  z-index: 100;
`;

const ModalContainer = styled.div`
  width: 300px;

  background-color: white;
  position: absolute;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  padding: 30px;
  display: flex;
  flex-direction: column;

  align-items: center;

  & input {
    width: 100%;
  }
`;
const FormButtonSave = styled(FormButton)`
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
  padding-left: 20px;
  padding-right: 20px;
  &:disabled {
    pointer-events: none;
    user-select: none;
  }
`;
const ModalHeader = styled.h2`
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 20px;
`;

const ModalLabel = styled.label`
  font-size: 18px;
  margin-bottom: 10px;
  display: inline-block;

  color: #f26b94;
`;
const CloseModalButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 24px;
  background-color: transparent;
  border: none;
  padding-left: 0;
  margin: 0;
  & :hover,
  :focus {
    fill: #f26b94;
  }
`;

export {
  Overlay,
  ModalContainer,
  ModalHeader,
  ModalLabel,
  CloseModalButton,
  FormButtonSave,
};
