import { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';


const UserScreen: FC = () => {
  const navigation = useNavigation();

  return (
    <View>
      <Text>User</Text>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Text>Go to home screen!</Text>
      </TouchableOpacity>
    </View>
  );
}

export default UserScreen;