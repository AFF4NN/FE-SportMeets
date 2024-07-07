import {
  View,
  FlatList,
} from "react-native";
import {useState} from "react";
import GroupChatCard from "../components/GroupChatCard";

const testEventChats = [
  {
    event_id: 1,
    event_name: "Soccer Star Solutions",
    event_img_url:
      "https://cdn.pixabay.com/photo/2016/05/27/14/33/football-1419954_640.jpg",
    event_description: "Playing football with Northcoders Colleagues",
    event_location: "Leeds",
    created_at: "2024-07-19 10:30:00",
    event_spaces_available: 20,
    event_category: "football",
    event_organiser: "Alex",
  },
  {
    event_id: 2,
    event_name: "Bounce Ballers",
    event_img_url: "https://storage.googleapis.com/pod_public/1300/180358.jpg",
    event_description: "Playing Basketball 5 v 5",
    event_location: "Leeds",
    created_at: "2024-07-24 16:45:00",
    event_spaces_available: 10,
    event_category: "basketball",
    event_organiser: "DannyBoy",
  },
  {
    event_id: 3,
    event_name: "Birdie Bound",
    event_img_url:
      "https://cdn.shopify.com/s/files/1/0576/2750/8872/files/Golf_Birdie_480x480.jpg?v=1676301047",
    event_description: "Playing Golf with Big Boys",
    event_location: "Manchester",
    created_at: "2024-07-24 11:00:00",
    event_spaces_available: 5,
    event_category: "Golf",
    event_organiser: "Mo",
  },
];

export default function ChatsScreen({navigation}) {
  const [joinedEvents, setJoinedEvents] = useState(testEventChats);
  return (
    <View>
      <FlatList
        data={joinedEvents}
        keyExtractor={(item) => item.event_id}
        renderItem={({ item }) => <GroupChatCard item={item} navigation={navigation} />}
      />
    </View>
  );
}