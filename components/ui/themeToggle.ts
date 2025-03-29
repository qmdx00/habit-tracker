/**
 * 获取主题选项标签
 * @returns 主题选项和对应标签的映射对象
 */
export const getThemeOptionLabels = () => {
    return {
        light: '浅色',
        dark: '深色',
        system: '跟随系统'
    };
};

/**
 * 获取所有可用的主题选项
 * @returns 主题选项数组
 */
export const getThemeOptions = (): ('light' | 'dark' | 'system')[] => {
    return ['light', 'dark', 'system'];
}; 