import { FC, useEffect, useState } from 'react';
import { Text } from 'react-native';
import { SpeedDial } from '@rneui/themed';

import useMenuBottom from './useMenuBottom';
import * as S from './UserScreen.css';
import { LearnWrapper } from '../../components/Learn/';
import { useTranslation } from 'react-i18next';
import { useGlobalProvider } from '../../layout/GlobalProvider';
import { useNavigation } from '@react-navigation/native';

const UserScreen: FC = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { actions } = useMenuBottom();
  const { isLoading } = useGlobalProvider();
  const { isLogin } = useGlobalProvider();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  useEffect(() => {
    console.log(isLogin);
    if (!isLogin) navigation.navigate('Home');
  }, [isLogin]);

  return (
    <S.Wrapper>
      <Text>{t('userScreen.todayWord')}</Text>

      {!isLoading && <LearnWrapper />}

      <SpeedDial
        color='#2e2757'
        isOpen={isOpenMenu}
        icon={{ name: 'menu', color: '#fff' }}
        openIcon={{ name: 'close', color: '#fff' }}
        onOpen={() => setIsOpenMenu(true)}
        onClose={() => setIsOpenMenu(false)}
      >
        {actions.map((el) => (
          <SpeedDial.Action
            titleStyle={{ textTransform: 'uppercase' }}
            key={el.name}
            color='#aaa'
            icon={el.icon}
            title={el.name}
            onPress={() => {
              setIsOpenMenu(false);
              el.onClick();
            }}
          />
        ))}
      </SpeedDial>
    </S.Wrapper>
  );
};

export default UserScreen;
