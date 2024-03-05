import { FC } from 'react';
import { Text, View } from 'react-native';
import { TitleText } from '../../atoms/Title';

import * as S from '../Learn.css';

interface ShowWordProps {}

const ShowWord: FC<ShowWordProps> = () => {
  return (
    <S.WordWrapper>
      <TitleText small>Pies</TitleText>
      <TitleText>Dog</TitleText>
    </S.WordWrapper>
  );
};

export default ShowWord;
