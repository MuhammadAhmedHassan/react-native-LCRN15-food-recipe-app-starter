import React from "react";
import {
  View,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";

import { FONTS, COLORS, SIZES, icons, images, dummyData } from "../constants";
import { CategoryCard, TrendingCard } from "../components";

const Home = ({ navigation }) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <FlatList
        data={dummyData.categories}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode='on-drag'
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <View style={{ marginHorizontal: SIZES.padding }}>
              {/* Headers */}
              <Header />
              {/* Search Bar */}
              <SearchBar />
              {/* See Recipe Card */}
              <SeeRecipeCard />
              {/* Trending Section */}
              <TrendingSection navigation={navigation} />
              {/* Category Header */}
              <CategoryHeader />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <CategoryCard
            categoryItem={item}
            containerStyle={{
              marginHorizontal: SIZES.padding,
            }}
            onPress={() => navigation.navigate("Recipe", { recipe: item })}
          />
        )}
        ListFooterComponent={<View style={{ marginBottom: 100 }} />}
      />
    </SafeAreaView>
  );
};

export default Home;

function Header() {
  return (
    <View
      style={{
        flexDirection: "row",
        // marginHorizontal: SIZES.padding,
        alignItems: "center",
        height: 80,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ color: COLORS.darkGreen, ...FONTS.h2 }}>
          Hello Luis,
        </Text>
        <Text style={{ marginTop: 3, color: COLORS.gray, ...FONTS.bod3 }}>
          What you want to cook today?
        </Text>
      </View>
      <TouchableOpacity onPress={() => console.log("profile")}>
        <Image
          source={images.profile}
          style={{
            height: 40,
            width: 40,
            borderRadius: 20,
          }}
          resizeMode='cover'
        />
      </TouchableOpacity>
    </View>
  );
}

function SearchBar() {
  return (
    <View
      style={{
        flexDirection: "row",
        height: 50,
        alignItems: "center",
        // marginHorizontal: SIZES.padding,
        paddingHorizontal: SIZES.radius,
        borderRadius: 10,
        backgroundColor: COLORS.lightGray,
      }}
    >
      <Image
        source={icons.search}
        style={{ width: 20, height: 20, tintColor: COLORS.gray }}
      />
      <TextInput
        style={{
          marginLeft: SIZES.radius,
          ...FONTS.body3,
        }}
        placeholderTextColor={COLORS.gray}
        placeholder='Search Recipes'
      />
    </View>
  );
}

function SeeRecipeCard() {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: SIZES.padding,
        // marginHorizontal: SIZES.padding,
        borderRadius: 10,
        backgroundColor: COLORS.lightGreen,
      }}
    >
      {/* Image */}
      <View
        style={{
          width: 100,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image source={images.recipe} style={{ width: 80, height: 80 }} />
      </View>
      {/* Text */}
      <View
        style={{
          flex: 1,
          paddingVertical: SIZES.radius,
        }}
      >
        <Text style={FONTS.body4}>
          You have 12 recipes that you haven't tried yet
        </Text>
        <TouchableOpacity
          style={{ marginTop: 10 }}
          onPress={() => console.log("see recipes")}
        >
          <Text
            style={{
              color: COLORS.darkGreen,
              textDecorationLine: "underline",
              ...FONTS.h4,
            }}
          >
            See Recipes
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function TrendingSection({ navigation }) {
  return (
    <View style={{ marginTop: SIZES.padding }}>
      <Text style={FONTS.h2}>Trending Recipe</Text>
      <FlatList
        data={dummyData.trendingRecipes}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => `${item.id}`}
        keyboardDismissMode='on-drag'
        renderItem={({ item, index }) => (
          <TrendingCard
            containerStyle={{}}
            recipeItem={item}
            onPress={() => navigation.navigate("Recipe", { recipe: item })}
          />
        )}
      />
    </View>
  );
}

function CategoryHeader() {
  return (
    <View
      style={{
        flexDirection: "row",
        marginTop: 20,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Text style={FONTS.h2}>Categories</Text>
      <TouchableOpacity>
        <Text style={{ color: COLORS.gray, ...FONTS.body4 }}>View All</Text>
      </TouchableOpacity>
    </View>
  );
}
