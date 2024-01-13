import { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useIsFocused } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import { TitleWrapper, TitleText, TextWrapper, Button, Card, Auth } from '../../components';
import Layout from '../../layout';

import * as S from './HomeScreen.css';
import { Api, apiUrls } from '../../api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

const HomeScreen: FC = () => {
  const { t } = useTranslation();
  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const getUser = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const api = new Api(token);
      const resp = await api.get(apiUrls.user);
      console.log('----------------');
      console.log(resp);
      if (resp.message === 'message') {
        navigation.navigate('User');
      } else {
        Toast.show({ type: 'error', text2: resp.message });
      }
    } catch (e) {}
  };

  useEffect(() => {
    getUser();
  }, [isFocused]);

  return (
    <S.Wrapper>
      <Layout>
        <TitleWrapper>
          <TitleText small>only</TitleText>
          <TitleText>one Word</TitleText>
          <TitleText small>a day</TitleText>
        </TitleWrapper>
        <Auth />
      </Layout>
    </S.Wrapper>
  );
};

export default HomeScreen;
