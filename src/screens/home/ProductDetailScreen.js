import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { useCart } from "../../context/CartContext";
import { PRODUCTS } from "../../data/products";

export default function ProductDetailScreen({ route, navigation }) {
  const { productId } = route.params;
  const product = PRODUCTS.find((item) => item.id === productId);
  const { addToCart } = useCart();
  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produk tidak ditemukan</Text>
      </View>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
    });
    Alert.alert("Berhasil", `${product.name} dimasukkan ke keranjang!`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerSimulasi}>
        <Text style={styles.headerText}>Detail Produk</Text>
      </View>

      <Image source={{ uri: product.image }} style={styles.mainImage} />

      <View style={styles.infoCard}>
        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>{product.price}</Text>
        <View style={styles.descriptionSection}>
          <Text style={styles.descTitle}>Deskripsi Produk</Text>
          <Text style={styles.descContent}>
            {product.description || "Tidak ada deskripsi untuk produk ini."}
          </Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Tambah ke Keranjang"
          onPress={handleAddToCart}
          color="#156500"
        />
        <View style={{ height: 12 }} />
        <Button
          title="Kembali ke Home"
          onPress={() => navigation.navigate("MainApp")}
          color="gray"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerSimulasi: {
    paddingVertical: 35,
    backgroundColor: "#156500",
    alignItems: "center",
    justifyContent: "center",
    elevation: 4,
  },
  headerText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  mainImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  infoCard: {
    paddingHorizontal: 25,
    paddingTop: 30,
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
  },
  price: {
    fontSize: 22,
    color: "#156500",
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 20,
  },
  descriptionSection: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#eee",
    paddingTop: 20,
  },
  descTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#555",
  },
  descContent: {
    lineHeight: 24,
    color: "#666",
    fontSize: 15,
  },
  buttonContainer: {
    padding: 25,
    marginTop: 10,
  },
});
