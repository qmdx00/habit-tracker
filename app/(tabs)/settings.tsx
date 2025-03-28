import { StyleSheet, View } from "react-native";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedText from "@/components/ThemedText";
import ThemeToggle from "@/components/ThemeToggle";
import SettingCard from "@/components/SettingCard";
import SettingItem from "@/components/SettingItem";

export default function Settings() {
  return (
    <ThemedLayout>
      <ThemedText style={styles.title} category="h5">设置</ThemedText>

      <ThemeToggle cardStyle={styles.card} />

      <SettingCard title="关于应用" style={styles.card}>
        <SettingItem label="版本">
          <ThemedText>1.0.0</ThemedText>
        </SettingItem>

        <SettingItem label="构建号">
          <ThemedText>20231001</ThemedText>
        </SettingItem>
      </SettingCard>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    padding: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    marginHorizontal: 16,
    marginBottom: 16,
  },
});
