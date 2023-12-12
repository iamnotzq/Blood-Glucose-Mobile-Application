import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import CalorieContainer from "../components/calorieContainer";
import GlucoseContainer from "../components/glucoseContainer";
import CommonLayout from "./CommonLayout";

const DashboardScreen = ({ navigation }) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/dashboard");
        const data = await response.json();
        setDashboardData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Text>Loading</Text>;
  }

  console.log(dashboardData);
  const calorieDisplayAssets = dashboardData?.calorieDisplayAssets || {};
  console.log(calorieDisplayAssets);
  const bloodGlucoseDisplayAssets =
    dashboardData?.bloodGlucoseDisplayAssets || {};
  console.log(bloodGlucoseDisplayAssets);

  return (
    <CommonLayout navigation={navigation}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.componentsContainer}>
          <View>
            <TouchableOpacity style={styles.component}>
              {calorieDisplayAssets && (
                <CalorieContainer data={calorieDisplayAssets} />
              )}
            </TouchableOpacity>

            <View style={{ margin: 20 }}></View>

            <TouchableOpacity style={styles.component}>
              {bloodGlucoseDisplayAssets && (
                <GlucoseContainer data={bloodGlucoseDisplayAssets} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E8EBF2",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  headerText: {
    marginTop: 16,
    marginLeft: 32,
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "500",
  },
  componentsContainer: {
    paddingHorizontal: 48,
    justifyContent: "",
    alignItems: "center",
    flexGrow: 1,
  },
  component: {
    shadowColor: "black",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 4 },
  },
  containerText: {
    color: "#F8F9FB",
    fontSize: 12,
    fontWeight: "500",
  },
});
