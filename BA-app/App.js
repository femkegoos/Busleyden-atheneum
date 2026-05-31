import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import CampusDetail from './screens/CampusDetail';
import ShopDetail from './screens/ShopDetail';
import NieuwsDetail from './screens/NieuwsDetail';

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
      <Stack.Screen name="CampusDetail" component={CampusDetail} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
      <Stack.Screen name="NieuwsDetail" component={NieuwsDetail} />
    </Stack.Navigator>
  );
}

export default function App() {
  const [fontsLoaded] = useFonts({
    'PoppinsRegular': require('./assets/fonts/Poppins-Regular.ttf'),
    'PoppinsBold': require('./assets/fonts/Poppins-Bold.ttf'),
    'PoppinsSemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
    'PoppinsItalic': require('./assets/fonts/Poppins-Italic.ttf'),

  });
    if (!fontsLoaded) {
    return null;
    }
    return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarShowIcon: false,
            tabBarActiveTintColor: '#ffff',
            tabBarInactiveTintColor: 'rgba(255, 255, 255, 0.7)',
            tabBarStyle: {
              backgroundColor: '#f7fcee',
              borderTopColor: '#f7fcee',
                paddingBottom: 8,
                height: 72,
            },
            tabBarLabelStyle: {
              fontSize: 14,
                fontFamily: 'PoppinsRegular',
                fontSize: 18,
            },
        }}
        >
        <Tab.Screen name="Studieaanbod" component={HomeStack} options={{tabBarIcon: ()=> null,}} />
        <Tab.Screen name="Nieuws" component={HomeStack} options={{tabBarIcon: ()=> null,}} />
        <Tab.Screen name="Over BA" component={HomeStack} options={{tabBarIcon: ()=> null,}} />   
            <Tab.Screen name="Inschrijven" component={HomeStack} options={{tabBarIcon: ()=> null,}} />   
        </Tab.Navigator>
    </NavigationContainer>
  );
}