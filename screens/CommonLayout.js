import { SafeAreaView, View } from "react-native";
import Footer from "../navigation/Footer";

const CommonLayout = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1, width: "100%" }}>
      <View style={{flex:1, justifyContent: "center", alignItems:"center"}}>
        {children}
        <Footer />
      </View>
    </SafeAreaView>
  );
};

export default CommonLayout;
