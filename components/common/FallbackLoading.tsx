import { StyleSheet, ActivityIndicator } from "react-native";
import { Layout } from "@ui-kitten/components";
import { useTheme } from "@/components/common/ThemeContext";
import ThemedText from "@/components/common/ThemedText";
import { getThemeColorByTheme } from "@/utils/theme/themeUtils";

export default function FallbackLoading() {
  const { actualTheme } = useTheme();
  const themedBackgroundColor = getThemeColorByTheme('backgroundColor', actualTheme);
  const themedIndicatorColor = getThemeColorByTheme('primaryColor', actualTheme);

  return (
    <Layout style={[
      styles.container,
      { backgroundColor: themedBackgroundColor }
    ]}>
      <ActivityIndicator
        size="large"
        color={themedIndicatorColor}
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