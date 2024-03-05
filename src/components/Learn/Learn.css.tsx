import styled from 'styled-components/native';
import Button from '../atoms/Button';

// Wrapper
export const Wrapper = styled.View`
  position: absolute;
  top: 15%;
  left: 0;
  padding-top: 20px;
  width: 100%;
  height: 100%;
`;

export const Content = styled.View<{ windowHeight: number }>`
  height: ${({ windowHeight }) => `${windowHeight - 300}px`};
  align-items: center;
  justify-content: space-between;
`;

export const ButtonsWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 80%;
`;

export const ButtonText = styled.Text`
  margin-left: 20px;
`;

// Learn view
export const WordWrapper = styled.View`
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
`;
