import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Defs, Rect, LinearGradient, Stop } from 'react-native-svg';
import styled from 'styled-components/native';

const Wrapper = styled.View<{ type: 'dark' | 'light' }>`
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  overflow: hidden;
  padding: 40px 0;
  opacity: ${({ type }) => (type === 'dark' ? 0.9 : 0.8)};
`;

const colors = {
  light: [
    'rgba(190, 190, 210, 0.7)',
    'rgba(200, 200, 220, 0.7)',
    'rgba(220, 220, 240, 0.7)',
    'rgba(200, 200, 220, 0.7)',
    'rgba(218, 218, 220, 0.7)',
  ],
  dark: [
    'rgba(80, 70, 130, 0.85)',
    'rgba(60, 50, 100, 0.85)',
    'rgba(40, 30, 80, 0.85)',
    'rgba(60, 50, 100, 0.85)',
    'rgba(80, 70, 130, 0.85)',
  ],
};

interface IProps {
  children: React.ReactNode;
  type: 'dark' | 'light';
}

const GlassContainer: FC<IProps> = ({ children, type }) => {
  return (
    <Wrapper
      type={type}
      style={{
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
      }}
    >
      <Svg height='120%' width='100%' style={StyleSheet.absoluteFillObject}>
        <Defs>
          <LinearGradient id='grad' x1='0%' y1='0%' x2='0%' y2='100%'>
            {colors[type].map((el, i) => (
              <Stop key={`${i}-${el}`} offset={`${i / colors[type].length}`} stopColor={el} />
            ))}
          </LinearGradient>
        </Defs>
        <Rect width='100%' height='110%' fill='url(#grad)' />
      </Svg>
      {children}
    </Wrapper>
  );
};

export default GlassContainer;
