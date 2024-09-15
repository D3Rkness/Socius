import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../assets/icons";

const NavBar = () => {
  const size = 28;

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="home" size={size} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="search" size={size} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="events" size={size} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="chat" size={size} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="user" size={size} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#999",
    paddingVertical: 10,
  },
  navItem: {
    height: 55,
    justifyContent: "center",
  },
});

export default NavBar;
