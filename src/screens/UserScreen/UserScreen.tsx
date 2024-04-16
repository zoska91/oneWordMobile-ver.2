import { FC, useState } from 'react';
import { Text } from 'react-native';
import { SpeedDial } from '@rneui/themed';

import useMenuBottom from './useMenuBottom';
import * as S from './UserScreen.css';
import {
  AppearWordTab,
  GuessWordTab,
  LearnWrapper,
  QuizTab,
  ShowWordTab,
} from '../../components/Learn/';
import { useGlobalProvider } from '../../layout/GlobalProvider';
import { ILearnType } from '../../types/learn';

const UserScreen: FC = () => {
  const { actions } = useMenuBottom();
  const { currentLearnType } = useGlobalProvider();

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isLearnButtonVisible, setIsLearnButtonVisible] = useState(false);
  console.log({ currentLearnType });

  return (
    <S.Wrapper>
      <Text>Today word</Text>
      <LearnWrapper isLearnButtonVisible={isLearnButtonVisible}>
        {currentLearnType === ILearnType.SHOW_WORD && (
          <ShowWordTab setIsLearnButtonVisible={setIsLearnButtonVisible} />
        )}
        {currentLearnType === ILearnType.QUIZ && (
          <QuizTab
            setIsLearnButtonVisible={setIsLearnButtonVisible}
            isLearnButtonVisible={isLearnButtonVisible}
          />
        )}
        {currentLearnType === ILearnType.APPEAR_WORD && (
          <AppearWordTab
            setIsLearnButtonVisible={setIsLearnButtonVisible}
            isLearnButtonVisible={isLearnButtonVisible}
          />
        )}
        {currentLearnType === ILearnType.GUESS_WORD && (
          <GuessWordTab
            setIsLearnButtonVisible={setIsLearnButtonVisible}
            isLearnButtonVisible={isLearnButtonVisible}
          />
        )}
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
