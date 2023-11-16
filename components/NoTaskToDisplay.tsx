import { View, Text, StyleSheet, Image } from "react-native";

export const NoTaskToDisplay = () => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.msgBox}>
        <Text style={styles.msgBoxText}>No errands to display yet!</Text>
      </View>
      <View style={styles.imageBox}>
        <Image
          source={require("../assets/chillingVector.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 370,
  },
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

  imageBox: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    marginTop: 50,
  },

  image: {
    width: 200,
    height: 200,

    borderRadius: 100,
    opacity: 0.5,
  },
});
