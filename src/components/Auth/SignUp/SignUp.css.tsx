import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    top: 10,
    left: 0,
    width: '100%',
    paddingVertical: '10%',
    flex: 1,
  },
});

export const InputsContainer = styled.View`
  width: 100%;
  margin-bottom: 50px;
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
