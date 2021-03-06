import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";

import { COLORS, FONTS, SIZES } from "../constants";

const CategoryCard = ({ containerStyle, categoryItem, onPress }) => {
  const { name, image, duration, serving } = categoryItem;
  return (
    <TouchableOpacity
      style={{
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        marginTop: 10,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.gray2,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={image}
        resizeMode='cover'
        style={{ width: 100, height: 100, borderRadius: SIZES.radius }}
      />
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h2 }}>{name}</Text>
        <Text
          style={{
            color: COLORS.gray,
            ...FONTS.body4,
          }}
        >
          {duration} | {serving} serving
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CategoryCard;
