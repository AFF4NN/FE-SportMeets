import React from "react";
import { View, ScrollView, StyleSheet, Pressable } from "react-native";
import { Text, Card, Button } from "@rneui/themed";
import { useState } from "react";
import ChatsScreen from "./ChatsScreen";
import { getAllUsers, updateSpacesAvailable } from "../api";
import { useContext } from "react";
import { useEffect } from "react";
import { UserContext } from "../UserContext";
import { getUserEvents } from "../api";
import { getUserEventsByID } from "../api";
import { joinEvent } from "../api";


  // it's on web!
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';



import { Platform } from 'react-native';

async function getCoordinates(locationName) {
  const apiKey = 'AIzaSyDOTPhZLAqHzJly3y6h9vxC24c9P3yt17Q';
  const encodedLocation = encodeURIComponent(locationName);
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedLocation}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry.location;
      return { latitude: lat, longitude: lng };
    } else {
      throw new Error('Location not found');
    }
  } catch (error) {
    console.error('Error fetching location coordinates:', error);
    return null;
  }
}


export default function SingleSportScreen({ navigation, route }) {
  const { event } = route.params;

  const [spacesAvailable, setSpacesAvailable] = useState(
    event.event_spaces_available
  );


  // Create a custom icon
const customIcon = L.icon({
  iconUrl:"https://c8.alamy.com/comp/KTJE3A/doomsday-preppers-logo-KTJE3A.jpg",
  iconSize: [80, 35], // Size of the icon
  iconAnchor: [17, 35], // Point of the icon which will correspond to marker's location
  popupAnchor: [0, -35] // Point from which the popup should open relative to the iconAnchor
});
  
  const { user, setUser } = useContext(UserContext);

  const [hasAlreadyJoined, sethasAlreadyJoined] = useState("");

  const [users, setUsers] = useState("");

  const [organiser, setOrganiser] = useState("");

  const [locationCordinates, setLocationCordinates] = useState("")

  useEffect(() => {
    getUserEventsByID(event.event_id).then((user_events) => {
      for (user_event of user_events) {
        if (user["username"] === user_event["username"]) {
          sethasAlreadyJoined(true);
        }
      }
    });

    getAllUsers().then((data) => {
      setUsers(data);
      const organiserlocal = data.find(
        (user) => user.username === event.event_organiser
      );

      setOrganiser(organiserlocal);
    });

    getCoordinates(event.event_location).then((coordinates) => {
      setLocationCordinates(coordinates)
    })
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  if (isLoading) return <Text>We are adding you the event...</Text>;

  if (user.username.length === 0) {
    return (
      <ScrollView>
        <View>
          <Card style={styles.container}>
            <Card.Title>
              <Text style={styles.fonts} h2>
                {event.event_name}
              </Text>
            </Card.Title>

            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{ uri: event.event_img_url }}
            />
            <Card.Divider />
            <Text style={styles.text}>
              <Text style={styles.bold}>Event Location: </Text>
              {event.event_location}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Sport: </Text>
              {event.event_category.slice(0, 1).toUpperCase() +
                event.event_category.slice(1)}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Description: </Text>
              {event.event_description}
            </Text>

            <View style={styles.avatarHostContain}>
              <Card.Image
                source={{ uri: organiser.avatar_url }}
                style={styles.avatar}
              />
              <Text style={styles.text}>
                <Text style={styles.bold}>Host: </Text>
                {event.event_organiser}
              </Text>
            </View>
            { Platform.OS === 'web' ? locationCordinates ? <MapContainer center={[locationCordinates["latitude"], locationCordinates["longitude"]]} zoom={13} style={{ height: "10rem", width: "100%"}}>
           <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://png.pngtree.com/template/20191009/ourmid/pngtree-colored-location-line-vector-single-icon-image_314830.jpg">OpenStreetMap</a> contributors'
              />
              <Marker position={[locationCordinates["latitude"], locationCordinates["longitude"]]} icon={customIcon}/>
             </MapContainer> : <View></View> : <View></View>
             } 
            <Text style={styles.text}>
              <Text style={styles.bold}>Spaces Available: </Text>
              {spacesAvailable}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Event Date: </Text>
              {event.created_at}
            </Text>
            {spacesAvailable <= 0 ? (
              <Button
                disabled={true}
                onPress={() => {
                  console.log("Button has been disabled");
                }}>
                {" "}
                <Text>No Spaces Left to Join</Text>
              </Button>
            ) : (
              <Button
                title={`Join ${event.event_name}`}
                onPress={() => {
                  alert("You must be logged in or registered to join an event");

                  navigation.navigate("Account");
                }}
              />
            )}
          </Card>
        </View>
      </ScrollView>
    );
  } else if (hasAlreadyJoined) {
    return (
      <ScrollView>
        <View>
          <Card style={styles.container}>
            <Card.Title>
              <Text style={styles.fonts} h2>
                {event.event_name}
              </Text>
            </Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{ uri: event.event_img_url }}
            />
            <Text style={styles.text}>
              <Text style={styles.bold}>Event Location: </Text>
              {event.event_location}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Sport: </Text>
              {event.event_category.slice(0, 1).toUpperCase() +
                event.event_category.slice(1)}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Description: </Text>
              {event.event_description}
            </Text>

            <View style={styles.avatarHostContain}>
              <Card.Image
                source={{ uri: organiser.avatar_url }}
                style={styles.avatar}
              />
              <Text style={styles.text}>
                <Text style={styles.bold}>Host: </Text>
                {event.event_organiser}
              </Text>
            </View>

            { Platform.OS === 'web' ? locationCordinates ? <MapContainer center={[locationCordinates["latitude"], locationCordinates["longitude"]]} zoom={13} style={{ height: "10rem", width: "100%"}}>
           <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://png.pngtree.com/template/20191009/ourmid/pngtree-colored-location-line-vector-single-icon-image_314830.jpg">OpenStreetMap</a> contributors'
              />
              <Marker position={[locationCordinates["latitude"], locationCordinates["longitude"]]} icon={customIcon}/>
             </MapContainer> : <View></View> : <View></View>
             } 
            <Text style={styles.text}>
              <Text style={styles.bold}>Spaces Available: </Text>
              {spacesAvailable}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Event Date: </Text>
              {event.created_at}
            </Text>
            <Button
              title={`Go to ${event.event_name} Chat`}
              onPress={() => {
                navigation.navigate("Messages", {
                  name: event.event_name,
                  id: event.event_id,
                });
              }}
            />
          </Card>
        </View>
      </ScrollView>
    );
  } else {
    return (
      <ScrollView>
        <View>
          <Card style={styles.container}>
            <Card.Title>
              <Text style={styles.fonts} h2>
                {event.event_name}
              </Text>
            </Card.Title>
            <Card.Divider />
            <Card.Image
              style={{ padding: 0 }}
              source={{ uri: event.event_img_url }}
            />
            <Text style={styles.text}>
              <Text style={styles.bold}>Event Location: </Text>
              {event.event_location}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.bold}>Sport: </Text>
              {event.event_category.slice(0, 1).toUpperCase() +
                event.event_category.slice(1)}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Description: </Text>
              {event.event_description}
            </Text>

            <View style={styles.avatarHostContain}>
              <Card.Image
                source={{ uri: organiser.avatar_url }}
                style={styles.avatar}
              />
              <Text style={styles.text}>
                <Text style={styles.bold}>Host: </Text>
                {event.event_organiser}
              </Text>
            </View>
            { Platform.OS === 'web' ? locationCordinates ? <MapContainer center={[locationCordinates["latitude"], locationCordinates["longitude"]]} zoom={13} style={{ height: "10rem", width: "100%"}}>
           <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://png.pngtree.com/template/20191009/ourmid/pngtree-colored-location-line-vector-single-icon-image_314830.jpg">OpenStreetMap</a> contributors'
              />
              <Marker position={[locationCordinates["latitude"], locationCordinates["longitude"]]} icon={customIcon}/>
             </MapContainer> : <View></View> : <View></View>
             } 
            <Text style={styles.text}>
              <Text style={styles.bold}>Spaces Available: </Text>
              {spacesAvailable}
            </Text>

            <Text style={styles.text}>
              <Text style={styles.bold}>Event Date: </Text>
              {event.created_at}
            </Text>
            {spacesAvailable <= 0 ? (
              <Button
                disabled={true}
                onPress={() => {
                  console.log("Button has been disabled");
                }}>
                <Text>No More Spaces Available</Text>
              </Button>
            ) : (
              <Button
                title={`Join ${event.event_name}`}
                onPress={() => {
                  setIsLoading(true);
                  updateSpacesAvailable(event).then((data) => {
                    return joinEvent({
                      username: user["username"],
                      event_id: event["event_id"],
                    }).then((data) => {
                      console.log(data);

                      setIsLoading(false);
                      setSpacesAvailable((current) => {
                        return current - 1;
                      });
                      navigation.navigate("Messages", {
                        name: event.event_name,
                        id: event.event_id,
                      });
                      return data;
                    });
                  });
                }}
              />
            )}
          </Card>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fonts: {
    marginBottom: 8,
    marginTop: 9,
    fontSize: 25,
    fontWeight: 800,
    color: "black",
  },
  user: {
    flexDirection: "row",
    marginBottom: 6,
  },
  image: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  name: {
    fontSize: 16,
    marginTop: 5,
  },
  avatar: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  avatarHostContain: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 10,
  },
  bold: {
    fontWeight: "bold",
    fontSize: 22,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontSize: 20,
  },
});
