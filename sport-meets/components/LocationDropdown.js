import { Picker } from "@react-native-picker/picker";
import { View, StyleSheet, Text } from "react-native";
import { getEventLocations } from "../api";
import { useEffect, useState } from "react";

const LocationDropdown = ({ location, setLocation }) => {

  const [serverLocations, setsServerLocations] = useState("")

  useEffect(()=> {
    getEventLocations().then((locations)=> {

      const local = locations.map((location)=> {
          return <Picker.Item key={location["event_location"]}label={location["event_location"]} value={location["event_location"]} />
      })
        setsServerLocations(local)
    })
  }, [])

  return (
    <View>
      <Text
        style={styles.search}
        aria-label='Label for Username'
        id='labelUsername'>
        Choose a Location
      </Text>
      <Picker
        style={styles.dropdown}
        selectedValue={location}
        onValueChange={(value) => {
          setLocation(value);
        }}>
          {}
        
        <Picker.Item label='Select' value='select' />
        {serverLocations}
      </Picker>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
  dropdown: {
    height: 50,
    width: "100%",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
});
export default LocationDropdown;
