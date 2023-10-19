import { FC } from 'react';
import styled from 'styled-components/native';

interface TextProps {
  small?: boolean;
  color?: number;
  border?: boolean;
  children: React.ReactNode;
}

const Wrapper = styled.Text<TextProps>`
  color: ${({ theme, color }) => (color !== undefined ? theme.status[color] : theme.colorPrimary)};
  /* font-family: 'Josefin Sans', sans-serif; */
  text-align: center;
  font-size: ${({ small }) => (small ? '10px' : '20px')};
  padding: 1px 3px;
  text-align: left;
  border-bottom-width: 5px;
  border-bottom-color: ${({ theme }) => theme.colorPrimary};
`;

const TextWrapper: FC<TextProps> = ({ small, children, color, border }) => {
  return (
    <Wrapper small={small} color={color} style={{ fontFamily: 'JosefinSans_400Regular' }}>
      {children}
    </Wrapper>
  );
};

export default TextWrapper;