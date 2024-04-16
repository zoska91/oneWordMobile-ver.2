import { FC, useState } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

import { generateBoxShadowStyle } from '../../../helpers/generateBoxShadowStyle';
import { GuessingInput } from '../Learn.css';
import Button from '../../atoms/Button';
import Tip from '../../atoms/Tip';
import { useGlobalProvider } from '../../../layout/GlobalProvider';
import { TitleText } from '../../atoms/Title';

interface GuessWordTabProps {
  isLearnButtonVisible: boolean;
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const GuessWordTab: FC<GuessWordTabProps> = ({ setIsLearnButtonVisible, isLearnButtonVisible }) => {
  const { t } = useTranslation();
  const { todayWord } = useGlobalProvider();
  if (!todayWord) return <></>;

  const { transWord } = todayWord;

  const [guessingWord, setGuessingTransWord] = useState<string>('');
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<'success' | 'error' | null>(null);

  const onCheck = () => {
    setIsLearnButtonVisible(true);
    if (guessingWord.toLowerCase() === transWord?.toLowerCase()) setIsAnswerCorrect('success');
    else setIsAnswerCorrect('error');
  };

  return (
    <>
      <TitleText small>Pies</TitleText>
      <GuessingInput
        status={isAnswerCorrect}
        placeholder='Answer...'
        value={guessingWord}
        onChangeText={(value: string) => setGuessingTransWord(value)}
        style={{ ...generateBoxShadowStyle(-5, -5, '#000', 0.5, 3, 4, '#000', Platform.OS) }}
        multiline
        blurOnSubmit={true}
      />

      {isAnswerCorrect !== null && (
        <Tip
          big
          type={isAnswerCorrect === 'success' ? 'success' : 'error'}
          text={
            isAnswerCorrect === 'success'
              ? t('notifications.correctAnswer')
              : `${t('notifications.shouldBe')} ${transWord}`
          }
        />
      )}

      {!isLearnButtonVisible && (
        <Button dark onPress={onCheck}>
          Check
        </Button>
      )}
    </>
  );
};

export default GuessWordTab;
