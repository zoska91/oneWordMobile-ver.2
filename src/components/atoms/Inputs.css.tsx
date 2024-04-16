import styled from 'styled-components/native';

interface LabelType {
  big?: boolean;
  light?: boolean;
  noMargin?: boolean;
}
interface WrapperType {
  small?: boolean;
}

export const FieldContainer = styled.View<WrapperType>`
  width: 80%;
  margin: ${({ small }) => (small ? '0px auto 0px' : '20px auto 0')};
  padding: 0;
`;

export const Desc = styled.Text<LabelType>`
  font-size: 12px;
  color: ${({ theme, light }) => (light ? '#fff' : theme.colorPrimary)};
  opacity: 0.7;
  margin-bottom: 7px;
`;

export const CheckBoxWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const FormLabel = styled.Text<LabelType>`
  color: ${({ theme, light }) => (light ? '#fff' : theme.colorPrimary)};
  text-transform: uppercase;

  font-size: ${({ big }) => (big ? '20px' : '16px')};

  margin-top: ${({ noMargin }) => (noMargin ? null : '15px')};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 85%;
`;

export const BackdropModal = styled.TouchableOpacity`
  position: absolute;
  padding: 50% 10% 20%;
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.6);
`;

export const ModalContainer = styled.View`
  position: absolute;
  bottom: 20%;
  left: 10%;
  width: 80%;
  height: 350px;
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

export const SelectValue = styled.View<{ status?: string }>`
  width: 100%;
  height: 35px;
  margin: 10px auto 20px auto;
  padding: 5px;
  background-color: ${({ theme }) => theme.colorLighter};
  border-radius: 30px;
  border-color: ${({ theme, status }) => (status === 'danger' ? theme.colorDanger : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const StyledInput = styled.TextInput<{ status?: string }>`
  text-align: center;
  width: 100%;
  height: 35px;
  margin: 10px auto 10px auto;
  padding: 5px;
  background-color: ${({ theme }) => theme.colorLighter};
  border-radius: 30px;
  border-color: ${({ theme, status }) => (status === 'danger' ? theme.colorDanger : 'transparent')};
`;

export const TimePickerWrapper = styled.TouchableOpacity`
  text-align: center;
  width: 100%;
  height: 35px;
  margin: 10px auto 10px auto;
  padding: 5px;
  background-color: ${({ theme }) => theme.colorLighter};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;
