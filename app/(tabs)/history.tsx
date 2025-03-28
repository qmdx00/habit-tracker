import { Layout, Text } from "@ui-kitten/components";
import { SafeAreaView, StyleSheet } from "react-native";

export default function History() {
  return (
    <SafeAreaView style={styles.container}>
      <Layout style={styles.layout}>
        <Text>History</Text>
      </Layout>
    </SafeAreaView>
  )
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