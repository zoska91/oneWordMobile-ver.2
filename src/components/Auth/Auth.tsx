import { FC, useRef } from 'react';
import { Animated, Dimensions} from 'react-native';
import styled from 'styled-components/native';

import { Login, SignUp } from '../index'

const Wrapper = styled.View`
  padding-top: 20px;
  position: relative;
`;

interface AuthAuthProps {}

const Auth: FC<AuthAuthProps> = () => {
  const windowHeight = Dimensions.get('window').height;

  const toggleSlide = useRef(new Animated.Value(0)).current;

  const toogleUp = () => {
    Animated.timing(toggleSlide, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  const toggleDown = () => {
    Animated.timing(toggleSlide, {
      toValue: windowHeight - 250,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Wrapper
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <Login toggleDown={toggleDown} />
      <SignUp toogleUp={toogleUp} toggleSlide={toggleSlide} />
    </Wrapper>
  );
};

export default Auth;