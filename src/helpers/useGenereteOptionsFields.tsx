import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface option {
  value: string | number;
  label: string;
}

const useGenerateOptionsFields = () => {
  const { t } = useTranslation();

  //TODO from DB
  const [addLangOptions, setAddLangOptions] = useState<option[]>([]);
  const [selectLanguageOptions, setSelectLanguageOptions] = useState<option[]>([]);

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
    { value: 'SHOW_WORD', label: 'Show word' },
    { value: 'QUIZ', label: 'Quiz' },
    { value: 'INPUT', label: 'Gues word' },
    { value: 'APPEAR', label: 'Appear word ' },
  ];

  const statusDictOptions = [
    { value: 0, label: t('statusDict.new') },
    { value: 1, label: t('statusDict.today') },
    { value: 2, label: t('statusDict.done') },
  ];

  useEffect(() => {
    setAddLangOptions([
      { value: 'en', label: 'English' },
      { value: 'jp', label: 'Japan' },
      { value: 'pl', label: 'Polish' },
    ]);

    setSelectLanguageOptions([
      { value: 'en', label: 'English' },
      { value: 'jp', label: 'Japan' },
      { value: 'pl', label: 'Polish' },
    ]);
  }, []);

  return {
    addLangOptions,
    selectLanguageOptions,
    daysOptions,
    learnTypesOptions,
    statusDictOptions,
  };
};

export default useGenerateOptionsFields;
