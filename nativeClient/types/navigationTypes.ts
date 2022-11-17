import type { CompositeNavigationProp } from '@react-navigation/native';
import type { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';


export type RootStackParamList = {
    Root: undefined;
    SignUp: undefined;
    Profile: undefined;
    SongBrowser: undefined;
    NotFound: undefined;
  };

export type LoginScreenNavProps = CompositeNavigationProp<
BottomTabNavigationProp<RootStackParamList, 'Root'>,
NativeStackNavigationProp<RootStackParamList>
>;