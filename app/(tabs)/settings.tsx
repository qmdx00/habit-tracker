import { StyleSheet, SafeAreaView } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout>
        <Text>Settings</Text>
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
