import { View, Text, StyleSheet } from "react-native";

export const NoTaskToDisplay = () => {
  return (
    <View style={styles.msgBox}>
      <Text style={styles.msgBoxText}>No errands to display yet!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  msgBox: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    width: 370,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "#C0C0C0",
    borderWidth: 1,

    marginTop: 30,
  },

  msgBoxText: {
    fontSize: 20,
    opacity: 0.5,
  },
});
