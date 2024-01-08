import { SafeAreaView, Text, StyleSheet, View } from "react-native";
import CommonLayout from "./CommonLayout";
import ClickableText from "../components/touchable/clickableText";
import TextButton from "../components/touchable/textButton";

const HealthcareProviderScreen = ({ navigation, route }) => {
  const { id } = route.params;

  const healthcareProvider = "National University Hospital (NUH)";
  const healthcareProviderAddress = "5 Lower Kent Ridge Rd";
  const healthcareProviderContact = "69082222";
  const doctorName = "Sarah Lim";
  const doctorSpecialisation = "Endocrinologist";
  const doctorEmail = "sarahlim@doctor.com";

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainHeaderRow}>
          <Text style={styles.mainHeaderText}>Healthcare Provider</Text>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.cardHeader}>Dr {doctorName},</Text>
            <Text style={styles.cardSubHeader}>{healthcareProvider}</Text>

            <View style={styles.divider}></View>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Specialisation</Text>
            <Text style={styles.cardSubText}>{doctorSpecialisation}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Email</Text>
            <Text style={styles.cardSubText}>{doctorEmail}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Phone</Text>
            <Text style={styles.cardSubText}>{healthcareProviderContact}</Text>
          </View>

          <View style={styles.cardRow}>
            <Text style={styles.cardText}>Address</Text>
            <Text style={styles.cardSubText}>{healthcareProviderAddress}</Text>
          </View>

          <TextButton text={"Add/Edit Details"} maybeButtonWidth="80%" />
        </View>

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default HealthcareProviderScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    backgroundColor: "#E8EBF2",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  mainHeaderRow: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
  cardContainer: {
    height: "65%",
    width: "90%",
    borderRadius: 16,
    justifyContent: "space-between",
    alignItems: "center",
    borderColor: "#3B83D1",
    backgroundColor: "#FFFFFF",
    borderWidth: 3,
    padding: 16,
  },
  cardRow: {
    width: "90%",
    justifyContent: "space-between",
  },
  headerRow: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
  },
  cardHeader: {
    color: "#3B83D1",
    fontSize: 32,
    fontWeight: "700",
    textAlign: "center",
  },
  cardSubHeader: {
    color: "#3B83D1",
    fontSize: 18,
    fontWeight: "400",
    textAlign: "center",
  },
  cardText: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "400",
    width: "100%",
    opacity: 0.6,
  },
  cardSubText: {
    color: "#3B83D1",
    fontSize: 20,
    fontWeight: "800",
    width: "100%",
  },
  divider: {
    backgroundColor: "#3B83D1",
    width: "100%",
    height: 2,
    opacity: 0.5,
    marginTop: 10,
    borderRadius: 16,
  },
});
