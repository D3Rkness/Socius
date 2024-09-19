import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../services/userService";
import ScreenWrapper from "../../components/ScreenWrapper";
import Icon from "../../assets/icons";
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import { getUserImageSrc } from "../../services/imageService";

const UserSearch = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    getAllUsers().then((response) => {
      setUsers(response.data);
      setFilteredUsers(response.data);
    });
  }, []);

  const filterUsers = (query) => {
    setSearchQuery(query);

    if (query === "") {
      setFilteredUsers(users);
    } else {
      const lowercasedQuery = query.toLowerCase();
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredUsers(filtered);
    }
  };

  const renderUserItem = ({ item }) => (
    <View style={styles.userCard}>
      <Image source={getUserImageSrc(item?.image)} style={styles.avatar} />
      <Text style={styles.userName}>{item.name}</Text>
    </View>
  );

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Text style={styles.title}>Search Users</Text>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchQuery}
              onChangeText={(query) => filterUsers(query)}
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
          data={filteredUsers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderUserItem}
          ListEmptyComponent={
            <Text style={styles.noResults}>No Users Found</Text>
          }
        />
      </View>
    </ScreenWrapper>
  );
};

export default UserSearch;

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
  userName: {
    fontSize: hp(2.2),
  },
  noResults: {
    textAlign: "center",
    color: "#888",
    marginTop: hp(2),
  },
});
