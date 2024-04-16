import { FC, useEffect } from 'react';
import { TitleText } from '../../atoms/Title';

import { useGlobalProvider } from '../../../layout/GlobalProvider';

interface ShowWordTabProps {
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const ShowWordTab: FC<ShowWordTabProps> = ({ setIsLearnButtonVisible }) => {
  const { todayWord } = useGlobalProvider();

  useEffect(() => {
    setIsLearnButtonVisible(true);
  }, []);

  return (
    <>
      <TitleText small>{todayWord?.basicWord}</TitleText>
      <TitleText>{todayWord?.transWord}</TitleText>
    </>
  );
};

export default ShowWordTab;
