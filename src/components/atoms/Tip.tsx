import { FC } from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '../../styles/theme';
import { TouchableOpacity } from 'react-native';

const Wrapper = styled.View<{ type: TipProps['type'] }>`
  width: 100%;
  background-color: ${({ theme, type }) => `rgba(${theme.tipColors[type]}, 0.1)`};
  padding: 5px 10px 5px 5px;
  border-radius: 10px;
  border-left-color: ${({ theme, type }) => `rgb(${theme.tipColors[type]})`};
  border-left-width: 4px;
  border-left-style: solid;

  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5px;
`;

const StyledText = styled.Text<{ type: TipProps['type'] }>`
  padding-left: 10px;
  color: ${({ theme, type }) => `rgb(${theme.tipColors[type]})`};
`;

interface TipProps {
  type: 'success' | 'info' | 'warning' | 'error';
  text: string;
  onClickRemoveButton?: () => void;
}

const Tip: FC<TipProps> = ({ type, text, onClickRemoveButton }) => {
  return (
    <Wrapper type={type}>
      <StyledText type={type}>{text}</StyledText>
      {onClickRemoveButton && (
        <TouchableOpacity onPress={onClickRemoveButton}>
          <Ionicons name='close-circle-outline' size={24} color={`rgb(${theme.tipColors[type]})`} />
        </TouchableOpacity>
      )}
    </Wrapper>
  );
};

export default Tip;
