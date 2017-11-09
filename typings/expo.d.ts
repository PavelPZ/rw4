﻿// tslint:disable:ban-types
// tslint:disable:interface-over-type-literal
// tslint:disable:max-classes-per-file

declare module 'expo' {
  import { ColorPropType } from 'react-native'
  import { Component } from 'react'
  // tslint:disable-next-line:no-implicit-dependencies - fbemitter is included by Expo.
  import { EventSubscription } from 'fbemitter'
  import { GestureResponderEvent } from 'react-native'
  import { PanResponderGestureState } from 'react-native'
  import { ViewProperties } from 'react-native'
  import { ViewStyle } from 'react-native'
  import { ImageURISource } from 'react-native'

  export namespace Accelerometer {
    // TODO: good export type of x, y and z
    export interface AccelerometerObject {
      x: any
      y: any
      z: any
    }

    export function addListener(listener: (obj: AccelerometerObject) => any): EventSubscription
    export function removeAllListeners(): void
    export function setUpdateInterval(intervalMs: number): void
  }

  export namespace Amplitude {
    export function initialize(apiKey: string): void
    export function setUserId(userId: string): void
    export function setUserProperties(userProperties: object): void    // TODO: add userProperties definition from amplitude doc
    export function clearUserProperties(): void
    export function logEvent(eventName: string): void
    export function logEventWithProperties(eventName: string, properties: object): void
    export function setGroup(groupType: string, groupNames: object): void
  }

  class Asset {
    constructor(options: {
      hash: string,
      height: number,
      name: string,
      type: string,
      uri: string,
      width: number
    })

    public hash: string
    public height: number
    public localUri: string
    public name: string
    public type: string
    public uri: string
    public width: number

    public readonly downloading: boolean
    public readonly downloaded: boolean
    public downloadAsync(): Promise<void>

    public static loadAsync(moduleId: number): Promise<void>
    static fromModule(moduleId: number): Asset
  }

  export namespace Audio {

    export enum InterruptionModeIOS {
      INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS = 0,
      INTERRUPTION_MODE_IOS_DO_NOT_MIX = 1,
      INTERRUPTION_MODE_IOS_DUCK_OTHERS = 2
    }

    export enum InterruptionModeAndroid {
      INTERRUPTION_MODE_ANDROID_DO_NOT_MIX = 1,
      INTERRUPTION_MODE_ANDROID_DUCK_OTHERS = 2
    }

    export type SoundStatus =
      {
        isLoaded: false
      } | {
        isLoaded: true,
        isPlaying: boolean,
        durationMillis: number,
        positionMillis: number,
        rate: number,
        shouldCorrectPitch: boolean,
        volume: number,
        isMuted: boolean,
        isLooping: boolean,
        didJustFinish: boolean
      }

    export type RecordingStatus =
      {
        canRecord: false,
        isDoneRecording: false
      } | {
        canRecord: true,
        isRecording: boolean,
        durationMillis: number
      } | {
        canRecord: false,
        isDoneRecording: true,
        durationMillis: number
      }

    export type AudioMode = {
      allowsRecordingIOS: boolean,
      interruptionModeIOS: InterruptionModeIOS,
      playsInSilentLockedModeIOS: boolean,
      interruptionModeAndroid: InterruptionModeAndroid,
      shouldDuckAndroid: boolean
    }

    export function setAudioModeAsync(mode: AudioMode): Promise<void>  // TODO: better return

    /**
     * Expo Sound
     */
    export interface SoundOptions {
      source: number | string | Asset
    }

    export class Sound {
      constructor(options: SoundOptions)

      public getStatusAsync(): Promise<SoundStatus>
      public setCallback(callback: (status: SoundStatus) => any): void
      public setCallbackPollingMillis(millis: number): void

      public unloadAsync(): Promise<SoundStatus>
      public playAsync(): Promise<SoundStatus>
      public pauseAsync(): Promise<SoundStatus>
      public stopAsync(): Promise<SoundStatus>
      public setPositionAsync(millis: number): Promise<SoundStatus>
      public setRateAsync(
        value: number,
        shouldCorrectPitch: boolean
      ): Promise<SoundStatus>
      public setVolumeAsync(value: number): Promise<SoundStatus>
      public setIsMutedAsync(value: boolean): Promise<SoundStatus>
      public setIsLoopingAsync(value: boolean): Promise<SoundStatus>
    }

    export class Recording {
      constructor();

      public getStatusAsync(): Promise<RecordingStatus>
      public setCallback(callback: (status: RecordingStatus) => any): void
      public setCallbackPollingMillis(millis: number): void

      public prepareToRecordAsync(): Promise<RecordingStatus>
      public isPreparedToRecord(): boolean  // Note @pierre-H : I found this function on the v16.0.0 doc, not in the code so have to check it.
      public startAsync(): Promise<RecordingStatus>
      public pauseAsync(): Promise<RecordingStatus>
      public stopAndUnloadAsync(): Promise<RecordingStatus>

      public getURI(): string | undefined
      public getNewSound(): Sound | null
    }
  }

  export namespace Brightness {
    export function getBrightnessAsync(): Promise<number>
    export function getSystemBrightnessAsync(): Promise<number>
    export function setBrightnessAsync(brightnessValue: number): Promise<void>
    export function setSystemBrightnessAsync(brightnessValue: number): Promise<void>
  }

  export namespace Constants {
    type Platform = {
      ios: {
        model: string,
        platform: string,
        systemVersion: string,
        userInterfaceIdiom: string
      }
    }

    /** 'expo': Running inside the Expo client. 'standalone': Standalone app. 'guest': Opened through a link from a standalone app. */
    export const appOwnership: 'expo' | 'standalone' | 'guest'

    export const deviceId: string

    export const deviceName: string

    /** The year the device would be considered "high end". Might be Android only. */
    export const deviceYearClass: number

    /** The version string of the Expo client currently running. */
    export const expoVersion: string

    /** Gets the user agent string which would be included in requests sent by a web view running on this device. */
    export function getWebViewUserAgentAsync(): Promise<string>

    /** true if the app is running on a device, false if running in a simulator or emulator. */
    export const isDevice: boolean

    export const linkingUri: string

    /** See https://docs.expo.io/versions/latest/guides/how-expo-works.html#expo-manifest. */
    export const manifest: any

    export const platform: Platform

    export const sessionId: string

    export const statusBarHeight: number

    export const systemFonts: Array<string>
  }

  export namespace Contacts {
    export type FieldType = 'phoneNumbers' | 'emails' | 'addresses'

    export interface Options {
      pageSize?: number
      pageOffset?: number
      fields?: Array<FieldType>
    }

    export interface Contact {
      id: number
      name: string
      firstName?: string
      middleName?: string
      lastName?: string
      emails?: Array<{
        email?: string,
        primary?: boolean,
        label: string
      }>
      phoneNumbers?: Array<{
        number?: string,
        primary?: boolean,
        label: string
      }>
      addresses?: Array<{
        street?: string,
        city?: string,
        country?: string,
        region?: string,
        neighborhood?: string,
        postcode?: string,
        pobox?: string,
        label: string
      }>
      company?: string
      jobTitle?: string
    }

    export interface Response {
      data: Array<Contact>,
      total: number,
      hasNextPage: boolean,
      hasPreviousPage: boolean,
    }

    export const PHONE_NUMBERS = 'phoneNumbers'
    export const EMAILS = 'emails'
    export const ADDRESSES = 'addresses'

    export type Field = 'phoneNumbers' | 'emails' | 'addresses'

    export interface Options {
      pageSize?: number
      pageOffset?: number
      fields?: Array<Field>
    }
    export function getContactsAsync(options: Options): Promise<Response>
  }

  //#region BlurView
  interface BlurViewProps {
    intensity: number
    style?: ViewStyle
    tint: 'light' | 'default' | 'dark'
  }

  export class BlurView extends React.Component<BlurViewProps, {}> { }
  //#endregion

  export class AppLoading extends React.Component { }

  //#region BarCodeScanner
  export interface BarCodeScannerProps {
    type?: 'front' | 'back'
    torchMode?: 'on' | 'off'
    barCodeTypes: Array<string>     // TODO: add supported formats
    style: ViewStyle
  }

  export class BarCodeScanner extends React.Component<BarCodeScannerProps> { }
  //#endregion

  //#region GLView
  // TODO: better defs because there is no complete documentation. I did it from the code.
  interface GLViewProps extends ViewProperties {
    onContextCreate(): void
    msaaSamples: number
  }

  export class GLView extends React.Component<GLViewProps, { msaaSamples: number }> { }
  //#endregion

  export class KeepAwake extends React.Component {
    public static activate(): void
    public static deactivate(): void
  }

  //#region MapView
  // Copied from https://github.com/airbnb/react-native-maps/blob/master/index.d.ts. Don't know if it is possible to avoid copying.
  interface MapViewProps {
    provider?: 'google'
    style: any
    customMapStyle?: Array<any>
    customMapStyleString?: string
    showsUserLocation?: boolean
    userLocationAnnotationTitle?: string
    showsMyLocationButton?: boolean
    followsUserLocation?: boolean
    showsPointsOfInterest?: boolean
    showsCompass?: boolean
    zoomEnabled?: boolean
    rotateEnabled?: boolean
    cacheEnabled?: boolean
    loadingEnabled?: boolean
    loadingBackgroundColor?: any
    loadingIndicatorColor?: any
    scrollEnabled?: boolean
    pitchEnabled?: boolean
    toolbarEnabled?: boolean
    moveOnMarkerPress?: boolean
    showsScale?: boolean
    showsBuildings?: boolean
    showsTraffic?: boolean
    showsIndoors?: boolean
    showsIndoorLevelPicker?: boolean
    mapType?: 'standard' | 'satellite' | 'hybrid' | 'terrain' | 'none'
    region?: {
      latitude: number;
      longitude: number;
      /** Distance between the minimum and the maximum latitude. */
      latitudeDelta: number;
      /** Distance between the minimum and the maximum longitude. */
      longitudeDelta: number;
    }
    initialRegion?: {
      latitude: number;
      longitude: number;
      /** Distance between the minimum and the maximum latitude. */
      latitudeDelta: number;
      /** Distance between the minimum and the maximum longitude. */
      longitudeDelta: number;
    }
    liteMode?: boolean
    maxDelta?: number
    minDelta?: number
    legalLabelInsets?: any
    onChange?: Function
    onMapReady?: Function
    onRegionChange?: Function
    onRegionChangeComplete?: Function
    onPress?: Function
    onLayout?: Function
    onLongPress?: Function
    onPanDrag?: Function
    onMarkerPress?: Function
    onMarkerSelect?: Function
    onMarkerDeselect?: Function
    onCalloutPress?: Function
    onMarkerDragStart?: Function
    onMarkerDrag?: Function
    onMarkerDragEnd?: Function
    minZoomLevel?: number
    maxZoomLevel?: number
  }

  class MapView extends React.Component<MapViewProps, any> {
    public static Animated: any
    public static AnimatedRegion: any
  }

  namespace MapView {
    type LineCapType = 'butt' | 'round' | 'square'
    type LineJoinType = 'miter' | 'round' | 'bevel'

    interface MarkerProps {
      identifier?: string
      reuseIdentifier?: string
      title?: string
      description?: string
      image?: any
      opacity?: number
      pinColor?: string
      coordinate: { latitude: number; longitude: number }
      centerOffset?: { x: number; y: number }
      calloutOffset?: { x: number; y: number }
      anchor?: { x: number; y: number }
      calloutAnchor?: { x: number; y: number }
      flat?: boolean
      draggable?: boolean
      onPress?: Function
      onSelect?: Function
      onDeselect?: Function
      onCalloutPress?: Function
      onDragStart?: Function
      onDrag?: Function
      onDragEnd?: Function
      zIndex?: number
    }

    interface MapPolylineProps {
      coordinates?: Array<{ latitude: number; longitude: number; }>
      onPress?: Function
      tappable?: boolean
      fillColor?: string
      strokeWidth?: number
      strokeColor?: string
      zIndex?: number
      lineCap?: LineCapType
      lineJoin?: LineJoinType
      miterLimit?: number
      geodesic?: boolean
      lineDashPhase?: number
      lineDashPattern?: Array<number>
    }

    interface MapPolygonProps {
      coordinates?: Array<{ latitude: number; longitude: number; }>
      holes?: Array<Array<{ latitude: number; longitude: number; }>>
      onPress?: Function
      tappable?: boolean
      strokeWidth?: number
      strokeColor?: string
      fillColor?: string
      zIndex?: number
      lineCap?: LineCapType
      lineJoin?: LineJoinType
      miterLimit?: number
      geodesic?: boolean
      lineDashPhase?: number
      lineDashPattern?: Array<number>
    }

    interface MapCircleProps {
      center: { latitude: number; longitude: number }
      radius: number
      onPress?: Function
      strokeWidth?: number
      strokeColor?: string
      fillColor?: string
      zIndex?: number
      lineCap?: LineCapType
      lineJoin?: LineJoinType
      miterLimit?: number
      lineDashPhase?: number
      lineDashPattern?: Array<number>
    }

    interface MapUrlTitleProps {
      urlTemplate: string
      zIndex?: number
    }

    interface MapCalloutProps {
      tooltip?: boolean
      onPress?: Function
    }

    export class Marker extends React.Component<MarkerProps, any> { }
    export class Polyline extends React.Component<MapPolylineProps, any> { }
    export class Polygon extends React.Component<MapPolygonProps, any> { }
    export class Circle extends React.Component<MapCircleProps, any> { }
    export class UrlTile extends React.Component<MapUrlTitleProps, any> { }
    export class Callout extends React.Component<MapCalloutProps, any> { }
  }
  //#endregion

  /**
   * Expo Video
   */
  export interface VideoLoad {
    duration: number
    currentTime: number
    canPlayReverse: boolean
    canPlayFastForward: boolean
    canPlaySlowForward: boolean
    canPlaySlowReverse: boolean
    canStepBackward: boolean
    canStepForward: boolean
    naturalSize: {
      width: number;
      heigth: number;
      orientation: 'landscape' | 'portrait'
    }
  }
  export type VideoError = {
    code: any,
    domain: any
  } | {
      what: any,
      extra: any
    }

  export interface VideoProgress {
    currentTime: number
    playableDuration: number
  }

  export interface VideoSeek {
    currentTime: number
    seekTime: number
  }

  export interface VideoProps {
    source: any    // TODO: better def: string|*require(file)*
    fullscreen?: boolean
    resizeMode?: string    // TODO: resize mode instead of general string
    repeat?: boolean
    paused?: boolean
    volume?: number
    muted?: boolean
    rate?: number
    onLoadStart?: (param: { uri: string }) => any
    onLoad?: (load: VideoLoad) => any
    onError?: (error: { error: VideoError }) => any
    onProgress?: (progress: VideoProgress) => any
    onSeek?: (seek: VideoSeek) => any
    onEnd?: () => any
  }

  export class Video extends React.Component<VideoProps> {
    public static RESIZE_MODE_CONTAIN: string
    public static RESIZE_MODE_COVER: string
    public static RESIZE_MODE_STRETCH: string

    public seek(time: string): void
    public presentFullscreenPlayer(): void
    public dismissFullscreenPlayer(): void
  }

  export namespace DocumentPicker {
    export interface Options {
      type: string
    }
    export type Response = {
      type: 'success',
      uri: string,
      name: string,
      size: number
    } | {
        type: 'cancel'
      }

    export function getDocumentAsync(options: Options): Response
  }

  export namespace ErrorRecovery {
    export function setRecoveryProps(props: object): void
  }

  export namespace Facebook {
    export interface Options {
      permissions?: Array<string>
      behavior?: 'web' | 'native' | 'browser' | 'system'
    }
    export type Response = {
      type: 'success',
      token: string,
      expires: number
    } | {
        type: 'cancel'
      }
    export function logInWithReadPermissionsAsync(appId: string, options: Options): void
  }

  export namespace FacebookAds {
    /**
     * Interstitial Ads
     */
    export namespace InterstitialAdManager {
      export function showAd(placementId: string): Promise<boolean>
    }

    /**
     * Native Ads
     */
    export type MediaCachePolicy = 'none' | 'icon' | 'image' | 'all'
    export class NativeAdsManager {
      constructor(placementId: string, numberOfAdsToRequest?: number);
      public disableAutoRefresh(): void
      public setMediaCachePolicy(iOS: MediaCachePolicy): any
    }

    export function withNativeAd(component: React.Component<{
      icon?: string;
      coverImage?: string;
      title?: string;
      subtitle?: string;
      description?: string;
      callToActionText?: string;
      socialContext?: string;
    }, any>): React.Component<{ adsManager: NativeAdsManager }, { ad: any, canRequestAds: boolean }>

    /**
     * Banner View
     */
    export type AdType = 'large' | 'rectangle' | 'standard'

    export interface BannerViewProps {
      type: AdType
      placementId: string
      onPress: () => any
      onError: () => any
    }

    export class BannerView extends React.Component<BannerViewProps> { }

    /**
     * Ad Settings
     */
    export namespace AdSettings {
      export const currentDeviceHash: string
      export function addTestDevice(device: string): void
      export function clearTestDevices(): void
      export type SDKLogLevel = 'none'
        | 'debug'
        | 'verbose'
        | 'warning'
        | 'error'
        | 'notification'

      export function setLogLevel(logLevel: SDKLogLevel): void
      export function setIsChildDirected(isDirected: boolean): void
      export function setMediationService(mediationService: string): void
      export function setUrlPrefix(urlPrefix: string): void
    }
  }

  export namespace Font {
    type FontSource = string | number | Asset

    export function isLoaded(name: string): boolean
    export function isLoading(name: string): boolean
    export function loadAsync(
      nameOrMap: string | { [index: string]: FontSource },
      uriOrModuleOrAsset?: FontSource
    ): Promise<void>
    export function processFontFamily(name?: string | null): string | null | undefined
  }

  export namespace Google {
    export interface LogInConfig {
      androidClientId?: string
      androidStandaloneAppClientId?: string
      iosClientId?: string
      iosStandaloneAppClientId?: string
      behavior?: 'system' | 'web'
      scopes?: Array<string>
    }

    export type LogInResult = {
      type: 'cancel'
    } | {
        type: 'success',
        accessToken: string,
        idToken?: string,
        refreshToken?: string,
        serverAuthCode?: string,
        user: {
          id: string,
          name: string,
          givenName: string,
          familyName: string,
          photoUrl?: string,
          email?: string
        }
      }

    export function logInAsync(config: LogInConfig): Promise<LogInResult>
  }

  export namespace Gyroscope {
    // TODO: good export type of x, y and z
    export interface GyroscopeObject {
      x: any
      y: any
      z: any
    }

    export function addListener(listener: (obj: GyroscopeObject) => any): EventSubscription
    export function removeAllListeners(): void
    export function setUpdateInterval(intervalMs: number): void
  }

  export namespace ImagePicker {
    export interface ImageInfo {
      uri: string
      width: number
      height: number
    }

    export type ImageResult = { cancelled: true } | ({ cancelled: false } & ImageInfo)

    export interface ImageLibraryOptions {
      allowsEditing?: boolean
      aspect?: [number, number]
      quality?: number
    }

    export function launchImageLibraryAsync(options?: ImageLibraryOptions): Promise<ImageResult>

    export interface CameraOptions {
      allowsEditing?: boolean
      aspect?: [number, number]
      quality?: number
    }
    export function launchCameraAsync(options?: CameraOptions): Promise<ImageResult>
  }

  interface LinearGradientProps extends ViewProperties {
    colors?: Array<string>
    start?: [number, number]
    end?: [number, number]
    locations?: Array<number>
  }

  /** Linear gradient. See https://github.com/react-native-community/react-native-linear-gradient. */
  export class LinearGradient extends Component<LinearGradientProps, {}> { }

  export namespace Location {
    export interface LocationOptions {
      enableHighAccuracy?: boolean
      timeInterval?: number
      distanceInterval?: number
    }

    export interface LocationData {
      coords: {
        latitude: number,
        longitude: number,
        altitude: number,
        accuracy: number,
        heading: number,
        speed: number
      }
      timestamp: number
    }

    export type LocationCallback = (data: LocationData) => any

    export function getCurrentPositionAsync(options: LocationOptions): Promise<LocationData>    // TODO: check if it's correct
    export function watchPositionAsync(options: LocationOptions, callback: (data: LocationData) => any): EventSubscription
  }

  export namespace Notifications {
    export interface Notification {
      origin: 'selected' | 'received'
      data: any
      remote: boolean
      isMultiple: boolean
    }

    export interface LocalNotification {
      title: string
      body?: string
      data?: any
      ios?: {
        sound?: boolean
      }
      android?: {
        sound?: boolean;
        icon?: string;
        color?: string;
        priority?: 'min' | 'low' | 'high' | 'max';
        sticky?: boolean;
        vibrate?: boolean | Array<number>;
        link?: string;
      }
    }

    export type LocalNotificationId = string | number

    export function addListener(listener: (notification: Notification) => any): EventSubscription
    export function getExponentPushTokenAsync(): Promise<string>
    export function presentLocalNotificationAsync(localNotification: LocalNotification): Promise<LocalNotificationId>
    export function scheduleLocalNotificationAsync(
      localNotification: LocalNotification,
      schedulingOptions: { time: Date | number, repeat?: 'minute' | 'hour' | 'day' | 'week' | 'month' | 'year' }
    ): Promise<LocalNotificationId>
    export function dismissNotificationAsync(localNotificationId: LocalNotificationId): Promise<void>
    export function dismissAllNotificationsAsync(): Promise<void>
    export function cancelScheduledNotificationAsync(localNotificationId: LocalNotificationId): Promise<void>
    export function cancelAllScheduledNotificationsAsync(): Promise<void>
    export function getBadgeNumberAsync(): Promise<number>
    export function setBadgeNumberAsync(badgeNumber: number): Promise<void>
  }

  export namespace Permissions {
    export type PermissionType = 'remoteNotifications'
      | 'location'
      | 'camera'
      | 'contacts'
      | 'audioRecording'

    export type PermissionStatus = 'undetermined' | 'granted' | 'denied'
    export type PermissionExpires = 'never'
    export interface PermissionDetailsLocationIOS {
      scope: 'whenInUse' | 'always'
    }
    export interface PermissionDetailsLocationAndroid {
      scope: 'fine' | 'coarse' | 'none'
    }
    export interface PermissionResponse {
      status: PermissionStatus
      expires: PermissionExpires
      ios?: PermissionDetailsLocationIOS
      android?: PermissionDetailsLocationAndroid
    }

    export function getAsync(type: PermissionType): Promise<PermissionResponse>
    export function askAsync(type: PermissionType): Promise<PermissionResponse>

    export const CAMERA: string
    export const AUDIO_RECORDING: string
    export const LOCATION: string
    export const REMOTE_NOTIFICATIONS: string
    export const NOTIFICATIONS: string
    export const CONTACTS: string
  }

  /** Register Root Component. Useful when using function like react-redux connect for example. */
  // TODO: verify if it's a good idea or not to use generics.
  export function registerRootComponent<P, S>(component: React.Component<P, S>): React.Component<P, S>

  export namespace ScreenOrientation {
    export namespace Orientation {
      /** All 4 possible orientations. */
      export const ALL: 'ALL'

      /** All but reverse portrait, could be all 4 orientations on certain Android devices. */
      export const ALL_BUT_UPSIDE_DOWN: 'ALL_BUT_UPSIDE_DOWN'

      /** Portrait orientation, could also be reverse portrait on certain Android devices. */
      export const PORTRAIT: 'PORTRAIT'

      /** Upside portrait only. */
      export const PORTRAIT_UP: 'PORTRAIT_UP'

      /** Upside down portrait only. */
      export const PORTRAIT_DOWN: 'PORTRAIT_DOWN'

      /** Any landscape orientation. */
      export const LANDSCAPE: 'LANDSCAPE'

      /** Left landscape only. */
      export const LANDSCAPE_LEFT: 'LANDSCAPE_LEFT'

      /** Right landscape only. */
      export const LANDSCAPE_RIGHT: 'LANDSCAPE_RIGHT'
    }

    export function allow(orientation: 'ALL' | 'ALL_BUT_UPSIDE_DOWN' | 'PORTRAIT' | 'PORTRAIT_UP' | 'PORTRAIT_DOWN' | 'LANDSCAPE' | 'LANDSCAPE_LEFT' | 'LANDSCAPE_RIGHT'): void
  }

  // TODO: check that all these functions return void or not.
  export namespace Segment {
    export function initializeIOS(writeKey: string): void
    export function initializeAndroid(writeKey: string): void
    export function identify(userId: string): void
    export function identifyWithTraits(userId: string, traits: any): void
    export function track(event: string): void
    export function trackWithProperties(event: string, properties: any): void
    export function flush(): void
  }

  export namespace SQLite {
    type Error = any

    export interface Database {
      transaction(
        callback: (transaction: Transaction) => any,
        error?: (error: Error) => any,     // TODO def of error
        success?: () => any
      ): void
    }

    export interface Transaction {
      executeSql(
        sqlStatement: string,
        arguments?: Array<string | number>,
        success?: (transaction: Transaction, resultSet: ResultSet) => any,
        error?: (transaction: Transaction, error: Error) => any
      ): any
    }

    export interface ResultSet {
      insertId: number
      rowAffected: number
      rows: {
        length: number;
        item: (index: number) => any;
        _array: Array<object>;
      }
    }

    export function openDatabase(
      name: string | {
        name: string,
        version?: string,
        description?: string,
        size?: number,
        callback?: () => any
      },
      version?: string,
      description?: string,
      size?: number,
      callback?: () => any
    ): any
  }

  //#region Svg
  export class Svg extends Component<Svg.SvgProps, {}> { }

  export namespace Svg {
    interface CircleProps extends SharedPathProps {
      cx: number | string
      cy: number | string
      r: number | string
    }

    interface ClipPathProps {
      id: string
    }

    interface ClipProps {
      clipPath?: string
      clipRule?: 'evenodd' | 'nonzero'
    }

    interface DefinationProps {
      name?: string
    }

    interface EllipseProps extends SharedPathProps {
      cx: number | string
      cy: number | string
      rx: number | string
      ry: number | string
    }

    interface FillProps {
      fill?: string
      fillOpacity?: number | string
      fillRule?: 'evenodd' | 'nonzero'
    }

    interface FontProps {
      fontFamily?: string
      fontSize?: number | string
      fontWeight?: number | string
      fontStyle?: string
      font?: object
    }

    interface ImageProps extends ResponderProps, TouchableProps {
      height: number | string
      href?: ImageURISource | Array<ImageURISource>
      preserveAspectRatio?: string
      width: number | string
      x?: number | string
      y?: number | string
    }

    // tslint:disable-next-line:no-shadowed-variable
    interface LinearGradientProps {
      gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse'
      id: string
      x1: number | string
      x2: number | string
      y1: number | string
      y2: number | string
    }

    interface LineProps extends SharedPathProps {
      x1: number | string
      x2: number | string
      y1: number | string
      y2: number | string
    }

    interface PathProps extends SharedPathProps {
      d: string
    }

    interface PatternProps {
      patternContentUnits?: 'userSpaceOnUse' | 'objectBoundingBox'
      patternTransform?: string
      patternUnits?: 'userSpaceOnUse' | 'objectBoundingBox'
      x1?: number | string
      x2?: number | string
      y1?: number | string
      y2?: number | string
    }

    interface PolygonProps extends SharedPathProps {
      points: string | Array<any>
    }

    interface PolylineProps extends SharedPathProps {
      points: string | Array<any>
    }

    interface RadialGradientProps {
      cx: number | string
      cy: number | string
      fx: number | string
      fy: number | string
      gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse'
      id: string
      r?: number | string
      rx?: number | string
      ry?: number | string
    }

    interface RectProps extends SharedPathProps {
      height: number | string
      rx?: number | string
      ry?: number | string
      width: number | string
      x: number | string
      y: number | string
    }

    interface ResponderProps {
      onMoveShouldSetPanResponder?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onMoveShouldSetPanResponderCapture?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onPanResponderEnd?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onPanResponderGrant?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onPanResponderMove?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onPanResponderReject?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onPanResponderRelease?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onPanResponderStart?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onPanResponderTerminate?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onPanResponderTerminationRequest?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onShouldBlockNativeResponder?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onStartShouldSetPanResponder?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
      onStartShouldSetPanResponderCapture?: (e: GestureResponderEvent, gestureState: PanResponderGestureState) => any
    }

    interface SharedPathProps extends
      ClipProps,
      DefinationProps,
      FillProps,
      ResponderProps,
      StrokeProps,
      TouchableProps,
      TransformProps {
    }

    interface StopProps {
      offset: number | string
      stopColor: string
      stopOpacity?: number | string
    }

    interface StrokeProps {
      stroke?: string
      strokeDasharray?: Array<number> | string
      strokeDashoffset?: number | string
      strokeLinecap?: 'butt' | 'square' | 'round'
      strokeLinejoin?: 'miter' | 'bevel' | 'round'
      strokeMiterlimit?: number | string
      strokeOpacity?: number | string
      strokeWidth?: number | string
    }

    interface SvgProps extends ViewProperties {
      height?: number | string
      opacity?: number | string
      preserveAspectRatio?: string
      viewBox?: string
      width?: number | string
    }

    interface SymbolProps {
      id: string
      preserveAspectRatio?: string
      viewBox?: string
    }

    interface TextProps extends FontProps, SharedPathProps {
      dx?: number | string
      dy?: number | string
      textAnchor?: 'start' | 'middle' | 'end'
    }

    interface TextPathProps extends FontProps, SharedPathProps {
      href: string
      startOffset?: number | string
    }

    interface TouchableProps {
      delayLongPress?: number
      delayPressIn?: number
      delayPressOut?: number
      disabled?: boolean
      onLongPress?: (...args: Array<any>) => any
      onPress?: (...args: Array<any>) => any
      onPressIn?: (...args: Array<any>) => any
      onPressOut?: (...args: Array<any>) => any
    }

    interface TransformProps {
      origin?: number | string
      originX?: number | string
      originY?: number | string
      rotate?: number | string
      rotation?: number | string
      scale?: number | string
      scaleX?: number | string
      scaleY?: number | string
      skew?: number | string
      skewX?: number | string
      skewY?: number | string
      transform?: object
      translate?: number | string
      translateX?: number | string
      translateY?: number | string
      x?: number | string
      y?: number | string
    }

    interface TSpanProps extends FontProps, SharedPathProps {
      dx?: number | string
      dy?: number | string
      textAnchor?: 'start' | 'middle' | 'end'
    }

    interface UseProps extends SharedPathProps {
      height?: number | string
      href: string
      width?: number | string
    }

    export class Circle extends Component<CircleProps, {}> { }
    export class ClipPath extends Component<ClipPathProps, {}> { }
    export class Defs extends Component<{}, {}> { }
    export class Ellipse extends Component<EllipseProps, {}> { }
    export class G extends Component<SharedPathProps, {}> { }
    export class Image extends Component<ImageProps, {}> { }
    export class Line extends Component<LineProps, {}> { }
    // tslint:disable-next-line:no-shadowed-variable
    export class LinearGradient extends Component<LinearGradientProps, {}> { }
    export class Path extends Component<PathProps, {}> { }
    export class Pattern extends Component<PatternProps, {}> { }
    export class Polygon extends Component<PolygonProps, {}> { }
    export class Polyline extends Component<PolylineProps, {}> { }
    export class RadialGradient extends Component<RadialGradientProps, {}> { }
    export class Rect extends Component<RectProps, {}> { }
    export class Shape extends Component<{}, {}> { }
    export class Stop extends Component<StopProps, {}> { }
    export class Symbol extends Component<SymbolProps, {}> { }
    export class Text extends Component<TextProps, {}> { }
    export class TextPath extends Component<TextPathProps, {}> { }
    export class TSpan extends Component<TSpanProps, {}> { }
    export class Use extends Component<UseProps, {}> { }
  }
  //#endregion

  export function takeSnapshotAsync(
    view?: (number | React.ReactElement<any>),
    options?: {
      width?: number,
      height?: number,
      format?: 'png' | 'jpg' | 'jpeg' | 'webm',
      quality?: number,
      result?: 'file' | 'base64' | 'data-uri'
    }
  ): Promise<string>

  export namespace Util {
    export function getCurrentLocaleAsync(): Promise<string>
    export function reload(): void
  }

  export namespace WebBrowser {
    export function openBrowserAsync(url: string): Promise<{ type: 'cancelled' | 'dismissed' }>
    export function dismissBrowser(): Promise<{ type: 'dismissed' }>
  }
}

declare module '@expo/vector-icons' {

  import { ViewStyle, TextStyle } from 'react-native'

  export interface IconProps {
    size?: number
    name: string
    color?: string
    style?: ViewStyle & TextStyle
  }

  export class FAI extends React.Component<IconProps> { }
  export class Entypo extends React.Component<IconProps> { }
  export class EvilIcons extends React.Component<IconProps> { }
  export class FontAwesome extends React.Component<IconProps> { }
  export class Foundation extends React.Component<IconProps> { }
  export class Ionicons extends React.Component<IconProps> { }
  export class MaterialIcons extends React.Component<IconProps> { }
  export class MaterialComunityIcons extends React.Component<IconProps> { }
  export class Octicons extends React.Component<IconProps> { }
  export class Zocial extends React.Component<IconProps> { }
  export class SimpleLineIcons extends React.Component<IconProps> { }
}