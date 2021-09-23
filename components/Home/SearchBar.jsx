import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  StyleSheet,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import AntDesign from "react-native-vector-icons/AntDesign";

const styles = StyleSheet.create({
  searchContainer: {
    marginTop: 15,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eee",
    borderRadius: 20,
  },
  searchInput: {
    flexDirection: "row",
    fontWeight: "700",
    paddingVertical: 13,
    paddingHorizontal: 15,
    flex: 1,
  },
  searchButton: {
    flexDirection: "row",
    marginRight: 8,
    backgroundColor: "white",
    padding: 9,
    borderRadius: 30,
    alignItems: "center",
    fontFamily: "Nunito",
  },
  dropDownContainer: {
    width: "100%",
    paddingLeft: 1,
  },
  dropDown: {
    backgroundColor: "#eee",
    borderRadius: 16,
  },
  dropDownItem: {
    paddingHorizontal: 14,
    paddingVertical: 13,
    borderBottomColor: "#fafafa",
    borderBottomWidth: 1,
  },
});

const SearchBar = ({ setCity }) => {
  const [input, setInput] = useState("");
  const [locations, setLocations] = useState(null);
  const [isFocus, setFocus] = useState(false);

  useEffect(() => {
    getLocations();
  }, [input]);

  const getLocations = () => {
    const MAP_BOX_API_KEY =
      "pk.eyJ1Ijoib3NhZGF0aGVjb2RlciIsImEiOiJja3R0czR2Z3IwM3l2Mm9tcGR4MHU3MzA5In0.n8P7tFoXn1G-wumFNjeL2g";
    const MAP_BOX_URL = `https://api.mapbox.com/geocoding/v5/mapbox.places/${input}.json?worldview=cn&access_token=${MAP_BOX_API_KEY}`;

    if (!isFocus) setLocations(null);
    return fetch(MAP_BOX_URL)
      .then((res) => res.json())
      .then((json) => json?.features?.map((item) => item.place_name))
      .then((locations) => setLocations(locations));
  };

  const selectLocation = (selected) => {
    setCity(selected);
    setInput(selected);
    setFocus(false);
    Keyboard.dismiss();
  };

  return (
    <View>
      <View style={styles.searchContainer}>
        <View style={{ marginLeft: 10 }}>
          <Ionicons name="location-sharp" size={24} />
        </View>
        <TextInput
          placeholder="Search"
          style={styles.searchInput}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          value={input}
          onChangeText={(text) => {
            setInput(text);
          }}
        />
        <TouchableOpacity onPress={() => selectLocation(input)}>
          <View style={styles.searchButton}>
            <AntDesign name="clockcircle" size={11} />
            <Text style={{ marginLeft: 10, fontFamily: "Nunito" }}>Search</Text>
          </View>
        </TouchableOpacity>
      </View>
      {isFocus && (
        <View
          style={[{ marginTop: locations ? 15 : 0 }, styles.dropDownContainer]}
        >
          <SearchDropdown list={locations} setCity={selectLocation} />
        </View>
      )}
    </View>
  );
};

const SearchDropdown = ({ list, setCity }) => {
  return (
    <View style={styles.dropDown}>
      {list?.map((item, index) => (
        <TouchableOpacity onPress={() => setCity(item)} key={index}>
          <View style={styles.dropDownItem}>
            <Text>{item}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SearchBar;
