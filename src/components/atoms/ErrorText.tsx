import { FC } from 'react';
import styled from 'styled-components/native';

interface TextProps {
  small?: boolean;
  color?: number;
  children: React.ReactNode;
  center?: boolean;
  medium?: boolean;
}

const Wrapper = styled.Text<TextProps>`
  color: ${({ theme, color }) => (color !== undefined ? theme.status[color] : theme.colorDanger)};
  /* font-family: 'Josefin Sans', sans-serif; */
  text-align: center;
  font-size: ${({ small, medium }) => (small ? '12px' : medium ? '14px' : '16px')};
  text-align: left;
  border-bottom-color: ${({ theme }) => theme.colorPrimary};
  text-align: ${({ center }) => (center ? 'center' : 'auto')};
  padding: 0;
`;

const ErrorText: FC<TextProps> = ({ small, children, color, center, medium }) => {
  return (
    <Wrapper
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

export default ErrorText;
