import { FC } from 'react';
import { TitleText } from '../../atoms/Title';

import * as S from '../Learn.css';

interface GuessWordTabProps {}

const GuessWordTab: FC<GuessWordTabProps> = () => {
  return (
    <>
      <TitleText small>Pies</TitleText>
      <TitleText>Dog</TitleText>
    </>
  );
};

export default GuessWordTab;
