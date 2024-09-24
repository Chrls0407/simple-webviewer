import React, { useState, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Share,
  Text,
} from "react-native";
import { WebView } from "react-native-webview";
import Ionicons from "@expo/vector-icons/Ionicons";
import HomePage from "./HomePage";

const WebBrowser = () => {
  const [url, setUrl] = useState("");
  const [loadUrl, setLoadUrl] = useState("");
  const webViewRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [isInputVisible, setInputVisible] = useState(true);

  // Used for HomePage same functio for handling url load but using onClick
  const handleOnClickSuggested = (suggestedUrl) => {
    const formattedUrl =
      !suggestedUrl.startsWith("http://") &&
      !suggestedUrl.startsWith("https://")
        ? "http://" + suggestedUrl
        : suggestedUrl;

    setLoadUrl(formattedUrl);
    setUrl(formattedUrl);
  };

  // function for handling url loading (on keyboardEnter)
  const handleLoadUrl = () => {
    const formattedUrl =
      !url.startsWith("http://") && !url.startsWith("https://")
        ? "http://" + url
        : url;

    setLoadUrl(formattedUrl);
    setUrl(formattedUrl);
  };

  // function to go back
  const handleBackPress = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      webViewRef.current.goBack();
    }
  };

  // function to go forward
  const handleForwardPress = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      webViewRef.current.goForward();
    }
  };

  // function to reload the page
  const handleReload = () => {
    webViewRef.current.reload();
  };

  // share url link fuction (I used the Share from react native)
  const shareUrl = async (urLink) => {
    try {
      await Share.share({
        message: `Check out this link: ${urLink}`,
        url: urLink,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  const handleNavigationStateChange = (navState) => {
    const { url } = navState;
    setUrl(url);
    if (currentIndex === -1 || history[currentIndex] !== url) {
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(url);
      setHistory(newHistory);
      setCurrentIndex(newHistory.length - 1);
    }
  };

  const handleScroll = () => {
    setInputVisible(false);
  };

  const handleLabelPress = () => {
    setInputVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={{ borderBottomWidth: 0.5 }}>
        {isInputVisible ? (
          <TextInput
            style={styles.input}
            placeholder="Enter website URL"
            placeholderTextColor="white"
            value={url}
            onChangeText={setUrl}
            onSubmitEditing={handleLoadUrl}
          />
        ) : (
          <TouchableOpacity onPress={handleLabelPress}>
            <Text style={styles.label}>{url || "Enter website URL"}</Text>
          </TouchableOpacity>
        )}
      </View>
      {loadUrl ? (
        <WebView
          ref={webViewRef}
          source={{ uri: loadUrl }}
          style={styles.webview}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          onNavigationStateChange={handleNavigationStateChange}
          onScroll={handleScroll}
        />
      ) : (
        <HomePage onSelectUrl={handleOnClickSuggested} />
      )}
      <View style={styles.controller}>
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.button}
          disabled={currentIndex <= 0}
        >
          <Ionicons
            name="arrow-back-outline"
            size={24}
            color={currentIndex <= 0 ? "gray" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleForwardPress}
          style={styles.button}
          disabled={currentIndex >= history.length - 1}
        >
          <Ionicons
            name="arrow-forward"
            size={24}
            color={currentIndex >= history.length - 1 ? "gray" : "white"}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleReload} style={styles.button}>
          <Ionicons name="refresh" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => shareUrl(url)}
          style={styles.button}
          disabled={!url}
        >
          <Ionicons
            name="share-social"
            size={24}
            color={!url ? "gray" : "white"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: "#151718",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingHorizontal: 8,
    margin: 10,
    borderRadius: 5,
    color: "white",
  },
  label: {
    height: 20,
    paddingHorizontal: 8,
    margin: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  webview: {
    flex: 1,
    color: "white",
  },
  controller: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    backgroundColor: "#151718",
    padding: 10,
  },
});

export default WebBrowser;
