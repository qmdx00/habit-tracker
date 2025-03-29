import React from 'react';
import { StyleSheet } from 'react-native';
import { Icon } from '@ui-kitten/components';
import ThemedText from '@/components/ThemedText';

// 标签图标的样式
const styles = StyleSheet.create({
    tabBarIcon: {
        width: 24,
        height: 24,
    },
});

/**
 * 渲染标签图标的函数
 * @param iconName 图标名称
 * @param color 图标颜色
 * @param focused 是否激活状态
 * @returns 渲染的图标组件
 */
export const renderTabBarIcon = (iconName: string, color: string, focused: boolean) => (
    <Icon
        style={styles.tabBarIcon}
        fill={color}
        name={focused ? iconName : `${iconName}-outline`}
    />
);

/**
 * 渲染标签文本的函数
 * @param label 标签文本内容
 * @param color 文本颜色
 * @returns 渲染的文本组件
 */
export const renderTabBarLabel = (label: string, color: string) => (
    <ThemedText
        category="p1"
        style={{ color }}>
        {label}
    </ThemedText>
);

/**
 * 获取标签页配置项的函数
 * @param tabConfig 标签页配置数组
 * @returns 处理后的标签页选项数组
 */
export const getScreenOptions = (tabConfig: {
    name: string;
    title: string;
    tabBarIcon: string;
    tabBarLabel: string;
}[]) => {
    return tabConfig.map(screen => ({
        key: screen.name,
        name: screen.name,
        options: {
            title: screen.title,
            tabBarIcon: ({ color, focused }: { color: string, focused: boolean }) =>
                renderTabBarIcon(screen.tabBarIcon, color, focused),
            tabBarLabel: ({ color }: { color: string }) =>
                renderTabBarLabel(screen.tabBarLabel, color),
        }
    }));
}; 