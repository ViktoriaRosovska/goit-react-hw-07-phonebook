import styled from '@emotion/styled';

const Overlay = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  background-color: rgba(50, 50, 50, 0.4);

  z-index: 100;
`;

const ModalContainer = styled.div`
  width: 500px;
  height: 300px;
  background-color: white;
  position: absolute;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
`;

export { Overlay, ModalContainer };
