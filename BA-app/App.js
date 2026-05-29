import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useFonts } from 'expo-font';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: '#ffffff',
    },
    headerTintColor: '#000000',
    headerTitleStyle: {
      fontFamily: 'Poppins',
      fontSize: 24,
    },
  };

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={screenOptions}>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="CampusDetail" component={ProductDetail} />
      <Stack.Screen name="ShopDetail" component={BlogDetail} />
       <Stack.Screen name="NieuwsDetail" component={BlogDetail} />
    </Stack.Navigator>
  );
}