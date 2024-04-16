import { FC, useState, useRef } from 'react';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

import Login from './Login';
import SignUp from './SignUp';
import GlassContainer from '../GlassContainer/GlassContainer';

const Wrapper = styled.View`
  position: absolute;
  top: 22%;
  left: 0;
  padding-top: 20px;
  width: 100%;
  height: 110%;
`;

interface AuthAuthProps {}

const Auth: FC<AuthAuthProps> = () => {
  const [isSinUpOpen, setIsSignUpOpen] = useState(false);

  const currentScaleSignUp = useRef(new Animated.Value(0)).current;
  const currentScaleLogin = useRef(new Animated.Value(1)).current;
  const currentOpacityLogin = useRef(new Animated.Value(1)).current;

  const toggleAuth = () => {
    if (isSinUpOpen) toggleHideSignUp();
    else toggleShowSignUp();
    setIsSignUpOpen((prev) => !prev);
  };

  const toggleShowSignUp = () => {
    Animated.timing(currentScaleSignUp, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(currentScaleLogin, {
      toValue: 20,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(currentOpacityLogin, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const toggleHideSignUp = () => {
    Animated.timing(currentScaleSignUp, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(currentScaleLogin, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    Animated.timing(currentOpacityLogin, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Wrapper>
      <GlassContainer type={isSinUpOpen ? 'dark' : 'light'}>
        <Login
          toggleAuth={toggleAuth}
          currentScale={currentScaleLogin}
          currentOpacityLogin={currentOpacityLogin}
        />
        <SignUp toggleAuth={toggleAuth} currentScale={currentScaleSignUp} />
      </GlassContainer>
    </Wrapper>
  );
};

export default Auth;
