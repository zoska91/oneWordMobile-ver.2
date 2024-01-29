import { FC } from 'react';
import { FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import useWordsList from './useWordsList';
import { TitleText } from '../../atoms/Title';
import EditWordForm from './EditWordForm';

import * as S from './WordsList.css';
import { ITodayWord } from '../../../types/forms';
import TextWrapper from '../../atoms/TextWrapper';
import { StyledInput } from '../../atoms/Inputs.css';

interface WordsListProps {}

const WordsList: FC<WordsListProps> = () => {
  const {
    words,
    deleteWord,
    statusDict,
    setEditingWord,
    editingWord,
    saveEditingWord,
    t,
    searchValue,
    setSearchValue,
    isLoading,
  } = useWordsList();

  const renderSingleWord = ({ item, index }: { item: ITodayWord; index: number }) => {
    return (
      <LinearGradient
        colors={
          index % 2 === 0
            ? [
                'rgba(89, 131, 252, 0)',
                'rgba(46, 39, 87, 0.1)',
                'rgba(46, 39, 87, 0.1)',
                'rgba(89, 131, 252, 0)',
                'rgba(89, 131, 252, 0)',
              ]
            : ['', '', '', '', '']
        }
        locations={[0, 0.2, 0.5, 0.8, 1]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
      >
        <S.SingleWord key={item.wordId}>
          <S.DataWord status={item.status}>
            <TextWrapper border>{item.basicWord}</TextWrapper>
            <TextWrapper>{item.transWord}</TextWrapper>
            <TextWrapper color={item.status}>{statusDict[item.status]}</TextWrapper>
          </S.DataWord>
          <S.ButtonsContainer>
            <AntDesign
              name='edit'
              size={32}
              color='#2e2757'
              style={{ marginRight: 20 }}
              onPress={() => setEditingWord(item)}
            />
            <MaterialIcons
              name='delete-outline'
              size={32}
              color='#2e2757'
              onPress={() => (item._id ? deleteWord(item._id) : null)}
            />
          </S.ButtonsContainer>
        </S.SingleWord>
      </LinearGradient>
    );
  };

  return (
    <S.Wrapper>
      <TitleText>{t('form.wordsListTitle')}</TitleText>

      <StyledInput
        placeholder={t(`searchWordInput`)}
        value={searchValue}
        onChangeText={(value) => setSearchValue(value)}
        style={{ marginHorizontal: 30, marginTop: 20, width: '80%' }}
      />

      <EditWordForm data={editingWord} saveEditingWord={saveEditingWord} isLoading={isLoading} />

      <FlatList
        style={{ paddingTop: 30 }}
        data={words}
        renderItem={renderSingleWord}
        keyExtractor={(item) => item._id!}
        extraData={words}
      />
    </S.Wrapper>
  );
};

export default WordsList;
