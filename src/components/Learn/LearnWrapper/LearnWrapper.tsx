import { FC, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as S from '../Learn.css';
import { TitleText, TitleWrapper } from '../../atoms/Title';
import Layout from '../../../layout';
import GlassContainer from '../../GlassContainer/GlassContainer';
import Button from '../../atoms/Button';
import Tip from '../../atoms/Tip';

const IS_INFO_LEARNED_BUTTON_KEY = 'isInfoLearnedButtonVisible';

interface LearnWrapperProps {
  children: React.ReactNode;
  isLearnButtonVisible: boolean;
}

const LearnWrapper: FC<LearnWrapperProps> = ({ children, isLearnButtonVisible }) => {
  const { t } = useTranslation();

  const windowHeight = Dimensions.get('window').height;

  const [isInfoVisible, setIsInfoVisible] = useState(true);

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

  return (
    <Layout>
      <TitleWrapper>
        <TitleText>one Word</TitleText>
      </TitleWrapper>

      <S.Wrapper>
        <GlassContainer type='light'>
          <S.Content windowHeight={windowHeight}>
            <S.WordWrapper isLearnButtonVisible={isLearnButtonVisible}>{children}</S.WordWrapper>
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
