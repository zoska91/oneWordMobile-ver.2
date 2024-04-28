import { FC } from 'react';
import styled from 'styled-components/native';

interface TitleTextProps {
  small?: boolean;
  light?: boolean;
  children: React.ReactNode;
}

interface TitleWrapperProps {
  small?: boolean;
  children: React.ReactNode;
}

interface styledProps {
  small?: boolean;
  light?: boolean;
}

export const Wrapper = styled.View<styledProps>`
  position: absolute;
  top: 8%;
  left: 0;
  right: 0;
  z-index: 0;
  height: 20%;
`;

export const Text = styled.Text<styledProps>`
  color: ${({ theme, light }) => (light ? '#fff' : theme.colorPrimary)};
  text-align: center;
  font-size: ${({ small }) => (small ? '30px' : '45px')};
  padding: 0 3px;
  text-transform: ${({ small }) => (small ? 'lowercase' : 'uppercase')};
  font-style: ${({ small }) => (small ? 'normal' : 'italic')};
`;

const TitleText: FC<TitleTextProps> = ({ small, children, light }) => {
  return (
    <Text
      small={small}
      light={light}
      style={{ fontFamily: small ? 'JosefinSans_400Regular' : 'JosefinSans_700Bold_Italic' }}
    >
      {children}
    </Text>
  );
};

const TitleWrapper: FC<TitleWrapperProps> = ({ small, children }) => {
  return <Wrapper small={small}>{children}</Wrapper>;
};

export { TitleWrapper, TitleText };
