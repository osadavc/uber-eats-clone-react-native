import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SkeletonContent from "react-native-skeleton-content";

export default function RestaurantItems({ restaurantData, isLoading }) {
  const navigation = useNavigation();

  return (
    <View>
      {restaurantData?.map((item, index) => (
        <TouchableOpacity
          activeOpacity={1}
          style={{ marginBottom: 10 }}
          key={index}
          onPress={() => {
            navigation.navigate("RestaurantDetail", {
              name: item.name,
              image: item.image_url,
              price: item.price,
              reviews: item.review_count,
              rating: item.rating,
              categories: item.categories,
            });
          }}
        >
          <SkeletonContent
            containerStyle={{
              width: "100%",
              padding: isLoading ? 17 : 0,
              flex: 1,
            }}
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
            <View
              style={{ marginTop: 5, padding: 15, backgroundColor: "white" }}
            >
              <RestaurantImage image={item.image_url} />
              <RestaurantInfo name={item.name} rating={item.rating} />
            </View>
          </SkeletonContent>
        </TouchableOpacity>
      ))}
    </View>
  );
}

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
        style={{ width: "100%", height: 200, borderRadius: 13 }}
      />
      <TouchableOpacity style={{ position: "absolute", right: 20, top: 20 }}>
        <MaterialCommunityIcons name="heart-outline" size={25} color="white" />
      </TouchableOpacity>
    </>
  );
};

const RestaurantInfo = (props) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginTop: 10,
    }}
  >
    <View>
      <Text style={{ fontSize: 15, fontWeight: "bold" }}>{props.name}</Text>
      <Text style={{ fontSize: 13, color: "gray" }}>30-45 • min</Text>
    </View>
    <View
      style={{
        backgroundColor: "#eee",
        height: 30,
        width: 30,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 15,
      }}
    >
      <Text>{props.rating}</Text>
    </View>
  </View>
);
