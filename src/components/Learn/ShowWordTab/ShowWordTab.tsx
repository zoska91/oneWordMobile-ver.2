import { FC, useEffect } from 'react';

import { TitleText } from '../../atoms/Title';
import { ITodayWord } from '../../../types/forms';

interface ShowWordTabProps {
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  todayWord: ITodayWord;
}

const ShowWordTab: FC<ShowWordTabProps> = ({ setIsLearnButtonVisible, todayWord }) => {
  useEffect(() => {
    setIsLearnButtonVisible(true);
  }, []);

  return (
    <>
      <TitleText small>{todayWord.basicWord}</TitleText>
      <TitleText>{todayWord.transWord}</TitleText>
    </>
  );
};

export default ShowWordTab;
