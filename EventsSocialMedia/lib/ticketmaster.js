import { ticketmasterApiKey } from "../constants";

// Function to fetch events from Ticketmaster API
export const fetchTicketmasterEvents = async (searchQuery) => {
  try {
    const response = await fetch(
      `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${searchQuery}&apikey=${ticketmasterApiKey}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching Ticketmaster events:", error);
    return { error: "Failed to fetch events" };
  }
};
