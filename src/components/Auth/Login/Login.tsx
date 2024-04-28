import { FC } from 'react';
import { Animated } from 'react-native';
import { FormProvider } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import useLogin from './useLogin';
import { TitleText } from '../../atoms/Title';
import Button from '../../atoms/Button';
import InputText from '../../atoms/InputText';

import * as S from './Login.css';
import TextWrapper from '../../atoms/TextWrapper';
import ErrorText from '../../atoms/ErrorText';
interface LoginFormProps {
  toggleAuth: () => void;
  currentScale: Animated.Value;
  currentOpacityLogin: Animated.Value;
}

const LoginForm: FC<LoginFormProps> = ({ toggleAuth, currentScale, currentOpacityLogin }) => {
  const { t } = useTranslation();

  const { methods, handleSubmit, onSubmit } = useLogin();

  return (
    <Animated.View
      style={[
        S.Wrapper.wrapper,
        {
          transform: [{ scaleX: currentScale }, { scaleY: currentScale }],
          opacity: currentOpacityLogin,
        },
      ]}
    >
      <FormProvider {...methods}>
        <S.FormWrapper>
          <KeyboardAwareScrollView>
            <TitleText> {t('form.loginTitle')}</TitleText>

            <S.InputsContainer>
              <InputText name='username' required />
              <InputText name='password' required secureTextEntry />
            </S.InputsContainer>

            <Button secondaryColor onPress={handleSubmit(onSubmit)}>
              {t('buttons.login')}
            </Button>
            <S.RegisterButton onPress={toggleAuth}>
              <TextWrapper center medium>
                {t('buttons.register')}
              </TextWrapper>
            </S.RegisterButton>
          </KeyboardAwareScrollView>
        </S.FormWrapper>
      </FormProvider>
    </Animated.View>
  );
};

export default LoginForm;
