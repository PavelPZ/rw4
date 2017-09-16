//based on https://github.com/react-native-community/react-native-tab-view/blob/master/src/TabViewTypeDefinitions.js

declare module 'react-native-tab-view' {

  import React from 'react'

  export type Route<T extends { key: string, testID?: string }> = T

  export type NavigationState<T extends { key: string }> = {
    index: number,
    routes: Array<T>,
  }

  export type Scene<T> = {
    route: T,
    focused: boolean,
    index: number,
  }

  export type Layout = {
    height: number,
    width: number,
  }

  export type SceneRendererProps<T extends { key: string }> = {
    layout: Layout & {
      measured: boolean,
    },
    navigationState: NavigationState<T>,
    position: ReactNative.Animated.Value,
    jumpToIndex: (index: number) => void,
    getLastPosition: () => number,
    subscribe: (event: SubscriptionName, callback: Function) => { remove: Function },
  }

  export type SubscriptionName = 'reset' | 'position';

  export type TransitionProps = {
    progress: number,
  }

  export type TransitionSpec = {
    timing: Function,
  }

  export type TransitionConfigurator = (
    currentTransitionProps: TransitionProps,
    nextTransitionProps: TransitionProps
  ) => TransitionSpec

  export type PagerProps = {
    configureTransition?: TransitionConfigurator,
    animationEnabled?: boolean,
    swipeEnabled?: boolean,
    swipeDistanceThreshold?: number,
    swipeVelocityThreshold?: number,
    children?,
  };

  export interface SceneMapStatic {
    [key: string]: any
  }

  export interface TabViewAnimatedProps extends ReactNative.ViewProperties, TabViewPagerPanProps {
    navigationState: any
    onIndexChange?: (index: number) => void
    onRequestChangeTab?: (index: number) => void
    canJumpToTab?: (route) => boolean 
    lazy?: boolean
    initialLayout?: {width:number, height:number}

    renderScene: SceneMapStatic
    renderHeader?: (props: any) => JSX.Element
    renderFooter?: (props: any) => JSX.Element
    renderPager?: (props: any) => JSX.Element
  }

  export interface TabViewPagerPanProps extends ReactNative.ViewProperties {
    animationEnabled?: boolean
    swipeEnabled?: boolean
    swipeDistanceThreshold?: number 
    swipeVelocityThreshold?: number 
    onSwipeStart?: () => void
    onSwipeEnd ?:()=> void
  }

  export interface TabBarProps {
    labelStyle?: ReactNative.TextStyle
    indicatorStyle?: ReactNative.ViewStyle
    renderBadge?(scene: any): JSX.Element
    renderLabel?(scene: any): JSX.Element
    style?: ReactNative.ViewStyle
    scrollEnabled?: boolean,
    activeTextColor?: string,
    inactiveTextColor?: string,
  }

  export function SceneMap(map: SceneMapStatic): SceneMapStatic

  export class TabViewAnimated extends React.Component<TabViewAnimatedProps> { }
  export class TabBar extends React.Component<TabBarProps> { }
  export class TabViewPagerPan extends React.Component<TabViewPagerPanProps> { }

}