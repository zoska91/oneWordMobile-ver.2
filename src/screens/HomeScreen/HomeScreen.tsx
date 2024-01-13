import { FC } from 'react';

import { TitleWrapper, TitleText, Auth } from '../../components';
import Layout from '../../layout';

import * as S from './HomeScreen.css';

const HomeScreen: FC = () => {
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
