import { View } from 'react-native';
import { Dimensions } from 'react-native';
import * as S from './Card.css';
import { BlurView } from 'expo-blur';
import { PropsWithChildren } from 'react';

interface CardProps {
  upper?: boolean;
}

const Card = ({ children }: PropsWithChildren<CardProps>) => {
  const windowWidth = Dimensions.get('window').width;
  const windowHeight = Dimensions.get('window').height;

  return (
    <S.Bg windowHeight={windowHeight} windowWidth={windowWidth}>
      <BlurView
        intensity={40}
        style={{
          position: 'absolute',
          height: windowHeight * 0.7,
          width: windowWidth * 0.8,
        }}
      ></BlurView>
      <View>{children}</View>
    </S.Bg>
  );
};

export default Card;