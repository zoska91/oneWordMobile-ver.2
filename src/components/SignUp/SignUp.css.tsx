import { StyleSheet } from 'react-native';
import styled from 'styled-components/native';

export const Wrapper = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    backgroundColor: '#2e2757',
    width: '100%',
    paddingTop: 10,
    paddingBottom: 30,
    bottom: 0,
  },
});

export const FormWrapper = styled.View`
  padding: 0 10%;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.colorLight};
  text-transform: uppercase;
  text-align: center;
  z-index: 3;
  padding: 0 3px;
  margin: 0;
  font-size: 14px;
  font-size: 30px;
`;

export const TouchableOpacity = styled.TouchableOpacity`
  margin-bottom: 50px;
`;

export const TopRounding = styled.View`
  position: absolute;
  top: 0;
  left: 50%;
  width: 30%;
  height: 100px;
  border-radius: 100px;
  background-color: #2e2757;
`;

export const InputsContainer = styled.View`
  margin-top: 40px;
  margin-bottom: 50px;
  width: 100%;
`;