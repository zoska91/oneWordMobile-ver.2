import React, { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Animated } from 'react-native';
import { useTranslation } from 'react-i18next';

import { TitleText } from '../../atoms/Title';
import Button from '../../atoms/Button';
import InputText from '../../atoms/InputText';

import useSignUpForm from './useSignUp';
import TextWrapper from '../../atoms/TextWrapper';

import * as S from './SignUp.css';

interface SignFormProps {
  toggleAuth: () => void;
  currentScale: Animated.Value;
}

const SignUp: FC<SignFormProps> = ({ toggleAuth, currentScale }) => {
  const { t } = useTranslation();
  const { methods, handleSubmit, onSubmit } = useSignUpForm();

  return (
    <Animated.View
      style={[
        S.Wrapper.wrapper,
        { transform: [{ scaleX: currentScale }, { scaleY: currentScale }] },
      ]}
    >
      <FormProvider {...methods}>
        <S.FormWrapper>
          <KeyboardAwareScrollView>
            <TitleText light>{t('form.signUpTitle')}</TitleText>

            <S.InputsContainer>
              <InputText name='username' required light />
              <InputText name='password' required light secureTextEntry />
            </S.InputsContainer>

            <Button secondaryColor onPress={handleSubmit(onSubmit)}>
              {t('buttons.signUp')}
            </Button>
            <S.RegisterButton onPress={toggleAuth}>
              <TextWrapper center medium>
                {t('buttons.login')}
              </TextWrapper>
            </S.RegisterButton>
          </KeyboardAwareScrollView>
        </S.FormWrapper>
      </FormProvider>
    </Animated.View>
  );
};

export default SignUp;
