import { FC, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TitleText, TitleWrapper } from '../../atoms/Title';
import Layout from '../../../layout';
import GlassContainer from '../../GlassContainer/GlassContainer';
import Button from '../../atoms/Button';
import Tip from '../../atoms/Tip';
import ShowWordTab from '../ShowWordTab/ShowWordTab';
import QuizTab from '../QuizTab';
import AppearWordTab from '../AppearWordTab';
import GuessWordTab from '../GuessWordTab';

import { useGlobalProvider } from '../../../layout/GlobalProvider';

import { ILearnType } from '../../../types/learn';
import { ITodayWord } from '../../../types/forms';

import * as S from '../Learn.css';

const IS_INFO_LEARNED_BUTTON_KEY = 'isInfoLearnedButtonVisible';

interface LearnWrapperProps {}

const LearnWrapper: FC<LearnWrapperProps> = () => {
  const { t } = useTranslation();
  const { currentLearnType, todayWord } = useGlobalProvider();

  const windowHeight = Dimensions.get('window').height;

  const [isInfoVisible, setIsInfoVisible] = useState(true);
  const [isLearnButtonVisible, setIsLearnButtonVisible] = useState(false);

  const getIsVisibleLearnedButtonStatus = async () => {
    const isVisible = await AsyncStorage.getItem('IsInfoLearnedButtonVisible');
    if (isVisible) setIsInfoVisible(true);
  };

  const setIsVisibleLearnedButtonStatus = async () => {
    await AsyncStorage.setItem(IS_INFO_LEARNED_BUTTON_KEY, 'hidden');
    setIsInfoVisible(false);
  };

  useEffect(() => {
    getIsVisibleLearnedButtonStatus();
  }, []);

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
            {todayWord && (
              <S.WordWrapper isLearnButtonVisible={isLearnButtonVisible}>
                {currentLearnType === ILearnType.SHOW_WORD && <ShowWordTab {...props} />}
                {currentLearnType === ILearnType.QUIZ && <QuizTab {...props} />}
                {currentLearnType === ILearnType.APPEAR_WORD && <AppearWordTab {...props} />}
                {currentLearnType === ILearnType.GUESS_WORD && <GuessWordTab {...props} />}
              </S.WordWrapper>
            )}
            {isLearnButtonVisible && (
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
