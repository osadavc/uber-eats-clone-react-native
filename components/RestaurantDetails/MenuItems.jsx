import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Divider } from "react-native-elements";
import { useRoute } from "@react-navigation/core";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  menuContainer: {
    paddingBottom: 100,
  },
  divider: {
    marginHorizontal: 30,
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 17,
    marginVertical: 18,
  },
  foodInfo: {
    width: 240,
    justifyContent: "space-evenly",
  },
  foodTitle: {
    fontSize: 18,
    fontWeight: "600",
  },
  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

export default function MenuItems({ foods, hideCheckbox, marginLeft }) {
  const dispatch = useDispatch();
  const route = useRoute();

  const selectItem = (item, checkboxValue) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: route.params.name,
        checkboxValue: checkboxValue,
      },
    });
  };

  const cartItems = useSelector(
    (state) => state.cartReducer.selectedItems.items
  );

  const isFoodInTheCart = (food, cartItems) =>
    Boolean(cartItems.find((item) => item.title === food.title));

  return (
    <View showsVerticalScrollIndicator={false} style={styles.menuContainer}>
      {foods.map((item, index) => (
        <View key={index}>
          <View style={styles.menuItem}>
            {hideCheckbox ? null : (
              <>
                <BouncyCheckbox
                  iconStyle={{
                    borderColor: "lightgray",
                    borderRadius: 0,
                  }}
                  fillColor="green"
                  onPress={(checkboxValue) => selectItem(item, checkboxValue)}
                  isChecked={isFoodInTheCart(item, cartItems)}
                />
              </>
            )}
            <FoodInfo food={item} />
            <FoodImage food={item} marginLeft={marginLeft ? marginLeft : 0} />
          </View>
          <Divider width={0.5} orientation="vertical" style={styles.divider} />
        </View>
      ))}
    </View>
  );
}

const FoodInfo = ({ food }) => (
  <View style={styles.foodInfo}>
    <Text style={styles.title}>{food.title}</Text>
    <Text>{food.description}</Text>
    <Text>{food.price}</Text>
  </View>
);

const FoodImage = ({ food, marginLeft }) => (
  <Image
    source={{ uri: food.image }}
    style={[{ marginLeft: marginLeft }, styles.foodImage]}
  />
);
