import { Layout } from "@ui-kitten/components";
import { StyleSheet, Text, SafeAreaView } from "react-native";

export default function History() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout>
        <Text>History</Text>
      </Layout>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
