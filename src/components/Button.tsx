import React, {Children} from 'react';
import {
  TouchableOpacity,
  Text,
  GestureResponderEvent,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from 'react-native';
import {verticalSpace, horizontalSpace, wp} from '../utils/dimensions';
import colors from '../utils/colors';
import CustomText from './CustomText';
import TextStyles from '../utils/textStyles';

interface ButtonProps {
  buttonName: string;
  onPress: (event: GestureResponderEvent) => void;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({onPress, buttonName, style = {}}) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <CustomText
        weight="medium"
        style={[TextStyles.body, {color: colors.white}]}>
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
});
