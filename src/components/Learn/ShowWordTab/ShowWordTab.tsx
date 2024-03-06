import { FC, useEffect } from 'react';
import { TitleText } from '../../atoms/Title';

import * as S from '../Learn.css';

interface ShowWordTabProps {
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowWordTab: FC<ShowWordTabProps> = ({ setIsLearnButtonVisible }) => {
  useEffect(() => {
    setIsLearnButtonVisible(true);
  }, []);

  return (
    <>
      <TitleText small>Pies</TitleText>
      <TitleText>Dog</TitleText>
    </>
  );
};

export default ShowWordTab;
