import { StyleSheet, ActivityIndicator } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useTheme } from "@/components/ThemeContext";
import ThemedText from "@/components/ThemedText";
import { getLoadingBackgroundColor, getLoadingIndicatorColor } from "@/components/ui/cardLoading";
import { isDarkTheme } from "@/utils/theme/themeUtils";

export default function FallbackLoading() {
  const { actualTheme } = useTheme();
  const isDarkMode = isDarkTheme(actualTheme);

  const backgroundColor = getLoadingBackgroundColor(isDarkMode);
  const indicatorColor = getLoadingIndicatorColor(isDarkMode);

  return (
    <Layout style={[
      styles.container,
      { backgroundColor }
    ]}>
      <ActivityIndicator
        size="large"
        color={indicatorColor}
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