import React from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

export default function CheckoutScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Halaman Checkout</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.label}>Ringkasan Pesanan:</Text>
        <Text>- Produk Berhasil Ditambahkan</Text>
        <Text>- Metode Pembayaran: Transfer Bank</Text>
        <Text style={styles.total}>Total: Rp 150.000</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Button
          title="Konfirmasi Bayar"
          color="#156500"
          onPress={() => {
            Alert.alert("Sukses", "Pesananmu berhasil dibuat!");
            // Gunakan popToTop untuk kembali ke awal Home sesuai modul 2.2
            navigation.popToTop();
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20 },
  summaryCard: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: "#156500",
  },
  label: { fontWeight: "bold", marginBottom: 10 },
  total: { marginTop: 15, fontSize: 18, fontWeight: "bold", color: "#156500" },
});
