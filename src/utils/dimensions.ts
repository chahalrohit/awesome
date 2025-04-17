import React from 'react-native';
import {
  scale,
  moderateScale,
  moderateVerticalScale,
  verticalScale,
} from 'react-native-size-matters';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const horizontalSpace = wp(5);
const verticalSpace = wp(5);

export {
  horizontalSpace,
  verticalSpace,
  wp,
  hp,
  scale,
  moderateScale,
  moderateVerticalScale,
  verticalScale,
};
