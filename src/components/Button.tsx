import React from 'react';
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import colors from '../utils/colors';
import {horizontalSpace, wp} from '../utils/dimensions';
import Fonts from '../utils/fonts';
import CustomText from './CustomText';
import TextStyles from '../utils/textStyles';

interface ButtonProps {
  buttonName: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
  extTextStyle?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  onPress,
  buttonName,
  style = {},
  extTextStyle,
}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <CustomText style={[TextStyles.button, styles.textStyle, extTextStyle]}>
        {buttonName}
      </CustomText>
    </TouchableOpacity>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: horizontalSpace,
    height: wp(11),
    borderRadius: wp(2),
    backgroundColor: colors.baseColor,
  },
  textStyle: {
    color: colors.white,
    fontFamily: Fonts.OPENSANS_SEMIBOLD,
  },
});
