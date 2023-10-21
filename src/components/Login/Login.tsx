import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useLogin from './useLogin';
import { Button, TitleText, InputText } from '../index';

import * as S from './Login.css';

interface LoginFormProps {
  toggleDown: any;
}

const LoginForm: FC<LoginFormProps> = ({ toggleDown }) => {
  const { t } = useTranslation();

  const { methods, handleSubmit, onSubmit, onError } = useLogin();

  return (
    <KeyboardAwareScrollView>
      <S.Wrapper>
        <FormProvider {...methods}>
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
        </FormProvider>
      </S.Wrapper>
    </KeyboardAwareScrollView>
  );
};

export default LoginForm;