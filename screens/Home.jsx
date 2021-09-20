import React, { useEffect, useState } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import Categories from "../components/Categories";
import HeaderTabs from "../components/HeaderTabs";
import RestaurantItems, {
  localRestaurants,
} from "../components/RestaurantItems";
import SearchBar from "../components/SearchBar";

const YELP_API_KEY =
  "iGJtvX8vvP7DRhLyo4LDN-Fje_y9eKUwIZb5EaWBS4dMWZBCSd0B5KP0M4CHPM4H1P9e0R0YuwHzLqDeNYWminFru6DInpI65WgmWaPJj71qjMu3WyAU56BeppRHYXYx";

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Pickup");

  const getRestaurants = (cityName) => {
    const YELP_URL = `https://api.yelp.com/v3/businesses/search?term=restaurants&location=${cityName}`;

    const YELP_OPTIONS = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(YELP_URL, YELP_OPTIONS)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          activeTab == "Delivery"
            ? json.businesses.filter((business) =>
                business.transactions.includes(activeTab.toLowerCase())
              )
            : json.businesses
        )
      );
  };

  useEffect(() => {
    if (city.length === 0) {
      getRestaurants("San Francisco");
    } else {
      getRestaurants(city);
    }
  }, [city, activeTab]);

  return (
    <SafeAreaView>
      <View
        style={{
          paddingTop: 38,
          padding: 15,
          backgroundColor: "white",
        }}
      >
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab} />
        <SearchBar setCity={setCity} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Categories />
        <View style={{ paddingBottom: 170, flex: 1 }}>
          <RestaurantItems restaurantData={restaurantData} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
