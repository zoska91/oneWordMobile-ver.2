/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName } from 'react-native';

// import ModalScreen from '../screens/ModalScreen/ModalScreen';
// import NotFoundScreen from '../screens/NotFoundScreen';
import HomeScreen from '../screens/HomeScreen';
// import UserScreen from '../screens/UserScreen/UserScreen';
import LinkingConfiguration from './LinkingConfiguration';
import { RootStackParamList } from '../types/navigation';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={HomeScreen} options={{ headerShown: false }} />
      {/* <Stack.Screen name='User' component={UserScreen} options={{ headerShown: false }} /> */}
      {/* <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} /> */}
      {/* <Stack.Group screenOptions={{ presentation: 'modal', headerShown: false }}> */}
        {/* <Stack.Screen name='Modal' component={ModalScreen} /> */}
      {/* </Stack.Group> */}
    </Stack.Navigator>
  );
}