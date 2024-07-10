import React from "react";
import { View, ScrollView, StyleSheet } from "react-native";
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

export default function SingleSportScreen({ navigation, route }) {
  const { event } = route.params;
  
  const [spacesAvailable, setSpacesAvailable] = useState(
    event.event_spaces_available
  );

  const {user, setUser} = useContext(UserContext)

  const [hasAlreadyJoined, sethasAlreadyJoined] = useState("")

  const [users, setUsers] = useState("")

  const [organiser, setOrganiser] = useState("")


  useEffect(() => {
  
    getUserEventsByID(event.event_id).then((user_events)=> {
      for (user_event of user_events) {
        if (user["username"] === user_event["username"]) {
          sethasAlreadyJoined(true)
        }
      }
    })

    getAllUsers().then((data)=> {
          setUsers(data)

          console.log(data)

          const organiserlocal = data.find(
            (user) => user.username === event.event_organiser
          );

          setOrganiser(organiserlocal)
    })

  }, [])


  const [isLoading, setIsLoading] = useState(false)
 
  if(isLoading) return <Text>We are adding you the event...</Text>
  
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
            <Text style={styles.text}>
               <Text style={styles.bold}>Event Location: </Text>
               {event.event_location}
               </Text>
  
  
               
            <Text style={styles.text}>
            <Text style={styles.bold}>
              Sport:</Text>
              {event.event_category.slice(0, 1).toUpperCase() +
                event.event_category.slice(1)}
            </Text>
  
            <Text style={styles.text}>
            <Text style={styles.bold}>
            Description: </Text>
            {event.event_description}
            </Text>
  
            <View style={styles.avatarHostContain}>
              <Card.Image
                source={{ uri: organiser.avatar_url }}
                style={styles.avatar}
              />
              <Text style={styles.text}>
              <Text style={styles.bold}>
              Host:
              </Text>
              {event.event_organiser}
              </Text>
            </View>
            <Text style={styles.text}>
            <Text style={styles.bold}>
            Spaces Available: 
            </Text>
             {spacesAvailable}</Text>
  
            <Text style={styles.text}>
            <Text style={styles.bold}>Event Date:</Text>
             {event.created_at}
             </Text>
             <Button
              title={`Join ${event.event_name}`}
              onPress={() => {
              
                alert("You must be logged in or registered to join an event")

                navigation.navigate("Account")
  
              }}/>
          </Card>
        </View>
        </ScrollView>
    )
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
            <Text style={styles.bold}>
              Sport:</Text>
              {event.event_category.slice(0, 1).toUpperCase() +
                event.event_category.slice(1)}
            </Text>
  
            <Text style={styles.text}>
            <Text style={styles.bold}>
            Description: </Text>
            {event.event_description}
            </Text>
  
            <View style={styles.avatarHostContain}>
              <Card.Image
                source={{ uri: organiser.avatar_url }}
                style={styles.avatar}
              />
              <Text style={styles.text}>
              <Text style={styles.bold}>
              Host:
              </Text>
              {event.event_organiser}
              </Text>
            </View>
            <Text style={styles.text}>
            <Text style={styles.bold}>
            Spaces Available: 
            </Text>
             {spacesAvailable}</Text>
  
            <Text style={styles.text}>
            <Text style={styles.bold}>Event Date:</Text>
             {event.created_at}
             </Text>
             <Button
              title={`Go to ${event.event_name} Chat`}
              onPress={() => {
                
                  navigation.navigate("Messages", {
                    name: event.event_name,
                    id: event.event_id
                   })
              }}/>
          </Card>
        </View>
        </ScrollView>
    )

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
          <Text style={styles.bold}>
            Sport:</Text>
            {event.event_category.slice(0, 1).toUpperCase() +
              event.event_category.slice(1)}
          </Text>

          <Text style={styles.text}>
          <Text style={styles.bold}>
          Description: </Text>
          {event.event_description}
          </Text>

          <View style={styles.avatarHostContain}>
            <Card.Image
              source={{ uri: organiser.avatar_url }}
              style={styles.avatar}
            />
            <Text style={styles.text}>
            <Text style={styles.bold}>
            Host:
            </Text>
            {event.event_organiser}
            </Text>
          </View>
          <Text style={styles.text}>
          <Text style={styles.bold}>
          Spaces Available: 
          </Text>
           {spacesAvailable}</Text>

          <Text style={styles.text}>
          <Text style={styles.bold}>Event Date:</Text>
           {event.created_at}
           </Text>
           <Button
            title={`Join ${event.event_name}`}
            onPress={() => {
              
              setIsLoading(true)
               updateSpacesAvailable(event)
               .then((data)=>{
                return joinEvent({ "username": user["username"],
                  "event_id": event["event_id"]}).then((data) => {
                    console.log(data)

                    setIsLoading(false)
                    setSpacesAvailable((current) => {
                      return current - 1;
                    });
                    navigation.navigate("Messages", {
                      name: event.event_name,
                      id: event.event_id
                     })
                    return data
                  })
              
               })
               .catch((err)=>{
           
               })

            }}/>
        </Card>
      </View>
      </ScrollView>
  )
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
    fontWeight: 'bold',
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
  },
  bold: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  }
});
