import { FC } from 'react';
import styled from 'styled-components/native';

interface TextProps {
  small?: boolean;
  color?: number;
  border?: boolean;
  children: React.ReactNode;
  center?: boolean;
  medium?: boolean;
}

const Wrapper = styled.Text<TextProps>`
  color: ${({ theme, color }) => (color !== undefined ? theme.status[color] : theme.colorPrimary)};
  /* font-family: 'Josefin Sans', sans-serif; */
  text-align: center;
  font-size: ${({ small, medium }) => (small ? '10px' : medium ? '16px' : '20px')};
  padding: 1px 3px;
  text-align: left;
  border-bottom-width: ${({ border }) => (border ? '5px' : 0)};
  border-bottom-color: ${({ theme }) => theme.colorPrimary};
  text-align: ${({ center }) => (center ? 'center' : 'auto')};
`;

const TextWrapper: FC<TextProps> = ({ small, children, color, border, center, medium }) => {
  return (
    <Wrapper
      border={border}
      small={small}
      color={color}
      style={{ fontFamily: 'JosefinSans_400Regular' }}
      center={center}
      medium={medium}
    >
      {children}
    </Wrapper>
  );
};

export default TextWrapper;
