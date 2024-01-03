import React, { useState } from "react";
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from "react-native";

const Header = ({ handleHeaderPress }) => {
  const [selectedHeader, setSelectedHeader] = useState("Day");

  const headers = ["Day", "Week", "Month"];

  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={headers}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.headerTextContainer,
              selectedHeader === item && styles.highlightedHeaderTextContainer,
            ]}
            onPress={() => {
              setSelectedHeader(item);
              handleHeaderPress(item);
            }}
          >
            <Text
              style={[
                styles.headerText,
                selectedHeader === item && styles.highlightedHeaderText,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.headerContainer}
        style={{ height: 40 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
  },
  headerContainer: {
    justifyContent: "space-evenly",
  },
  headerTextContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
    backgroundColor: "#E8EBF2",
    marginHorizontal: 10,
  },
  highlightedHeaderTextContainer: {
    backgroundColor: "#3B83D1",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 16,
  },
  headerText: {
    color: "#9CC0E8",
    fontSize: 16,
    fontWeight: "700",
  },
  highlightedHeaderText: {
    color: "#ffffff",
  },
});

export default Header;
