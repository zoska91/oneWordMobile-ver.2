import styled from 'styled-components/native';

interface styleProps {
  windowWidth: number;
  windowHeight: number;
}

export const Bg = styled.ScrollView<styleProps>`
  position: absolute;
  top: 28%;
  left: ${({ windowWidth }) => (windowWidth - windowWidth * 0.8) / 2}px;
  border-radius: 30px;
  overflow: hidden;
  height: ${({ windowHeight }) => windowHeight * 0.7}px;
  width: ${({ windowWidth }) => windowWidth * 0.8}px;
  z-index: 2;
  background-color: rgba(255, 255, 255, 0.3);
  padding-bottom: 10px;
`;
