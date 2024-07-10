import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { UserContext } from '../UserContext';
import { useContext } from 'react';
import { postEvent } from '../api';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { beginAsyncEvent } from 'react-native/Libraries/Performance/Systrace';
import { ScrollView } from 'react-native-gesture-handler';

export default function CreateEventScreen() {
  const [sportType, setSportType] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventImage, setEventImage] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [spaces, setSpaces] = useState('');


  const [createdEvent, setCreatedEvent] = useState(false);


  const {user} = useContext(UserContext)
  const   { somethingChanged } =  useContext(UserContext)
  const   { setSomethingChanged } =  useContext(UserContext)


  const navigation = useNavigation();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => {
        navigation.navigate('Account')
      }, 1500);

      // Cleanup the timeout if the component unmounts before the timeout is reached
      return () => clearTimeout(timer);
    }

    if (createdEvent === true) {
      const timer = setTimeout(() => {
        setCreatedEvent(false)
        navigation.navigate('Account')
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [createdEvent]);


  const handleCreateEvent = () => {

    const event_spaces_available = parseInt(spaces)

    const testEvent = {
      "event_name": eventName,
      "event_img_url": eventImage,
      "event_description": eventDescription,
      "event_location": eventLocation,
      "created_at": "2024-07-24 16:45:20", 
      "event_spaces_available": event_spaces_available,
      "event_category": sportType,
      "event_organiser": user.username
  }

    postEvent(testEvent).then((data) => {
      setSomethingChanged(!somethingChanged)
      setCreatedEvent(true)
    })
  }

  const handleSportTypeChange = (lsportType) => {
    setSportType(lsportType)
  }

  const handleSetEventName = (leventName) => {
    setEventName(leventName)
  }

  const handleSetEventImage = (leventImage) => {
    setEventImage(leventImage)
  }

  const handleSetEventDescription = (leventDescription) => {
    setEventDescription(leventDescription)
  }

  const handlesetEventDate = (leventDate) => {
    setEventDate(leventDate)
  }

  const handlesetEventLocation = (leventLocation) => {
    setEventLocation(leventLocation)
  }

  const handleSetSpaces = (lspaces) => {
    setSpaces(lspaces)
  }

  console.log(user.username.length)

  if(user.username.length === 0) {
    return (<View style={styles.container}>
      <Text style={styles.notloggedInLabel}>You must be registered/logged in to create an Event</Text>
    </View>)
  } else if (createdEvent === true) {
    return (<View style={styles.container}>
      <Text style={styles.notloggedInLabel}>You have created an Event</Text>
    </View>)
  } else {

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Type of Sport:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Football"
        value={sportType}
        onChangeText={handleSportTypeChange}
      />
      <Text style={styles.label}>Event Name:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Sunday Casual Football"
        value={eventName}
        onChangeText={handleSetEventName}
      />
      <Text style={styles.label}>Event Image URL:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., http://example.com/image.png"
        value={eventImage}
        onChangeText={handleSetEventImage}
      />
      <Text style={styles.label}>Event Description:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Open to all abilities and ages"
        value={eventDescription}
        onChangeText={handleSetEventDescription}
      />
      <Text style={styles.label}>Event Date:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 2024-07-15"
        value={eventDate}
        onChangeText={handlesetEventDate}
      />
      <Text style={styles.label}>Event Location:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Northcoders Leeds Office"
        value={eventLocation}
        onChangeText={handlesetEventLocation}
      />
      <Text style={styles.label}>Event Spaces:</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., 2"
        value={spaces}
        onChangeText={handleSetSpaces}
      />

      <Button title="Create Event" onPress={handleCreateEvent} />
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  label: {
    marginTop: 20,
    fontSize: 16,
  },
  notloggedInLabel: {
    marginTop: 200,
    fontSize: 35,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginTop: 5,
    borderRadius: 5,
  },
});
