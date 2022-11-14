import { Button } from '@rneui/themed';
import React from 'react'
import { Text, TextInput, View} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { isLoggedIn } from '../GraphQL/cache';


function ProfilePage() {
    const logout = () => {
        SecureStore.deleteItemAsync("token")
        isLoggedIn(false)
    }

  return (
    <>
    <Text>profilePage</Text>
    <Button title="Logout" type="solid" onPress={() => logout()} />
    </>
  )
}

export default ProfilePage