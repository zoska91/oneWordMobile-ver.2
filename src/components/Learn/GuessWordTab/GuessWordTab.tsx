import { FC, useState } from 'react';
import { Platform } from 'react-native';
import { useTranslation } from 'react-i18next';

import { generateBoxShadowStyle } from '../../../helpers/generateBoxShadowStyle';
import { GuessingInput } from '../Learn.css';
import Button from '../../atoms/Button';
import Tip from '../../atoms/Tip';
import { TitleText } from '../../atoms/Title';
import { ITodayWord } from '../../../types/forms';
import SpeechButton from '../../atoms/Speech';
import * as S from '../Learn.css';

interface GuessWordTabProps {
  isLearnButtonVisible: boolean;
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  todayWord: ITodayWord;
}

const GuessWordTab: FC<GuessWordTabProps> = ({
  setIsLearnButtonVisible,
  isLearnButtonVisible,
  todayWord,
}) => {
  const { t } = useTranslation();

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
      <TitleText small>{todayWord.basicWord}</TitleText>
      <S.GuessingWrapper>
        <GuessingInput
          status={isAnswerCorrect}
          placeholder='Answer...'
          value={guessingWord}
          onChangeText={(value: string) => setGuessingTransWord(value)}
          style={{ ...generateBoxShadowStyle(-5, -5, '#000', 0.5, 3, 4, '#000', Platform.OS) }}
          multiline
          blurOnSubmit={true}
        />
        {isLearnButtonVisible && (
          <S.SpeechButtonWrapper>
            <SpeechButton />
          </S.SpeechButtonWrapper>
        )}
      </S.GuessingWrapper>

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
          {t('buttons.check')}
        </Button>
      )}
    </>
  );
};

export default GuessWordTab;
