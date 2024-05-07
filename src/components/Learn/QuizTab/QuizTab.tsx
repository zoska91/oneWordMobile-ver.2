import { FC, useState } from 'react';
import { TitleText } from '../../atoms/Title';
import { useTranslation } from 'react-i18next';
import { FlatList } from 'react-native';

import Button from '../../atoms/Button';
import Tip from '../../atoms/Tip';
import { ITodayWord } from '../../../types/forms';

import * as S from '../Learn.css';
import SpeechButton from '../../atoms/Speech';

interface QuizTabProps {
  isLearnButtonVisible: boolean;
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
  todayWord: ITodayWord;
}

const QuizTab: FC<QuizTabProps> = ({
  isLearnButtonVisible,
  setIsLearnButtonVisible,
  todayWord,
}) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  const renderAnswers = ({ item }: { item: { id: string; text: string } }) => (
    <S.Answer key={item.id} isSelected={selectedAnswer === item.id}>
      <S.StyledButton
        secondaryColor={selectedAnswer === item.id}
        disabled={isAnswerCorrect !== null}
        onPress={() => setSelectedAnswer(item.id)}
      >
        {item.text}
      </S.StyledButton>
      {isLearnButtonVisible && selectedAnswer === item.id && (
        <S.SpeechButtonWrapper inButton>
          <SpeechButton />
        </S.SpeechButtonWrapper>
      )}
    </S.Answer>
  );

  const checkAnswer = () => {
    setIsLearnButtonVisible(true);
    const isCorrect = selectedAnswer === todayWord._id;
    // CHECK TODO
    setIsAnswerCorrect(isCorrect);
  };

  return (
    <>
      <TitleText small>{todayWord.basicWord}</TitleText>

      <FlatList
        data={todayWord?.shuffleWords}
        renderItem={renderAnswers}
        keyExtractor={(item) => item.id}
        extraData={todayWord.shuffleWords}
      />

      {!isLearnButtonVisible && (
        <Button dark onPress={checkAnswer}>
          {t('buttons.check')}
        </Button>
      )}

      {isAnswerCorrect !== null && (
        <Tip
          big
          type={isAnswerCorrect === true ? 'success' : 'error'}
          text={isAnswerCorrect ? t('notifications.correctAnswer') : t('notifications.dontGiveUp')}
        />
      )}
    </>
  );
};

export default QuizTab;
