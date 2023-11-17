import { FC } from 'react';
import { FormProvider } from 'react-hook-form';
import { Dimensions, Animated } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { TitleText } from '../atoms/Title';
import Button from '../atoms/Button';
import InputText from '../atoms/InputText';

import * as S from './SignUp.css';
import useSignUpForm from './useSignUp';

interface SignFormProps {
  toogleUp: () => void;
  toggleSlide: any;
}

const SignUp: FC<SignFormProps> = ({ toogleUp, toggleSlide }) => {
  const windowHeight = Dimensions.get('window').height;

  const { methods, handleSubmit, onSubmit, onError } = useSignUpForm();

  return (
    <Animated.View
      style={[
        S.Wrapper.wrapper,
        {
          transform: [{ translateY: toggleSlide }],
          height: windowHeight - 150,
        },
      ]}
    >
      <S.TopRounding
        style={{ transform: [{ scaleX: 3.5 }, { translateY: -50 }, { translateX: -15 }] }}
      />

      <FormProvider {...methods}>
        <S.FormWrapper>
          <KeyboardAwareScrollView>
            <S.TouchableOpacity onPress={toogleUp}>
              <TitleText light>Sign In</TitleText>
            </S.TouchableOpacity>

            <S.InputsContainer>
              <InputText name='email' required light />
              <InputText name='password' required light secureTextEntry />
            </S.InputsContainer>

            <Button secondaryColor onPress={handleSubmit(onSubmit, onError)}>
              Sign in
            </Button>
          </KeyboardAwareScrollView>
        </S.FormWrapper>
      </FormProvider>
    </Animated.View>
  );
};

export default SignUp;
