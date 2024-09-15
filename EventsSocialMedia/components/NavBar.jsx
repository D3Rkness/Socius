import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../assets/icons";
import { useRouter } from "expo-router";

const NavBar = () => {
  const size = 25;
  const router = useRouter();

  return (
    <View style={styles.navbar}>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("home")}
      >
        <Icon name="home" size={size + 1} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="search" size={size} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("events")}
      >
        <Icon name="events" size={size + 1} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="chat" size={size} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("profile")}
      >
        <Icon name="user" size={size} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#f5f5f5",
    borderTopWidth: 1,
    borderTopColor: "#999",
    paddingVertical: 10,
  },
  navItem: {
    height: 40,
  },
});

export default NavBar;
