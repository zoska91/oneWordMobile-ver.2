import styled from 'styled-components/native';
import { StyleSheet } from 'react-native';

export const Wrapper = StyleSheet.create({
  wrapper: {
    left: 0,
    width: '100%',
  },
});

export const InputsContainer = styled.View`
  margin-bottom: 50px;
  width: 100%;
`;

export const FormWrapper = styled.View`
  padding: 0 10%;
  width: 100%;
`;

export const RegisterButton = styled.TouchableOpacity`
  margin-top: 20px;
  text-align: center;
  width: 100%;
`;
