import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { fetchTicketmasterEvents } from "../../lib/ticketmaster";
import ScreenWrapper from "../../components/ScreenWrapper";
import Icon from "../../assets/icons";
import { theme } from "../../constants/theme";
import { hp, wp } from "../../helpers/common";
import { router } from "expo-router";
import { format, parseISO } from "date-fns";

const Events = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Baltimore, MD");

  const getEvents = async () => {
    setLoading(true);
    const query = searchQuery.trim() || "";

    const response = await fetchTicketmasterEvents(
      query,
      "Baltimore",
      "relevance,desc"
    );
    if (response?._embedded?.events) {
      setEvents(response._embedded.events);
    }
    setLoading(false);
  };

  const handleEventPress = (e) => {
    router.push({
      pathname: "event",
      params: {
        name: e.name,
        date: e.dates.start.localDate,
        time: e.dates.start.localDate,
        venue: e._embedded.venues[0].name,
        image: e.images[0]?.url,
      },
    });
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Text style={styles.title}>Events</Text>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <TextInput
              style={styles.input}
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Icon name="x" size={20} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.searchButton} onPress={getEvents}>
            <Icon name="search" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.locationContainer}>
          <Text style={styles.locationText}>Near: {location}</Text>
        </TouchableOpacity>

        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleEventPress(item)}>
              <View style={styles.eventCard}>
                <Image
                  source={{ uri: item.images[0]?.url }}
                  style={styles.eventImage}
                />

                <View style={styles.eventDetails}>
                  <Text style={styles.eventName}>{item.name}</Text>
                  <View style={styles.minorDetailsContainer}>
                    <Text style={styles.eventDate}>
                      {format(
                        parseISO(
                          item.dates.start.localDate +
                            "T" +
                            item.dates.start.localTime
                        ),
                        "eee, MMM d ⋅ h:mma"
                      )}
                    </Text>
                    <Text style={styles.eventVenue}>
                      {item._embedded?.venues[0]?.name} ·{" "}
                      {item._embedded?.venues[0]?.city?.name}
                    </Text>

                    {/* Attendees Profile Pictures */}
                    <View style={styles.attendeesContainer}>
                      <Image
                        source={{
                          uri: "https://i.ytimg.com/vi/r2cRl01DK-Y/maxresdefault.jpg",
                        }}
                        style={styles.attendeeAvatar}
                      />
                      <Image
                        source={{
                          uri: "https://cdn.britannica.com/44/197644-050-EA683D2D/Justin-Timberlake-American-Rio-de-Janeiro-Brazil-2013.jpg",
                        }}
                        style={[styles.attendeeAvatar, styles.avatarOverlap]}
                      />
                      <Image
                        source={{
                          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNwuBFrUOvIXh0_TDAt43kSS0VtIzoGaVQ7g&s",
                        }}
                        style={[styles.attendeeAvatar, styles.avatarOverlap]}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

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
  locationContainer: {
    marginTop: hp(-1.25),
    marginBottom: hp(1),
    alignItems: "flex-end",
  },
  locationText: {
    fontSize: hp(1.75),
    color: "#555",
  },
  eventCard: {
    marginBottom: hp(1.25),
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: hp(1.5),
    position: "relative",
  },
  eventImage: {
    width: "100%",
    height: hp(25),
    borderRadius: wp(2.5),
  },
  eventDetails: {
    marginTop: hp(1.25),
  },
  eventName: {
    fontSize: hp(2.25),
    fontWeight: "bold",
  },
  eventDate: {
    color: "#888",
    fontSize: hp(1.75),
  },
  eventVenue: {
    color: "#aaa",
    fontSize: hp(1.75),
  },
  minorDetailsContainer: {
    paddingTop: hp(2),
  },
  attendeesContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    right: 0,
  },
  attendeeAvatar: {
    width: wp(10),
    height: wp(10),
    borderRadius: wp(5),
    borderWidth: 2,
    borderColor: "#fff",
  },
  avatarOverlap: {
    marginLeft: wp(-3.5),
  },
});

export default Events;
