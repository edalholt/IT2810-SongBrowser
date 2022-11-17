import { useReactiveVar } from '@apollo/client';
import LoginScreen from '../components/LoginScreen';
import ProfilePage from '../components/ProfilePage';
import { isLoggedIn } from '../GraphQL/cache';
import * as SecureStore from 'expo-secure-store';
import { useEffect } from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigationTypes';

export default function ProfileScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'Profile'>) {
  const login = useReactiveVar(isLoggedIn)
  
  const CheckLogin = async () => {
     if(await SecureStore.getItemAsync("token")){
      isLoggedIn(true)
     }

  }

  useEffect(() => {
    CheckLogin()
  }, [])
  

  if(login) return <ProfilePage/>
  else return <LoginScreen/>

}
