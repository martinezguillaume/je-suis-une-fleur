import { Dimensions, DeviceInfo } from 'react-native'

export const HEIGHT = Dimensions.get('window').height
export const WIDTH = Dimensions.get('window').width
export const BACKGROUND_COLOR = '#F5F5F5'
export const BODY_COLOR = 'rgba(0, 0, 0, 0.87)'
export const SUBHEADING_COLOR = 'rgba(0, 0, 0, 0.54)'
export const SPACE_BOTTOM = DeviceInfo.isIPhoneX_deprecated ? 13 : 0
export const PRIMARY_GRAY = '#9E9E9E'
export const LIGHT_GRAY = '#EEEEEE'
export const DARK_GRAY = '#616161'
