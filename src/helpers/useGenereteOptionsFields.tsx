import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ILearnType } from '../types/learn';
import { LanguagesMap } from '../types/languages';

interface option {
  value: string | number;
  label: string;
}

const useGenerateOptionsFields = () => {
  const { t } = useTranslation();

  const [langOptions, setLangOptions] = useState<option[]>([]);

  const daysOptions = [
    { value: 1, label: t('days.1') },
    { value: 2, label: t('days.2') },
    { value: 3, label: t('days.3') },
    { value: 4, label: t('days.4') },
    { value: 5, label: t('days.5') },
    { value: 6, label: t('days.6') },
    { value: 7, label: t('days.7') },
  ];

  const learnTypesOptions = [
    { value: ILearnType.SHOW_WORD, label: 'Show word' },
    { value: ILearnType.QUIZ, label: 'Quiz' },
    { value: ILearnType.GUESS_WORD, label: 'Guess word' },
    { value: ILearnType.APPEAR_WORD, label: 'Appear word ' },
  ];

  const statusDictOptions = [
    { value: 0, label: t('statusDict.new') },
    { value: 1, label: t('statusDict.today') },
    { value: 2, label: t('statusDict.done') },
  ];

  const mappedLanguages = Array.from(LanguagesMap.entries()).map((lang) => ({
    value: lang[0],
    label: lang[1],
  }));

  useEffect(() => {
    setLangOptions(mappedLanguages);
  }, []);

  return {
    langOptions,
    daysOptions,
    learnTypesOptions,
    statusDictOptions,
  };
};

export default useGenerateOptionsFields;
