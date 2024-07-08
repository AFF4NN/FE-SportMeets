import { View, FlatList, StyleSheet } from "react-native";
import {useState, useEffect} from "react";
import IndividualMessage from "../components/IndividualMessage";
import SendMessage from "../components/SendMessage";
import { getEventMessages } from "../api";

export default function MessagesScreen({ route, navigation }) {
  const userContext = "Mo"; // This needs to be updated once we implement user context upon login
  const { name, id } = route.params;

  const [messages, setMessages] = useState([]);
  useEffect(() => {
    navigation.setOptions({
      title: name,
    });
    getEventMessages(id).then((messages) => {
      setMessages(messages)
    })
  }, []);

  function handleSend(newMessage) {
    const newMessageObject = {
      message_id: messages.length + 1,
      message_body: newMessage,
      sender: userContext,
      event_id: id,
      created_at: new Date().toLocaleString(),
    };
    setMessages((prevMessages) => [...prevMessages, newMessageObject]);
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.message_id}
        renderItem={({ item }) => <IndividualMessage item={item} />}
      >
      </FlatList>
        <SendMessage handleSend={handleSend} />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});