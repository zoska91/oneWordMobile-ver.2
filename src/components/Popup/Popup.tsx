import { FC, ReactNode } from 'react';

import { Modal } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

import * as S from './Popup.css';

interface PopupProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  height?: string;
  loading?: boolean;
  children: ReactNode;
}

const Popup: FC<PopupProps> = ({ children, modalVisible, setModalVisible, height }) => {
  return (
    <Modal
      style={{ flex: 1, position: 'relative' }}
      animationType='slide'
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible((prev) => !prev);
      }}
    >
      <S.BackdropModal onPress={() => setModalVisible(false)} />
      <S.ModalContainer height={height}>
        <S.CloseButton onPress={() => setModalVisible(false)}>
          <AntDesign name='closecircle' size={32} color='#2e2757' />
        </S.CloseButton>
        {children}
      </S.ModalContainer>
    </Modal>
  );
};

export default Popup;
