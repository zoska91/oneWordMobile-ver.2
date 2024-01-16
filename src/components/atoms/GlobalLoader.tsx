import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { Animated } from 'react-native';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(46, 39, 87, 0.8);
  z-index: 9999999999999;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spinner = StyleSheet.create({
  spinner: {
    position: 'absolute',
    top: 400,
    left: 100,
  },
});

const After = styled.View`
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colorSecondary};

  background-position: 14px -4px, 12px -1px;
  border-radius: 50%;
  position: absolute;
  margin: auto;
  top: -5px;
  left: 50px;
`;

const GlobalLoader = () => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const positionValue = useRef(new Animated.Value(0)).current;

  const initLoader = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 3,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(positionValue, {
          toValue: -40,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(positionValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  useEffect(() => {
    initLoader();
  }, []);

  return (
    <Wrapper>
      <Animated.View
        style={[
          Spinner.spinner,
          {
            transform: [
              { scaleX: scaleValue },
              { scaleY: scaleValue },
              { translateX: positionValue },
              { translateY: positionValue },
            ],
          },
        ]}
      >
        <After />
      </Animated.View>
    </Wrapper>
  );
};

export default GlobalLoader;
