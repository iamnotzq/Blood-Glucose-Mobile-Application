import { SafeAreaView, View } from "react-native";
import Footer from "../navigation/Footer";

const CommonLayout = ({ children, navigation, id }) => {
  return (
    <SafeAreaView
      style={{ flex: 1, width: "100%", backgroundColor: "#E8EBF2" }}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {children}
        <Footer navigation={navigation} id={id} />
      </View>
    </SafeAreaView>
  );
};

export default CommonLayout;
