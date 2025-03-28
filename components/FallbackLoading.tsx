import { StyleSheet, ActivityIndicator } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useTheme } from "./ThemeContext";
import ThemedText from "./ThemedText";

export default function FallbackLoading() {
  const { actualTheme } = useTheme();
  const isDarkMode = actualTheme === 'dark';

  return (
    <Layout style={[
      styles.container,
      { backgroundColor: isDarkMode ? '#121212' : 'white' }
    ]}>
      <ActivityIndicator
        size="large"
        color={isDarkMode ? "#4CAF50" : "green"}
        style={styles.spinner}
      />
      <ThemedText category="h6" style={styles.text}>
        加载中...
      </ThemedText>
    </Layout>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  spinner: {
    marginBottom: 20,
  },
  text: {
    marginTop: 10,
  }
});