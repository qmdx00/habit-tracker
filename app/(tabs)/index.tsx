import { StyleSheet, SafeAreaView } from "react-native";
import { Text, Layout } from "@ui-kitten/components";

export default function Today() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <Text>Home</Text>
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