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
    light: 'green',
    dark: 'orange',
  },
  backgroundColor: {
    light: 'white',
    dark: '#121212',
  },
  cardColor: {
    light: 'white',
    dark: '#1E1E1E',
  },
  borderColor: {
    light: '#f0f0f0',
    dark: '#333333',
  },
};