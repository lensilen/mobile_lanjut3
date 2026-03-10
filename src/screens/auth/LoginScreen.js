import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { useUser } from "../../context/UserContext";

export default function LoginScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser } = useUser();

  const handleLogin = async () => {
    // WAJIB ADA ASYNC
    const cleanedEmail = email.trim();
    const cleanedPassword = password.trim();

    if (!cleanedEmail || !cleanedPassword) {
      Alert.alert("Error", "Isi email dan password!");
      return;
    }

    // WAJIB ADA AWAIT agar sistem nunggu data kesimpan dulu baru pindah halaman
    const success = await loginUser(cleanedEmail, cleanedPassword);

    if (success) {
      onLogin(); // Pindah ke Home setelah data dipastikan aman di Context
    } else {
      Alert.alert("Gagal", "Email atau Password salah!");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>🛒 ShopApp</Text>
      <Text style={styles.subtitle}>Silakan masuk ke akun kamu</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Belum punya akun? Daftar sekarang</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 30,
  },
  logo: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#156500",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  button: {
    backgroundColor: "#156500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linkText: {
    marginTop: 20,
    color: "#156500",
    textAlign: "center",
    fontWeight: "500",
  },
});
