import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppNavigator } from "./src/navigation/AppNavigator";
import { UserProvider } from './src/context/UserContext';
import { CartProvider } from './src/context/CartContext';

export default function App() {
  return (
    <UserProvider>
    <CartProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </CartProvider>
    </UserProvider>
  );
}