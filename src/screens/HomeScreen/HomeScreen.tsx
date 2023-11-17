import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { TitleWrapper, TitleText, TextWrapper, Button, Card } from '../../components';
import Layout from '../../layout';

import * as S from './HomeScreen.css';

const  HomeScreen: FC = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  useEffect(() => {
    // const auth = getAuth();

    // onAuthStateChanged(auth, user => {
    //   if (user?.uid) navigation.navigate('User');
    // });

    // if (isFocused) {
    //   const user = getCurrentUser();
    //   if (user?.userId) navigation.navigate('User');
    // }
  }, [isFocused]);

  return (
    <S.Wrapper>
      <Layout>
        <TitleWrapper>
          <TitleText small>only</TitleText>
          <TitleText>one Word</TitleText>
          <TitleText small>a day</TitleText>
        </TitleWrapper>
        <Card>
          <S.WelcomeCard>
            <TextWrapper>{t('welcome')}</TextWrapper>
            <TextWrapper>{t('welcome2')}</TextWrapper>
            <TextWrapper>{t('welcome3')}</TextWrapper>
            <TextWrapper>{t('welcome4')}</TextWrapper>
            <Button
              dark
              onPress={() =>
                navigation.navigate('Modal', {
                  screen: 'Modal',
                  params: {
                    type: 'auth',
                  },
                })
              }
            >
              {t('welcome5')}
            </Button>
          </S.WelcomeCard>
        </Card>
      </Layout>
    </S.Wrapper>
  );
}

export default HomeScreen