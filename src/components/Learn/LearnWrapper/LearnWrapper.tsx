import { FC, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

import * as S from '../Learn.css';
import { TitleText, TitleWrapper } from '../../atoms/Title';
import Layout from '../../../layout';
import GlassContainer from '../../GlassContainer/GlassContainer';
import Button from '../../atoms/Button';
import Tip from '../../atoms/Tip';
import { useTranslation } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';

const IS_INFO_LEARNED_BUTTON_KEY = 'isInfoLearnedButtonVisible';

interface LearnWrapperProps {
  children: React.ReactNode;
}

const LearnWrapper: FC<LearnWrapperProps> = ({ children }) => {
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
            {children}
            <S.ButtonsWrapper>
              {isInfoVisible && (
                <Tip
                  type='info'
                  text={t('infoLearnedButton')}
                  onClickRemoveButton={setIsVisibleLearnedButtonStatus}
                />
              )}
              <Button secondaryColor icon={<Feather name='check-circle' size={20} color='white' />}>
                Learned
              </Button>
            </S.ButtonsWrapper>
          </S.Content>
        </GlassContainer>
      </S.Wrapper>
    </Layout>
  );
};

export default LearnWrapper;
