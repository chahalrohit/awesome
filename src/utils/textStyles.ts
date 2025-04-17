import {StyleSheet} from 'react-native';
import Fonts from './fonts';
import {wp} from '../utils/dimensions';

const TextStyles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.POPPINS_BOLD,
    fontSize: wp(6),
  },
  subHeading: {
    fontFamily: Fonts.POPPINS_SEMI_BOLD,
    fontSize: wp(5),
  },
  body: {
    fontFamily: Fonts.POPPINS_REGULAR,
    fontSize: wp(4),
  },
  caption: {
    fontFamily: Fonts.POPPINS_MEDIUM,
    fontSize: wp(3.5),
  },
  tiny: {
    fontFamily: Fonts.POPPINS_LIGHT,
    fontSize: wp(2.5),
  },
});

export default TextStyles;
