import { StyleSheet, ScrollView } from "react-native";
import ThemedLayout from "@/components/ThemedLayout";
import ThemeToggle from "@/components/ThemeToggle";
import AppInfoCard from "@/components/AppInfoCard";

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
