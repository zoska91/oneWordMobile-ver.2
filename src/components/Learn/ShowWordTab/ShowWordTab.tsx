import { FC, useEffect } from 'react';

import { TitleText } from '../../atoms/Title';
import { ITodayWord } from '../../../types/forms';
import VisibleWord from '../../atoms/VisibleWord';

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
      <VisibleWord>{todayWord.transWord}</VisibleWord>
    </>
  );
};

export default ShowWordTab;
