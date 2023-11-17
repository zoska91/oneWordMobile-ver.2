import { FC } from 'react';
import { SubmitHandler } from 'react-hook-form';
import styled, { css } from 'styled-components/native';
import { IAuth } from '../../types/forms';
import { generateBoxShadowStyle } from '../../helpers/generateBoxShadowStyle';
import { Platform } from 'react-native';

interface ButtonProps {
  children: JSX.Element | string;
  onPress?: () => any | SubmitHandler<IAuth>;
  dark?: boolean;
  disabled?: boolean;
  small?: boolean;
  secondaryColor?: boolean;
}

interface styleWrapperProps {
  dark: Boolean;
  disabled?: boolean;
  small?: boolean;
  secondaryColor?: boolean;
}

const Wrapper = styled.TouchableOpacity<styleWrapperProps>`
  background-color: ${({ theme, dark, secondaryColor }) =>
    dark ? theme.colorPrimary : secondaryColor ? theme.colorSecondary : '#f7f9fc'};
  border: none;
  padding: ${({ small }) => (small ? '10px 30px' : '10px 50px')};
  border-radius: 30px;
  margin: 0 auto;
  width: 80%;

  border: 2px solid transparent;
  min-width: ${({ small }) => (small ? '130px' : '200px')};

  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.6;
    `}
`;

const Text = styled.Text<styleWrapperProps>`
  color: ${({ theme, dark, secondaryColor }) =>
    dark || secondaryColor ? '#ffffff' : theme.colorPrimary};
  font-size: 16px;
  text-align: center;
`;

const Button: FC<ButtonProps> = ({ children, onPress, dark, disabled, small, secondaryColor }) => {
  return (
    <Wrapper
      onPress={onPress}
      dark={dark ? true : false}
      disabled={disabled}
      small={small}
      secondaryColor={secondaryColor}
      style={{...generateBoxShadowStyle(-5, -5, '#000', 0.5, 3, 4, '#000', Platform.OS) }}
    >
      <Text
        secondaryColor={secondaryColor}
        dark={dark ? true : false}
        style={{ fontFamily: 'JosefinSans_400Regular' }}
      >
        {children}
      </Text>
    </Wrapper>
  );
};

export default Button;