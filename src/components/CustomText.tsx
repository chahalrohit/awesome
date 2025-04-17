// components/AppText.tsx
import React from 'react';
import {Text, TextProps, StyleProp, TextStyle} from 'react-native';
import Fonts from '../utils/fonts';
import TextStyles from '../utils/textStyles';

interface AppTextProps extends TextProps {
  style?: StyleProp<TextStyle>;
  weight?:
    | 'regular'
    | 'medium'
    | 'semiBold'
    | 'bold'
    | 'thin'
    | 'light'
    | 'extraBold'
    | 'extraLight';
}

const CustomText: React.FC<AppTextProps> = ({
  children,
  style,
  weight = 'regular',
  ...props
}) => {
  const getFontFamily = () => {
    switch (weight) {
      case 'thin':
        return Fonts.POPPINS_THIN;
      case 'light':
        return Fonts.POPPINS_LIGHT;
      case 'extraLight':
        return Fonts.POPPINS_EXTRA_LIGHT;
      case 'medium':
        return Fonts.POPPINS_MEDIUM;
      case 'semiBold':
        return Fonts.POPPINS_SEMI_BOLD;
      case 'bold':
        return Fonts.POPPINS_BOLD;
      case 'extraBold':
        return Fonts.POPPINS_EXTRA_BOLD;
      default:
        return Fonts.POPPINS_REGULAR;
    }
  };

  return (
    <Text
      {...props}
      style={[, TextStyles.caption, {fontFamily: getFontFamily()}, style]}>
      {children}
    </Text>
  );
};

export default CustomText;
