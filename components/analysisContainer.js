import { View, StyleSheet, Text } from "react-native";
const AnalysisContainer = ({ header, text }) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>{header}</Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default AnalysisContainer;

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContainer: {
    height: 50,
    width: "90%",
    backgroundColor: "#ffffff",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderColor: "#3B83D1",
    borderWidth: 2,
    borderBottomWidth: 0,
  },
  header: {
    fontSize: 24,
    fontWeight: "800",
    color: "#3B83D1",
  },
  textContainer: {
    height: 110,
    width: "90%",
    backgroundColor: "#3B83D1",
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  text: {
    fontSize: 18,
    fontWeight: "600",
    color: "#ffffff",
  },
});
