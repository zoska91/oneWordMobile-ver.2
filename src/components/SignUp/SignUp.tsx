import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Animated } from 'react-native';

import { TitleText } from '../atoms/Title';
import Button from '../atoms/Button';
import InputText from '../atoms/InputText';

import * as S from './SignUp.css';
import useSignUpForm from './useSignUp';
import TextWrapper from '../atoms/TextWrapper';

interface SignFormProps {
  toggleAuth: () => void;
  currentScale: Animated.Value;
}

const SignUp: FC<SignFormProps> = ({ toggleAuth, currentScale }) => {
  const { methods, handleSubmit, onSubmit, onError } = useSignUpForm();

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
            <TitleText light>Sign Up</TitleText>

            <S.InputsContainer>
              <InputText name='email' required light />
              <InputText name='password' required light secureTextEntry />
            </S.InputsContainer>

            <Button secondaryColor onPress={handleSubmit(onSubmit, onError)}>
              Sign in
            </Button>
            <S.RegisterButton onPress={toggleAuth}>
              <TextWrapper center medium>
                Login
              </TextWrapper>
            </S.RegisterButton>
          </KeyboardAwareScrollView>
        </S.FormWrapper>
      </FormProvider>
    </Animated.View>
  );
};

export default SignUp;
