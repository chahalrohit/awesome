// components/AppText.tsx
import React from 'react';
import {StyleProp, Text, TextProps, TextStyle} from 'react-native';
import Fonts from '../utils/fonts';

interface AppTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  weight?: 'regular' | 'medium' | 'semiBold' | 'bold' | 'light' | 'extraBold';
}

const CustomText: React.FC<AppTextProps> = ({
  children,
  style,
  weight = 'regular',
  ...props
}) => {
  const getFontFamily = () => {
    switch (weight) {
      case 'light':
        return Fonts.OPENSANS_LIGHT;
      case 'medium':
        return Fonts.OPENSANS_MEDIUM;
      case 'semiBold':
        return Fonts.OPENSANS_SEMIBOLD;
      case 'bold':
        return Fonts.OPENSANS_BOLD;
      case 'extraBold':
        return Fonts.OPENSANS_EXTRABOLD;
      default:
        return Fonts.OPENSANS_REGULAR;
    }
  };

  return (
    <Text {...props} style={[{fontFamily: getFontFamily()}, style]}>
      {children}
    </Text>
  );
};

export default CustomText;
