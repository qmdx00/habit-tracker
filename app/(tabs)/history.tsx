import { StyleSheet, Text, View } from "react-native";

export default function History() {
  return <View style={styles.container}>
    <Text>History</Text>
  </View>
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
