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
import { format, parseISO } from "date-fns";

// import SelectDropdown from "react-native-select-dropdown";

const Event = ({ route }) => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [selectedValue, setSelectedValue] = useState("option1");

  // Destructure the parameters passed via the router
  const { name, date, time, venue, image } = params;
  const dropdownOptions = ["Choice 1", "Choice 2", "Choice 3"];

  // Mock data for users attending or interested
  const goingUsers = [
    {
      id: 1,
      name: "TimGuitar29",
      avatar: "https://i.ytimg.com/vi/r2cRl01DK-Y/maxresdefault.jpg",
      seatNumber: "Sec 552, Row 20",
    },
    {
      id: 2,
      name: "JustinTimb3r",
      avatar:
        "https://cdn.britannica.com/44/197644-050-EA683D2D/Justin-Timberlake-American-Rio-de-Janeiro-Brazil-2013.jpg",
      seatNumber: "Sec 211, Row 3",
    },
    {
      id: 3,
      name: "dj2801panda",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwuBFrUOvIXh0_TDAt43kSS0VtIzoGaVQ7g&s",
      seatNumber: "Sec 245, Row 12",
    },
  ];

  const interestedUsers = [
    {
      id: 1,
      name: "Laroi22",
      avatar:
        "https://cloudfront-us-east-1.images.arcpublishing.com/advancelocal/XWUZ3IUEQFHXXOWTYM3M7WYKOQ.jpg",
    },
    {
      id: 2,
      name: "Alan24_",
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ04B0bb0dDxDmXlwu2KRlp0DB3f_5GWUUr7DLYRh8zU_ZyLEei1-OYanRhCMPsO4rixR8&usqp=CAU",
    },
    {
      id: 3,
      name: "Steve_mad",
      avatar:
        "https://www.rollingstone.com/wp-content/uploads/2018/06/rs-129890-311-1800-1394027865.jpg?w=543",
    },
    {
      id: 4,
      name: "JonahParty39",
      avatar:
        "https://i.pinimg.com/236x/b3/a3/b1/b3a3b10bf7f37c8270233b7af09f7a77.jpg",
    },
  ];

  return (
    <View style={styles.container}>
      {/* Event Image */}
      <Image source={{ uri: image }} style={styles.eventImage} />

      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Icon name="arrowLeft" size={hp(5)} color={"white"} />
      </TouchableOpacity>

      {/* Event Info */}
      <View style={styles.eventInfo}>
        <Text style={styles.eventTitle}>{name}</Text>

        {/* Align Date, Venue and Interested */}
        <View style={styles.infoRow}>
          <View>
            <Text style={styles.eventDate}>
              {format(parseISO(date + "T" + time), "eee, MMM d ⋅ h:mma")}
            </Text>
            <Text style={styles.eventVenue}>{venue}</Text>
          </View>

          {/* Placeholder and Dropdown Icon */}
          <TouchableOpacity style={styles.dropdownButton}>
            <Text style={styles.placeHolder}>Interested</Text>
            <Icon
              name="arrowDown"
              size={hp(2)}
              color={theme.colors.text}
              style={styles.dropdownIcon}
            />
          </TouchableOpacity>
        </View>

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
            <SvgUri
              width="40"
              height="40"
              uri="https://upload.wikimedia.org/wikipedia/commons/6/6a/Youtube_Music_icon.svg"
            />
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
                <View style={styles.attendeeInfo}>
                  <Text style={styles.attendeeName}>{item.name}</Text>
                  <Text style={styles.seatNumber}>{item.seatNumber}</Text>
                </View>
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
  placeHolder: {
    color: theme.colors.textDark,
    fontSize: hp(1.8),
    fontWeight: "bold",
    paddingHorizontal: wp(2),
  },
  dropdownButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.5,
    borderRadius: 15,
    padding: 5,
  },
  dropdownIcon: {
    marginLeft: wp(1),
  },
  container: {
    flex: 1,
    padding: wp(5),
  },
  backButton: {
    position: "absolute",
    top: hp(5),
    left: wp(5),
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
    fontSize: hp(1.8),
    color: "#888",
    marginBottom: hp(0.5),
  },
  eventVenue: {
    fontSize: hp(1.8),
    color: theme.colors.textLight,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: hp(1.5),
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
    marginRight: wp(4),
    marginBottom: wp(3),
  },
  attendeeAvatar: {
    width: wp(9),
    height: wp(9),
    borderRadius: wp(5),
    marginRight: wp(2),
  },
  attendeeName: {
    fontSize: hp(1.5),
    marginTop: hp(0.5),
  },
  seatNumber: {
    fontSize: hp(1.5),
    color: "#888",
  },
  attendeeList: {
    marginLeft: wp(0),
    borderRightWidth: wp(0.2),
  },
  attendeeList2: {
    marginLeft: wp(0),
    paddingLeft: wp(3),
  },
});
