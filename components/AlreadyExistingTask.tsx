import { View, Text, StyleSheet } from "react-native";

export const AlreadyExistingTask = () => {
  return (
    <View style={styles.msgBox}>
      <Text style={styles.msgBoxText}>Task already exists</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  msgBox: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: 370,
    backgroundColor: "white",
    borderRadius: 8,
    borderColor: "red",
    borderWidth: 1,

    marginBottom: 10,
  },

  msgBoxText: {
    color: "red",
    fontSize: 18,
  },
});
