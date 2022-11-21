import { Fontisto, Ionicons, FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useTheme } from "@rneui/themed";
import { Pressable } from "react-native";
import { Text } from "react-native";
import { RootStackParamList } from "../types/navigationTypes";
import RegisterModal from "../screens/RegisterModal";
import NotFoundScreen from "../screens/NotFoundScreen";
import SongBrowserScreen from "../screens/SongBrowserScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { isLoggedIn } from "../GraphQL/cache";
import { useReactiveVar } from "@apollo/client";

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={BottomTabNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="NotFound"
        component={NotFoundScreen}
        options={{ title: "Oops!" }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="SignUp" component={RegisterModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const BottomTab = createBottomTabNavigator<RootStackParamList>();

function BottomTabNavigator(): JSX.Element {
  const { theme, updateTheme } = useTheme();
  const login = useReactiveVar(isLoggedIn);

  return (
    <BottomTab.Navigator
      initialRouteName="SongBrowser"
      screenOptions={{
        tabBarActiveTintColor: theme.colors.white,
        tabBarStyle: { backgroundColor: theme.colors.searchBg },
      }}
    >
      <BottomTab.Screen
        name="SongBrowser"
        component={SongBrowserScreen}
        options={({ navigation }) => ({
          title: "Zpotify navigatr",
          tabBarIcon: ({ color }) => (
            <Fontisto name="music-note" size={24} color={color} />
          ),
        })}
      />
      <BottomTab.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-person" size={24} color={color} />
          ),
          headerRight: () =>
            !login ? (
              <Pressable
                onPress={() => navigation.navigate("SignUp")}
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                })}
              >
                <Text style={{ marginRight: "5%" }}>Sign Up</Text>
                <FontAwesome
                  name="user-plus"
                  size={25}
                  color={theme.colors.success}
                  style={{ marginRight: 10 }}
                />
              </Pressable>
            ) : null,
        })}
      />
    </BottomTab.Navigator>
  );
}
