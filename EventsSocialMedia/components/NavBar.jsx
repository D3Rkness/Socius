import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "../assets/icons";
import { useRouter, usePathname } from "expo-router";
import { theme } from "../constants/theme";

const NavBar = () => {
  const size = 22;
  const router = useRouter();
  const currentRoute = usePathname().split("/")[1];

  const [iconColors, setIconColors] = useState({
    home: theme.colors.textDark,
    search: theme.colors.textDark,
    events: theme.colors.textDark,
    chat: theme.colors.textDark,
    profile: theme.colors.textDark,
  });

  useEffect(() => {
    setIconColors({
      home:
        currentRoute === "home" ? theme.colors.primary : theme.colors.textDark,
      search:
        currentRoute === "search"
          ? theme.colors.primary
          : theme.colors.textDark,
      events:
        currentRoute === "events"
          ? theme.colors.primary
          : theme.colors.textDark,
      chat:
        currentRoute === "chat" ? theme.colors.primary : theme.colors.textDark,
      profile:
        currentRoute === "profile"
          ? theme.colors.primary
          : theme.colors.textDark,
    });
  }, [currentRoute]);
  const navigate = (route) => {
    if (currentRoute === route) return;
    router.push(route);
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => navigate("home")}>
        <Icon name="home" size={size + 1} color={iconColors.home} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigate("userSearch")}
      >
        <Icon name="search" size={size} color={iconColors.search} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigate("events")}
      >
        <Icon name="events" size={size + 1} color={iconColors.events} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => navigate("chat")}>
        <Icon name="chat" size={size} color={iconColors.chat} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.navItem}
        onPress={() => navigate("profile")}
      >
        <Icon name="user" size={size} color={iconColors.profile} />
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
    height: 50,
  },
});

export default NavBar;
