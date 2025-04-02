// 应用基本信息配置
export const appInfo = {
  name: '习惯追踪',
  version: '1.0.0',
  buildNumber: '20250328',
  buildDate: new Date().toISOString().split('T')[0],
  author: 'Wimi Yuan',
  description: '一个帮助你养成良好习惯的应用',
  copyright: `© ${new Date().getFullYear()} 版权所有`,
  repository: 'https://github.com/qmdx00/habit-tracker',
};

// 主题相关配置
export const themeConfig = {
  defaultTheme: 'system' as 'light' | 'dark' | 'system',
  primaryColor: {
    light: '#4F8EF7', // 现代蓝色，替代绿色
    dark: '#5E60CE', // 紫色调，替代橙色
  },
  // 辅助色，用于强调和突出显示
  secondaryColor: {
    light: '#FF6B6B', // 柔和红色
    dark: '#FF9F1C', // 温暖橙色
  },
  // 成功状态色
  successColor: {
    light: '#4CAF50',
    dark: '#81C784',
  },
  // 警告状态色
  warningColor: {
    light: '#FF9800',
    dark: '#FFB74D',
  },
  textColor: {
    light: '#2D3748', // 更柔和的暗色，不是纯黑
    dark: '#F7FAFC', // 略微偏灰的白色，减少对比度
  },
  backgroundColor: {
    light: '#F8F9FA', // 带一点灰度的白色，不是纯白
    dark: '#1A202C', // 更深的暗色，带一点蓝调
  },
  // 卡片/组件背景色
  cardBackgroundColor: {
    light: '#FFFFFF', // 纯白色用于卡片
    dark: '#2D3748', // 略微浅一点的暗色作为卡片
  },
  inactiveTextColor: {
    light: '#718096', // 更柔和的灰色
    dark: '#A0AEC0', // 明亮一点的灰色
  },
  borderColor: {
    light: '#E2E8F0', // 淡蓝灰色边框
    dark: '#4A5568', // 中等灰色边框
  },
  // 分割线颜色
  dividerColor: {
    light: '#EDF2F7', // 更淡的分割线
    dark: '#2D3748', // 暗色主题下的分割线
  },
};