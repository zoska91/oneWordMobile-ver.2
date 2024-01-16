import { FC } from 'react';
import { FormProvider } from 'react-hook-form';

// import SelectField from '../../../components/atoms/Inputs/SelectInput';
import Button from '../../atoms/Button';
import { TitleText } from '../../atoms/Title';
import useAddWordForm from './useAddWordForm';
import InputField from '../../atoms/InputText';
import SelectField from '../../atoms/SelectInpout';

import * as S from './AddWordForm.style';

interface AddWordFormProps {}

const AddWordForm: FC<AddWordFormProps> = () => {
  const { navigation, addLangOptions, methods, onSubmit, handleSubmit, onError, t } =
    useAddWordForm();

  return (
    <S.Wrapper>
      <FormProvider {...methods}>
        <TitleText> {t('form.addWordTitle')}</TitleText>

        <S.InputsContainer>
          <InputField name='basicWord' required />
          <InputField name='transWord' required />
          <SelectField name='addLang' required options={addLangOptions} />
        </S.InputsContainer>

        <S.ButtonContainer>
          <Button secondaryColor small onPress={handleSubmit(onSubmit, onError)}>
            {t('buttons.submit')}
          </Button>
          <Button small onPress={() => navigation.goBack()}>
            {t('buttons.close')}
          </Button>
        </S.ButtonContainer>
      </FormProvider>
    </S.Wrapper>
  );
};

export default AddWordForm;
