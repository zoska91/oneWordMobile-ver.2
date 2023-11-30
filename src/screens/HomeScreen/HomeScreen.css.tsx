import styled from 'styled-components/native';
import { device } from '../../styles/devices';

export const Wrapper = styled.View`
  position: relative;
  height: 100%;
  width: 100%;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const MenuBottomWrapper = styled.View`
  height: 80vh;

  @media (max-height: 650px) {
    height: 90vh;
  }
`;
