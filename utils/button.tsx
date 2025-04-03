/**
 * 浮动按钮位置
 */
export type FloatingButtonPosition =
  | 'bottomLeft'
  | 'topRight'
  | 'topLeft'
  | 'bottomRight';

/**
 * 根据位置获取浮动按钮的位置样式
 * @param position 位置
 * @returns 位置样式
 */
export const getFloatingButtonPositionStyle = (position: FloatingButtonPosition = 'bottomRight') => {
  switch (position) {
    case 'bottomLeft':
      return { bottom: 24, left: 24 };
    case 'topRight':
      return { top: 24, right: 24 };
    case 'topLeft':
      return { top: 24, left: 24 };
    case 'bottomRight':
      return { bottom: 24, right: 24 };
  }
}