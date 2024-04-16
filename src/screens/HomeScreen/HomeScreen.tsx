import { FC } from 'react';

import { TitleWrapper, TitleText, Auth } from '../../components';
import Layout from '../../layout';

import * as S from './HomeScreen.css';
import { useGlobalProvider } from '../../layout/GlobalProvider';

const HomeScreen: FC = () => {
  const { isLoading } = useGlobalProvider();
  return (
    <S.Wrapper>
      <Layout>
        <TitleWrapper>
          <TitleText small>only</TitleText>
          <TitleText>one Word</TitleText>
          <TitleText small>a day</TitleText>
        </TitleWrapper>
        {!isLoading && <Auth />}
      </Layout>
    </S.Wrapper>
  );
};

export default HomeScreen;
