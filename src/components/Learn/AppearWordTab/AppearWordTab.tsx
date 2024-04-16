import { FC, useState } from 'react';
import { TitleText } from '../../atoms/Title';

import Button from '../../atoms/Button';
import { useGlobalProvider } from '../../../layout/GlobalProvider';

interface AppearWordTabProps {
  isLearnButtonVisible: boolean;
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppearWordTab: FC<AppearWordTabProps> = ({
  isLearnButtonVisible,
  setIsLearnButtonVisible,
}) => {
  const { todayWord } = useGlobalProvider();
  const [isTransWordVisible, setIsTransWordVisible] = useState(false);

  const showTransWord = () => {
    setIsTransWordVisible(true);
    setIsLearnButtonVisible(true);
  };

  return (
    <>
      <TitleText small>{todayWord?.basicWord}</TitleText>
      {isTransWordVisible && <TitleText>{todayWord?.transWord}</TitleText>}

      {!isLearnButtonVisible && (
        <Button dark onPress={showTransWord}>
          Show translation
        </Button>
      )}
    </>
  );
};

export default AppearWordTab;
