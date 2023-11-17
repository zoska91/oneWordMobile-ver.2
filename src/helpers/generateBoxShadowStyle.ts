export const generateBoxShadowStyle = (
  xOffset: number,
  yOffset: number,
  shadowColorIos: string,
  shadowOpacity: number,
  shadowRadius: number,
  elevation: number,
  shadowColorAndroid: string,
  platform: 'ios' | 'android' | 'macos' | 'windows' | 'web', 
) => {
  if (platform === 'ios') {
    return {
      shadowColor: shadowColorIos,
      shadowOffset: {width: xOffset, height: yOffset},
      shadowOpacity,
      shadowRadius,
    }
  } else if (platform === 'android') {
    return {
      elevation,
      shadowColor: shadowColorAndroid,
    };
  }
};