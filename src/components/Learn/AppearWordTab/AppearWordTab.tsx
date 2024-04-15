import { FC, useState } from 'react';
import { TitleText } from '../../atoms/Title';

import * as S from '../Learn.css';
import Button from '../../atoms/Button';

interface AppearWordTabProps {
  isLearnButtonVisible: boolean;
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppearWordTab: FC<AppearWordTabProps> = ({
  isLearnButtonVisible,
  setIsLearnButtonVisible,
}) => {
  const [isTransWordVisible, setIsTransWordVisible] = useState(false);

  const showTransWord = () => {
    setIsTransWordVisible(true);
    setIsLearnButtonVisible(true);
  }

  return (
    <>
      <TitleText small>Pies</TitleText>
      {isTransWordVisible && <TitleText>Dog</TitleText>}

      {!isLearnButtonVisible && (
        <Button dark onPress={showTransWord}>
          Show translation
        </Button>
      )}
    </>
  );
};

export default AppearWordTab;
