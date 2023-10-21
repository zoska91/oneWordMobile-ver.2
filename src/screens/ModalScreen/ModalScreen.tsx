import { FC, useEffect, useLayoutEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';

// import ModalUser from '../../components/ModalUser/ModalUser';
// import { getCurrentUser } from '../../db/API/auth';
import { RootStackParamList } from '../../types/navigation';
import { Auth } from '../../components';

interface IModalScreenProps {
  route: RouteProp<RootStackParamList, 'Modal'>;
}

const ModalScreen: FC<IModalScreenProps> = ({ route }) => {
    console.log(1, {route: route.params?.params});
    
  const type = route?.params?.params?.type;
  const action = route?.params?.params?.action;
  const navigation = useNavigation();

  useEffect(() => {
    return () => {
      // temporary - i dont know how to do this after login in LoginForm.hook.ts with closing modal
    //   const user = getCurrentUser();
    //   if (type === 'auth' && user.userId) navigation.navigate('User');
    };
  }, []);

  return (
    <View style={styles.container}>
        <Text>modal</Text>
        {type === 'auth' && <Auth />}
      {/*  {type === 'user' && <ModalUser action={action} />} */}
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