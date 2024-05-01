import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import { TitleText, TitleWrapper } from '../../atoms/Title';
import Layout from '../../../layout';
import GlassContainer from '../../GlassContainer/GlassContainer';
import Button from '../../atoms/Button';
import Tip from '../../atoms/Tip';
import ShowWordTab from '../ShowWordTab/ShowWordTab';
import QuizTab from '../QuizTab';
import AppearWordTab from '../AppearWordTab';
import GuessWordTab from '../GuessWordTab';

import { ILearnType } from '../../../types/learn';
import { ITodayWord } from '../../../types/forms';

import * as S from '../Learn.css';
import { useLearnWrapper } from './useLearnWrapper';
import SpeechButton from '../../atoms/Speech';

const LearnWrapper: FC = () => {
  const { t } = useTranslation();
  const {
    setIsLearnButtonVisible,
    isLearnButtonVisible,
    todayWord,
    windowHeight,
    currentLearnType,
    isInfoVisible,
    setIsVisibleLearnedButtonStatus,
    handleLearnedButton,
  } = useLearnWrapper();

  const props = {
    setIsLearnButtonVisible,
    isLearnButtonVisible,
    todayWord: todayWord as ITodayWord,
  };

  return (
    <Layout>
      <TitleWrapper>
        <TitleText>one Word</TitleText>
      </TitleWrapper>

      <S.Wrapper>
        <GlassContainer type='light'>
          <S.Content windowHeight={windowHeight}>
            {!todayWord && <Entypo name='emoji-sad' size={150} color='#8c3a68' />}
            {todayWord && (
              <S.WordWrapper isLearnButtonVisible={isLearnButtonVisible}>
                {currentLearnType === ILearnType.SHOW_WORD && <ShowWordTab {...props} />}
                {currentLearnType === ILearnType.QUIZ && <QuizTab {...props} />}
                {currentLearnType === ILearnType.APPEAR_WORD && <AppearWordTab {...props} />}
                {currentLearnType === ILearnType.GUESS_WORD && <GuessWordTab {...props} />}
              </S.WordWrapper>
            )}
            {isLearnButtonVisible && todayWord && (
              <S.ButtonsWrapper>
                {isInfoVisible && (
                  <Tip
                    type='info'
                    text={t('infoLearnedButton')}
                    onClickRemoveButton={setIsVisibleLearnedButtonStatus}
                  />
                )}
                <Button
                  secondaryColor
                  icon={<Feather name='check-circle' size={20} color='white' />}
                  onPress={handleLearnedButton}
                >
                  {t('buttons.learned')}
                </Button>
              </S.ButtonsWrapper>
            )}
          </S.Content>
        </GlassContainer>
      </S.Wrapper>
    </Layout>
  );
};

export default LearnWrapper;
