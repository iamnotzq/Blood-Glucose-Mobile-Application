import React, { useState, useEffect, useCallback } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import CommonLayout from "./CommonLayout";
import AnalysisContainer from "../components/analysisContainer";
import { caloricProgressTexts } from "../data";
import { bloodGlucoseTexts } from "../data";
import TextButton from "../components/touchable/textButton";

const AnalysisScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [assets, setAssets] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(`Retrieving AnalysisAssets from ${id}`);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/analysis/${id}`);
      const data = await response.json();
      setAssets(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching analysis assets:", error);
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", () => {
      fetchData();
    });

    return () => {
      focusListener();
    };
  }, [navigation, fetchData]);

  if (loading) {
    return <Text>Loading</Text>;
  }

  const calorieRangeIndex = assets?.caloricRangeIndex;
  const bloodGlucoseRangeIndex = assets?.bloodGlucoseRangeIndex;

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainHeaderContainer}>
          <Text style={styles.mainHeaderText}>Analysis</Text>
        </View>

        <AnalysisContainer
          header="Caloric Progress"
          text={caloricProgressTexts[calorieRangeIndex]}
        />
        <AnalysisContainer
          header="Blood Glucose"
          text={bloodGlucoseTexts[bloodGlucoseRangeIndex]}
        />

        <TextButton text="Send email" maybeButtonWidth="50%" />

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default AnalysisScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  mainHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
});
