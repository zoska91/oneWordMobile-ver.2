import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useLogin from './useLogin';
import { TitleText } from '../atoms/Title';
import Button from '../atoms/Button';
import InputText from '../atoms/InputText';

import * as S from './Login.css';
interface LoginFormProps {
  toggleDown: any;
}

const LoginForm: FC<LoginFormProps> = ({ toggleDown }) => {
  const { t } = useTranslation();

  const { methods, handleSubmit, onSubmit, onError } = useLogin();

  return (
    <S.Wrapper>
      <FormProvider {...methods}>
        <S.FormWrapper>
          <KeyboardAwareScrollView>
            <S.TouchableOpacity onPress={toggleDown}>
              <TitleText> {t('form.loginTitle')}</TitleText>
            </S.TouchableOpacity>

            <S.InputsContainer>
              <InputText name='email' required />
              <InputText name='password' required secureTextEntry />
            </S.InputsContainer>

            <Button secondaryColor onPress={handleSubmit(onSubmit, onError)}>
              Log in
            </Button>
          </KeyboardAwareScrollView>
        </S.FormWrapper>
      </FormProvider>
    </S.Wrapper>
  );
};

export default LoginForm;
