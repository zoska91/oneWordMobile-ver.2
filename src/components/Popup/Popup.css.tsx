import styled from 'styled-components/native';

export const BackdropModal = styled.TouchableOpacity`
  position: absolute;
  padding: 50% 10% 20%;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.View<{ height?: string }>`
  position: absolute;
  bottom: 20%;
  left: 10%;
  width: 80%;
  height: ${({ height }) => height || '350px'};
  border-radius: 30px;
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
`;

export const CloseButton = styled.TouchableOpacity`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 100;
`;
