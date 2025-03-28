import { StyleSheet } from "react-native";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedText from "@/components/ThemedText";

export default function Today() {
  return (
    <ThemedLayout>
      <ThemedText category="h5">首页</ThemedText>
    </ThemedLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  layout: {
    flex: 1,
    width: '100%',
  },
});