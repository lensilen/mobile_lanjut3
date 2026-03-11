import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeScreen from "../screens/home/HomeScreen";
import CartScreen from "../screens/cart/CartScreen";
import { useCart } from "../context/CartContext";

const Stack = createNativeStackNavigator();
const { width } = Dimensions.get("window");

export default function HomeStack() {
  const cartContext = useCart();
  const cartItems = cartContext?.cartItems || [];
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#156500" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={({ navigation }) => ({
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => navigation.openDrawer()}
              style={{ marginLeft: 10 }}
            >
              <Ionicons name="menu" size={28} color="white" />
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <View style={styles.shopInfo}>
                <Text style={styles.titleText}>MyShop</Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
                <View style={styles.cartContainer}>
                  <Ionicons name="cart" size={24} color="white" />
                  {totalItems > 0 && (
                    <View style={styles.badge}>
                      <Text style={styles.badgeText}>{totalItems}</Text>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            </View>
          ),
          headerTitleAlign: "left",
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Keranjang Belanja" }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: width * 0.72,
  },
  shopInfo: { flexDirection: "row", alignItems: "center" },
  titleText: { color: "white", fontSize: 30, fontWeight: "bold" },
  cartContainer: { padding: 5 },
  badge: {
    position: "absolute",
    right: 0,
    top: 0,
    backgroundColor: "red",
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: { color: "white", fontSize: 10, fontWeight: "bold" },
});
