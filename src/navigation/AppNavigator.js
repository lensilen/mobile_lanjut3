import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "./AuthNavigator";
import MainDrawer from "./MainDrawer";

const Stack = createNativeStackNavigator();

export function AppNavigator() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name="Main">
          {(props) => (
            <MainDrawer {...props} onLogout={() => setIsLoggedIn(false)} />
          )}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="Auth">
          {(props) => (
            <AuthNavigator {...props} onLogin={() => setIsLoggedIn(true)} />
          )}
        </Stack.Screen>
      )}
    </Stack.Navigator>
  );
}