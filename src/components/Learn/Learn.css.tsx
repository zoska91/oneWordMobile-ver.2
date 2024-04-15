import styled from 'styled-components/native';
import Button from '../atoms/Button';
import { StyledInput } from '../atoms/Inputs.css';

// Wrapper
export const Wrapper = styled.View`
  /* display: flex;
  flex-direction: column;
  gap: 10px; */
  position: absolute;
  top: 15%;
  left: 0;
  padding-top: 20px;
  width: 100%;
  height: 100%;
  /* background-color: green; */
`;

export const Content = styled.View<{ windowHeight: number }>`
  height: ${({ windowHeight }) => `${windowHeight - 300}px`};
  align-items: center;
  justify-content: space-between;
  /* background-color: blue; */
  padding-bottom: 50px;
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
export const WordWrapper = styled.View<{ isLearnButtonVisible: boolean }>`
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  height: ${({ isLearnButtonVisible }) => (isLearnButtonVisible ? '90%' : '110%')};
  width: 100%;
  /* background-color: yellow; */
`;

export const Answer = styled.View<{ isSelected: boolean }>`
  margin: 10px 0;
`;

export const StyledButton = styled(Button)`
  border: 2px solid green;
  border: 2px solid green;
  border-color: green;
  border-width: 10px;
  border-style: solid;
`;

export const GuessingInput = styled(StyledInput)<{status: 'success' | 'error' | null}>`
  font-size: 24px;
  height: 200px;
`