import { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from "react-native";
import CommonLayout from "./CommonLayout";
import Header from "../navigation/Header";

const Hyperglycemia = () => {
  return (
    <View style={styles.scrollStyle}>
      <ScrollView>
        <Text style={styles.paragraphHeader}>
          Introduction to Hyperglycemia
        </Text>
        <View style={styles.divider}></View>
        <Text style={styles.paragraphText}>
          Hyperglycemia refers to elevated levels of glucose (sugar) in the
          blood, often associated with diabetes mellitus. It occurs when the
          body cannot effectively use or produce insulin, the hormone
          responsible for regulating blood sugar levels. Persistent
          hyperglycemia can lead to various complications, including damage to
          the eyes, kidneys, nerves, and cardiovascular system. Recognizing the
          symptoms of hyperglycemia is crucial for effective management. Common
          signs include excessive thirst, frequent urination, fatigue, blurred
          vision, and slow wound healing.
        </Text>

        <Text></Text>

        <Text style={styles.paragraphHeader}>Management Strategies</Text>
        <View style={styles.divider}></View>
        <Text style={styles.paragraphText}>
          To manage hyperglycemia, individuals with diabetes should focus on
          adopting a comprehensive approach that encompasses lifestyle
          modifications, medication adherence, and regular monitoring. Lifestyle
          changes may involve adopting a well-balanced diet that is low in
          refined sugars and carbohydrates, engaging in regular physical
          activity, and maintaining a healthy weight. Medications such as
          insulin or oral hypoglycemic agents may be prescribed by healthcare
          professionals to help regulate blood sugar levels. Regular monitoring
          of blood glucose levels is essential, and individuals should work
          closely with their healthcare team to adjust their treatment plan as
          needed.
        </Text>

        <Text></Text>

        <Text style={styles.paragraphHeader}>Emergency Situations</Text>
        <View style={styles.divider}></View>
        <Text style={styles.paragraphText}>
          Emergency situations of severe hyperglycemia, known as hyperglycemic
          crises, require prompt medical attention. Diabetic ketoacidosis (DKA)
          and hyperosmolar hyperglycemic state (HHS) are two potential
          complications that may arise and can be life-threatening. It is
          crucial for individuals with diabetes to be aware of the symptoms of
          these emergencies, such as excessive thirst, dehydration, confusion,
          and difficulty breathing. Seeking immediate medical assistance,
          staying hydrated, and adhering to the prescribed treatment plan are
          essential in managing hyperglycemic crises.
        </Text>

        <Text></Text>

        <Text style={styles.paragraphHeader}>
          Conclusions and Recommentations
        </Text>
        <View style={styles.divider}></View>
        <Text style={styles.paragraphText}>
          In conclusion, managing hyperglycemia involves a holistic approach
          that includes lifestyle modifications, medication adherence, and
          regular monitoring. Individuals with diabetes should be proactive in
          recognizing the symptoms of hyperglycemia and work closely with their
          healthcare team to develop a personalized treatment plan.
          Additionally, understanding and addressing emergency situations, such
          as diabetic ketoacidosis and hyperosmolar hyperglycemic state, are
          crucial for maintaining overall health and preventing serious
          complications associated with hyperglycemia.
        </Text>
      </ScrollView>
    </View>
  );
};

const Hypoglycemia = () => {
  return (
    <View style={styles.scrollStyle}>
      <ScrollView>
        <Text style={styles.paragraphHeader}>Introduction to Hypoglycemia</Text>
        <View style={styles.divider}></View>
        <Text style={styles.paragraphText}>
          Hypoglycemia is a condition marked by abnormally low levels of glucose
          (sugar) in the blood, often associated with diabetes. It can occur
          when there is an excess of insulin or certain medications, leading to
          a rapid drop in blood sugar levels. Recognizing the symptoms of
          hypoglycemia is crucial for timely intervention. Common signs include
          shakiness, sweating, irritability, rapid heartbeat, confusion,
          weakness, and, in severe cases, loss of consciousness. Managing
          hypoglycemia involves quick action to raise blood sugar levels,
          typically by consuming fast-acting carbohydrates such as glucose
          tablets, fruit juice, or candy.
        </Text>

        <Text></Text>

        <Text style={styles.paragraphHeader}>Management Strategies</Text>
        <View style={styles.divider}></View>
        <Text style={styles.paragraphText}>
          Preventing hypoglycemia requires a proactive approach, especially for
          individuals with diabetes. This involves maintaining a consistent and
          balanced meal plan, incorporating snacks between meals, adjusting
          medication dosages under the guidance of healthcare professionals, and
          regularly monitoring blood glucose levels. Collaborating with
          healthcare providers is essential to tailor a management plan that
          meets individual needs and minimizes the risk of hypoglycemic
          episodes. Education is key, not only for individuals at risk but also
          for their family members, friends, and colleagues who should be aware
          of the signs of hypoglycemia and be trained on appropriate response
          measures, such as administering glucagon or seeking medical
          assistance.
        </Text>

        <Text></Text>

        <Text style={styles.paragraphHeader}>Emergency Situations</Text>
        <View style={styles.divider}></View>
        <Text style={styles.paragraphText}>
          In emergency situations where hypoglycemia becomes severe, timely
          assistance becomes critical. Individuals at risk should communicate
          their condition to those around them, ensuring a support system is in
          place. By fostering awareness, education, and collaboration,
          individuals can effectively manage hypoglycemia, minimizing its impact
          on their daily lives and maintaining overall well-being. episodes.
        </Text>

        <Text></Text>

        <Text style={styles.paragraphHeader}>
          Conclusions and Recommentations
        </Text>
        <View style={styles.divider}></View>
        <Text style={styles.paragraphText}>
          In conclusion, hypoglycemia necessitates a comprehensive and
          individualized approach to management. Regular communication with
          healthcare providers, adherence to prescribed treatment plans, and
          continuous self-monitoring of blood glucose levels are foundational
          elements in preventing and addressing hypoglycemic episodes. It is
          crucial for individuals to recognize the unique factors contributing
          to their hypoglycemia and take proactive measures to mitigate risks.
          By fostering a well-informed and supportive environment, both
          personally and within one's social circle, individuals can enhance
          their ability to manage hypoglycemia effectively and lead a healthier,
          more balanced life.
        </Text>
      </ScrollView>
    </View>
  );
};

const GlucoseInfoScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const [selectedHeader, setSelectedHeader] = useState("Hypoglycemia");
  const headers = ["Hypoglycemia", "Hyperglycemia"];

  const handleHeaderPress = (header) => {
    setSelectedHeader(header);
  };

  const renderSelectedInfo = () => {
    return selectedHeader === "Hypoglycemia" ? (
      <Hypoglycemia />
    ) : (
      <Hyperglycemia />
    );
  };

  return (
    <CommonLayout navigation={navigation} id={id}>
      <SafeAreaView style={styles.mainContainer}>
        <View style={styles.mainHeaderContainer}>
          <Text style={styles.mainHeaderText}>Blood Glucose Information</Text>
        </View>

        <Header handleHeaderPress={handleHeaderPress} headers={headers} />

        {renderSelectedInfo()}

        <View></View>
      </SafeAreaView>
    </CommonLayout>
  );
};

export default GlucoseInfoScreen;

const styles = StyleSheet.create({
  mainContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
    flexGrow: 1,
  },
  mainHeaderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  mainHeaderText: {
    color: "#3B83D1",
    fontSize: 24,
    fontWeight: "900",
  },
  scrollStyle: {
    height: "80%",
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#3B83D1",
    padding: 12,
    borderRadius: 16,
    backgroundColor: "#ffffff",
  },
  paragraphHeader: {
    fontSize: 20,
    fontWeight: "800",

    color: "#3B83D1",
  },
  paragraphText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#3B83D1",
  },
  divider: {
    height: 2,
    width: "100%",
    borderRadius: 16,
    opacity: 0.7,
    backgroundColor: "#3B83D1",
    marginBottom: 8,
  },
});
