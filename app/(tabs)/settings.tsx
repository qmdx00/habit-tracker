import { StyleSheet, SafeAreaView } from "react-native";
import { Layout, Text } from "@ui-kitten/components";

export default function Settings() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <Text>Settings</Text>
      </Layout>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    width: '100%',
  },
});
