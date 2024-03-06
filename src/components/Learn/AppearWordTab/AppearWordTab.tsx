import { FC } from 'react';
import { TitleText } from '../../atoms/Title';

import * as S from '../Learn.css';

interface AppearWordTabProps {}

const AppearWordTab: FC<AppearWordTabProps> = () => {
  return (
    <>
      <TitleText small>Pies</TitleText>
      <TitleText>Dog</TitleText>
    </>
  );
};

export default AppearWordTab;
