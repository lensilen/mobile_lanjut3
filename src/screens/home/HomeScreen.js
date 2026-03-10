import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  TextInput,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { PRODUCTS } from "../../data/products";

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProducts = PRODUCTS
    ? PRODUCTS.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : [];

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <Ionicons
          name="search"
          size={20}
          color="#888"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Cari produk di sini..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>
          Katalog Produk ({filteredProducts.length})
        </Text>
        {filteredProducts.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.card}
            onPress={() => {
              navigation.navigate("ProductDetail", {
                productId: item.id,
                productName: item.name,
                productPrice: item.price,
                productImage: item.image,
              });
            }}
          >
            <Image source={{ uri: item.image }} style={styles.productImage} />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        ))}
        {filteredProducts.length === 0 && (
          <Text style={styles.noResult}>Produk tidak ditemukan...</Text>
        )}
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    margin: 20,
    paddingHorizontal: 15,
    borderRadius: 10,
    elevation: 2,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  searchIcon: { marginRight: 10 },
  searchInput: { flex: 1, height: 45 },
  scrollContainer: { flex: 1, paddingHorizontal: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
  card: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    marginBottom: 15,
    borderRadius: 12,
    elevation: 3,
    alignItems: "center",
  },
  productImage: { width: 80, height: 80, borderRadius: 8 },
  productInfo: { marginLeft: 15, flex: 1 },
  productName: { fontSize: 18, fontWeight: "bold" },
  productPrice: { fontSize: 16, color: "#156500", marginTop: 5 },
  noResult: { textAlign: "center", marginTop: 20, color: "#888" },
});
