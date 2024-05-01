import { FC } from 'react';
import { FormProvider } from 'react-hook-form';

import Button from '../../atoms/Button';
import { TitleText } from '../../atoms/Title';
import useAddWordForm from './useAddWordForm';
import InputField from '../../atoms/InputText';
import SelectField from '../../atoms/SelectInput';

import * as S from './AddWordForm.style';

interface AddWordFormProps {}

const AddWordForm: FC<AddWordFormProps> = () => {
  const { navigation, langOptions, methods, onSubmit, handleSubmit, t } = useAddWordForm();

  return (
    <S.Wrapper>
      <FormProvider {...methods}>
        <TitleText> {t('form.addWordTitle')}</TitleText>

        <S.InputsContainer>
          <InputField name='basicWord' small required />
          <InputField name='transWord' small required />
          <SelectField name='addLang' options={langOptions} small />
        </S.InputsContainer>

        <S.ButtonContainer>
          <Button secondaryColor small onPress={handleSubmit(onSubmit)}>
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
