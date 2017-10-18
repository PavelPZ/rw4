export = RNE;
export as namespace RNE;

import React from 'react'

declare namespace RNE {

  type IconType =
    | 'material'
    | 'material-community'
    | 'simple-line-icon'
    | 'zocial'
    | 'font-awesome'
    | 'octicon'
    | 'ionicon'
    | 'foundation'
    | 'evilicon'
    | 'entypo'
    | 'Ionicon'
    | string;

  interface IconObject {
    name?: string;
    color?: string;
    size?: number;
    type?: IconType;
    style?: RN.StyleProp<RN.ViewStyle>;
  }

  interface AvatarIcon extends IconObject {
    iconStyle?: RN.StyleProp<RN.TextStyle>;
  }

  interface TextProps {
    /**
     * font size 40
     */
    h1?: boolean;

    /**
     * font size 34
     */
    h2?: boolean;

    /**
     * font size 28
     */
    h3?: boolean;

    /**
     * font size 22
     */
    h4?: boolean;

    /**
     * font family name
     */
    fontFamily?: string;

    /**
     * Additional styling for Text
     */
    style?: RN.StyleProp<RN.TextStyle>;
  }

  /**
   * HTML Style Headings
   *
   * @see https://react-native-training.github.io/react-native-elements/API/HTML_style_headings/
   */
  class Text extends React.Component<TextProps, any> { }

  interface AvatarProps {
    /**
     * Component for enclosing element (eg: TouchableHighlight, View, etc)
     *
     * @default TouchableOpacity
     */
    component?: React.ComponentClass;

    /**
     * Width for the Avatar
     *
     * @default 34
     */
    width?: number;

    /**
     * Height for the Avatar
     *
     * @default 34
     */
    height?: number;

    /**
     * Callback function when pressing component
     */
    onPress?(): void;

    /**
     * Callback function when long pressing component
     */
    onLongPress?(): void;

    /**
     * Styling for outer container
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Image source
     */
    source?: RN.ImageURISource;

    /**
     * Style for avatar image
     */
    avatarStyle?: RN.ImageStyle;

    /**
     * Determines the shape of avatar
     *
     * @default false
     */
    rounded?: boolean;

    /**
     * Renders title in the avatar
     */
    title?: string;

    /**
     * Style for the title
     */
    titleStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Style for the view outside image or icon
     */
    overlayContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Opacity when pressed
     *
     * @default 0.2
     */
    activeOpacity?: number;

    /**
     * Icon for the avatar
     */
    icon?: AvatarIcon;

    /**
     * extra styling for icon component
     */
    iconStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Small sized icon
     */
    small?: boolean;

    /**
     * Medium sized icon
     */
    medium?: boolean;

    /**
     * Large sized icon
     */
    large?: boolean;

    /**
     * Extra-large sized icon
     */
    xlarge?: boolean;
  }

  /**
   * Avatar Component
   *
   * @see https://react-native-training.github.io/react-native-elements/API/avatar/
   */
  class Avatar extends React.Component<AvatarProps, any> { }

  interface ButtonIcon extends IconObject {
    buttonStyle?: RN.StyleProp<RN.TextStyle>;
  }

  interface ButtonProps extends RN.TouchableWithoutFeedbackProps, TTouchable {

    //LM
    loading?: boolean
    loadingRight?: boolean
    activityIndicatorStyle?: RN.ViewStyle
    secondary?: boolean
    secondary2?: boolean
    secondary3?: boolean
    primary1?: boolean
    primary2?: boolean
    rounded?: boolean
    outline?: boolean
    transparent?: boolean
    allowFontScaling?: boolean
    textNumberOfLines?: number
    Component?: React.ComponentType<RNE.TTouchable>
    rightIcon?: RNE.ButtonIcon
    leftIcon?: boolean
    textEllipsizeMode?: string

    /**
     * Specify other component such as TouchableOpacity or other
     *
     * @default TouchableHighlight (iOS), TouchableNativeFeedback (android)
     */
    component?: React.ComponentClass;

    /**
     * Additional styling for button component
     *
     * @default null
     */
    buttonStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Button title
     */
    title: string;

    /**
     * Makes button large
     *
     * @default false
     */
    large?: boolean;

    /**
     * Specify different font family
     *
     * @default System font (iOS), Sans Serif (android)
     */
    fontFamily?: string;

    /**
     * Specify font weight for title
     *
     * @default null
     */
    fontWeight?: string;

    /**
     * Moves icon to right of title
     *
     * @default false
     */
    iconRight?: boolean;

    /**
     * onPress method
     */
    onPress?: () => void;

    /**
     * onLongPress method
     */
    onLongPress?(): void;

    /**
     * Icon configuration
     */
    icon?: ButtonIcon;

    /**
     * Specify other icon component instead of default. The component will have all values from the icon prop
     *
     * @default MaterialIcon
     * @see https://github.com/oblador/react-native-vector-icons#icon-component
     */
    iconComponent?: typeof Icon

    /**
     * Background color of button
     *
     * @default #397af8
     */
    backgroundColor?: string;

    /**
     * Adds border radius to button
     *  (Note: if you set this, don't forget to also set borderRadius to containerViewStyle prop, otherwise unexpected behaviour might occur)
     *
     * @default 0
     */
    borderRadius?: number;

    /**
     * Font color
     *
     * @default #fff
     */
    color?: string;

    /**
     * Text styling
     *
     * @default null
     */
    textStyle?: RN.TextStyle;

    /**
     * Font size
     *
     * @default 18
     */
    fontSize?: number;

    /**
     * Underlay color for button press
     *
     * @default transparent
     */
    underlayColor?: string;

    /**
     * Flag to add raised button styling
     *
     * @default false
     */
    raised?: boolean;

    /**
     * Indicates button is disabled
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * Disabled button styling
     *
     * @default null
     */
    disabledStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Styling for Component container
     *
     * @default null
     */
    containerViewStyle?: RN.StyleProp<RN.ViewStyle>;
  }

  /**
   * Button component
   *
   * @see https://react-native-training.github.io/react-native-elements/API/buttons/
   */
  class Button extends React.Component<ButtonProps, any> { }

  interface BadgeProps {
    /**
     * Text value to be displayed by badge
     *
     * @default null
     */
    value?: string | number;

    /**
     * Style for the outer badge component
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Style for the outer-most badge component
     */
    wrapperStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Style for the text in the badge
     */
    textStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Override the default badge contents, mutually exclusive with 'value' property
     */
    children?: JSX.Element;

    /**
     * Custom component to replace the badge outer component
     *
     * @default View (if onPress then TouchableOpacity)
     */
    component?: React.ComponentClass;

    /**
     * Function called when pressed on the badge
     */
    onPress?(): void;
  }

  /**
   * Badge component
   *
   * @see https://react-native-training.github.io/react-native-elements/API/badge/
   */
  class Badge extends React.Component<BadgeProps, any> { }

  interface CardProps {
    /**
     * Flex direction (row or column)
     *
     * @default 'column'
     */
    flexDirection?: 'column' | 'row';

    /**
     * Outer container style
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Inner container style
     */
    wrapperStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Card title
     */
    title?: string;

    /**
     * Additional title styling (if title provided)
     */
    titleStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Title rendered over the image
     * (only works if image prop is present)
     */
    featuredTitle?: string;

    /**
     * Styling for featured title
     */
    featuredTitleStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Subtitle rendered over the image
     * (only works if image prop is present)
     */
    featuredSubtitle?: string;

    /**
     * Styling for featured subtitle
     */
    featuredSubtitleStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Additional divider styling
     * (if title provided)
     */
    dividerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Specify different font family
     *
     * @default System font bold (iOS), Sans Serif Bold (android)
     */
    fontFamily?: string;

    /**
     * Specify image styling if image is provided
     */
    imageStyle?: RN.ImageStyle;

    /**
     * Specify styling for view surrounding image
     */
    imageWrapperStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Add an image as the heading with the image prop
     */
    image?: RN.ImageURISource;
  }

  /**
   * Card component
   *
   * @see https://react-native-training.github.io/react-native-elements/API/card/
   */
  class Card extends React.Component<CardProps, any> { }

  /**
   * Set the buttons within a Group.
   */
  interface ElementObject {
    element: JSX.Element | React.ReactType;
  }

  /**
   * Set the border styles for a component.
   */
  interface InnerBorderStyleProperty {
    color?: string;
    width?: number;
  }

  interface ButtonGroupProps {
    /**
     * Current selected index of array of buttons
     */
    selectedIndex: number;

    /**
     * Method to update Button Group Index
     */
    onPress(selectedIndex: number): void;

    /**
     * Array of buttons for component, if returning a component, must be an object with { element: componentName }
     */
    buttons: string[] | ElementObject[];

    /**
     * Choose other button component such as TouchableOpacity
     *
     * @default TouchableHighlight
     */
    component?: React.ComponentClass;

    /**
     * Specify styling for main button container
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * inherited styling	specify styling for button
     */
    buttonStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Specify color for selected state of button
     *
     * @default 'white'
     */
    selectedBackgroundColor?: string;

    /**
     * Specify specific styling for text
     */
    textStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Specify specific styling for text in the selected state
     */
    selectedTextStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * inherited styling	object { width, color }	update the styling of the interior border of the list of buttons
     */
    innerBorderStyle?: InnerBorderStyleProperty;

    /**
     * Specify underlayColor for TouchableHighlight
     *
     * @default 'white'
     */
    underlayColor?: string;

    /**
     * Disables the currently selected button if true
     *
     * @default false
     */
    disableSelected?: boolean;

    /**
     * Determines what the opacity of the wrapped view should be when touch is active.
     */
    activeOpacity?: number;

    /**
     * Border radius for the container
     */
    containerBorderRadius?: number;

    /**
     * Styling for the final border edge
     */
    lastBorderStyle?: RN.StyleProp<RN.TextStyle | RN.ViewStyle>;

    /**
     *
     * Called immediately after the underlay is hidden
     */
    onHideUnderlay?(): void;

    /**
     * Called immediately after the underlay is shown
     */
    onShowUnderlay?(): void;

    /**
     * Animate the touchable to a new opacity.
     */
    setOpacityTo?(value: number): void;
  }

  class ButtonGroup extends React.Component<ButtonGroupProps, any> { }

  interface CheckBoxProps {
    /**
     * Icon family, can be one of the following
     * (required only if specifying an icon that is not from font-awesome)
     */
    iconType?: IconType;

    /**
     *  Specify React Native component for main button
     */
    component?: React.ComponentClass;

    /**
     * Flag for checking the icon
     *
     * @default false
     */
    checked: boolean;

    /**
     * Moves icon to right of text.
     *
     * @default false
     */
    iconRight?: boolean;

    /**
     * Aligns checkbox to right
     *
     * @default false
     */
    right?: boolean;

    /**
     * Aligns checkbox to center
     *
     *  @default false
     */
    center?: boolean;

    /**
     * Title of checkbox
     */
    title?: string | JSX.Element;

    /**
     * Style of main container
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * style of text
     */
    textStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * onLongPress function for checkbox
     */
    onLongPress?(): void;

    /**
     * onLongPress function for checkbox
     */
    onLongIconPress?(): void;

    /**
     * onPress function for container
     */
    onPress?(): void;

    /**
     * onPress function for checkbox
     */
    onIconPress?(): void;

    /**
     * Default checked icon (Font Awesome Icon)
     *
     * @default 'check-square-o'
     */
    checkedIcon?: string;

    /**
     * Default checked icon (Font Awesome Icon)
     *
     * @default 'square-o'
     */
    uncheckedIcon?: string;

    /**
     * Default checked color
     *
     * @default 'green'
     */
    checkedColor?: string;

    /**
     * Default unchecked color
     * @default '#bfbfbf'
     */
    uncheckedColor?: string;

    /**
     * Specify a custom checked message
     */
    checkedTitle?: string;

    /**
     * Specify different font family
     * @default 'System font bold (iOS)'
     * @default 'Sans Serif Bold (android)'
     */
    fontFamily?: string;
  }
  class CheckBox extends React.Component<CheckBoxProps, any> { }

  interface DividerProps {
    /**
     * Style the divider
     *
     * @default {height: 1, backgroundColor: #e1e8ee}
     */
    style?: RN.StyleProp<RN.ViewStyle>;
  }

  class Divider extends React.Component<DividerProps, any> { }

  interface FormValidationMessageProps extends RN.ViewProperties {
    /**
     * Style of the container
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Style of the text within the label message
     */
    labelStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Font family for the message
     */
    fontFamily?: string;
  }
  class FormValidationMessage extends React.Component<
    FormValidationMessageProps,
    any
    > { }

  interface FormInputProps extends RN.TextInputProperties {
    /**
     * RN.TextInput container styling
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * RN.TextInput styling
     */
    inputStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * @deprecated
     * Get ref of RN.TextInput
     */
    textInputRef?(ref: RN.TextInput): void;

    /**
     * @deprecated
     * Get ref of RN.TextInput container
     */
    containerRef?(ref: any): void;

    /**
     * Shake the RN.TextInput if not a falsy value and different from the previous value
     */
    shake?: any;
  }

  class FormInput extends React.Component<FormInputProps, any> {
    /**
     * Holds reference to the stored input.
     */
    input: RN.TextInput;

    /**
     * Shake the RN.TextInput
     *
     * eg `this.formInputRef.shake()`
     */
    shake(): void;

    /**
     * Call focus on the RN.TextInput
     */
    focus(): void;

    /**
     * Call blur on the RN.TextInput
     */
    blur(): void;

    /**
     * Call clear on the RN.TextInput
     */
    clearText(): void;
  }

  interface FormLabelProps extends RN.ViewProperties {
    /**
     * Additional label container style
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Additional label styling
     */
    labelStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Specify different font family
     *
     * @default System font bold (iOS), Sans Serif Bold (android)
     */
    fontFamily?: string;
  }

  class FormLabel extends React.Component<FormLabelProps, any> { }

  interface GridProps extends RN.ViewProperties {
    /**
     * Outer grid styling
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Opacity on pressing
     *
     * @type {number}
     * @memberof GridProps
     */
    activeOpacity?: number;

    /**
     * onPress method
     */
    onPress?(): void;

    children: React.ReactNode;
  }

  /**
   * @deprecated
   * Warning: Grid has been deprecated and will be removed in a future version of React Native Elements
   *
   * @see https://react-native-training.github.io/react-native-elements/API/grid
   */
  class Grid extends React.Component<GridProps, any> { }

  interface SubGridProps extends RN.ViewProperties {
    /**
     * Size for column or row
     */
    size?: number;

    /**
     * Opacity on pressing
     *
     * @default 1
     */
    activeOpacity?: number;

    /**
     * Styling for the outer column or row
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * onPress method
     */
    onPress?(): void;
  }

  /**
   * @deprecated
   * Warning: Row has been deprecated and will be removed in a future version of React Native Elements
   * @see https://react-native-training.github.io/react-native-elements/API/grid/#row
   */
  class Row extends React.Component<SubGridProps, any> { }

  /**
   * @deprecated
   * Warning: Col has been deprecated and will be removed in a future version of React Native Elements
   *
   * @see https://react-native-training.github.io/react-native-elements/API/grid/#column
   *
   */
  class Col extends React.Component<SubGridProps, any> { }

  interface HeaderIcon extends IconObject {
    icon?: string;
  }

  /**
   * Defines the types that can be used in a header sub component
   */
  type HeaderSubComponent = JSX.Element | TextProps | HeaderIcon;

  interface HeaderProps extends RN.ViewProperties {
    /**
     * Accepts all props for StatusBar
     */
    statusBarProps?: RN.StatusBarProperties;

    /**
     * Configuration object for default component (icon: string, ...props for React Native Elements Icon) or a valid React Element	define your left component here
     */
    leftComponent?: HeaderSubComponent;

    /**
     * Configuration object for default component (text: string, ...props for React Native Text component) valid React Element	define your center component here
     */
    centerComponent?: HeaderSubComponent;

    /**
     * Configuration object for default component (icon: string, ...props for React Native Elements Icon component) or a valid React Element	define your right component here
     */
    rightComponent?: HeaderSubComponent;

    /**
     * Sets backgroundColor of the parent component
     */
    backgroundColor?: string;

    /**
     * Styling for outer container
     */
    outerContainerStyles?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Styling for inner container
     */
    innerContainerStyles?: RN.StyleProp<RN.ViewStyle>;
  }

  /**
   * Header component
   * @see https://react-native-training.github.io/react-native-elements/API/header/
   */
  class Header extends React.Component<HeaderProps, any> { }

  type IIconClass = React.ComponentType<IconProps>

  type TTouchable = RN.TouchableNativeFeedbackProperties & RN.TouchableHighlightProperties

  interface IconProps {
    /**
     * Name of icon
     */
    name?: string;

    /**
     * Type (defaults to material, options are material-community, zocial, font-awesome, octicon, ionicon, foundation, evilicon, simple-line-icon, or entypo)
     * @default 'material'
     */
    type?: IconType;

    /**
     * Size of icon
     * @default 26
     */
    size?: number;

    /**
     * Color of icon
     *
     * @default 'black'
     */
    color?: string;

    /**
     * Additional styling to icon
     */
    iconStyle?: RN.StyleProp<RN.TextStyle | RN.ViewStyle>;

    /**
     * View if no onPress method is defined, TouchableHighlight if onPress method is defined	React Native component	update React Native Component
     */
    component?: React.ComponentType<TTouchable>

    /**
     * onPress method for button
     */
    onPress?(): void;

    /**
     * onLongPress method for button
     */
    onLongPress?(): void;

    /**
     * UnderlayColor for press event
     */
    underlayColor?: string;

    /**
     * Reverses color scheme
     *
     * @default false
     */
    reverse?: boolean;

    /**
     * Adds box shadow to button
     *
     * @default false
     */
    raised?: boolean;

    /**
     * Add styling to container holding icon
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Specify reverse icon color
     *
     * @default 'white'
     */
    reverseColor?: string;

    style?: RN.StyleProp<RN.ViewStyle>;
  }

  /**
   * Icon component
   * @see https://react-native-training.github.io/react-native-elements/API/icons/
   */
  class Icon extends React.Component<IconProps, any> { }

  interface ListProps extends RN.ViewProperties {
    /**
     * Style the list container
     * @default '{marginTop: 20, borderTopWidth: 1, borderBottomWidth: 1, borderBottomColor: #cbd2d9}'
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;
  }

  /**
   * List component
   * @see https://react-native-training.github.io/react-native-elements/API/lists/
   */
  class List extends React.Component<ListProps, any> { }

  interface ListItemProps {
    /**
     * Left avatar. This is the React Native Image source prop. Avatar can be used in parallel to leftIcon if needed.
     */
    avatar?: string | RN.ImageURISource;

    /**
     * Avatar styling. This is the React Native Image style prop
     */
    avatarStyle?: RN.ImageStyle;

    /**
     * Avatar outer container styling
     */
    avatarContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Avatar overlay container styling
     */
    avatarOverlayContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Set chevron color
     *
     * @default '#bdc6cf'
     */
    chevronColor?: string;

    /**
     * View or TouchableHighlight if onPress method is added as prop
     * Replace element with custom element
     */
    component?: React.ComponentClass;

    /**
     * Additional main container styling
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Additional wrapper styling
     */
    wrapperStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Define underlay color for TouchableHighlight
     *
     * @default 'white'
     */
    underlayColor?: string;

    /**
     * Specify different font family
     *
     * @default 'HelevticaNeue' (iOS)
     * @default 'Sans Serif' (android)
     */
    fontFamily?: string;

    /**
     * Set if you do not want a chevron
     *
     * @default false
     */
    hideChevron?: boolean;

    /**
     * onPress method for link
     */
    onPress?(): void;

    /**
     * onLongPress method for link
     */
    onLongPress?(): void;

    /**
     * Make left avatar round
     *
     * @default false
     */
    roundAvatar?: boolean;

    /**
     * Main title for list item, can be text or custom view
     */
    title?: string;

    /**
     * Number of lines for title
     *
     * @default 1
     */
    titleNumberOfLines?: number;

    /**
     * Additional title styling
     */
    titleStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Provide styling for title container
     */
    titleContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Subtitle text or custom view
     */
    subtitle?: string | JSX.Element;

    /**
     * Number of lines for Subtitle
     *
     * @default	1
     */
    subtitleNumberOfLines?: number;

    /**
     * Provide styling for subtitle container
     */
    subtitleContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Additional subtitle styling
     */
    subtitleStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Provide a rightTitle to have a title show up on the right side of the button
     */
    rightTitle?: string;

    /**
     * Number of lines for Right Title
     *
     * @default 1
     */
    rightTitleNumberOfLines?: number;

    /**
     * Style the outer container of the rightTitle text
     *
     * @default "{flex: 1, alignItems: 'flex-end', justifyContent: 'center'}""
     */
    rightTitleContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Style the text of the rightTitle text
     *
     * @default "{marginRight: 5, color: '#bdc6cf'}"
     */
    rightTitleStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Add a label with your own styling by providing a label={} prop to ListItem
     */
    label?: JSX.Element;

    /**
     * Icon configuration for left icon, either a name from the icon library (like material) or a React Native element like Image.
     * leftIcon can be used in parallel to avatar if needed.
     * {name, color, style, type}
     * (type defaults to material icons) OR React Native element
     */
    leftIcon?: IconObject | JSX.Element;

    /**
     * Attaches an onPress on left Icon
     */
    leftIconOnPress?(): void;

    /**
     * Attaches an onLongPress on left Icon
     */
    leftIconOnLongPress?(): void;

    /**
     * Underlay color for left Icon
     *
     * @default	'white'
     */
    leftIconUnderlayColor?: string;

    /**
     * {name: 'chevron-right'}	object {name, color, style, type} (type defaults to material icons) OR
     * React Native element	icon configuration for right icon, either a name from the icon library (like material) or a React Native element like Image.
     * Shows up unless hideChevron is set
     */
    rightIcon?: IconObject | JSX.Element;

    /**
     * Attaches an onPress on right Icon
     */
    onPressRightIcon?(): void;

    /**
     * Add a switch to the right side of your component
     *
     * @default false
     */
    switchButton?: boolean;

    /**
     * Add a callback function when the switch is toggled
     */
    onSwitch?(value: boolean): void;

    /**
     * If true the user won't be able to toggle the switch. Default value is false.
     * @default false
     */
    switchDisabled?: boolean;

    /**
     * Background color when the switch is turned on.
     */
    switchOnTintColor?: string;

    /**
     * Color of the foreground switch grip.
     */
    switchThumbTintColor?: string;

    /**
     * Border color on iOS and background color on Android when the switch is turned off.
     */
    switchTintColor?: string;

    /**
     * The value of the switch. If true the switch will be turned on. Default value is false.
     *
     * @default false
     */
    switched?: boolean;

    /**
     * Whether to have the right title area be an input text component.
     *
     * @default false
     */
    textInput?: boolean;

    /**
     * Can tell RN.TextInput to automatically capitalize certain characters.
     */
    textInputAutoCapitalize?: boolean;

    /**
     * Can tell RN.TextInput to automatically capitalize certain characters.
     */
    textInputAutoCorrect?: boolean;

    /**
     * If true, focuses the input on componentDidMount. The default value is false.
     */
    textInputAutoFocus?: boolean;

    /**
     * If false, text is not editable. The default value is true.
     */
    textInputEditable?: boolean;

    /**
     * 	Can be one of the following:
     * 'default', 'email-address', 'numeric', 'phone-pad', 'ascii-capable', 'numbers-and-punctuation', 'url', 'number-pad', 'name-phone-pad', 'decimal-pad', 'twitter', 'web-search'
     */
    textInputKeyboardType?: RN.KeyboardType | RN.KeyboardTypeIOS;

    /**
     * Limits the maximum number of characters that can be entered.
     */
    textInputMaxLength?: number;

    /**
     * If true, the text input can be multiple lines. The default value is false.
     */
    textInputMultiline?: boolean;

    /**
     * 	Callback that is called when the text input's text changes. Changed text is passed as an argument to the callback handler.
     */
    textInputOnChangeText?(text: string): void;

    /**
     * 	Callback that is called when the text input is focused.
     */
    textInputOnFocus?(): void;

    /**
     * Manually set value of the input
     */
    textInputValue?: string;

    /**
     * If true, obscures the text entered so that sensitive text like passwords stay secure.
     */
    textInputSecure?: boolean;

    /**
     * 	Style for the input text
     */
    textInputStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * 	Style for the container surrounding the input text
     */
    textInputContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Placeholder for the text input
     */
    textInputPlaceholder?: string;

    /**
     * 	Callback that is called when the text input is blurred.
     */
    textInputOnBlur?(): void;

    /**
     * If true, all text will automatically be selected on focus.
     */
    textInputSelectTextOnFocus?: boolean;

    /**
     * Determines how the return key should look. For more info see the React Native docs
     */
    textInputReturnKeyType?: string;

    /**
     * Add a badge to the ListItem by using this prop
     *
     */
    badge?: BadgeProps | ElementObject;
  }

  /**
   * ListItem component
   * @see https://react-native-training.github.io/react-native-elements/API/lists/
   */
  class ListItem extends React.Component<ListItemProps, any> { }

  interface ButtonInformation {
    title: string;
    icon: string;
    buttonStyle?: RN.StyleProp<RN.ViewStyle>;
  }

  interface PricingCardProps {
    /**
     * Title
     */
    title?: string;

    /**
     * Price
     */
    price: string;

    /**
     * Color scheme for button & title
     */
    color: string;

    /**
     * Pricing information
     */
    info?: string[];

    /**
     * {title, icon, buttonStyle}
     * Button information
     */
    button: ButtonInformation;

    /**
     * Function to be run when button is pressed
     */
    onButtonPress?(): void;

    /**
     * Outer component styling
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Inner wrapper component styling
     */
    wrapperStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Specify title font family
     *
     * System font (font weight 800) (iOS)
     * Sans Serif Black (android)
     */
    titleFont?: string;

    /**
     * Specify pricing font family
     *
     * System font (font weight 700) (iOS)
     * Sans Serif Bold (android)
     */
    pricingFont?: string;

    /**
     * Specify pricing information font family
     *
     * System font bold (iOS)
     * Sans Serif Bold (android)
     */
    infoFont?: string;

    /**
     * Specify button font family
     *
     * System font (iOS)
     * Sans Serif (android)
     */
    buttonFont?: string;
  }

  /**
   * PricingCard component
   * @see https://react-native-training.github.io/react-native-elements/API/pricing/
   */
  class PricingCard extends React.Component<PricingCardProps, any> { }

  interface RatingProps {
    /**
     * Callback method when the user finishes rating. Gives you the final rating value as a whole number
     */
    onFinishRating(rating: number): void;

    /**
     * Choose one of the built-in types: star, rocket, bell, heart or use type custom to render a custom image
     */
    type?: 'star' | 'rocket' | 'bell' | 'heart' | 'custom';

    /**
     * Pass in a custom image source; use this along with type='custom' prop above
     */
    ratingImage?: RN.ImageURISource | string | number;

    /**
     * Pass in a custom fill-color for the rating icon; use this along with type='custom' prop above
     *
     * @default '#f1c40f'
     */
    ratingColor?: string;

    /**
     * Pass in a custom background-fill-color for the rating icon; use this along with type='custom' prop above
     *
     * @default 'white'
     */
    ratingBackgroundColor?: string;

    /**
     * Number of rating images to display
     *
     * @default 5
     */
    ratingCount?: number;

    /**
     * The size of each rating image
     *
     * @default 50
     */
    imageSize?: number;

    /**
     * Displays the Built-in Rating UI to show the rating value in real-time
     */
    showRating?: boolean;

    /**
     * Whether the rating can be modiefied by the user
     *
     * @default false
     */
    readonly?: boolean;

    /**
     * The initial rating to render
     *
     * @default ratingCount/2
     */
    startingValue?: number;

    /**
     * The number of decimal places for the rating value; must be between 0 and 20
     *
     * @default undefined
     */
    fractions?: number;

    /**
     * Exposes style prop to add additonal styling to the container view
     */
    style?: RN.StyleProp<RN.ViewStyle>;
  }

  /**
   * Rating component
   * @see https://react-native-training.github.io/react-native-elements/API/rating/
   */
  class Rating extends React.Component<RatingProps, any> { }

  interface SearchBarProps extends RN.TextInputProperties {
    /**
     * RN.TextInput container styling
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * RN.TextInput styling
     */
    inputStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * @deprecated
     * Get ref of RN.TextInput
     */
    textInputRef?(ref: RN.TextInput): void;

    /**
     * @deprecated
     * Get ref of RN.TextInput container
     */
    containerRef?(ref: any): void;

    /**
     * Specify color, styling, or another Material Icon Name
     */
    icon?: IconObject;

    /**
     * Remove icon from textinput
     *
     * @default false
     */
    noIcon?: boolean;

    /**
     * @default false		change theme to light theme
     */
    lightTheme?: boolean;

    /**
     * Change RN.TextInput styling to rounded corners
     *
     * @default false
     */
    round?: boolean;

    /**
     * Specify other than the default transparent underline color
     *
     * @default 'transparent'
     */
    underlineColorAndroid?: string;

    /**
     * Specify color, styling of the loading ActivityIndicator effect
     *
     * @default "{ color: '#86939e' }"
     */
    loadingIcon?: IconObject;

    /**
     * Show the loading ActivityIndicator effect
     *
     * @default false
     */
    showLoadingIcon?: boolean;

    /**
     * Set the placeholder text
     *
     * @default ''
     */
    placeholder?: string;

    /**
     * Set the color of the placeholder text
     *
     * @default '#86939e'
     */
    placeholderTextColor?: string;

    /**
     * Method to fire when text is changed
     */
    onChangeText?(text: string): void;

    /**
     * Specify color, styling, or another Material Icon Name
     * (Note: pressing on this icon clears text inside the searchbar)
     *
     * @default "{ color: '#86939e', name: 'search' }"
     */
    clearIcon?: IconObject;
  }

  /**
   * SearchBar component
   * @see https://react-native-training.github.io/react-native-elements/API/searchbar/
   */
  class SearchBar extends React.Component<SearchBarProps, any> {
    /**
     * Holds reference to the stored input.
     */
    input: RN.TextInput;

    /**
     * Call focus on the RN.TextInput
     */
    focus(): void;

    /**
     * Call blur on the RN.TextInput
     */
    blur(): void;

    /**
     * Call clear on the RN.TextInput
     */
    clearText(): void;
  }

  interface SideMenuProps {
    /**
     * Menu component
     */
    menu: JSX.Element;

    /**
     * Props driven control over menu open state
     *
     * @default false
     */
    isOpen?: boolean;

    /**
     * Content view left margin if menu is opened
     *
     * @default ⅔ of device screen width
     */
    openMenuOffset?: number;

    /**
     * Content view left margin if menu is hidden
     */
    hiddenMenuOffset?: number;

    /**
     * Edge distance on content view to open side menu
     *
     * @default 60
     */
    edgeHitWidth?: number;

    /**
     * X axis tolerance
     */
    toleranceX?: number;

    /**
     * Y axis tolerance
     */
    toleranceY?: number;

    /**
     * Disable whether the menu can be opened with gestures or not
     *
     * @default false
     */
    disableGestures?: boolean;

    /**
     * Function that accepts event as an argument and specify if side-menu should react on the touch or not.
     * Check https://facebook.github.io/react-native/docs/gesture-responder-system.html for more details
     */
    onStartShouldSetResponderCapture?(event: RN.GestureResponderEvent): boolean;

    /**
     * Callback on menu open/close. Is passed isOpen as an argument.
     */
    onChange?(isOpen: boolean): void;

    /**
     * Callback on menu move. Is passed left as an argument
     */
    onMove?(left: number): void;

    /**
     * Either 'left' or 'right'.
     *
     * @default 'left'
     */
    menuPosition?: string;

    /**
     * Function that accept 2 arguments (prop, value) and return an object:
     * - animation you should use at the place you specify parameter to animate
     * - newOffset you should use to specify the final value of prop
     */
    animationFunction?(
      animation: RN.Animated.Value,
      newOffset: number
    ): RN.Animated.CompositeAnimation;

    /**
     * Function that accept 1 argument (value) and return an object
     * - leftOffset you should use at the place you need current value of animated parameter (left offset of content view)
     */
    animationStyle?(leftOffset: number): RN.StyleProp<RN.TransformsStyle>;

    /**
     * When true, content view will bounce back to openMenuOffset when dragged further
     *
     * @default true
     */
    bounceBackOnOverdraw?: boolean;
  }

  /**
   * @deprecated
   * Warning: SideMenu has been deprecated and will be removed in a future version of React Native Elements. For a complete navigation solution that includes SideMenu(Drawer) as well as many other
   * features, be sure to check out react-navigation (https://reactnavigation.org) and it's DrawerNavigator.
   *
   * SideMenu component
   * @see https://react-native-training.github.io/react-native-elements/API/side_menu/
   */
  class SideMenu extends React.Component<SideMenuProps, any> { }

  interface SliderProps {
    /**
     * Initial value of the slider
     *
     * @default 0
     */
    value?: number;

    /**
     * If true the user won't be able to move the slider
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * Initial minimum value of the slider
     *
     * @default	0
     */
    minimumValue?: number;

    /**
     * Initial maximum value of the slider
     *
     * @default 1
     */
    maximumValue?: number;

    /**
     * Step value of the slider. The value should be between 0 and maximumValue - minimumValue)
     *
     * @default 0
     */
    step?: number;

    /**
     * The color used for the track to the left of the button
     *
     * @default '#3f3f3f'
     */
    minimumTrackTintColor?: string;

    /**
     * The color used for the track to the right of the button
     *
     * @default '#b3b3b3'
     */
    maximumTrackTintColor?: string;

    /**
     * The color used for the thumb
     *
     * @default '#343434'
     */
    thumbTintColor?: string;

    /**
     * The size of the touch area that allows moving the thumb. The touch area has the same center as the visible thumb.
     * This allows to have a visually small thumb while still allowing the user to move it easily.
     *
     * @default "{width: 40, height: 40}"
     */
    thumbTouchSize?: {
      width?: number;
      height?: number;
    };

    /**
     * Callback continuously called while the user is dragging the slider
     */
    onValueChange?(value: number): void;

    /**
     * Callback called when the user starts changing the value (e.g. when the slider is pressed)
     */
    onSlidingStart?(value: number): void;

    /**
     * Callback called when the user finishes changing the value (e.g. when the slider is released)
     */
    onSlidingComplete?(value: number): void;

    /**
     * The style applied to the slider container
     */
    style?: RN.StyleProp<RN.ViewStyle>;

    /**
     * The style applied to the track
     */
    trackStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * The style applied to the thumb
     */
    thumbStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Set this to true to visually see the thumb touch rect in green.
     *
     * @default false
     */
    debugTouchArea?: boolean;

    /**
     * Set to true if you want to use the default 'spring' animation
     *
     * @default false
     */
    animateTransitions?: boolean;

    /**
     * Set to 'spring' or 'timing' to use one of those two types of animations with the default animation properties.
     *
     * @default 'timing'
     */
    animationType?: 'spring' | 'timing';

    /**
     * Used to configure the animation parameters. These are the same parameters in the Animated library.
     *
     * @default undefined
     */
    animationConfig?:
    | RN.Animated.TimingAnimationConfig
    | RN.Animated.SpringAnimationConfig;
  }

  /**
   * Slider component
   * @see https://react-native-training.github.io/react-native-elements/API/slider/
   */
  class Slider extends React.Component<SliderProps, any> { }

  type SocialMediaType =
    | 'facebook'
    | 'twitter'
    | 'google-plus-official'
    | 'pinterest'
    | 'linkedin'
    | 'youtube'
    | 'vimeo'
    | 'tumblr'
    | 'instagram'
    | 'quora'
    | 'foursquare'
    | 'wordpress'
    | 'stumbleupon'
    | 'github'
    | 'github-alt'
    | 'twitch'
    | 'medium'
    | 'soundcloud'
    | 'gitlab'
    | 'angellist'
    | 'codepen';

  interface SocialIconProps {
    /**
     * Title if made into a button
     */
    title?: string;

    /**
     * Social media type
     */
    type: SocialMediaType;

    /**
     * Adds a drop shadow, set to false to remove
     *
     * @default true
     */
    raised?: boolean;

    /**
     * Creates button
     *
     * @default false
     */
    button?: boolean;

    /**
     * onPress method
     */
    onPress?(): void;

    /**
     * @default none	function	onLongPress method
     */
    onLongPress?(): void;

    /**
     * Reverses icon color scheme, setting background to white and icon to primary color
     *
     * @default false
     */
    light?: boolean;

    /**
     * Extra styling for icon component
     */
    iconStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Button styling
     */
    style?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Icon color
     */
    iconColor?: string;

    /**
     * Icon size
     *
     * @default 24
     */
    iconSize?: number;

    /**
     * Component Type of button
     *
     * @default TouchableHighlight
     */
    component?: React.ComponentClass;

    /**
     * Specify different font family
     *
     * @default System font bold (iOS), Sans Serif Black (android)
     */
    fontFamily?: string;

    /**
     * Specify font weight of title if set as a button with a title
     *
     * @default bold (ios), black(android)
     */
    fontWeight?: string;

    /**
     * Specify text styling
     */
    fontStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Disable button
     *
     * @default false
     */
    disabled?: boolean;

    /**
     * Shows loading indicator
     *
     * @default false
     */
    loading?: boolean;
  }

  /**
   * SocialIcon component
   * @see https://react-native-training.github.io/react-native-elements/API/social_icons/
   */
  class SocialIcon extends React.Component<SocialIconProps, any> { }

  interface SwipeDeckProps<D> {
    /**
     * An array of data object which contains each card details.
     */
    data: ReadonlyArray<D>;

    /**
     * A function that takes a card as a prop and renders it with custom UI
     */
    renderCard(card: D): JSX.Element;

    /**
     * A function that renders custom UI when no more cards are present
     */
    renderNoMoreCards?(): JSX.Element;

    /**
     * function	function	A callback function that takes a card as a prop and take the approriate action when the user swipes the card right
     */
    onSwipeRight?(card: D): void;

    /**
     * function	function	A callback function that takes a card as a prop and take the approriate action when the user swipes the card left
     */
    onSwipeLeft?(card: D): void;
  }

  /**
   * SwipeDeck component
   * @see https://react-native-training.github.io/react-native-elements/API/swipedeck/
   */
  class SwipeDeck<D = any> extends React.Component<
    SwipeDeckProps<D>,
    any
    > { }

  interface TileProps {
    /**
     * Icon Component Props
     */
    icon?: IconObject;

    /**
     * Styling for the outer icon container
     */
    iconContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Text inside the tile
     */
    title?: string;

    /**
     * Styling for the title
     */
    titleStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Text inside the tile when tile is featured
     */
    caption?: string;

    /**
     * Styling for the caption
     */
    captionStyle?: RN.StyleProp<RN.TextStyle>;

    /**
     * Changes the look of the tile
     */
    featured?: boolean;

    /**
     * @default none	object (style)	Styling for the outer tile container
     */
    containerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Source for the image
     */
    imageSrc: RN.ImageURISource | string | number;

    /**
     * Styling for the image
     */
    imageContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * @default none	function (event)	Function to call when tile is pressed
     */
    onPress?(): void;

    /**
     * Number passed to control opacity on press
     *
     * @default 0.2
     */
    activeOpacity?: number;

    /**
     * Styling for bottom container when not featured tile
     */
    contentContainerStyle?: RN.StyleProp<RN.ViewStyle>;

    /**
     * Width for the tile
     *
     * @default Device Width
     */
    width?: number;

    /**
     * Height for the tile
     *
     * @default Device Width * 0.8
     */
    height?: number;
  }

  /**
   * Tile component
   * @see https://react-native-training.github.io/react-native-elements/API/tile/
   */
  class Tile extends React.Component<TileProps, any> { }

  /**
   * Colors
   */

  interface Colors {
    readonly primary: string;
    readonly primary1: string;
    readonly primary2: string;
    readonly secondary: string;
    readonly secondary2: string;
    readonly secondary3: string;
    readonly grey0: string;
    readonly grey1: string;
    readonly grey2: string;
    readonly grey3: string;
    readonly grey4: string;
    readonly grey5: string;
    readonly dkGreyBg: string;
    readonly greyOutline: string;
    readonly searchBg: string;
    readonly disabled: string;
    readonly white: string;
    readonly error: string;
    readonly [key: string]: string;
  }

  const colors: Colors;

  /* Utility Functions */

  /**
   * TODO make the Icon Type an of the react-native-vector-icons type definitions.
   */
  function getIconType(type: IconType): any;

  /**
   * Method to normalize size of fonts across devices
   */
  function normalize(size: number): number;
}