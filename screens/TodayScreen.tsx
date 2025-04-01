import { StyleSheet, View } from "react-native";
import ThemedLayout from "@/components/common/ThemedLayout";
import EmptyState from "@/components/common/EmptyState";
import FloatingButton from "@/components/common/FloatingButton";

export default function TodayScreen() {
  return (
    <ThemedLayout>
      <View style={styles.container}>
        <EmptyState title="暂无打卡项" />
        <FloatingButton
          onPress={() => {
            console.log("onPress");
          }}
        />
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
});