import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SkeletonContent from "react-native-skeleton-content";

const styles = StyleSheet.create({
  restaurantItem: {
    marginBottom: 10,
  },
  skeletonContent: {
    width: "100%",
    flex: 1,
  },
  restaurantDetail: {
    marginTop: 5,
    padding: 15,
    backgroundColor: "white",
  },
  restaurantImage: {
    width: "100%",
    height: 200,
    borderRadius: 13,
  },
  heartIcon: {
    position: "absolute",
    right: 20,
    top: 20,
  },
  restaurantInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  restaurantName: {
    fontSize: 15,
    fontFamily: "NunitoBold",
  },
  restaurantTime: {
    fontSize: 13,
    color: "gray",
    fontFamily: "Nunito",
  },
  restaurantRating: {
    backgroundColor: "#eee",
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 15,
    fontFamily: "Nunito",
  },
});

const RestaurantItems = ({ restaurantData, isLoading }) => {
  const navigation = useNavigation();

  return (
    <View>
      {restaurantData?.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.restaurantItem}
          key={index}
          onPress={() => {
            navigation.navigate("RestaurantDetail", item);
          }}
        >
          <SkeletonContent
            containerStyle={[
              { padding: isLoading ? 17 : 0 },
              styles.skeletonContent,
            ]}
            boneColor="#fff"
            highlightColor="#eee"
            isLoading={isLoading}
            layout={[
              {
                key: "image",
                width: "100%",
                height: 200,
                marginBottom: 6,
                borderRadius: 12,
              },
              {
                key: "title",
                width: 180,
                height: 20,
                marginBottom: 6,
                borderRadius: 5,
              },
              {
                key: "time",
                width: 100,
                height: 20,
                marginBottom: 6,
                borderRadius: 5,
              },
            ]}
          >
            <View style={styles.restaurantDetail}>
              <RestaurantImage image={item.image_url} />
              <RestaurantInfo name={item.name} rating={item.rating} />
            </View>
          </SkeletonContent>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const RestaurantImage = ({ image }) => {
  return (
    <>
      <Image
        source={{
          uri: image
            ? image
            : "https://s3-media1.fl.yelpcdn.com/bphoto/AGu7rGRHHyxxNUVBy-nGCg/o.jpg",
        }}
        resizeMode={"cover"}
        style={styles.restaurantImage}
      />
      <TouchableOpacity style={styles.heartIcon}>
        <MaterialCommunityIcons name="heart-outline" size={25} color="white" />
      </TouchableOpacity>
    </>
  );
};

const RestaurantInfo = (props) => (
  <View style={styles.restaurantInfo}>
    <View>
      <Text style={styles.restaurantName}>{props.name}</Text>
      <Text style={styles.restaurantTime}>30-45 • min</Text>
    </View>
    <View style={styles.restaurantRating}>
      <Text>{props.rating}</Text>
    </View>
  </View>
);

export default RestaurantItems;
