import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView, Text, StyleSheet } from "react-native";
import Categories from "../components/Home/Categories";
import HeaderTabs from "../components/Home/HeaderTabs";
import RestaurantItems from "../components/Home/RestaurantItems";
import SearchBar from "../components/Home/SearchBar";

const YELP_API_KEY =
  "iGJtvX8vvP7DRhLyo4LDN-Fje_y9eKUwIZb5EaWBS4dMWZBCSd0B5KP0M4CHPM4H1P9e0R0YuwHzLqDeNYWminFru6DInpI65WgmWaPJj71qjMu3WyAU56BeppRHYXYx";

const styles = StyleSheet.create({
  homeContainer: {
    paddingTop: 35,
    padding: 15,
    backgroundColor: "white",
  },
  restaurantItemContainer: {
    paddingBottom: 170,
    flex: 1,
  },
});

const Home = () => {
  const [restaurantData, setRestaurantData] = useState([{}, {}, {}, {}]);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Pickup");
  const [loading, setLoading] = useState(true);

  const getRestaurants = (cityName) => {
    setLoading(true);
    const YELP_URL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${cityName}`;

    const YELP_OPTIONS = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(YELP_URL, YELP_OPTIONS)
      .then((res) => res.json())
      .then((json) => {
        setRestaurantData(
          activeTab == "Delivery"
            ? json?.businesses?.filter((business) =>
                business.transactions.includes(activeTab.toLowerCase())
              )
            : json.businesses
        );
        setLoading(false);
      });
  };

  useEffect(() => {
    if (city.length === 0) {
      getRestaurants("San Francisco");
    } else {
      getRestaurants(city);
    }
  }, [city, activeTab]);

  return (
    <View>
      <StatusBar />
      <View style={styles.homeContainer}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar setCity={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <View style={styles.restaurantItemContainer}>
          <RestaurantItems
            restaurantData={restaurantData}
            isLoading={loading}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;
