import React, { useState, useEffect } from "react";
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

const BloodGlucoseChartScreen = ({ navigation, route }) => {
  const highlightedColor = "#3B83D1";
  const unhighlightedColor = "#9CC0E8";

  const [selectedBarIndex, setSelectedBarIndex] = useState(4);
  const [selectedData, setSelectedData] = useState(dayBarData);

  useEffect(() => {
    setSelectedData(dayBarData);
  }, []);

  const handleBarPress = (index) => {
    setSelectedBarIndex(index);
  };

  const handleHeaderPress = (header) => {
    switch (header) {
      case "Week":
        setSelectedData(weekBarData);
        break;
      case "Month":
        setSelectedData(monthBarData);
        break;
      default:
        setSelectedData(dayBarData);
    }
  };

  const dayBarData = [
    {
      index: 0,
      value: 130,
      spacing: 40,
      label: "7am",
      frontColor:
        selectedBarIndex === 0 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 1,
      value: 125,
      spacing: 40,
      label: "9am",
      frontColor:
        selectedBarIndex === 1 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 2,
      value: 100,
      spacing: 40,
      label: "12pm",
      frontColor:
        selectedBarIndex === 2 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 3,
      value: 127,
      spacing: 40,
      label: "3am",
      frontColor:
        selectedBarIndex === 3 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 4,
      value: 122,
      spacing: 40,
      label: "Now",
      frontColor:
        selectedBarIndex === 4 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
  ];

  const weekBarData = [
    {
      index: 0,
      value: 100,
      spacing: 40,
      label: "M",
      frontColor:
        selectedBarIndex === 0 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 1,
      value: 90,
      spacing: 40,
      label: "T",
      frontColor:
        selectedBarIndex === 1 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 2,
      value: 110,
      spacing: 40,
      label: "W",
      frontColor:
        selectedBarIndex === 2 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 3,
      value: 115,
      spacing: 40,
      label: "T",
      frontColor:
        selectedBarIndex === 3 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 4,
      value: 127,
      spacing: 40,
      label: "Now",
      frontColor:
        selectedBarIndex === 4 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
  ];

  const monthBarData = [
    {
      index: 0,
      value: 130,
      spacing: 40,
      label: "Jan",
      frontColor:
        selectedBarIndex === 0 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 1,
      value: 125,
      spacing: 40,
      label: "Feb",
      frontColor:
        selectedBarIndex === 1 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 2,
      value: 122,
      spacing: 40,
      label: "Mar",
      frontColor:
        selectedBarIndex === 2 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 3,
      value: 117,
      spacing: 40,
      label: "Apr",
      frontColor:
        selectedBarIndex === 3 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
    {
      index: 4,
      value: 133,
      spacing: 40,
      label: "Now",
      frontColor:
        selectedBarIndex === 4 ? highlightedColor : unhighlightedColor,
      labelTextStyle: { color: "#3B83D1", fontWeight: 700 },
      onPress: handleBarPress,
    },
  ];

  return (
    <CommonLayout navigation={navigation}>
      <SafeAreaView style={styles.mainContainer}>
        <Header handleHeaderPress={handleHeaderPress} />
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
          <Text style={styles.analysisText}>
            Blood glucose levels indicate potential Hypoglycaemia. Click here
            for detailed analysis
          </Text>
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
    height: 100,
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
