import React, { useState, useEffect } from "react";
import { View, Text, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

export default function SearchBar({ setCity }) {
  const [input, setInput] = useState("");

  useEffect(() => {
    getLocations();
  }, [input]);

  const getLocations = () => {
    const MAP_BOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${
      input ? input : "San Francisco"
    }.json?worldview=cn&access_token=pk.eyJ1Ijoib3NhZGF0aGVjb2RlciIsImEiOiJja3R0czR2Z3IwM3l2Mm9tcGR4MHU3MzA5In0.n8P7tFoXn1G-wumFNjeL2g`;

    return fetch(MAP_BOX_URL)
      .then((res) => res.json())
      .then((json) => {
        return json.features.map((item) => item.place_name);
      })
      .then((locations) => console.log(locations));
  };

  const selectLocation = (selected) => {
    setCity(selected);
  };

  return (
    <View
      style={{
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#eee",
        borderRadius: 20,
      }}
    >
      <View style={{ marginLeft: 10 }}>
        <Ionicons name="location-sharp" size={24} />
      </View>
      <TextInput
        placeholder="Search"
        style={{
          flexDirection: "row",
          fontWeight: "700",
          paddingVertical: 13,
          paddingHorizontal: 15,
          flex: 1,
        }}
        value={input}
        onChangeText={(text) => {
          setInput(text);
        }}
      />
      <View
        style={{
          flexDirection: "row",
          marginRight: 8,
          backgroundColor: "white",
          padding: 9,
          borderRadius: 30,
          alignItems: "center",
        }}
      >
        <AntDesign name="clockcircle" size={11} />
        <Text style={{ marginLeft: 10 }}>Search</Text>
      </View>
    </View>
  );
}
