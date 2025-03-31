import { StyleSheet, ScrollView } from "react-native";
import ThemedLayout from "@/components/common/ThemedLayout";
import ThemeToggle from "@/components/settings/ThemeToggle";
import AppInfoCard from "@/components/settings/AppInfoCard";

export default function SettingsScreen() {
  return (
    <ThemedLayout>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemeToggle cardStyle={styles.card} />
        <AppInfoCard style={styles.card} />
      </ScrollView>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 16,
    paddingBottom: 30,
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
