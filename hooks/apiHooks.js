import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

export const getMedicationList = (id, navigation) => {
  const [medicationList, setMedicationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/medication/get-medication-list/${id}`
      );

      const data = await response.json();
      setMedicationList(data);
    } catch (error) {
      console.error("Error fetching medication list: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const focusListener = navigation.addListener("focus", fetchData);

    return () => {
      focusListener();
    };
  }, [navigation, fetchData]);

  return { medicationList, loading, error, refresh: fetchData };
};

export const updateMedicationList = async (id, medicationData, navigation) => {
  const { medicationName, dosageLevel, timeValue } = medicationData;

  if (!medicationName || !dosageLevel || !timeValue) {
    Alert.alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8000/api/medication/update-medication-list/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          medicationName,
          dosage: dosageLevel,
          time: timeValue,
        }),
      }
    );

    if (response.ok) {
      console.log(`Input valid`);
      Alert.alert("Medication added successfully!");
      await navigation.navigate("Medication", { id });
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};
