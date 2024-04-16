import { FC, useState } from 'react';
import { TitleText } from '../../atoms/Title';
import { useTranslation } from 'react-i18next';

import * as S from '../Learn.css';
import Button from '../../atoms/Button';
import { FlatList } from 'react-native';
import Tip from '../../atoms/Tip';
import { useGlobalProvider } from '../../../layout/GlobalProvider';

interface QuizTabProps {
  isLearnButtonVisible: boolean;
  setIsLearnButtonVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

const QuizTab: FC<QuizTabProps> = ({ isLearnButtonVisible, setIsLearnButtonVisible }) => {
  const { t } = useTranslation();
  const { todayWord } = useGlobalProvider();
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
    </S.Answer>
  );

  const checkAnswer = () => {
    setIsLearnButtonVisible(true);
    // CHECK TODO
    setIsAnswerCorrect(false);
  };

  return (
    <>
      <TitleText small>{todayWord?.basicWord}</TitleText>

      <FlatList
        data={todayWord?.shuffleWords}
        renderItem={renderAnswers}
        keyExtractor={(item) => item.id}
        extraData={todayWord?.shuffleWords}
      />

      {!isLearnButtonVisible && (
        <Button dark onPress={checkAnswer}>
          Check
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
