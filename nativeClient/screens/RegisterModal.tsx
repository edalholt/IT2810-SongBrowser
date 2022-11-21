import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme, Input } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import { LOGIN } from "../GraphQL/Queries";
import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedIn, songQueryVars } from "../GraphQL/cache";
import * as SecureStore from "expo-secure-store";
import { REGISTER } from "../GraphQL/Mutations";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigationTypes";

export default function RegisterModal({
  navigation,
}: NativeStackScreenProps<RootStackParamList, "SignUp">) {
  // Initializing states
  const { theme, updateTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const songVars = useReactiveVar(songQueryVars);

  // Using a mutation to register new users and send feedback if it was not successfull
  const [register, { error, data }] = useMutation(REGISTER, {
    onError: (err) => {
      setFeedback("Username is not available");
    },
  });

  // if a user is successfully created, they will get feedback and sendt to the page for searching.
  useEffect(() => {
    if (data) {
      SecureStore.setItemAsync("token", data.newUser._id).then(() => {
        songQueryVars({ ...songVars, uid: data.newUser._id });
        isLoggedIn(true);
        setFeedback("User created");
        navigation.navigate("Root");
      });
    }
  }, [data]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Register</Text>
        <View
          style={[styles.separator, { backgroundColor: theme.colors.primary }]}
        />

        <TextInput
          autoCapitalize={"none"}
          style={styles.input}
          onChangeText={(text) => setUsername(text)}
          placeholder={"Username"}
        />

        <TextInput
          autoCapitalize={"none"}
          secureTextEntry={true}
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          placeholder={"Password"}
        />

        <Text>{feedback}</Text>
        <Button
          title="Sign Up"
          type="solid"
          onPress={() =>
            // using the username and password from the two Text Input fields.
            register({ variables: { username: username, password: password } })
          }
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: "80%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
