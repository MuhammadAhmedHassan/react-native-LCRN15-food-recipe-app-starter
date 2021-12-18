import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
  ImageBackground,
} from "react-native";
import { BlurView } from "@react-native-community/blur";

import { SIZES, FONTS, COLORS, icons } from "../constants";

const HEADER_HEIGHT = 350;

const Recipe = ({ navigation, route }) => {
  const { recipe } = route.params;
  const scrollY = useRef(new Animated.Value(0)).current;

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={[
          ...recipe?.ingredients,
          ...recipe?.ingredients,
          ...recipe?.ingredients,
        ]}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            <Header recipe={recipe} scrollY={scrollY} />
            {/* Info */}
            <RecipeInfo recipe={recipe} />
            {/* Ingredient Title */}
            <IngredientHeader recipe={recipe} />
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => <RenderItem ingredients={item} />}
        ListFooterComponent={<View style={{ marginBottom: 100 }} />}
      />

      <HeaderBar navigation={navigation} recipe={recipe} scrollY={scrollY} />
    </View>
  );
};

export default Recipe;

function IngredientHeader({ recipe }) {
  const totalIngredients = recipe?.ingredients?.length || 0;
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 30,
        marginTop: SIZES.radius,
        marginBottom: SIZES.padding,
      }}
    >
      <Text style={{ flex: 1, ...FONTS.h3 }}>Ingredients</Text>
      <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
        {totalIngredients} items
      </Text>
    </View>
  );
}

function RecipeInfo({ recipe }) {
  const { name, duration, serving, viewers } = recipe;
  return (
    <View
      style={{
        flexDirection: "row",
        height: 130,
        width: SIZES.width,
        paddingHorizontal: 30,
        paddingVertical: 20,
        alignItems: "center",
      }}
    >
      {/* Recipe */}
      <View style={{ flex: 1.5, justifyContent: "center" }}>
        <Text style={FONTS.h2}>{name}</Text>
        <Text
          style={{
            marginTop: 5,
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          {duration} | {serving} Serving
        </Text>
      </View>
      {/* Viewers */}
      <View style={{ flex: 1, justifyContent: "center" }}>
        <Viewers viewersList={viewers} />
      </View>
    </View>
  );
}

function Viewers({ viewersList = [] }) {
  const length = viewersList?.length;
  const isMoreThan4Viewers = length > 4;

  const renderImages = () => {
    const viewers = isMoreThan4Viewers ? viewersList.slice(0, 4) : viewersList;
    const counterStyles = isMoreThan4Viewers
      ? {
          height: 50,
          width: 50,
          alignItems: "center",
          justifyContent: "center",
          marginLeft: -20,
          borderRadius: 25,
          backgroundColor: COLORS.darkGreen,
        }
      : {};

    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        {viewers?.map((item, index) => {
          const showCounterCircle = isMoreThan4Viewers && index === 3;
          const showCounterCircleStyles = showCounterCircle
            ? counterStyles
            : {};

          return (
            <View
              key={index}
              style={{
                height: 50,
                width: 50,
                marginLeft: index === 0 ? 0 : -20,
                ...showCounterCircleStyles,
              }}
            >
              {showCounterCircle ? (
                <Text
                  style={{
                    color: COLORS.white,
                    ...FONTS.body4,
                  }}
                >
                  {length - 3}+
                </Text>
              ) : (
                <Image
                  source={item.profilePic}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              )}
            </View>
          );
        })}
      </View>
    );
  };

  const renderText = (text) => (
    <Text
      style={{
        color: COLORS.lightGray2,
        textAlign: "right",
        ...FONTS.body4,
        lineHeight: 18,
      }}
    >
      {text}
    </Text>
  );

  if (length === 0) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center" }}>
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          Be the first one to try this
        </Text>
      </View>
    );
  }
  if (length <= 4) {
    return (
      <View>
        {/* Profile */}
        {renderImages()}
        {/* Text */}
        {renderText(`${length} people`)}
        {renderText(`Already try this!`)}
      </View>
    );
  }
  return (
    <View>
      {/* Profile */}
      {renderImages()}
      {/* Text */}
      {renderText(`${length} people`)}
      {renderText(`Already try this!`)}
    </View>
  );
}

function HeaderBar({ recipe, navigation, scrollY }) {
  return (
    <View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: 90,
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        paddingHorizontal: SIZES.padding,
        paddingBottom: 10,
      }}
    >
      {/* Screen Overlay */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: COLORS.black,
          opacity: scrollY.interpolate({
            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
            outputRange: [0, 1],
          }),
        }}
      />

      {/* Header Bar title */}
      <Animated.View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          alignItems: "center",
          justifyContent: "flex-end",
          paddingBottom: 10,
          opacity: scrollY.interpolate({
            inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
            outputRange: [0, 1],
          }),
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                outputRange: [50, 0],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
          Recipe by:
        </Text>
        <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>
          {recipe?.author?.name}
        </Text>
      </Animated.View>

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 35,
          width: 35,
          borderRadius: 18,
          borderWidth: 1,
          borderColor: COLORS.lightGray,
          backgroundColor: COLORS.transparentBlack5,
        }}
      >
        <Image
          source={icons.back}
          style={{ width: 15, height: 15, tintColor: COLORS.lightGray }}
        />
      </TouchableOpacity>
      {/* Bookmark Button */}
      <TouchableOpacity
        onPress={() => {}}
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 35,
          width: 35,
        }}
      >
        <Image
          source={recipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark}
          style={{ width: 30, height: 30, tintColor: COLORS.darkGreen }}
        />
      </TouchableOpacity>
    </View>
  );
}

function RenderItem({ ingredients }) {
  const { icon, quantity, description } = ingredients;
  return (
    <View
      style={{
        flexDirection: "row",
        paddingHorizontal: 30,
        marginVertical: 5,
      }}
    >
      {/* icon */}
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 50,
          width: 50,
          borderRadius: 5,
          backgroundColor: COLORS.lightGray,
        }}
      >
        <Image source={icon} style={{ height: 40, width: 40 }} />
      </View>
      {/* description */}
      <View
        style={{
          flex: 1,
          paddingHorizontal: 20,
          justifyContent: "center",
        }}
      >
        <Text style={FONTS.body3}>{description}</Text>
      </View>
      {/* quantity */}
      <View
        style={{
          alignItems: "flex-end",
          justifyContent: "center",
        }}
      >
        <Text style={FONTS.body3}>{quantity}</Text>
      </View>
    </View>
  );
}

function Header({ recipe, scrollY }) {
  const { image } = recipe;
  return (
    <View
      style={{
        marginTop: -1000, // only for animation
        paddingTop: 1000, // only for animation
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Background image */}
      <Animated.Image
        source={image}
        resizeMode='contain'
        style={{
          height: HEADER_HEIGHT,
          width: "200%",
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
              }),
            },
            {
              scale: scrollY.interpolate({
                inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                outputRange: [2, 1, 0.75],
              }),
            },
          ],
        }}
      />
      {/* Recipe Creator Card */}
      <Animated.View
        style={{
          position: "absolute",
          bottom: 10,
          left: 30,
          right: 30,
          height: 80,
          transform: [
            {
              translateY: scrollY.interpolate({
                inputRange: [0, 170, 250],
                outputRange: [0, 0, 100],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
      >
        <RecipeCreatorCardInfo recipe={recipe} />
      </Animated.View>
    </View>
  );
}

function RecipeCreatorCardInfo({ recipe }) {
  if (Platform.OS === "ios")
    return (
      <BlurView
        style={{
          flex: 1,
          borderRadius: SIZES.radius,
        }}
        blurType='dark'
      >
        <RecipeCreatorCardDetail recipe={recipe} />
      </BlurView>
    );
  return (
    <View
      style={{
        flex: 1,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.transparentBlack9,
      }}
      blurType='dark'
    >
      <RecipeCreatorCardDetail recipe={recipe} />
    </View>
  );
}

function RecipeCreatorCardDetail({ recipe }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      {/* Image */}
      <View style={{ marginLeft: 20 }}>
        <Image
          source={recipe?.author?.profilePic}
          resizeMode='cover'
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
        />
      </View>
      {/* Description */}
      <View style={{ flex: 1, marginHorizontal: 20 }}>
        <Text
          style={{
            color: COLORS.lightGray2,
            ...FONTS.body4,
          }}
        >
          Recipe by:
        </Text>
        <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>
          {recipe?.author?.name}
        </Text>
      </View>
      {/* Button */}
      <TouchableOpacity
        style={{
          width: 30,
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          marginRight: 20,
          borderRadius: 5,
          borderWidth: 1,
          borderColor: COLORS.lightGreen1,
        }}
        onPress={() => console.log("View profile")}
      >
        <Image
          source={icons.rightArrow}
          style={{ width: 15, height: 15, tintColor: COLORS.lightGreen1 }}
        />
      </TouchableOpacity>
    </View>
  );
}
