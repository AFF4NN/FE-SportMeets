import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Tabs from "./navigation/Tabs";
import RegisterScreen from "./screens/RegisterScreen";
import LoginScreen from "./screens/LoginScreen";
import SingleSportScreen from "./screens/singleSportScreen";
import { UserProvider } from "./UserContext";
import UserProfileScreen from "./screens/UserProfileScreen";
import MessagesScreen from "./screens/MessagesScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Messages" component={MessagesScreen} />
        <Stack.Screen name="event" component={SingleSportScreen} />
        <Stack.Screen name="UserProfile" component={UserProfileScreen} />
        <Stack.Screen name='Register' component={RegisterScreen} />
       <Stack.Screen name='Login' component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </UserProvider>
  );
}

