import React from "react";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from "@react-navigation/drawer";
import { View, Text, StyleSheet, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomeTabs from "./HomeTabs";
import ProductDetailScreen from "../screens/home/ProductDetailScreen";

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerHeader}>
        <Text style={styles.drawerTitle}>Menu Utama</Text>
      </View>
      <DrawerItem
        label="Beranda"
        icon={({ color, size }) => (
          <Ionicons name="home-outline" color={color} size={size} />
        )}
        onPress={() => props.navigation.navigate("MainApp")}
      />
      <DrawerItem
        label="Logout"
        icon={({ color, size }) => (
          <Ionicons name="log-out-outline" color={color} size={size} />
        )}
        onPress={() => {
          Alert.alert("Logout", "Apakah anda yakin ingin keluar?", [
            { text: "Batal", style: "cancel" },
            {
              text: "Keluar",
              style: "destructive",
              onPress: () => props.onLogout(), 
            },
          ]);
        }}
      />
    </DrawerContentScrollView>
  );
}

export default function MainDrawer({ onLogout }) {
  return (
    <Drawer.Navigator
      initialRouteName="MainApp"
      drawerContent={(props) => (
        <CustomDrawerContent {...props} onLogout={onLogout} />
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#156500",
      }}
    >
      <Drawer.Screen name="MainApp" component={HomeTabs} />
      <Drawer.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={{
          drawerItemStyle: { display: "none" },
          unmountOnBlur: true,
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 10,
  },
  drawerTitle: { fontSize: 18, fontWeight: "bold", color: "#156500" },
});
