// app/main/ticketmasterEvents.jsx

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  Button,
} from "react-native";
import { fetchTicketmasterEvents } from "../../lib/ticketmaster";
import ScreenWrapper from "../../components/ScreenWrapper";
import Loading from "../../components/Loading";

const TicketmasterEvents = () => {
  const [searchQuery, setSearchQuery] = useState("concert");
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);

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
        <Text style={styles.title}>Ticketmaster Events</Text>

        <TextInput
          style={styles.input}
          placeholder="Search for events..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={getEvents} />

        {loading ? (
          <Loading />
        ) : (
          <FlatList
            data={events}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.eventCard}>
                <Text style={styles.eventName}>{item.name}</Text>
                <Text style={styles.eventDate}>
                  {item.dates?.start?.localDate}
                </Text>
              </View>
            )}
          />
        )}
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  eventCard: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
  },
  eventName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  eventDate: {
    fontSize: 16,
    color: "gray",
  },
});

export default TicketmasterEvents;
