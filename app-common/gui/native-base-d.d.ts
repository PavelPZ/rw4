declare namespace NativeBase {
  export interface Text extends ReactNative.TextProperties {
    note?: boolean;
    uppercase?: boolean;
  }

  export interface Switch extends ReactNative.SwitchProperties { }

  export interface View extends ReactNative.ViewProperties {
    padder?: boolean;
  }

  export interface Picker extends ReactNative.PickerProperties {
    iosHeader?: string;
    inlineLabel?: boolean;
    headerBackButtonText?: string;
  }

  export interface H1 extends ReactNative.TextProperties { }
  /**
       * see Widget Text.js
       */
  export interface H2 extends ReactNative.TextProperties { }
  /**
       * see Widget Text.js
       */
  export interface H3 extends ReactNative.TextProperties { }
  /**
       * see Widget Text.js
       */
  export interface BsStyle {
    success?: boolean;
    primary?: boolean;
    danger?: boolean;
    warning?: boolean;
    info?: boolean;
  }

  export interface Badge extends ReactNative.ViewProperties, BsStyle { }
  /**
       * see Widget CardSwiper.js
       */
  export interface CardSwiper { }
  /**
       * see Widget DeckSwiper.js
       */
  export interface DeckSwiper {
    /**
           * Array<any>
           */
    dataSource?: Array<any>;
    /**
           * Direction of iteration for elements
           * Default: iterates in backward direction
           */
    onSwipeLeft?: Function;
    /**
           * Direction of iteration for elements
           * Default: iterates in forward direction
           */
    onSwipeRight?: Function;
    /**
           * Takes a data entry from the data source and should return a renderable component to be rendered as the row.
           */
    renderItem?: Function;
  }
  /**
       * see Widget Header.js
       */
  export interface Header {
    /**
           * Prop to be used with <Header> component to have Search bar onto the Header section of your screen.
           */
    searchBar?: boolean;
    /**
           * Wraps the search bar with predefined border options.
           * Default: regular
           */
    rounded?: boolean;
    style?: ReactNative.ViewStyle;
    /**
           * It is advisable to use hasTabs prop with Header while using Tab
           */
    hasTabs?: boolean;
    noShadow?: boolean;
  }

  export interface Left {
    style?: ReactNative.ViewStyle;
  }

  export interface Body {
    style?: ReactNative.ViewStyle;
  }

  export interface Right {
    style?: ReactNative.ViewStyle;
  }

  /**
       * see Widget FooterTab.js
       */
  export interface FooterTab {
    style?: ReactNative.ViewStyle;
  }
  /**
       * see Widget Footer.js
       */
  export interface Footer {
    style?: ReactNative.ViewStyle;
  }
  /**
       * see Widget Title.js
       */
  export interface Title {
    style?: ReactNative.ViewStyle;
  }
  /**
       * see Widget Subtitle/index.js
       */
  export interface SubTitle {
    style?: ReactNative.ViewStyle;
  }
  /**
       * see Widget Container.js
       */
  export interface Container {
    /**
           * The theme prop can be applied to any component of NativeBase.
           */
    theme?: Object;
    style?: ReactNative.ViewStyle;
  }
  /**
       * see Widget Content.js
       */
  export interface Content {
    /**
           * The theme prop can be applied to any component of NativeBase.
           */
    theme?: Object;
    padder?: boolean;
    disableKBDismissScroll?: boolean;
    enableResetScrollToCoords?: boolean;
    style?: ReactNative.ViewStyle;
    contentContainerStyle?: ReactNative.ViewStyle;
  }
  /**
       * see Widget Button.js
       */
  export interface Button extends ReactNative.TouchableOpacityProperties, BsStyle {
    /**
           * Defines button style
           */
    style?: ReactNative.ViewStyle;
    /**
           * Defines button text style
           */
    textStyle?: ReactNative.TextStyle;
    /**
           * Block level button
           */
    block?: boolean;
    //primary?: boolean,
    /**
           * Gives you effect of Icon-buttons.
           * To have button with transparent background, include this prop.
           */
    transparent?: boolean;
    //success?: boolean,
    //danger?: boolean,
    // warning?: boolean,
    //info?: boolean,
    color?: string;
    /**
           * Applies outline button style.
           */
    bordered?: boolean;
    /**
           * Renders button with slightly round shaped edges.
           */
    rounded?: boolean;
    /**
           * For large size button
           */
    large?: boolean;
    /**
           * For small size button
           */
    small?: boolean;
    /**
           * Used for Icon alignment.
           * Aligns icon to the left in button.
           * By default, icons are aligned to the left in button.
           */
    iconLeft?: boolean;
    /**
           * Used for Icon alignment.
           * Aligns icon to the right in button.
           */
    iconRight?: boolean;
    /**
           * Disables onPress option for button
           */
    disabled?: boolean;
    active?: boolean;
    inputButton?: boolean;
    full?: boolean;
    light?: boolean;
    dark?: boolean;
    /**
           * [android] colored ripple effect
           */
    androidRippleColor?: string;
  }
  /**

       * see Widget List.js
       */
  export interface List extends ReactListViewProperties {
    listBorderColor?: string;
    listDividerBg?: string;
    listNoteColor?: string;
    listItemPadding?: number;
    listNoteSize?: number;
    listItemHeight?: number;
    inset?: boolean;
    /**
           * Array of data chunks to render iteratively.
           */
    dataArray?: Array<any>;
    renderRow?: (
      rowData: any,
      sectionID: string | number,
      rowID: string | number,
      highlightRow?: boolean
    ) => React.ReactElement<any>;
  }
  /**
       * see Widget ListItem.js
       */
  export interface ListItem extends ReactNative.TouchableOpacityProperties {
    header?: boolean;
    noBorder?: boolean;
    /**
           * Aligns icon to the right of ListItem.
           * Default: false
           */
    iconRight?: boolean;
    /**
           * Aligns icon to the left of ListItem.
           * Default: true
           */
    iconLeft?: boolean;
    icon?: boolean;
    button?: boolean;
    /**
           * Helps to organize and group the list items.
           */
    itemDivider?: boolean;
    /**
           * Sub caption for List Item.
           */

    note?: string;
    itemHeader?: boolean;
    first?: boolean;
    selected?: boolean;
    /**
           * [android] colored ripple effect
           */
    androidRippleColor?: string;
  }

  export interface Separator {
    bordered?: boolean;
  }

  /**
       * see Widget CardItem.js
       */
  export interface CardItem extends ReactNative.TouchableOpacityProperties {
    header?: boolean;
    footer?: boolean;
    cardBody?: boolean;
    button?: boolean;
  }
  /**
       * Override React ListViewProperties
       */
  export interface ReactListViewProperties
    extends ReactNative.ScrollViewProperties,
    React.Props<ReactNative.ListViewStatic> {
    /**
           * Flag indicating whether empty section headers should be rendered.
           * In the future release empty section headers will be rendered by
           * default, and the flag will be deprecated. If empty sections are not
           * desired to be rendered their indices should be excluded from
           * sectionID object.
           */
    enableEmptySections?: boolean;

    /**
           * How many rows to render on initial component mount.  Use this to make
           * it so that the first screen worth of data apears at one time instead of
           * over the course of multiple frames.
           */
    initialListSize?: number;

    /**
           * (visibleRows, changedRows) => void
           *
           * Called when the set of visible rows changes.  `visibleRows` maps
           * { sectionID: { rowID: true }} for all the visible rows, and
           * `changedRows` maps { sectionID: { rowID: true | false }} for the rows
           * that have changed their visibility, with true indicating visible, and
           * false indicating the view has moved out of view.
           */
    onChangeVisibleRows?: (
      visibleRows: Array<{ [sectionId: string]: { [rowID: string]: boolean } }>,
      changedRows: Array<{ [sectionId: string]: { [rowID: string]: boolean } }>
    ) => void;

    /**
           * Called when all rows have been rendered and the list has been scrolled
           * to within onEndReachedThreshold of the bottom.  The native scroll
           * event is provided.
           */
    onEndReached?: () => void;

    /**
           * Threshold in pixels for onEndReached.
           */
    onEndReachedThreshold?: number;

    /**
           * Number of rows to render per event loop.
           */
    pageSize?: number;

    /**
           * A performance optimization for improving scroll perf of
           * large lists, used in conjunction with overflow: 'hidden' on the row
           * containers.  Use at your own risk.
           */
    removeClippedSubviews?: boolean;

    /**
           * () => renderable
           *
           * The header and footer are always rendered (if these props are provided)
           * on every render pass.  If they are expensive to re-render, wrap them
           * in StaticContainer or other mechanism as appropriate.  Footer is always
           * at the bottom of the list, and header at the top, on every render pass.
           */
    renderFooter?: () => React.ReactElement<any>;

    /**
           * () => renderable
           *
           * The header and footer are always rendered (if these props are provided)
           * on every render pass.  If they are expensive to re-render, wrap them
           * in StaticContainer or other mechanism as appropriate.  Footer is always
           * at the bottom of the list, and header at the top, on every render pass.
           */
    renderHeader?: () => React.ReactElement<any>;

    /**
           * (rowData, sectionID, rowID) => renderable
           * Takes a data entry from the data source and its ids and should return
           * a renderable component to be rendered as the row.  By default the data
           * is exactly what was put into the data source, but it's also possible to
           * provide custom extractors.
           */
    renderRow?: (
      rowData: any,
      sectionID: string | number,
      rowID: string | number,
      highlightRow?: boolean
    ) => React.ReactElement<any>;

    /**
           * A function that returns the scrollable component in which the list rows are rendered.
           * Defaults to returning a ScrollView with the given props.
           */
    renderScrollComponent?: (
      props: ReactNative.ScrollViewProperties
    ) => React.ReactElement<ReactNative.ScrollViewProperties>;

    /**
           * (sectionData, sectionID) => renderable
           *
           * If provided, a sticky header is rendered for this section.  The sticky
           * behavior means that it will scroll with the content at the top of the
           * section until it reaches the top of the screen, at which point it will
           * stick to the top until it is pushed off the screen by the next section
           * header.
           */
    renderSectionHeader?: (sectionData: any, sectionId: string | number) => React.ReactElement<any>;

    /**
           * (sectionID, rowID, adjacentRowHighlighted) => renderable
           * If provided, a renderable component to be rendered as the separator below each row
           * but not the last row if there is a section header below.
           * Take a sectionID and rowID of the row above and whether its adjacent row is highlighted.
           */
    renderSeparator?: (
      sectionID: string | number,
      rowID: string | number,
      adjacentRowHighlighted?: boolean
    ) => React.ReactElement<any>;

    /**
           * How early to start rendering rows before they come on screen, in
           * pixels.
           */
    scrollRenderAheadDistance?: number;

    /**
           * An array of child indices determining which children get docked to the
           * top of the screen when scrolling. For example, passing
           * `stickyHeaderIndices={[0]}` will cause the first child to be fixed to the
           * top of the scroll view. This property is not supported in conjunction
           * with `horizontal={true}`.
           * @platform ios
           */
    stickyHeaderIndices?: number[];

    ref?: React.Ref<ReactNative.ListViewStatic & ReactNative.ScrollViewStatic & ReactNative.ViewStatic>;
  }
  /**
       * see Widget Card.js
       */
  export interface Card extends ReactNative.ViewProperties, ReactListViewProperties {
    dataArray?: Array<any>;
    style?: ReactNative.ViewStyle;
    ref?: React.Ref<ReactNative.ViewProperties | ReactListViewProperties>;
  }
  /**
       * react-native-easy-grid
       */
  export interface Grid extends ReactNative.ViewProperties { }
  export interface Row extends ReactNative.ViewProperties {
    size?: number;
  }
  export interface Col extends ReactNative.ViewProperties {
    size?: number;
  }
  /**
       * see Widget InputGroup.js
       */
  export interface InputGroup extends ReactNative.ViewProperties {
    /**
           * Wraps the textbox with predefined border options.
           * Default: underline
           */
    borderType?: "rounded" | "regular" | "underline";
    toolbar?: boolean;
    atoolbar?: boolean;
    /**
           * If true, the icon in the input text box appears to the right.
           * Default: true
           */
    iconRight?: boolean;
    /**
           * The border color of textbox for valid input.
           */
    success?: boolean;
    /**
           * The border color of textbox for invalid input.
           */
    error?: boolean;
    /**
           * Disables inputting data.
           */
    disabled?: boolean;
    regular?: boolean;
    underline?: boolean;
    rounded?: boolean;
  }
  /**
       * see Widget Input.js
       */
  export interface Input extends ReactNative.TextInputProperties {
    label?: string;
    /**
           * Label placed to the left of the input element.
           * When the user enters text, the label does not hide.
           * This can also be used along with placeholder.
           */
    inlineLabel?: boolean;
    /**
           * Places the label on top of the input element which appears like a stack.
           * This can also be used along with placeholder.
           */
    stackedLabel?: boolean;
  }
  /**
       * see Widget Textarea.js
       */
  export interface Textarea extends ReactNative.TextInputProperties {
    rowSpan: number;
  }

  export interface Label {
    style?: ReactNative.TextStyle;
  }
  /**
       * see Widget Icon.js
       */
  export interface Icon {
    name: string;
    // TODO position attribute of ReactNative.FlexStyle hasn't another position values without "absolute" and "relative"
    style?: any;
    onPress?: (e?: any) => any;
    active?: boolean;
    ios?: string;
    android?: string;
    color?: string;
    fontSize?: number;
  }
  /**
       * see Widget Icon.js
       */
  export interface Thumbnail extends ReactNative.ImageProperties {
    /**
           * Dimension of thumbnail.
           * Default: 30
           */
    size?: number;
    /**
           * Represents shape of thumbnail.
           * By default thumbnail is circle in shape.
           */
    circular?: boolean;
    /**
           * Represents shape of thumbnail.
           * By default thumbnail is circle in shape.
           */
    square?: boolean;
  }
  /**
       * see Widget Spinner.js
       */
  export interface Spinner extends ReactNative.ActivityIndicatorProperties {
    inverse?: boolean;
  }
  /**
       * see Widget CheckBox.js
       */
  export interface CheckBox {
    checked?: boolean;
  }
  /**
       * see Widget CheckBox.js
       */
  export interface Radio extends ReactNative.TouchableOpacityProperties {
    selected?: boolean;
  }
  /**
       * see Widget ProgressBar.js
       */
  export interface ProgressBar {
    progress?: number;
    color?: string;
    inverse?: boolean;
  }
  /**
       * vendor react-native-drawer
       */
  export interface DrawerStyles {
    drawer?: ReactNative.ViewStyle;
    main?: ReactNative.ViewStyle;
    drawerOverlay?: ReactNative.ViewStyle;
    mainOverlay?: ReactNative.ViewStyle;
  }
  export interface Drawer {
    acceptDoubleTap?: boolean;
    acceptPan?: boolean;
    acceptTap?: boolean;
    captureGestures?: boolean;
    children?: any; open?: boolean;
    closedDrawerOffset?: number;
    content?: any;
    deviceScreen?: ReactNative.ScaledSize;
    disabled?: boolean;
    initializeOpen?: boolean;
    negotiatePan?: boolean;
    onClose?: Function;
    onCloseStart?: Function;
    onOpen?: Function;
    onOpenStart?: Function;
    openDrawerOffset?: number;
    openDrawerThreshold?: number;
    panCloseMask?: number;
    panOpenMask?: number;
    panStartCompensation?: boolean;
    relativeDrag?: boolean;
    side?: "left" | "right";
    styles?: DrawerStyles;
    tapToClose?: boolean;
    tweenDuration?: number;
    tweenEasing?: string;
    tweenHandler?: Function;
    type?: "overlay" | "static" | "displace";
  }
  /**
       * see Widget Tabs.js
       */
  export interface Tabs {
    tabBarPosition?: "top" | "bottom";
    edgeHitWidth?: number;
    springTension?: number;
    springFriction?: number;
    onChangeTab?: Function;
    locked?: boolean;
    initialPage?: number;
  }

  export interface Tab {
    heading: TabHeading;
  }
  export interface TabHeading {
    activeTabStyle?: ReactNative.ViewStyle;
    textStyle?: ReactNative.TextStyle;
    activeTextStyle?: ReactNative.TextStyle;
  }

  export interface Item {
    fixedLabel?: boolean;
    floatingLabel?: boolean;
    inlineLabel?: boolean;
    stackedLabel?: boolean;
    placeholderLabel?: boolean;
    bordered?: boolean;
    regular?: boolean;
    underline?: boolean;
    rounded?: boolean;
    disabled?: boolean;
    error?: boolean;
    placeholder?: string;
    secureTextEntry?: boolean;
    success?: boolean;
    last?: boolean;
  }

  export interface Form {
    style?: ReactNative.ViewStyle;
  }

  export interface Fab {
    active?: boolean;
    direction?: "down" | "up" | "left" | "right";
    containerStyle?: ReactNative.ViewStyle;
    onPress?: () => void;
    position?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
    style?: ReactNative.ViewStyle;
  }

  export interface Image extends ReactNative.TextProperties { }

  export interface Segment extends ReactNative.TextProperties { }

  export interface StyleProvider {
    style?: any;
  }
}