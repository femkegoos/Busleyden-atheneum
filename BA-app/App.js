import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
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
      tabBarShowLabel: false,
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
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: 'rgba(0, 0, 0, 0.4)',
            tabBarStyle: {
              backgroundColor: '#f7fcee',
              borderTopColor: '#f7fcee',
                padding: 16,
                height: 120,
                 paddingTop: 16,
            },
            tabBarLabelStyle: {
                fontFamily: 'PoppinsRegular',
                fontSize: 18,
                paddingLeft: 16,
                paddingRight: 16,
               
            },
        }}
        >
        <Tab.Screen name="Scholen" component={HomeStack} options={{tabBarIcon: ({ color, size }) => (<Ionicons name="school" color={color} size={size} />  ),}} />
        <Tab.Screen name="Webshop" component={HomeStack} options={{tabBarIcon: ({ color, size }) => (<Ionicons name="cart" color={color} size={size} />  ),}} />
            <Tab.Screen name="Nieuwsjes" component={HomeStack} options={{tabBarIcon: ({ color, size }) => (<Ionicons name="document" color={color} size={size} />  ),}} />   
        </Tab.Navigator>
    </NavigationContainer>
  );
}