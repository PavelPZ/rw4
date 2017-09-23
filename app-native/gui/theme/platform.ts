import color from 'color'

import { Platform, Dimensions, PixelRatio } from 'react-native'

const deviceHeight = Dimensions.get('window').height
const deviceWidth = Dimensions.get('window').width
const platform = Platform.OS == 'windows' ? 'ios' : Platform.OS
const platformStyle = undefined

export const enum Fonts {
  System = 'System',
  Roboto_medium = 'Roboto_medium',
  Roboto = 'Roboto'
}

export const enum Palette {

  //Brands
  brandPrimaryAndroid = '#3f51b5',
  brandPrimaryIos = '#007aff',
  brandInfo = '#62b1f6',
  brandSuccess = '#5cb85c',
  brandDanger = '#d9534f',
  brandWarning = '#f0ad4e',
  brandSidebar = '#252932',

  //Grays
  gray_white = '#ffffff',
  gray_01 = '#f8f8f8',
  gray_02 = '#f4f4f4',
  //gray_03 = '#f1f1f1',
  //gray_04 = '#dddddd',
  gray_05 = '#cccccc',
  gray_06 = '#cbcbcb',
  gray_07 = '#c9c9c9',
  gray_08 = '#b5b5b5',
  gray_09 = '#a7a7a7',
  gray_10 = '#808080',
  gray_11 = '#7e7e7e',
  gray_12 = '#777777',
  gray_13 = '#6b6b6b',
  gray_14 = '#575757',
  gray_15 = '#555',
  gray_16 = '#414141',
  gray_17 = '#222222',
  gray_black = '#000000',

  //colors
  col01 = '#f0eff5',
  col02 = '#ed2f2f',
  col03 = '#ed1727',
  //NU col04 = '#e4202d',
  col05 = '#d9d5dc',
  col06 = '#cecdd2',
  col07 = '#cde1f9',
  //NU col08 = '#c9c9ce',
  col09 = '#c9c8cd',
  col10 = '#c8c7cc',
  col11 = '#b3c7f9',
  col12 = '#a7a6ab',
  col13 = '#8f8e95',
  col14 = '#8e8e93',
  //NU col15 = '#45d56e',
  col16 = '#4179f7',
  col17 = '#384850',
  col18 = '#2b8339',
  //NU col19 = '#1a191b',
  //NU col21 = '#039be5',
}

export const getPlatformVariables = (platform:string) => {
  const ios = platform == 'ios'
  return {
  platformStyle,
  platform,
  deviceWidth,
  deviceHeight,

  //LM NEW
  colToast: Palette.gray_white,
  colText: Palette.gray_09,
  colTabContainer: Palette.gray_black,
  colTabBar: Palette.gray_05,
  colTab: Palette.gray_white,
  colSwipeRow: Palette.gray_white,
  colPicker: Palette.col13,
  colInputGroup: Palette.col17,
  colIcon: Palette.gray_black,
  colHeader: Palette.gray_black,
  colFooter: Palette.gray_06,
  colCard: Palette.gray_black,
  colBtnWhite: Palette.gray_black,
  colBtnDark: Palette.gray_02,
  colCardItemIos: Palette.gray_15,
  colCardItemAndroid: Palette.gray_17,
  colItem: Palette.col17,
  colSeparator1: Palette.col01,
  colSeparator2: Palette.gray_12,
  colList1: Palette.gray_white,
  colList2: Palette.col09,
  colList3: Palette.col13,
  colList4: Palette.col10,

  // AndroidRipple
  androidRipple: true,
  androidRippleColor: 'rgba(256, 256, 256, 0.3)',
  androidRippleColorDark: 'rgba(0, 0, 0, 0.15)',

  // Badge
  badgeBg: Palette.col03,
  badgeColor: Palette.gray_white,
  // New Variable
  badgePadding: ios ? 3 : 0,

  // Button
  btnFontFamily: ios ? Fonts.System : Fonts.Roboto_medium,
  btnDisabledBg: Palette.gray_08,
  //btnDisabledClr: Palette.gray_03,

  // CheckBox
  CheckboxRadius: ios ? 13 : 0,
  CheckboxBorderWidth: ios ? 1 : 2,
  CheckboxPaddingLeft: ios ? 4 : 2,
  CheckboxPaddingBottom: ios ? 0 : 5,
  CheckboxIconSize: ios ? 21 : 14,
  CheckboxIconMarginTop: ios ? undefined : 1,
  CheckboxFontSize: ios ? 23 / 0.9 : 18,
  DefaultFontSize: 17,
  //checkboxBgColor: Palette.col21,
  checkboxSize: 20,
  checkboxTickColor: Palette.gray_white,

  // Segment
  segmentBackgroundColor: ios ? Palette.gray_01 : Palette.brandPrimaryAndroid,
  segmentActiveBackgroundColor: ios ? Palette.brandPrimaryIos : Palette.gray_white,
  segmentTextColor: ios ? Palette.brandPrimaryIos : Palette.gray_white,
  segmentActiveTextColor: ios ? Palette.gray_white : Palette.brandPrimaryAndroid,
  segmentBorderColor: ios ? Palette.brandPrimaryIos : Palette.gray_white,
  segmentBorderColorMain: ios ? Palette.col12 : Palette.brandPrimaryAndroid,

  // New Variable
  get defaultTextColor() {
    return this.textColor;
  },

  get btnPrimaryBg() {
    return this.brandPrimary;
  },
  get btnPrimaryColor() {
    return this.inverseTextColor;
  },
  get btnInfoBg() {
    return this.brandInfo;
  },
  get btnInfoColor() {
    return this.inverseTextColor;
  },
  get btnSuccessBg() {
    return this.brandSuccess;
  },
  get btnSuccessColor() {
    return this.inverseTextColor;
  },
  get btnDangerBg() {
    return this.brandDanger;
  },
  get btnDangerColor() {
    return this.inverseTextColor;
  },
  get btnWarningBg() {
    return this.brandWarning;
  },
  get btnWarningColor() {
    return this.inverseTextColor;
  },
  get btnTextSize() {
    return ios ? this.fontSizeBase * 1.1 : this.fontSizeBase - 1;
  },
  get btnTextSizeLarge() {
    return this.fontSizeBase * 1.5;
  },
  get btnTextSizeSmall() {
    return this.fontSizeBase * 0.8;
  },
  get borderRadiusLarge() {
    return this.fontSizeBase * 3.8;
  },

  buttonPadding: 6,

  get iconSizeLarge() {
    return this.iconFontSize * 1.5;
  },
  get iconSizeSmall() {
    return this.iconFontSize * 0.6;
  },

  // Card
  cardDefaultBg: Palette.gray_white,

  // Color
  brandPrimary: ios ? Palette.brandPrimaryIos : Palette.brandPrimaryAndroid,
  brandInfo: Palette.brandInfo,
  brandSuccess: Palette.brandSuccess,
  brandDanger: Palette.brandDanger,
  brandWarning: Palette.brandWarning,
  brandSidebar: Palette.brandSidebar,

  // Font
  fontFamily: ios ? Fonts.System : Fonts.Roboto,
  fontSizeBase: 15,

  get fontSizeH1() {
    return this.fontSizeBase * 1.8;
  },
  get fontSizeH2() {
    return this.fontSizeBase * 1.6;
  },
  get fontSizeH3() {
    return this.fontSizeBase * 1.4;
  },

  // Footer
  footerHeight: 55,
  footerDefaultBg: ios ? Palette.gray_01 : Palette.col16,

  // FooterTab
  tabBarTextColor: ios ? Palette.gray_13 : Palette.col11,
  tabBarTextSize: ios ? 14 : 11,
  activeTab: ios ? Palette.brandPrimaryIos : Palette.gray_white,
  sTabBarActiveTextColor: Palette.brandPrimaryIos,
  tabBarActiveTextColor: ios ? Palette.brandPrimaryIos : Palette.gray_white,
  tabActiveBgColor: ios ? Palette.col07 : Palette.brandPrimaryAndroid,

  // Tab
  tabDefaultBg: ios ? Palette.gray_01 : Palette.brandPrimaryAndroid,
  topTabBarTextColor: ios ? Palette.gray_13 : Palette.col11,
  topTabBarActiveTextColor: ios ? Palette.brandPrimaryIos : Palette.gray_white,
  topTabActiveBgColor: ios ? Palette.col07 : undefined,
  topTabBarBorderColor: ios ? Palette.col12 : Palette.gray_white,
  topTabBarActiveBorderColor: ios ? Palette.brandPrimaryIos : Palette.gray_white,

  // Header
  toolbarBtnColor: ios ? Palette.brandPrimaryIos : Palette.gray_white,
  toolbarDefaultBg: ios ? Palette.gray_01 : Palette.brandPrimaryAndroid,
  toolbarHeight: ios ? 64 : 56,
  toolbarIconSize: ios ? 20 : 22,
  toolbarSearchIconSize: ios ? 20 : 23,
  toolbarInputColor: ios ? Palette.col06 : Palette.gray_white,
  searchBarHeight: ios ? 30 : 40,
  toolbarInverseBg: Palette.gray_17,
  toolbarTextColor: ios ? Palette.gray_black : Palette.gray_white,
  toolbarDefaultBorder: ios ? Palette.col12 : Palette.brandPrimaryAndroid,
  iosStatusbar: ios ? 'dark-content' : 'light-content',
  get statusBarColor() {
    return color(this.toolbarDefaultBg).darken(0.2).hex();
  },

  // Icon
  iconFamily: 'Ionicons',
  iconFontSize: ios ? 30 : 28,
  iconMargin: 7,
  iconHeaderSize: ios ? 33 : 24,

  // InputGroup
  inputFontSize: 17,
  inputBorderColor: Palette.col05,
  inputSuccessBorderColor: Palette.col18,
  inputErrorBorderColor: Palette.col02,

  get inputColor() {
    return this.textColor;
  },
  get inputColorPlaceholder() {
    return Palette.gray_14;
  },

  inputGroupMarginBottom: 10,
  inputHeightBase: 50,
  inputPaddingLeft: 5,

  get inputPaddingLeftIcon() {
    return this.inputPaddingLeft * 8;
  },

  // Line Height
  btnLineHeight: 19,
  lineHeightH1: 32,
  lineHeightH2: 27,
  lineHeightH3: 22,
  iconLineHeight: ios ? 37 : 30,
  lineHeight: ios ? 20 : 24,

  // List
  listBg: Palette.gray_white,
  listBorderColor: Palette.gray_07,
  listDividerBg: Palette.gray_02,
  listItemHeight: 45,
  //listBtnUnderlayColor: Palette.gray_04,

  // Card
  cardBorderColor: Palette.gray_05,

  // Changed Variable
  listItemPadding: ios ? 10 : 12,

  listNoteColor: Palette.gray_10,
  listNoteSize: 13,

  // Progress Bar
  //defaultProgressColor: Palette.col04,
  //inverseProgressColor: Palette.col19,

  // Radio Button
  radioBtnSize: ios ? 25 : 23,
  radioSelectedColorAndroid: Palette.brandPrimaryAndroid,

  // New Variable
  radioBtnLineHeight: ios ? 29 : 24,

  radioColor: Palette.gray_11,

  get radioSelectedColor() {
    return color(this.radioColor).darken(0.2).hex();
  },

  // Spinner
  //defaultSpinnerColor: Palette.col15,
  //inverseSpinnerColor: Palette.col19,

  // Tabs
  tabBgColor: Palette.gray_01,
  tabFontSize: 15,
  tabTextColor: Palette.gray_17,

  // Text
  textColor: Palette.gray_black,
  inverseTextColor: Palette.gray_white,
  noteFontSize: 14,

  // Title
  titleFontfamily: ios ? Fonts.System : Fonts.Roboto_medium,
  titleFontSize: ios ? 17 : 19,
  subTitleFontSize: ios ? 12 : 14,
  subtitleColor: ios ? Palette.col14 : Palette.gray_white,

  // New Variable
  titleFontColor: ios ? Palette.gray_black : Palette.gray_white,

  // Other
  borderRadiusBase: ios ? 5 : 2,
  borderWidth: 1 / PixelRatio.getPixelSizeForLayoutSize(1),
  contentPadding: 10,

  get darkenHeader() {
    return color(this.tabBgColor).darken(0.03).hex();
  },

  dropdownBg: Palette.gray_black,
  dropdownLinkColor: Palette.gray_16,
  inputLineHeight: 24,
  //jumbotronBg: Palette.col08,
  jumbotronPadding: 30,

  // New Variable
  inputGroupRoundedBorderRadius: 30
}
  }

const variables = getPlatformVariables(platform)
export default variables