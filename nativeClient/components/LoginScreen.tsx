import { Text, TextInput, View } from "react-native";
import { StyleSheet } from "react-native";
import { useTheme, Input } from "@rneui/themed";
import { Button } from "@rneui/themed";
import { useState, useEffect } from "react";
import { LOGIN } from "../GraphQL/Queries";
import { useQuery, useReactiveVar } from "@apollo/client";
import { isLoggedIn, songQueryVars } from "../GraphQL/cache";
import * as SecureStore from "expo-secure-store";
import { LoginScreenNavProps } from "../types/navigationTypes";
import { useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
  const navigation = useNavigation<LoginScreenNavProps>();
  const { theme, updateTheme } = useTheme();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [feedback, setFeedback] = useState("");
  const [login, setLogin] = useState({ username: "", password: "" });
  const loggedIn = useReactiveVar(isLoggedIn);
  const [skip, setSkip] = useState(true);
  const songVars = useReactiveVar(songQueryVars);

  // Login if credentals is provided.
  // If skip is true, no credentials is provided and this tells appollo
  // not to make an initial request.
  const { loading, error, data } = useQuery(LOGIN, {
    variables: login,
    skip: skip,
  });

  useEffect(() => {
    if (data) {
      if (data.login._id == "Not Authorized") {
        setFeedback("Wrong username or password");
      } else {
        // Storing id in  securestorage as a "token", if login is successfull
        SecureStore.setItemAsync("token", data.login._id).then(() => {
          isLoggedIn(true);
          // All future fetching is done with the user ID if logged in.
          songQueryVars({ ...songVars, uid: data.login._id });
        });
      }
    }
  }, [data]);

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
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
          buttonStyle={{ backgroundColor: theme.colors.success }}
          title="Log in"
          type="solid"
          onPress={() => {
            setSkip(false);
            setLogin({ username: username, password: password });
          }}
        />
        <Text
          style={{ marginTop: "5%", textDecorationLine: "underline" }}
          onPress={() => navigation.navigate("SignUp")}
        >
          New? Register a user here
        </Text>
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
