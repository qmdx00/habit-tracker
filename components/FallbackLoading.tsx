import { StyleSheet } from "react-native";
import { Text, Layout } from "@ui-kitten/components";

export default function FallbackLoading() {
  return (
    <Layout style={styles.container}>
      <Text>Loading...</Text>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});