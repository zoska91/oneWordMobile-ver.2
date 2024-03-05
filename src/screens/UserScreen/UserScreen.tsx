import { FC, useState } from 'react';
import { Text } from 'react-native';
import { SpeedDial } from '@rneui/themed';

import useMenuBottom from './useMenuBottom';
import * as S from './UserScreen.css';
import { LearnWrapper, ShowWord } from '../../components/Learn/';

const UserScreen: FC = () => {
  const { actions } = useMenuBottom();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <S.Wrapper>
      <Text>Today word</Text>
      <LearnWrapper>
        <ShowWord />
      </LearnWrapper>
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
