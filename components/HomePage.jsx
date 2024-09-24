import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

const sampleUrls = [
  {
    id: "1",
    url: "https://youtube.com/",
    image: require("../assets/youtubeLogo.webp"),
    label: "Youtube",
  },
  {
    id: "2",
    url: "https://apple.com/",
    image: require("../assets/appleLogo.jpg"),
    label: "Apple",
  },
  {
    id: "3",
    url: "https://www.google.com/",
    image: require("../assets/googleLogo.webp"),
    label: "Google",
  },
  {
    id: "4",
    url: "https://www.github.com/",
    image: require("../assets/githubLogo.png"),
    label: "Github",
  },
];

const HomePage = ({ onSelectUrl }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => onSelectUrl(item.url)} style={styles.item}>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemText}>{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.homeContainer}>
      <Text style={styles.title}>Sample URLs</Text>
      <View>
        <FlatList
          data={sampleUrls}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          horizontal // Render items in a row
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    padding: 4,
  },
  title: {
    fontSize: 24,
    paddingHorizontal: 10,
    fontWeight: "600",
    marginBottom: 10,
    color: "white",
  },
  item: {
    flexDirection: "column", // Stack image and text vertically
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    backgroundColor: "white",
    marginHorizontal: 5,
    borderRadius: 5,
    width: 90, // Set a fixed width for each box
    elevation: 2, // For Android shadow
    shadowColor: "gray", // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginBottom: 50,
  },
  image: {
    width: 50, // Set the width of the image
    height: 50, // Set the height of the image
    marginBottom: 5,
  },
  itemText: {
    fontSize: 14,

    textAlign: "center",
  },
});
