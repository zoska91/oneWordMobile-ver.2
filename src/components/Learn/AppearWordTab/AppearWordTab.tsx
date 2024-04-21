import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TitleText } from '../../atoms/Title';
import Button from '../../atoms/Button';

import { ITodayWord } from '../../../types/forms';
import VisibleWord from '../../atoms/VisibleWord';

interface AppearWordTabProps {
  isLearnButtonVisible: boolean;
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  todayWord: ITodayWord;
}

const AppearWordTab: FC<AppearWordTabProps> = ({
  isLearnButtonVisible,
  setIsLearnButtonVisible,
  todayWord,
}) => {
  const { t } = useTranslation();
  const [isTransWordVisible, setIsTransWordVisible] = useState(false);

  const showTransWord = () => {
    setIsTransWordVisible(true);
    setIsLearnButtonVisible(true);
  };

  return (
    <>
      <TitleText small>{todayWord.basicWord}</TitleText>
      {isTransWordVisible && <VisibleWord>{todayWord.transWord}</VisibleWord>}

      {!isLearnButtonVisible && (
        <Button dark onPress={showTransWord}>
          {t('buttons.showTrans')}
        </Button>
      )}
    </>
  );
};

export default AppearWordTab;
