import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [activeUser, setActiveUser] = useState(null);
  const [userData, setUserData] = useState(null); // State cadangan untuk data register

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("@user_data");
        const loggedInUser = await AsyncStorage.getItem("@active_user");
        
        if (storedUser) setUserData(JSON.parse(storedUser));
        if (loggedInUser) setActiveUser(JSON.parse(loggedInUser));
      } catch (e) {
        console.log("Load Error:", e);
      }
    };
    loadInitialData();
  }, []);

  const registerUser = async (data) => {
    try {
      const newUser = { ...data, nim: "254162" };
      // Simpan ke HP
      await AsyncStorage.setItem("@user_data", JSON.stringify(newUser));
      // Simpan ke State (Biar Login langsung dapet datanya)
      setUserData(newUser);
      console.log("Register Berhasil:", newUser);
    } catch (e) {
      console.log("Register Error:", e);
    }
  };

  const loginUser = async (email, password) => {
    try {
      // Cek di State dulu (cepat), kalau kosong baru cek di HP (lambat)
      let registeredUser = userData;
      
      if (!registeredUser) {
        const stored = await AsyncStorage.getItem("@user_data");
        registeredUser = stored ? JSON.parse(stored) : null;
      }

      if (!registeredUser) {
        console.log("Login Gagal: Data tidak ditemukan di RAM maupun Storage");
        return false;
      }

      const inputEmail = email.trim().toLowerCase();
      const dbEmail = registeredUser.email.trim().toLowerCase();

      if (dbEmail === inputEmail && registeredUser.password === password) {
        setActiveUser(registeredUser);
        await AsyncStorage.setItem("@active_user", JSON.stringify(registeredUser));
        console.log("Login Sukses!");
        return true;
      }
      
      console.log("Gagal: Data tidak cocok", { inputEmail, dbEmail });
      return false;
    } catch (e) {
      console.log("Login Error:", e);
      return false;
    }
  };

  const logoutUser = async () => {
    await AsyncStorage.removeItem("@active_user");
    setActiveUser(null);
  };

  return (
    <UserContext.Provider value={{ activeUser, registerUser, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);