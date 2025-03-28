import { StyleSheet, View } from "react-native";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedText from "@/components/ThemedText";
import EmptyState from "@/components/EmptyState";

export default function HistoryScreen() {
  return (
    <ThemedLayout>
      <View style={styles.container}>
        <EmptyState title="暂无历史记录" />
      </View>
    </ThemedLayout>
  )
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