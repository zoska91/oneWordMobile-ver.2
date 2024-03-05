import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

import { RootStackParamList } from '../../types/navigation';
import Modal from '../../components/Modal/Modal';
import Toast from 'react-native-toast-message';
import { useGlobalProvider } from '../../layout/GlobalProvider';
import GlobalLoader from '../../components/atoms/GlobalLoader';

interface IModalScreenProps {
  route: RouteProp<RootStackParamList, 'Modal'>;
}

const ModalScreen: FC<IModalScreenProps> = ({ route }) => {
  const { isLoading } = useGlobalProvider();

  const action = route?.params?.params?.action;

  return (
    <View style={styles.container}>
      <Modal action={action} />
      {isLoading && <GlobalLoader />}
      <Toast />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#e5e6ef',
  },
});

export default ModalScreen;
