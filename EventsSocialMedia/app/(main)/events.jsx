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

const TicketmasterEvents = () => {
  const [searchQuery, setSearchQuery] = useState("concert");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("Baltimore, MD");

  const getEvents = async () => {
    setLoading(true);
    const response = await fetchTicketmasterEvents(searchQuery);
    if (response?._embedded?.events) {
      setEvents(response._embedded.events);
    }
    setLoading(false);
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
            <View style={styles.eventCard}>
              <Image
                source={{ uri: item.images[0]?.url }}
                style={styles.eventImage}
              />

              <View style={styles.eventDetails}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventDate}>
                  {item.dates?.start?.localDate}
                </Text>
                <Text style={styles.eventVenue}>
                  {item._embedded?.venues[0]?.name} ·{" "}
                  {item._embedded?.venues[0]?.city?.name}
                </Text>

                <View style={styles.attendees}>
                  <Icon name="user" size={24} />
                  <Icon name="user" size={24} style={styles.attendeeIcon} />
                  <Icon name="user" size={24} style={styles.attendeeIcon} />
                </View>
              </View>
            </View>
          )}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  searchBar: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: "#e3e3e3",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 8,
    flex: 0.85,
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  searchButton: {
    backgroundColor: theme.colors.primaryDark,
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  locationContainer: {
    marginTop: -10,
    alignItems: "flex-end",
  },
  locationText: {
    fontSize: 14,
    color: "#555",
  },
  eventCard: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingBottom: 10,
  },
  eventImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  eventDetails: {
    marginTop: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDate: {
    color: "#888",
  },
  eventVenue: {
    color: "#aaa",
  },
  attendees: {
    flexDirection: "row",
    marginTop: 10,
  },
  attendeeIcon: {
    marginLeft: -10,
  },
});

export default TicketmasterEvents;
