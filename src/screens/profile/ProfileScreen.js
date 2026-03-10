import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useUser } from "../../context/UserContext";

export default function ProfileScreen() {
  const { activeUser } = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profil Pengguna</Text>

      <View style={styles.profileCard}>
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {activeUser?.fullName
              ? activeUser.fullName.charAt(0).toUpperCase()
              : "U"}
          </Text>
        </View>

        <Text style={styles.name}>
          {activeUser?.fullName || "Nama Pengguna"}
        </Text>

        <View style={styles.detailContainer}>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.info}>
            {activeUser?.email || "Email tidak tersedia"}
          </Text>
        </View>

        <View style={styles.badge}>
          <Text style={styles.badgeText}>Mahasiswa Aktif</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  title: { fontSize: 22, fontWeight: "bold", marginBottom: 20, color: "#333" },
  profileCard: {
    padding: 30,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#156500",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    borderWidth: 4,
    borderColor: "#e8f5e9",
  },
  avatarText: {
    color: "white",
    fontSize: 40,
    fontWeight: "bold",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#156500",
    marginBottom: 20,
  },
  detailContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    justifyContent: "center",
  },
  label: {
    fontSize: 14,
    color: "gray",
    fontWeight: "600",
    marginRight: 5,
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
  badge: {
    marginTop: 20,
    backgroundColor: "#e8f5e9",
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeText: {
    color: "#156500",
    fontSize: 12,
    fontWeight: "bold",
  },
});