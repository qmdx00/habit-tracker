import { StyleSheet, SafeAreaView } from "react-native";
import { Text, Layout } from "@ui-kitten/components";

export default function Today() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout>
        <Text>Home</Text>
        <Text>Welcome to UI Kitten</Text>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
