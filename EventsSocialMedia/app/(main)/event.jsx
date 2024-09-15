import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router"; // Import useSearchParams to fetch the params
import { hp, wp } from "../../helpers/common";
import { theme } from "../../constants/theme";
import Icon from "../../assets/icons";
import { SvgUri } from "react-native-svg";
import { useState } from "react";
import SelectDropdown from "react-native-select-dropdown";

const Event = ({ route }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedValue, setSelectedValue] = useState("option1");

  // Destructure the parameters passed via the router
  const { name, date, venue, image } = params;

  // Mock data for users attending or interested
  const goingUsers = [
    {
      id: 1,
      name: "TimGuitar29",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    },
    {
      id: 2,
      name: "JustinTimb3r",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    },
    {
      id: 3,
      name: "dj2801panda",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    },
  ];

  const interestedUsers = [
    {
      id: 1,
      name: "Laroi22",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    },
    {
      id: 2,
      name: "Alan24_",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    },
    {
      id: 3,
      name: "Steve_mad",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    },
    {
      id: 4,
      name: "JonahParty39",
      avatar:
        "https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrowLeft" size={hp(3)} color={theme.colors.text} />
      </TouchableOpacity>

      {/* Event Image */}
      <Image source={{ uri: image }} style={styles.eventImage} />

      {/* Event Info */}
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{name}</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <Text style={styles.eventDate}>{date}</Text>
        </View>
        <Text style={styles.eventVenue}>{venue}</Text>

        <View style={styles.containerMusicTickets}>
          {/* Buttons for Ticket Links */}
          <View style={styles.musicLinks}>
            <SvgUri
              width="40"
              height="40"
              uri="https://upload.wikimedia.org/wikipedia/commons/d/df/ITunes_logo.svg"
            />
            <SvgUri
              width="40"
              height="40"
              uri="https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg"
            />
            <View>
              <SvgUri
                width="40"
                height="40"
                uri="https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg"
              />
            </View>
          </View>
          {/* Buy Tickets */}
          <TouchableOpacity style={styles.buyButton}>
            <Text style={styles.buyButtonText}>Buy Tickets</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Attendees */}
      <View style={styles.attendeesContainer}>
        <View style={styles.attendeeSection}>
          <Text style={styles.attendeeTitle}>I'm Going!</Text>
          <FlatList
            data={goingUsers}
            keyExtractor={(item) => item.id.toString()}
            style={styles.attendeeList}
            vertical
            renderItem={({ item }) => (
              <View style={styles.attendeeCard}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.attendeeAvatar}
                />
                <Text style={styles.attendeeName}>{item.name}</Text>
              </View>
            )}
          />
        </View>

        <View style={styles.attendeeSection}>
          <Text style={styles.attendeeTitle}>I'm Interested!</Text>
          <FlatList
            data={interestedUsers}
            keyExtractor={(item) => item.id.toString()}
            vertical
            style={styles.attendeeList2}
            renderItem={({ item }) => (
              <View style={styles.attendeeCard}>
                <Image
                  source={{ uri: item.avatar }}
                  style={styles.attendeeAvatar}
                />
                <Text style={styles.attendeeName}>{item.name}</Text>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

export default Event;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: wp(5),
  },
  backButton: {
    position: "absolute",
    top: hp(2),
    left: wp(2),
  },
  eventImage: {
    width: "100%",
    height: hp(30),
    borderRadius: wp(2),
    marginBottom: hp(2),
  },
  eventInfo: {
    marginBottom: hp(2),
  },
  eventTitle: {
    fontSize: hp(3),
    fontWeight: "bold",
    color: theme.colors.text,
  },
  eventDate: {
    fontSize: hp(2.2),
    color: "#888",
    marginBottom: hp(0.5),
  },
  eventVenue: {
    fontSize: hp(2),
    color: theme.colors.textLight,
  },
  musicLinks: {
    flexDirection: "row",
    justifyContent: "flex-start",
    marginTop: hp(1.5),
    marginBottom: hp(2),
    gap: wp(2),
    alignSelf: "center",
  },
  buyButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: hp(1),
    paddingHorizontal: wp(5),
    borderRadius: wp(2),
    alignSelf: "center",
  },
  buyButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  containerMusicTickets: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: hp(1),
  },
  attendeesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: hp(2),
    width: "100%",
  },
  attendeeSection: {
    width: "50%",
    alignContent: "center",
  },
  attendeeTitle: {
    fontSize: hp(2),
    fontWeight: "bold",
    marginBottom: hp(1),
    alignSelf: "center",
  },
  attendeeCard: {
    alignItems: "left",
    flexDirection: "row",
    alignItems: "center",
    marginRight: wp(3),
    marginBottom: wp(3),
  },
  attendeeAvatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    marginRight: wp(2),
  },
  attendeeName: {
    fontSize: hp(1.5),
    marginTop: hp(0.5),
  },
  attendeeList: {
    marginLeft: wp(2),
    borderRightWidth: wp(0.2),
  },
  attendeeList2: {
    marginLeft: wp(2),
    paddingLeft: wp(3),
  },
});
