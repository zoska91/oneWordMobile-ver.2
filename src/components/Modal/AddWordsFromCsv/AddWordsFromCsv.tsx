import { FC, useState } from 'react';
import { getDocumentAsync, DocumentPickerResult, DocumentPickerAsset } from 'expo-document-picker';
import { useTranslation } from 'react-i18next';
import Toast from 'react-native-toast-message';

import Button from '../../atoms/Button';
import { Api, apiUrls, CustomError } from '../../../api';
import * as S from './AddWordsFromCsv.css';
import { TitleText } from '../../atoms/Title';
import TextWrapper from '../../atoms/TextWrapper';
import { useGlobalProvider } from '../../../layout/GlobalProvider';
import Tip from '../../atoms/Tip';

interface AddWordsFromCsvProps {}

const AddWordsFromCsv: FC<AddWordsFromCsvProps> = () => {
  const api = new Api();
  const { t } = useTranslation();
  const { getTodayWord } = useGlobalProvider();

  const [file, setFile] = useState<DocumentPickerAsset | null>(null);

  const sendFileToBackend = async () => {
    try {
      if (!file) return;
      const formData = new FormData();

      const csvFile = {
        name: file.name,
        uri: file.uri,
        type: file.mimeType,
        size: file.size,
      };

      formData.append('file', csvFile as any);

      const response = await api.post(apiUrls.sendCsv, formData);

      if (response.message === 'Success') {
        Toast.show({ type: 'success', text2: t('form.csvSuccess') });
        setFile(null);
        getTodayWord();
      } else Toast.show({ type: 'error', text2: response.error.message });
    } catch (e) {
      const error = e as CustomError;
      if (error.status === 400) {
        Toast.show({ type: 'error', text2: t('api.wrongCsv') });

        return;
      }
      console.error('Błąd podczas wysyłania pliku:', e);
    }
  };

  const pickFile = async () => {
    try {
      const res: DocumentPickerResult = await getDocumentAsync({
        multiple: false,
      });

      if (res.canceled) return;
      const file = res.assets[0];
      if (file.mimeType !== 'text/csv') {
        Toast.show({ type: 'error', text2: t('form.csvWrongFormat') });
        return;
      }

      setFile(file);
    } catch (error) {
      console.error('Błąd podczas wyboru pliku:', error);
    }
  };

  return (
    <S.Wrapper>
      <S.TitleWrapper>
        <TitleText>{t('form.csvTitle')}</TitleText>
      </S.TitleWrapper>
      <Button secondaryColor={!Boolean(file)} onPress={pickFile}>
        {file ? t('form.csvChangeFile') : t('form.csvAddFile')}
      </Button>
      <S.TipsWrapper>
        <Tip type='info' text={t('form.csvInfo')} />
        <Tip type='info' text={t('form.csvMax')} />
      </S.TipsWrapper>

      {file && (
        <S.FileWrapper>
          <S.CsvFileContainer>
            <TextWrapper medium>{t('form.csvYouChose')}</TextWrapper>
            <TextWrapper>
              {file.name} [{file.size} KB]
            </TextWrapper>
          </S.CsvFileContainer>
          <Button secondaryColor onPress={sendFileToBackend}>
            {t('form.csvSaveFile')}
          </Button>
        </S.FileWrapper>
      )}
    </S.Wrapper>
  );
};

export default AddWordsFromCsv;
