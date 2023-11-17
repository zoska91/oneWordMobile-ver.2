import { FC } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components/native';
import { Text } from 'react-native';

const Wrapper = styled.TouchableOpacity`
  /* position: fixed; */
  top: 20px;
  left: 20px;
  background-color: ${({theme}) => theme.colorLight};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 22px;
`
 
const BackButton: FC = () => {
  const navigate = useNavigation();

  return ( 
		<Wrapper onPress={() => navigate.goBack()} >
			<Text>X</Text>
		</Wrapper>
	);
}
 
export default BackButton;