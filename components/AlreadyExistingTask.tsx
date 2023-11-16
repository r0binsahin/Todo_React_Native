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
    paddingHorizontal: 10,
    width: 370,

    marginBottom: 5,
  },

  msgBoxText: {
    color: "red",
    fontSize: 18,
  },
});
