import React, { useState, useEffect, useCallback } from "react";
import { BarChart } from "react-native-gifted-charts";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
} from "react-native";
import CommonLayout from "../CommonLayout";
import Header from "../../navigation/Header";
import { bloodGlucoseChartTexts } from "../../data";
import Spinner from "../../components/spinner";

const BloodGlucoseChartScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const headers = ["Day", "Week", "Month"];
  const highlightedColor = "#3B83D1";
  const [assets, setAssets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedData, setSelectedData] = useState(dayBarData);
  const [selectedText, setSelectedText] = useState(
    "Blood glucose levels indicate potential Hypoglycaemia. Click here for detailed analysis"
  );

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/glucose/get-chart-data/${id}`
      );
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

  const dayIndex = assets?.daily.index || 0;
  const weekIndex = assets?.weekly.index || 0;
  const monthIndex = assets?.monthly.index || 0;

  useEffect(() => {
    if (assets) {
      setSelectedData(dayBarData);
      setSelectedText(bloodGlucoseChartTexts[0]);
    }
  }, [assets]);

  useEffect(() => {
    setSelectedData(dayBarData);
    setSelectedText(bloodGlucoseChartTexts[0]);
  }, []);

  const handleHeaderPress = (header) => {
    switch (header) {
      case "Week":
        setSelectedData(weekBarData);
        setSelectedText(bloodGlucoseChartTexts[weekIndex]);
        break;
      case "Month":
        setSelectedData(monthBarData);
        setSelectedText(bloodGlucoseChartTexts[monthIndex]);
        break;
      default:
        setSelectedData(dayBarData);
        setSelectedText(bloodGlucoseChartTexts[dayIndex]);
    }
  };

  const generateBarData = (data) => {
    return data.map((item, index) => ({
      index,
      value: item.glucoseLevel,
      spacing: 40,
      label: item.dayString,
      frontColor: highlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
    }));
  };

  const dayBarData = generateBarData(assets?.daily.array || []);
  const weekBarData = generateBarData(assets?.weekly.array || []);
  const monthBarData = generateBarData(assets?.monthly.array || []);

  console.log(dayIndex);
  console.log(weekIndex);
  console.log(monthIndex);

  if (loading) {
    return <Spinner />;
  }

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <Header handleHeaderPress={handleHeaderPress} headers={headers} />
        <BarChart
          height={300}
          barWidth={28}
          barBorderTopLeftRadius={16}
          barBorderTopRightRadius={16}
          maxValue={150}
          hideAxesAndRules
          yAxisThickness={0}
          noOfSections={2}
          xAxisThickness={0}
          data={selectedData}
          scrollAnimation={true}
          isAnimated={true}
        />

        <TouchableOpacity style={styles.analysisContainer}>
          <Text style={styles.analysisText}>{selectedText}</Text>
        </TouchableOpacity>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default BloodGlucoseChartScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  analysisContainer: {
    width: 300,
    height: 150,
    backgroundColor: "#ffffff",
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "#9CC0E8",
    justifyContent: "center",
    alignItems: "center",
  },
  analysisText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B83D1",
    paddingHorizontal: 20,
  },
});
