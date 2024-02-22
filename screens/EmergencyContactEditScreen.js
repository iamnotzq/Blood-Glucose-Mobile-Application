import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import CommonLayout from "./CommonLayout";
import { commonStyles } from "../styles/commonStyles";
import InputBox from "../components/inputBox";
import TextButton from "../components/touchable/textButton";

const EmergencyContactEditScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const emergencyContactDetails = {
    firstName: "Jane",
    lastName: "Doe",
    email: "janedoe@email.com",
    contact: "12345678",
  };

  const handleClick = () => {};

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={commonStyles.mainContainer}>
        <View style={commonStyles.mainHeaderContainer}>
          <Text style={commonStyles.mainHeaderText}>
            Edit Emergency Contact
          </Text>
        </View>

        <View style={styles.mainComponent}>
          <View style={styles.componentRow}>
            <View></View>
            <Text style={[styles.inputHeader, { width: "30%" }]}>
              First Name
            </Text>

            <InputBox
              placeholder={emergencyContactDetails.firstName.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="65%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={[styles.inputHeader, { width: "30%" }]}>
              Last Name
            </Text>

            <InputBox
              placeholder={emergencyContactDetails.lastName.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="65%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={[styles.inputHeader, { width: "30%" }]}>Email</Text>

            <InputBox
              placeholder={emergencyContactDetails.email.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="65%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={[styles.inputHeader, { width: "30%" }]}>
              Contact Number
            </Text>

            <InputBox
              placeholder={emergencyContactDetails.contact.toString()}
              secureTextEntry={false}
              maybeHeight={40}
              width="65%"
            />
          </View>

          <TextButton
            text="Confirm"
            maybeButtonWidth="95%"
            onPress={handleClick}
          />
        </View>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default EmergencyContactEditScreen;

export const styles = StyleSheet.create({
  mainComponent: {
    height: "65%",
    width: "90%",
    padding: 16,
    borderWidth: 3,
    borderRadius: 16,
    borderColor: "#3B83D1",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  componentRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 4,
  },
  inputHeader: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "600",
  },
});
