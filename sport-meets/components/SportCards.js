import React, { useEffect, useState, useCallback  } from "react";
import { SafeAreaView, StyleSheet, View, ScrollView } from "react-native";
import { Text, Card, Button } from "@rneui/themed";
import { getAllEvents } from "../api";
import { useFocusEffect } from "@react-navigation/native";


const Item = ({ event, navigation }) => {
  return (

    <Card containerStyle={styles.card}>
      <Card.Title style={styles.title}>{event.event_name}</Card.Title>
      <Card.Divider />
      <Card.Image style={styles.image} source={{ uri: event.event_img_url }} />
      <Card.Divider />
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          <Text style={styles.bold}>Event description: </Text>
          {event.event_description}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Event date: </Text>
          {event.created_at}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Event location: </Text>
          {event.event_location}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Host: </Text>
          {event.event_organiser}
        </Text>
        <Text style={styles.text}>
          <Text style={styles.bold}>Spaces Available: </Text>
          {event.event_spaces_available}
        </Text>
      </View>
      <Button
        buttonStyle={styles.button}
        title='VIEW NOW'
        onPress={() => navigation.navigate("event", { event })}
      />
    </Card>
  );
};

export default function SportCards({ navigation, category, location }) {
  const [events, setEvents] = useState([]);

  useFocusEffect(
    useCallback(() => {
      console.log(category, location);
  
      let queries = { params: {} };
      if (category !== "select") {
        queries.params.category = category;
      }
  
      if (location !== "select") {
        queries.params.location = location;
      }
  
      getAllEvents(queries)
        .then((events) => {
          setEvents(events);
        })
        .catch((error) => {
          console.error('Failed to fetch events:', error);
        });
    }, [category, location])
  )

  return (
      <SafeAreaView>
      {events.map((item) => (
        <Item key={item.event_id} event={item} navigation={navigation} />
      ))}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    shadowColor: "grey",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  image: {
    padding: 0,
  },
  textContainer: {
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    borderRadius: 0,
    marginLeft: 0,
    marginRight: 0,
    marginBottom: 0,
  },
});
