import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { useAuth } from "../../contexts/AuthContext";
import Header from "../../components/Header";
import { hp, wp } from "../../helpers/common";
import Icon from "../../assets/icons";
import { theme } from "../../constants/theme";
import Avatar from "../../components/Avatar";
import { router } from "expo-router";
import { FlatList } from "react-native";
import Loading from "../../components/Loading";
import { fetchPosts } from "../../services/postService";
import { supabase } from "../../lib/supabase";
import PostCard from "../../components/PostCard";

const Profile = () => {
  const { user, setAuth } = useAuth();
  const [selectedSection, setSelectedSection] = useState("about");
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const getPosts = async () => {
    if (!hasMore) return null;
    let res = await fetchPosts(10, user.id);
    if (res.success) {
      if (posts.length == res.data.length) setHasMore(false);
      setPosts(res.data);
    }
  };
  const About = () => (
    <ScrollView style={styles.about}>
      <View style={styles.description}>
        <Text style={styles.descriptionHeader}>Description:</Text>
        <Text style={styles.descriptionText}>
          {user && user.bio && <Text style={styles.infoText}>{user.bio}</Text>}
        </Text>
      </View>
      <View style={styles.description}>
        <View style={styles.row}>
          <Text style={styles.infoText}>Age: 21</Text>
          <Text style={styles.infoText}>Gender: Male</Text>
        </View>
        <Text style={styles.infoText}>School: Johns Hopkins University</Text>
        <Text style={styles.infoText}>Favorite Music Genre: Indie Rock</Text>
        <Text style={styles.infoText}>Sports: Basketball</Text>
      </View>
    </ScrollView>
  );
  const Events = () => <Text style={styles.sectionText}>Events Content</Text>;
  const Posts = () => (
    <FlatList
      data={posts}
      ListHeaderComponentStyle={{ marginBottom: 30 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listStyle}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PostCard item={item} currentUser={user} router={router} />
      )}
      onEndReached={() => {
        getPosts();
        // console.log("got to the end");
      }}
      onEndReachedThreshold={0}
      ListFooterComponent={
        hasMore ? (
          <View style={{ marginVertical: posts.length == 0 ? 100 : 30 }}>
            <Loading />
          </View>
        ) : (
          <View style={{ marginVertical: 30 }}>
            <Text style={styles.noPosts}>No more posts</Text>
          </View>
        )
      }
    />
  );

  const onLogout = async () => {
    // setAuth(null);
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert("Sign out", "Error signing out");
    }
  };

  const handleLayout = async () => {
    Alert.alert("Confirm", "Are you sure you want to log out?", [
      {
        text: "Cancel",
        onPress: () => console.log("model cancelled"),
        style: "cancel",
      },
      {
        text: "Logout",
        onPress: () => onLogout(),
        style: "destructive",
      },
    ]);
  };

  return (
    <ScreenWrapper bg="white">
      <UserHeader user={user} handleLayout={handleLayout} />
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedSection("about")}>
          <Text
            style={[
              styles.tabText,
              selectedSection === "about" && styles.activeTab,
            ]}
          >
            About
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection("events")}>
          <Text
            style={[
              styles.tabText,
              selectedSection === "events" && styles.activeTab,
            ]}
          >
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedSection("posts")}>
          <Text
            style={[
              styles.tabText,
              selectedSection === "posts" && styles.activeTab,
            ]}
          >
            Posts
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.contentContainer}>
        {selectedSection === "about" && <About />}
        {selectedSection === "events" && <Events />}
        {selectedSection === "posts" && <Posts />}
      </View>
    </ScreenWrapper>
  );
};

const UserHeader = ({ user, handleLayout }) => {
  return (
    <View
      style={{
        backgroundColor: "white",
        paddingHorizontal: wp(5),
        paddingBottom: wp(1),
      }}
    >
      {/* Header */}
      <View style={styles.row}>
        <Header title="Profile" mb={30} showBackButton={false} />
        <TouchableOpacity style={styles.logoutButton} onPress={handleLayout}>
          <Icon name="settings" size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <View style={{ gap: 15 }}>
          <View style={styles.avatarContainer}>
            <Avatar
              uri={user?.image}
              size={hp(10)}
              rounded={theme.radius.xxl * 1.4}
              style={{ alignSelf: "left" }}
            />
            <Pressable
              style={styles.editIcon}
              onPress={() => router.push("editProfile")}
            >
              <Icon name="edit" strokeWidth={2.5} size={20} />
            </Pressable>
          </View>
          <View>
            <Text style={styles.actualName}>ILuvWaffles40</Text>
            <Text style={styles.userName}>{user && user.name}</Text>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.statsText}>33</Text>
            <Text style={styles.statsText}>Followers</Text>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.statsText}>24</Text>
            <Text style={styles.statsText}>Following</Text>
          </View>
          <View style={styles.shareButtons}>
            <Icon name="chat" size={23} />
            <Icon name="share" size={23} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  avatarContainer: {
    height: hp(10),
    width: hp(10),
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: -12,
    padding: 7,
    borderRadius: 50,
    backgroundColor: "white",
    shadowColor: theme.colors.textLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 5,
    elevation: 7,
  },
  actualName: {
    fontSize: hp(3),
    fontWeight: "700",
    gap: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoText: {
    fontSize: hp(1.6),
    fontWeight: "500",
    color: theme.colors.textDark,
    borderBottomWidth: 1,
    marginVertical: 5,
    borderColor: theme.colors.textLight,
  },
  logoutButton: {
    position: "absolute",
    right: 0,
    padding: 5,
    borderRadius: theme.radius.sm,
    marginRight: 10,
  },
  tabContainer: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    alignSelf: "center",
  },
  tabText: {
    fontSize: hp(2.2),
    fontWeight: "500",
  },
  activeTab: {
    textDecorationLine: "underline",
    color: theme.colors.textDark,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: wp(4),
    paddingVertical: hp(2),
  },
  sectionText: {
    fontSize: hp(2),
    textAlign: "center",
  },

  descriptionHeader: {
    fontSize: hp(2.2),
    marginBottom: 10,
  },

  description: {
    width: "80%",
    alignSelf: "center",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    minHeight: 100,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  statsContainer: {
    alignItems: "flex-end",
    marginLeft: wp(4),
  },
  statsText: {
    fontSize: hp(2),
    fontWeight: "500",
  },
  shareButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 70,
    alignSelf: "center",
    marginTop: 20,
  },
});

export default Profile;
