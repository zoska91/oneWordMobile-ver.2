import { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SpeedDial } from '@rneui/themed';

import useMenuBottom from './useMenuBottom';
import * as S from './UserScreen.css';

const UserScreen: FC = () => {
  const navigation = useNavigation();
  const { actions } = useMenuBottom();

  const [isOpenMenu, setIsOpenMenu] = useState(false);

  return (
    <S.Wrapper>
      <Text>User</Text>
      {/* <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go to home screen!</Text>
      </TouchableOpacity> */}
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
