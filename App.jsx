// App.js
import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import WebBrowser from "./components/WebBrowser";

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WebBrowser />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
