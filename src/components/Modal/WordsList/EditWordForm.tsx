import { FC, useEffect, useState } from 'react';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import Button from '../../atoms/Button';
import { TitleText } from '../../atoms/Title';
import Popup from '../../Popup/Popup';

import * as S from '../AddWordForm/AddWordForm.style';
import InputField from '../../atoms/InputText';
import { IInputsAddWord, ITodayWord } from '../../../types/forms';
import useGenerateOptionsFields from '../../../helpers/useGenereteOptionsFields';
import SelectField from '../../atoms/SelectInput';
import GlobalLoader from '../../atoms/GlobalLoader';

interface EditWordFormProps {
  data: ITodayWord;
  saveEditingWord: (wordId: string, values: IInputsAddWord) => Promise<'success' | undefined>;
  isLoading: boolean;
}

const EditWordForm: FC<EditWordFormProps> = ({ data, saveEditingWord, isLoading }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const { t } = useTranslation();
  const { langOptions } = useGenerateOptionsFields();

  const methods = useForm<IInputsAddWord>({
    defaultValues: data || {},
  });

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    setModalVisible(data.basicWord ? true : false);
    reset(data);
  }, [data]);

  const onSubmit: SubmitHandler<IInputsAddWord> = async (values) => {
    const body = {
      basicWord: values.basicWord,
      transWord: values.transWord,
      addLang: values.addLang,
    };

    if (data?._id) {
      const resp = await saveEditingWord(data._id, body);
      if (resp === 'success') {
        setModalVisible(false);
      }
    }
  };

  return (
    <Popup
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      height='60%'
      loading={isLoading}
    >
      <S.Wrapper>
        <FormProvider {...methods}>
          <TitleText> {t('form.editWordTitle')}</TitleText>

          <S.InputsContainer style={{ marginBottom: 0, marginTop: 0 }}>
            <InputField name='basicWord' />
            <InputField name='transWord' />
            <SelectField name='addLang' options={langOptions} />
          </S.InputsContainer>

          <Button dark small onPress={handleSubmit(onSubmit)}>
            {t('buttons.submit')}
          </Button>
        </FormProvider>
      </S.Wrapper>
    </Popup>
  );
};

export default EditWordForm;
