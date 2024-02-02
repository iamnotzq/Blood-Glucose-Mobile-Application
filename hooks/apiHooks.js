import { useState, useEffect, useCallback } from "react";
import { Alert } from "react-native";

export const getDashboardAssets = (id, navigation) => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/dashboard/${id}`);
      const data = await response.json();
      setDashboardData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError(error);
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

  return { dashboardData, loading, error, refresh: fetchData };
};

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

export const addMedication = async (id, medicationData, navigation) => {
  const { medicationName, dosageLevel, timeValue } = medicationData;

  if (!medicationName || !dosageLevel || !timeValue) {
    Alert.alert("Please fill in all fields");
    return;
  }

  try {
    const response = await fetch(
      `http://localhost:8000/api/medication/add-medication/${id}`,
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

export const updateMedicationDetails = async (
  id,
  medicationDetails,
  navigation
) => {
  const {
    originalMedicationName,
    editedMedicationName,
    editedDosage,
    editedTime,
  } = medicationDetails;

  try {
    const response = await fetch(
      `http://localhost:8000/api/medication/update-medication-details/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalMedicationName: originalMedicationName,
          editedMedicationName: editedMedicationName,
          editedDosage: editedDosage,
          editedTime: editedTime,
        }),
      }
    );

    if (response.ok) {
      console.log(`Add update medication input valid`);
      await navigation.navigate("Medication", { id });

      Alert.alert(`Medication details updated!`);
    }
  } catch (error) {
    console.error(`Error: ${error}`);
  }
};

export const fetchTodaysBloodGlucoseRecords = (id, navigation) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/glucose/get-todays-records/${id}`
      );

      const data = await response.json();
      const records = data.records;
      setRecords(records);
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

  return { records, loading, error, refresh: fetchData };
};
