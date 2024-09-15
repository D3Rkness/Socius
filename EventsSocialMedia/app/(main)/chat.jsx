import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import ScreenWrapper from "../../components/ScreenWrapper";
import Icon from "../../assets/icons";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import { getUserImageSrc } from "../../services/imageService";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response.data); // Assume response.data contains the list of users
      setFilteredUsers(response.data); // Initially display all users
    });
  }, []);

  // Function to filter users based on search query
  const filterUsers = (query) => {
    setSearchQuery(query);

    if (query === "") {
      setFilteredUsers(users); // Show all users if search is empty
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = users.filter(
        (user) => user.name.toLowerCase().includes(lowercasedQuery) // Filter users by name
      );
      setFilteredUsers(filtered);
    }
  };

  // Render user card
  const renderUserItem = ({ item }) => (
    <Pressable
      style={styles.userCard}
      onPress={() => {
        /* Navigate to chat or action */
      }}
    >
      <Image source={getUserImageSrc(item?.image)} style={styles.avatar} />
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{item.name}</Text>
        <Text style={styles.startConversationText}>
          Click to start a conversation
        </Text>
      </View>
    </Pressable>
  );

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Text style={styles.title}>Chat</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchQuery}
              onChangeText={(query) => filterUsers(query)} // Filter users on input change
            />
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Icon name="x" size={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={() => {}}>
            <Icon name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        {/* User List */}
        <FlatList
          data={filteredUsers} // Render filtered users
          keyExtractor={(item) => item.id.toString()} // Assuming each user has a unique id
          renderItem={renderUserItem}
          ListEmptyComponent={
            <Text style={styles.noResults}>No Users Found</Text>
          } // Display if no users are found
        />
      </View>
      <Pressable style={styles.fab} onPress={() => router.push("newPost")}>
        <Icon name="pencil" size={hp(3.2)} color="white" />
      </Pressable>
    </ScreenWrapper>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: wp(6),
  },
  title: {
    fontSize: hp(3.2),
    fontWeight: "bold",
    marginBottom: hp(2.5),
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(2),
  },
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: wp(6),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    flex: 0.95,
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: theme.colors.primaryDark,
    padding: wp(2.5),
    borderRadius: wp(12.5),
    marginLeft: wp(2.5),
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: wp(4),
    borderBottomWidth: 1,
    borderBottomColor: "#e3e3e3",
  },
  avatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(4),
  },
  userInfo: {
    flexDirection: "column",
  },
  userName: {
    fontSize: hp(2.2),
    fontWeight: "bold",
  },
  startConversationText: {
    fontSize: hp(1.6),
    color: "#888",
    marginTop: hp(0.5),
  },
  noResults: {
    textAlign: "center",
    color: "#888",
    marginTop: hp(2),
  },
  fab: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: theme.colors.primary,
    borderRadius: 50,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
});
