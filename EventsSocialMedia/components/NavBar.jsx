import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../assets/icons";
import { router } from "expo-router";
import { useNavigationState } from "@react-navigation/native";

const NavBar = () => {
  const size = 25;
  const currentRoute = useNavigationState(
    (state) => state.routes[state.index]?.name
  );

  console.log("Current Route: ", currentRoute);

  const onNavigate = (route) => {
    if (currentRoute === route) return;
    router.push(route);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={onNavigate("home")}>
        <Icon name="home" size={size + 1} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="search" size={size} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="events" size={size + 1} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="chat" size={size} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={onNavigate("profile")}>
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
