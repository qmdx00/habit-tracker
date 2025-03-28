import { StyleSheet, View } from "react-native";
import { Toggle, Radio, RadioGroup, Card, Divider } from "@ui-kitten/components";
import { useTheme } from "@/components/ThemeContext";
import ThemedLayout from "@/components/ThemedLayout";
import ThemedText from "@/components/ThemedText";

export default function Settings() {
  const { theme, actualTheme, toggleTheme, setTheme } = useTheme();
  const isDarkMode = actualTheme === 'dark';

  return (
    <ThemedLayout>
      <ThemedText style={styles.title} category="h5">设置</ThemedText>

      <Card style={[styles.card, { backgroundColor: isDarkMode ? '#1E1E1E' : 'white' }]}>
        <ThemedText category="h6" style={styles.sectionTitle}>主题设置</ThemedText>
        <Divider style={[styles.divider, { backgroundColor: isDarkMode ? '#333333' : '#f0f0f0' }]} />

        <View style={styles.settingItem}>
          <ThemedText>暗色模式</ThemedText>
          <Toggle
            checked={actualTheme === 'dark'}
            onChange={toggleTheme}
          />
        </View>

        <View style={styles.settingItem}>
          <ThemedText>主题选择</ThemedText>
        </View>

        <RadioGroup
          selectedIndex={theme === 'light' ? 0 : theme === 'dark' ? 1 : 2}
          onChange={index => {
            const themeValues: ['light', 'dark', 'system'] = ['light', 'dark', 'system'];
            setTheme(themeValues[index]);
          }}
        >
          <Radio style={styles.radioButton}>
            <ThemedText>浅色</ThemedText>
          </Radio>
          <Radio style={styles.radioButton}>
            <ThemedText>深色</ThemedText>
          </Radio>
          <Radio style={styles.radioButton}>
            <ThemedText>跟随系统</ThemedText>
          </Radio>
        </RadioGroup>
      </Card>
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
    borderRadius: 8,
  },
  sectionTitle: {
    marginBottom: 10,
  },
  divider: {
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  radioButton: {
    marginVertical: 8,
  },
});
