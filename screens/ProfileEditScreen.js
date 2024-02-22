import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import CommonLayout from "./CommonLayout";
import { commonStyles } from "../styles/commonStyles";
import InputBox from "../components/inputBox";
import TextButton from "../components/touchable/textButton";

const ProfileEditScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [profileDetails, setProfileDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  console.log(`Retrieving ProfileAssets for: ${id}`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/profile/${id}`);
        const assets = await response.json();
        setLoading(false);
        setAssets(assets);
      } catch (error) {
        console.error("Error fetching profile assets: ", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  const handleClick = () => {
    navigation.navigate("Settings");
  };

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={commonStyles.mainContainer}>
        <View style={commonStyles.mainHeaderContainer}>
          <Text style={commonStyles.mainHeaderText}>Edit Profile</Text>
        </View>

        <View style={styles.mainComponent}>
          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>First Name</Text>

            <InputBox
              placeholder={profileDetails.firstName}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Last Name</Text>

            <InputBox
              placeholder={profileDetails.lastName}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Age</Text>

            <InputBox
              placeholder={profileDetails.age}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Gender</Text>

            <InputBox
              placeholder={profileDetails.gender}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Height</Text>

            <InputBox
              placeholder={profileDetails.heightCm}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
            />
          </View>

          <View style={styles.componentRow}>
            <View></View>
            <Text style={styles.inputHeader}>Weight</Text>

            <InputBox
              placeholder={profileDetails.weightKg}
              secureTextEntry={false}
              maybeHeight={40}
              width="45%"
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

export default ProfileEditScreen;

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
