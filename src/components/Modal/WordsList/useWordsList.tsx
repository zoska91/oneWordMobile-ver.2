import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import _ from 'lodash';
import { IInputsAddWord, ITodayWord } from '../../../types/forms';
import { Api, apiUrls } from '../../../api';
import { useGlobalProvider } from '../../../layout/GlobalProvider';

const emptyWord = {
  basicWord: '',
  transWord: '',
  addLang: '',
  createdDate: '',
  status: 0,
  userId: '',
};

const useWordsList = () => {
  const api = new Api();
  const { t } = useTranslation();
  const { setIsLoading, isLoading } = useGlobalProvider();
  const [searchValue, setSearchValue] = useState<string>('');
  const [basicWords, setBasicWords] = useState<ITodayWord[]>([]);
  const [words, setWords] = useState<ITodayWord[]>([]);
  const [editingWord, setEditingWord] = useState<ITodayWord>(emptyWord);

  const statusDict = [t('statusDict.new'), t('statusDict.today'), t('statusDict.done')];

  const getAllWords = async () => {
    setIsLoading(true);

    try {
      const resp = await api.get(apiUrls.getAllWords);

      setWords(_.cloneDeep(resp.words));
      setBasicWords(_.cloneDeep(resp.words));
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteWord = async (wordId: string) => {
    setIsLoading(true);

    try {
      await api.delete(apiUrls.deleteWord(wordId));
      await getAllWords();
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEditingWord = async (wordId: string, body: IInputsAddWord) => {
    setIsLoading(true);
    try {
      const resp = await api.put(apiUrls.updateWord(wordId), body);

      if (resp._id === wordId) {
        await getAllWords();
        setEditingWord(emptyWord);
        return 'success';
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const search = (value: string) => {
    if (basicWords?.length === 0) return;
    const uppercaseValue = value.toUpperCase();

    const newWords = basicWords?.filter(
      (el) =>
        el.basicWord.toUpperCase().includes(uppercaseValue) ||
        el.transWord.toUpperCase().includes(uppercaseValue)
    );
    setWords(newWords);
  };

  useEffect(() => {
    search(searchValue);
  }, [searchValue]);

  useEffect(() => {
    getAllWords();

    return () => {
      setWords([]);
    };
  }, []);

  return {
    words,
    deleteWord,
    statusDict,
    editingWord,
    setEditingWord,
    saveEditingWord,
    t,
    searchValue,
    setSearchValue,
    isLoading,
  };
};

export default useWordsList;
