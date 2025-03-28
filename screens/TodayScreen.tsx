import { StyleSheet, View } from "react-native";
import ThemedLayout from "@/components/ThemedLayout";
import EmptyState from "@/components/EmptyState";

export default function TodayScreen() {
  return (
    <ThemedLayout>
      <View style={styles.container}>
        <EmptyState title="暂无打卡项" />
      </View>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
  },
  emptyText: {
    opacity: 0.6,
  }
});