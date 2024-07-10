import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import CategoryDropdown from "../components/CategoryDropdown";
import LocationDropdown from "../components/LocationDropdown";
import SportCards from "../components/SportCards";
import { Input } from "@rneui/themed";

export default function HomeScreen({ navigation }) {
  const [category, setCategory] = useState("select");
  const [location, setLocation] = useState("select");

  return (
    <ScrollView>
      <Text style={styles.headerText}>SportMeets</Text>
      <View style={styles.container}>
      <LocationDropdown location={location} setLocation={setLocation} />
        <CategoryDropdown category={category} setCategory={setCategory} />
      </View>

      {/* <MapView style={styles.map} /> */}

      <SportCards navigation={navigation} location={location} category={category} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    flexDirection: "column",
    padding: 10,
  },
  headerText: {
    color: "#1e90ff",
    fontWeight: "bold",
    fontSize: 36,
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
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

  search: {
    marginLeft: 10,
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },
});
