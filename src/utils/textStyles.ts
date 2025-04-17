import {StyleSheet} from 'react-native';
import {wp} from '../utils/dimensions';
import Fonts from './fonts';

const TextStyles = StyleSheet.create({
  heading: {
    fontFamily: Fonts.OPENSANS_BOLD,
    fontSize: wp(6),
  },
  subHeading: {
    fontFamily: Fonts.OPENSANS_SEMIBOLD,
    fontSize: wp(5),
  },
  body: {
    fontFamily: Fonts.OPENSANS_REGULAR,
    fontSize: wp(4),
  },
  caption: {
    fontFamily: Fonts.OPENSANS_MEDIUM,
    fontSize: wp(3.5),
  },
  tiny: {
    fontFamily: Fonts.OPENSANS_LIGHT,
    fontSize: wp(2.5),
  },
});
export default TextStyles;
