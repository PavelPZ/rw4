﻿import React from 'react'


//https://github.com/ionic-team/ionicons
//https://raw.githubusercontent.com/GeekyAnts/NativeBase/master/src/basic/Icon/index.js

//export const getIcon = (name: string, logoId: string, OS: RN.PlatformOSType, active: boolean) => {
//  if (logoId) return logoId
//  if (name) {
//    const icn = iconsMeta[name]
//    if (!icn) throw new Error('!icn')
//    const act = active ? 'active' : 'default'
//    const actOS = OS ? OS : (window.platform.OS == 'web' ? webLikeOS : window.platform.OS)
//    return iconsMeta[name][actOS][act]
//  }
//}

export const getIcon = (name: GUI.IonicIcons, OS?: RN.PlatformOSType, active?: boolean) => {
  if (!name) return null
  if (logoIcons[name]) return name
  const icn = iconsMeta[name]
  if (!icn) throw new Error('!icn')
  const act = active ? 'active' : 'default'
  const actOS = OS ? OS : (window.platform.OS == 'web' ? webLikeOS : window.platform.OS)
  return iconsMeta[name][actOS][act]
}

export const getIcon2 = (props: GUI.IIconPropsLow) => {
  const { iconOS, iconName, active } = props
  return getIcon(iconName, iconOS, active)
}

const webLikeOS = 'android'

export const logoIcons = {
  [GUI.IonicLogos.logoAndroid]: true,
  [GUI.IonicLogos.logoAngular]: true,
  [GUI.IonicLogos.logoApple]: true,
  [GUI.IonicLogos.logoBitcoin]: true,
  [GUI.IonicLogos.logoBuffer]: true,
  [GUI.IonicLogos.logoChrome]: true,
  [GUI.IonicLogos.logoCodepen]: true,
  [GUI.IonicLogos.logoCss3]: true,
  [GUI.IonicLogos.logoDesignernews]: true,
  [GUI.IonicLogos.logoDribbble]: true,
  [GUI.IonicLogos.logoDropbox]: true,
  [GUI.IonicLogos.logoEuro]: true,
  [GUI.IonicLogos.logoFacebook]: true,
  [GUI.IonicLogos.logoFoursquare]: true,
  [GUI.IonicLogos.logoFreebsdDevil]: true,
  [GUI.IonicLogos.logoGithub]: true,
  [GUI.IonicLogos.logoGoogle]: true,
  [GUI.IonicLogos.logoGoogleplus]: true,
  [GUI.IonicLogos.logoHackernews]: true,
  [GUI.IonicLogos.logoHtml5]: true,
  [GUI.IonicLogos.logoInstagram]: true,
  [GUI.IonicLogos.logoJavascript]: true,
  [GUI.IonicLogos.logoLinkedin]: true,
  [GUI.IonicLogos.logoMarkdown]: true,
  [GUI.IonicLogos.logoNodejs]: true,
  [GUI.IonicLogos.logoOctocat]: true,
  [GUI.IonicLogos.logoPinterest]: true,
  [GUI.IonicLogos.logoPlaystation]: true,
  [GUI.IonicLogos.logoPython]: true,
  [GUI.IonicLogos.logoReddit]: true,
  [GUI.IonicLogos.logoRss]: true,
  [GUI.IonicLogos.logoSass]: true,
  [GUI.IonicLogos.logoSkype]: true,
  [GUI.IonicLogos.logoSnapchat]: true,
  [GUI.IonicLogos.logoSteam]: true,
  [GUI.IonicLogos.logoTumblr]: true,
  [GUI.IonicLogos.logoTux]: true,
  [GUI.IonicLogos.logoTwitch]: true,
  [GUI.IonicLogos.logoTwitter]: true,
  [GUI.IonicLogos.logoUsd]: true,
  [GUI.IonicLogos.logoVimeo]: true,
  [GUI.IonicLogos.logoWhatsapp]: true,
  [GUI.IonicLogos.logoWindows]: true,
  [GUI.IonicLogos.logoWordpress]: true,
  [GUI.IonicLogos.logoXbox]: true,
  [GUI.IonicLogos.logoYahoo]: true,
  [GUI.IonicLogos.logoYen]: true,
  [GUI.IonicLogos.logoYoutube]: true,
}

//https://github.com/GeekyAnts/NativeBase/blob/master/src/basic/Icon/NBIcons.json
export const iconsMeta = {
  "closedCaptioning": {
    "android": {
      "default": "md-closed-captioning",
      "active": "md-closed-captioning"
    },
    "ios": {
      "default": "ios-closed-captioning-outline",
      "active": "ios-closed-captioning"
    }
  },
  "refreshCircle": {
    "android": {
      "default": "md-refresh-circle",
      "active": "md-refresh-circle"
    },
    "ios": {
      "default": "ios-refresh-circle-outline",
      "active": "ios-refresh-circle"
    }
  },
  "shareAlt": {
    "android": {
      "default": "md-share-alt",
      "active": "md-share-alt"
    },
    "ios": {
      "default": "ios-share-alt-outline",
      "active": "ios-share-alt"
    }
  },

  "add": {
    "android": {
      "default": "md-add",
      "active": "md-add"
    },
    "ios": {
      "default": "ios-add-outline",
      "active": "ios-add"
    }
  },
  "add-circle": {
    "android": {
      "default": "md-add-circle",
      "active": "md-add-circle"
    },
    "ios": {
      "default": "ios-add-circle-outline",
      "active": "ios-add-circle"
    }
  },
  "alarm": {
    "android": {
      "default": "md-alarm",
      "active": "md-alarm"
    },
    "ios": {
      "default": "ios-alarm-outline",
      "active": "ios-alarm"
    }
  },
  "albums": {
    "android": {
      "default": "md-albums",
      "active": "md-albums"
    },
    "ios": {
      "default": "ios-albums-outline",
      "active": "ios-albums"
    }
  },
  "alert": {
    "android": {
      "default": "md-alert",
      "active": "md-alert"
    },
    "ios": {
      "default": "ios-alert-outline",
      "active": "ios-alert"
    }
  },
  "american-football": {
    "android": {
      "default": "md-american-football",
      "active": "md-american-football"
    },
    "ios": {
      "default": "ios-american-football-outline",
      "active": "ios-american-football"
    }
  },
  "analytics": {
    "android": {
      "default": "md-analytics",
      "active": "md-analytics"
    },
    "ios": {
      "default": "ios-analytics-outline",
      "active": "ios-analytics"
    }
  },
  "aperture": {
    "android": {
      "default": "md-aperture",
      "active": "md-aperture"
    },
    "ios": {
      "default": "ios-aperture-outline",
      "active": "ios-aperture"
    }
  },
  "apps": {
    "android": {
      "default": "md-apps",
      "active": "md-apps"
    },
    "ios": {
      "default": "ios-apps-outline",
      "active": "ios-apps"
    }
  },
  "appstore": {
    "android": {
      "default": "md-appstore",
      "active": "md-appstore"
    },
    "ios": {
      "default": "ios-appstore-outline",
      "active": "ios-appstore"
    }
  },
  "archive": {
    "android": {
      "default": "md-archive",
      "active": "md-archive"
    },
    "ios": {
      "default": "ios-archive-outline",
      "active": "ios-archive"
    }
  },
  "arrow-back": {
    "android": {
      "default": "md-arrow-back",
      "active": "md-arrow-back"
    },
    "ios": {
      "default": "ios-arrow-back-outline",
      "active": "ios-arrow-back"
    }
  },
  "arrow-down": {
    "android": {
      "default": "md-arrow-down",
      "active": "md-arrow-down"
    },
    "ios": {
      "default": "ios-arrow-down-outline",
      "active": "ios-arrow-down"
    }
  },
  "arrow-dropdown": {
    "android": {
      "default": "md-arrow-dropdown",
      "active": "md-arrow-dropdown"
    },
    "ios": {
      "default": "ios-arrow-dropdown-outline",
      "active": "ios-arrow-dropdown"
    }
  },
  "arrow-dropdown-circle": {
    "android": {
      "default": "md-arrow-dropdown-circle",
      "active": "md-arrow-dropdown-circle"
    },
    "ios": {
      "default": "ios-arrow-dropdown-circle-outline",
      "active": "ios-arrow-dropdown-circle"
    }
  },
  "arrow-dropleft": {
    "android": {
      "default": "md-arrow-dropleft",
      "active": "md-arrow-dropleft"
    },
    "ios": {
      "default": "ios-arrow-dropleft-outline",
      "active": "ios-arrow-dropleft"
    }
  },
  "arrow-dropleft-circle": {
    "android": {
      "default": "md-arrow-dropleft-circle",
      "active": "md-arrow-dropleft-circle"
    },
    "ios": {
      "default": "ios-arrow-dropleft-circle-outline",
      "active": "ios-arrow-dropleft-circle"
    }
  },
  "arrow-dropright": {
    "android": {
      "default": "md-arrow-dropright",
      "active": "md-arrow-dropright"
    },
    "ios": {
      "default": "ios-arrow-dropright-outline",
      "active": "ios-arrow-dropright"
    }
  },
  "arrow-dropright-circle": {
    "android": {
      "default": "md-arrow-dropright-circle",
      "active": "md-arrow-dropright-circle"
    },
    "ios": {
      "default": "ios-arrow-dropright-circle-outline",
      "active": "ios-arrow-dropright-circle"
    }
  },
  "arrow-dropup": {
    "android": {
      "default": "md-arrow-dropup",
      "active": "md-arrow-dropup"
    },
    "ios": {
      "default": "ios-arrow-dropup-outline",
      "active": "ios-arrow-dropup"
    }
  },
  "arrow-dropup-circle": {
    "android": {
      "default": "md-arrow-dropup-circle",
      "active": "md-arrow-dropup-circle"
    },
    "ios": {
      "default": "ios-arrow-dropup-circle-outline",
      "active": "ios-arrow-dropup-circle"
    }
  },
  "arrow-forward": {
    "android": {
      "default": "md-arrow-forward",
      "active": "md-arrow-forward"
    },
    "ios": {
      "default": "ios-arrow-forward-outline",
      "active": "ios-arrow-forward"
    }
  },
  "arrow-round-back": {
    "android": {
      "default": "md-arrow-round-back",
      "active": "md-arrow-round-back"
    },
    "ios": {
      "default": "ios-arrow-round-back-outline",
      "active": "ios-arrow-round-back"
    }
  },
  "arrow-round-down": {
    "android": {
      "default": "md-arrow-round-down",
      "active": "md-arrow-round-down"
    },
    "ios": {
      "default": "ios-arrow-round-down-outline",
      "active": "ios-arrow-round-down"
    }
  },
  "arrow-round-forward": {
    "android": {
      "default": "md-arrow-round-forward",
      "active": "md-arrow-round-forward"
    },
    "ios": {
      "default": "ios-arrow-round-forward-outline",
      "active": "ios-arrow-round-forward"
    }
  },
  "arrow-round-up": {
    "android": {
      "default": "md-arrow-round-up",
      "active": "md-arrow-round-up"
    },
    "ios": {
      "default": "ios-arrow-round-up-outline",
      "active": "ios-arrow-round-up"
    }
  },
  "arrow-up": {
    "android": {
      "default": "md-arrow-up",
      "active": "md-arrow-up"
    },
    "ios": {
      "default": "ios-arrow-up-outline",
      "active": "ios-arrow-up"
    }
  },
  "at": {
    "android": {
      "default": "md-at",
      "active": "md-at"
    },
    "ios": {
      "default": "ios-at-outline",
      "active": "ios-at"
    }
  },
  "attach": {
    "android": {
      "default": "md-attach",
      "active": "md-attach"
    },
    "ios": {
      "default": "ios-attach-outline",
      "active": "ios-attach"
    }
  },
  "backspace": {
    "android": {
      "default": "md-backspace",
      "active": "md-backspace"
    },
    "ios": {
      "default": "ios-backspace-outline",
      "active": "ios-backspace"
    }
  },
  "barcode": {
    "android": {
      "default": "md-barcode",
      "active": "md-barcode"
    },
    "ios": {
      "default": "ios-barcode-outline",
      "active": "ios-barcode"
    }
  },
  "baseball": {
    "android": {
      "default": "md-baseball",
      "active": "md-baseball"
    },
    "ios": {
      "default": "ios-baseball-outline",
      "active": "ios-baseball"
    }
  },
  "basket": {
    "android": {
      "default": "md-basket",
      "active": "md-basket"
    },
    "ios": {
      "default": "ios-basket-outline",
      "active": "ios-basket"
    }
  },
  "basketball": {
    "android": {
      "default": "md-basketball",
      "active": "md-basketball"
    },
    "ios": {
      "default": "ios-basketball-outline",
      "active": "ios-basketball"
    }
  },
  "battery-charging": {
    "android": {
      "default": "md-battery-charging",
      "active": "md-battery-charging"
    },
    "ios": {
      "default": "ios-battery-charging-outline",
      "active": "ios-battery-charging"
    }
  },
  "battery-dead": {
    "android": {
      "default": "md-battery-dead",
      "active": "md-battery-dead"
    },
    "ios": {
      "default": "ios-battery-dead-outline",
      "active": "ios-battery-dead"
    }
  },
  "battery-full": {
    "android": {
      "default": "md-battery-full",
      "active": "md-battery-full"
    },
    "ios": {
      "default": "ios-battery-full-outline",
      "active": "ios-battery-full"
    }
  },
  "beaker": {
    "android": {
      "default": "md-beaker",
      "active": "md-beaker"
    },
    "ios": {
      "default": "ios-beaker-outline",
      "active": "ios-beaker"
    }
  },
  "beer": {
    "android": {
      "default": "md-beer",
      "active": "md-beer"
    },
    "ios": {
      "default": "ios-beer-outline",
      "active": "ios-beer"
    }
  },
  "bicycle": {
    "android": {
      "default": "md-bicycle",
      "active": "md-bicycle"
    },
    "ios": {
      "default": "ios-bicycle-outline",
      "active": "ios-bicycle"
    }
  },
  "bluetooth": {
    "android": {
      "default": "md-bluetooth",
      "active": "md-bluetooth"
    },
    "ios": {
      "default": "ios-bluetooth-outline",
      "active": "ios-bluetooth"
    }
  },
  "boat": {
    "android": {
      "default": "md-boat",
      "active": "md-boat"
    },
    "ios": {
      "default": "ios-boat-outline",
      "active": "ios-boat"
    }
  },
  "body": {
    "android": {
      "default": "md-body",
      "active": "md-body"
    },
    "ios": {
      "default": "ios-body-outline",
      "active": "ios-body"
    }
  },
  "bonfire": {
    "android": {
      "default": "md-bonfire",
      "active": "md-bonfire"
    },
    "ios": {
      "default": "ios-bonfire-outline",
      "active": "ios-bonfire"
    }
  },
  "book": {
    "android": {
      "default": "md-book",
      "active": "md-book"
    },
    "ios": {
      "default": "ios-book-outline",
      "active": "ios-book"
    }
  },
  "bookmark": {
    "android": {
      "default": "md-bookmark",
      "active": "md-bookmark"
    },
    "ios": {
      "default": "ios-bookmark-outline",
      "active": "ios-bookmark"
    }
  },
  "bookmarks": {
    "android": {
      "default": "md-bookmarks",
      "active": "md-bookmarks"
    },
    "ios": {
      "default": "ios-bookmarks-outline",
      "active": "ios-bookmarks"
    }
  },
  "bowtie": {
    "android": {
      "default": "md-bowtie",
      "active": "md-bowtie"
    },
    "ios": {
      "default": "ios-bowtie-outline",
      "active": "ios-bowtie"
    }
  },
  "briefcase": {
    "android": {
      "default": "md-briefcase",
      "active": "md-briefcase"
    },
    "ios": {
      "default": "ios-briefcase-outline",
      "active": "ios-briefcase"
    }
  },
  "browsers": {
    "android": {
      "default": "md-browsers",
      "active": "md-browsers"
    },
    "ios": {
      "default": "ios-browsers-outline",
      "active": "ios-browsers"
    }
  },
  "brush": {
    "android": {
      "default": "md-brush",
      "active": "md-brush"
    },
    "ios": {
      "default": "ios-brush-outline",
      "active": "ios-brush"
    }
  },
  "bug": {
    "android": {
      "default": "md-bug",
      "active": "md-bug"
    },
    "ios": {
      "default": "ios-bug-outline",
      "active": "ios-bug"
    }
  },
  "build": {
    "android": {
      "default": "md-build",
      "active": "md-build"
    },
    "ios": {
      "default": "ios-build-outline",
      "active": "ios-build"
    }
  },
  "bulb": {
    "android": {
      "default": "md-bulb",
      "active": "md-bulb"
    },
    "ios": {
      "default": "ios-bulb-outline",
      "active": "ios-bulb"
    }
  },
  "bus": {
    "android": {
      "default": "md-bus",
      "active": "md-bus"
    },
    "ios": {
      "default": "ios-bus-outline",
      "active": "ios-bus"
    }
  },
  "cafe": {
    "android": {
      "default": "md-cafe",
      "active": "md-cafe"
    },
    "ios": {
      "default": "ios-cafe-outline",
      "active": "ios-cafe"
    }
  },
  "calculator": {
    "android": {
      "default": "md-calculator",
      "active": "md-calculator"
    },
    "ios": {
      "default": "ios-calculator-outline",
      "active": "ios-calculator"
    }
  },
  "calendar": {
    "android": {
      "default": "md-calendar",
      "active": "md-calendar"
    },
    "ios": {
      "default": "ios-calendar-outline",
      "active": "ios-calendar"
    }
  },
  "call": {
    "android": {
      "default": "md-call",
      "active": "md-call"
    },
    "ios": {
      "default": "ios-call-outline",
      "active": "ios-call"
    }
  },
  "camera": {
    "android": {
      "default": "md-camera",
      "active": "md-camera"
    },
    "ios": {
      "default": "ios-camera-outline",
      "active": "ios-camera"
    }
  },
  "car": {
    "android": {
      "default": "md-car",
      "active": "md-car"
    },
    "ios": {
      "default": "ios-car-outline",
      "active": "ios-car"
    }
  },
  "card": {
    "android": {
      "default": "md-card",
      "active": "md-card"
    },
    "ios": {
      "default": "ios-card-outline",
      "active": "ios-card"
    }
  },
  "cart": {
    "android": {
      "default": "md-cart",
      "active": "md-cart"
    },
    "ios": {
      "default": "ios-cart-outline",
      "active": "ios-cart"
    }
  },
  "cash": {
    "android": {
      "default": "md-cash",
      "active": "md-cash"
    },
    "ios": {
      "default": "ios-cash-outline",
      "active": "ios-cash"
    }
  },
  "chatboxes": {
    "android": {
      "default": "md-chatboxes",
      "active": "md-chatboxes"
    },
    "ios": {
      "default": "ios-chatboxes-outline",
      "active": "ios-chatboxes"
    }
  },
  "chatbubbles": {
    "android": {
      "default": "md-chatbubbles",
      "active": "md-chatbubbles"
    },
    "ios": {
      "default": "ios-chatbubbles-outline",
      "active": "ios-chatbubbles"
    }
  },
  "checkbox": {
    "android": {
      "default": "md-checkbox-outline",
      "active": "md-checkbox"
    },
    "ios": {
      "default": "ios-checkbox-outline",
      "active": "ios-checkbox"
    }
  },
  "checkmark": {
    "android": {
      "default": "md-checkmark",
      "active": "md-checkmark"
    },
    "ios": {
      "default": "ios-checkmark-outline",
      "active": "ios-checkmark"
    }
  },
  "checkmark-circle": {
    "android": {
      "default": "md-checkmark-circle-outline",
      "active": "md-checkmark-circle"
    },
    "ios": {
      "default": "ios-checkmark-circle-outline",
      "active": "ios-checkmark-circle"
    }
  },
  "clipboard": {
    "android": {
      "default": "md-clipboard",
      "active": "md-clipboard"
    },
    "ios": {
      "default": "ios-clipboard-outline",
      "active": "ios-clipboard"
    }
  },
  "clock": {
    "android": {
      "default": "md-clock",
      "active": "md-clock"
    },
    "ios": {
      "default": "ios-clock-outline",
      "active": "ios-clock"
    }
  },
  "close": {
    "android": {
      "default": "md-close",
      "active": "md-close"
    },
    "ios": {
      "default": "ios-close-outline",
      "active": "ios-close"
    }
  },
  "close-circle": {
    "android": {
      "default": "md-close-circle",
      "active": "md-close-circle"
    },
    "ios": {
      "default": "ios-close-circle-outline",
      "active": "ios-close-circle"
    }
  },
  "cloud": {
    "android": {
      "default": "md-cloud-outline",
      "active": "md-cloud"
    },
    "ios": {
      "default": "ios-cloud-outline",
      "active": "ios-cloud"
    }
  },
  "cloud-circle": {
    "android": {
      "default": "md-cloud-circle",
      "active": "md-cloud-circle"
    },
    "ios": {
      "default": "ios-cloud-circle-outline",
      "active": "ios-cloud-circle"
    }
  },
  "cloud-done": {
    "android": {
      "default": "md-cloud-done",
      "active": "md-cloud-done"
    },
    "ios": {
      "default": "ios-cloud-done-outline",
      "active": "ios-cloud-done"
    }
  },
  "cloud-download": {
    "android": {
      "default": "md-cloud-download",
      "active": "md-cloud-download"
    },
    "ios": {
      "default": "ios-cloud-download-outline",
      "active": "ios-cloud-download"
    }
  },
  "cloud-upload": {
    "android": {
      "default": "md-cloud-upload",
      "active": "md-cloud-upload"
    },
    "ios": {
      "default": "ios-cloud-upload-outline",
      "active": "ios-cloud-upload"
    }
  },
  "cloudy": {
    "android": {
      "default": "md-cloudy",
      "active": "md-cloudy"
    },
    "ios": {
      "default": "ios-cloudy-outline",
      "active": "ios-cloudy"
    }
  },
  "cloudy-night": {
    "android": {
      "default": "md-cloudy-night",
      "active": "md-cloudy-night"
    },
    "ios": {
      "default": "ios-cloudy-night-outline",
      "active": "ios-cloudy-night"
    }
  },
  "code": {
    "android": {
      "default": "md-code",
      "active": "md-code"
    },
    "ios": {
      "default": "ios-code-outline",
      "active": "ios-code"
    }
  },
  "code-download": {
    "android": {
      "default": "md-code-download",
      "active": "md-code-download"
    },
    "ios": {
      "default": "ios-code-download-outline",
      "active": "ios-code-download"
    }
  },
  "code-working": {
    "android": {
      "default": "md-code-working",
      "active": "md-code-working"
    },
    "ios": {
      "default": "ios-code-working-outline",
      "active": "ios-code-working"
    }
  },
  "cog": {
    "android": {
      "default": "md-cog",
      "active": "md-cog"
    },
    "ios": {
      "default": "ios-cog-outline",
      "active": "ios-cog"
    }
  },
  "color-fill": {
    "android": {
      "default": "md-color-fill",
      "active": "md-color-fill"
    },
    "ios": {
      "default": "ios-color-fill-outline",
      "active": "ios-color-fill"
    }
  },
  "color-filter": {
    "android": {
      "default": "md-color-filter",
      "active": "md-color-filter"
    },
    "ios": {
      "default": "ios-color-filter-outline",
      "active": "ios-color-filter"
    }
  },
  "color-palette": {
    "android": {
      "default": "md-color-palette",
      "active": "md-color-palette"
    },
    "ios": {
      "default": "ios-color-palette-outline",
      "active": "ios-color-palette"
    }
  },
  "color-wand": {
    "android": {
      "default": "md-color-wand",
      "active": "md-color-wand"
    },
    "ios": {
      "default": "ios-color-wand-outline",
      "active": "ios-color-wand"
    }
  },
  "compass": {
    "android": {
      "default": "md-compass",
      "active": "md-compass"
    },
    "ios": {
      "default": "ios-compass-outline",
      "active": "ios-compass"
    }
  },
  "construct": {
    "android": {
      "default": "md-construct",
      "active": "md-construct"
    },
    "ios": {
      "default": "ios-construct-outline",
      "active": "ios-construct"
    }
  },
  "contact": {
    "android": {
      "default": "md-contact",
      "active": "md-contact"
    },
    "ios": {
      "default": "ios-contact-outline",
      "active": "ios-contact"
    }
  },
  "contacts": {
    "android": {
      "default": "md-contacts",
      "active": "md-contacts"
    },
    "ios": {
      "default": "ios-contacts-outline",
      "active": "ios-contacts"
    }
  },
  "contract": {
    "android": {
      "default": "md-contract",
      "active": "md-contract"
    },
    "ios": {
      "default": "ios-contract-outline",
      "active": "ios-contract"
    }
  },
  "contrast": {
    "android": {
      "default": "md-contrast",
      "active": "md-contrast"
    },
    "ios": {
      "default": "ios-contrast-outline",
      "active": "ios-contrast"
    }
  },
  "copy": {
    "android": {
      "default": "md-copy",
      "active": "md-copy"
    },
    "ios": {
      "default": "ios-copy-outline",
      "active": "ios-copy"
    }
  },
  "create": {
    "android": {
      "default": "md-create",
      "active": "md-create"
    },
    "ios": {
      "default": "ios-create-outline",
      "active": "ios-create"
    }
  },
  "crop": {
    "android": {
      "default": "md-crop",
      "active": "md-crop"
    },
    "ios": {
      "default": "ios-crop-outline",
      "active": "ios-crop"
    }
  },
  "cube": {
    "android": {
      "default": "md-cube",
      "active": "md-cube"
    },
    "ios": {
      "default": "ios-cube-outline",
      "active": "ios-cube"
    }
  },
  "cut": {
    "android": {
      "default": "md-cut",
      "active": "md-cut"
    },
    "ios": {
      "default": "ios-cut-outline",
      "active": "ios-cut"
    }
  },
  "desktop": {
    "android": {
      "default": "md-desktop",
      "active": "md-desktop"
    },
    "ios": {
      "default": "ios-desktop-outline",
      "active": "ios-desktop"
    }
  },
  "disc": {
    "android": {
      "default": "md-disc",
      "active": "md-disc"
    },
    "ios": {
      "default": "ios-disc-outline",
      "active": "ios-disc"
    }
  },
  "document": {
    "android": {
      "default": "md-document",
      "active": "md-document"
    },
    "ios": {
      "default": "ios-document-outline",
      "active": "ios-document"
    }
  },
  "done-all": {
    "android": {
      "default": "md-done-all",
      "active": "md-done-all"
    },
    "ios": {
      "default": "ios-done-all-outline",
      "active": "ios-done-all"
    }
  },
  "download": {
    "android": {
      "default": "md-download",
      "active": "md-download"
    },
    "ios": {
      "default": "ios-download-outline",
      "active": "ios-download"
    }
  },
  "easel": {
    "android": {
      "default": "md-easel",
      "active": "md-easel"
    },
    "ios": {
      "default": "ios-easel-outline",
      "active": "ios-easel"
    }
  },
  "egg": {
    "android": {
      "default": "md-egg",
      "active": "md-egg"
    },
    "ios": {
      "default": "ios-egg-outline",
      "active": "ios-egg"
    }
  },
  "exit": {
    "android": {
      "default": "md-exit",
      "active": "md-exit"
    },
    "ios": {
      "default": "ios-exit-outline",
      "active": "ios-exit"
    }
  },
  "expand": {
    "android": {
      "default": "md-expand",
      "active": "md-expand"
    },
    "ios": {
      "default": "ios-expand-outline",
      "active": "ios-expand"
    }
  },
  "eye": {
    "android": {
      "default": "md-eye",
      "active": "md-eye"
    },
    "ios": {
      "default": "ios-eye-outline",
      "active": "ios-eye"
    }
  },
  "eye-off": {
    "android": {
      "default": "md-eye-off",
      "active": "md-eye-off"
    },
    "ios": {
      "default": "ios-eye-off-outline",
      "active": "ios-eye-off"
    }
  },
  "fastforward": {
    "android": {
      "default": "md-fastforward",
      "active": "md-fastforward"
    },
    "ios": {
      "default": "ios-fastforward-outline",
      "active": "ios-fastforward"
    }
  },
  "female": {
    "android": {
      "default": "md-female",
      "active": "md-female"
    },
    "ios": {
      "default": "ios-female-outline",
      "active": "ios-female"
    }
  },
  "filing": {
    "android": {
      "default": "md-filing",
      "active": "md-filing"
    },
    "ios": {
      "default": "ios-filing-outline",
      "active": "ios-filing"
    }
  },
  "film": {
    "android": {
      "default": "md-film",
      "active": "md-film"
    },
    "ios": {
      "default": "ios-film-outline",
      "active": "ios-film"
    }
  },
  "finger-print": {
    "android": {
      "default": "md-finger-print",
      "active": "md-finger-print"
    },
    "ios": {
      "default": "ios-finger-print-outline",
      "active": "ios-finger-print"
    }
  },
  "flag": {
    "android": {
      "default": "md-flag",
      "active": "md-flag"
    },
    "ios": {
      "default": "ios-flag-outline",
      "active": "ios-flag"
    }
  },
  "flame": {
    "android": {
      "default": "md-flame",
      "active": "md-flame"
    },
    "ios": {
      "default": "ios-flame-outline",
      "active": "ios-flame"
    }
  },
  "flash": {
    "android": {
      "default": "md-flash",
      "active": "md-flash"
    },
    "ios": {
      "default": "ios-flash-outline",
      "active": "ios-flash"
    }
  },
  "flask": {
    "android": {
      "default": "md-flask",
      "active": "md-flask"
    },
    "ios": {
      "default": "ios-flask-outline",
      "active": "ios-flask"
    }
  },
  "flower": {
    "android": {
      "default": "md-flower",
      "active": "md-flower"
    },
    "ios": {
      "default": "ios-flower-outline",
      "active": "ios-flower"
    }
  },
  "folder": {
    "android": {
      "default": "md-folder",
      "active": "md-folder"
    },
    "ios": {
      "default": "ios-folder-outline",
      "active": "ios-folder"
    }
  },
  "folder-open": {
    "android": {
      "default": "md-folder-open",
      "active": "md-folder-open"
    },
    "ios": {
      "default": "ios-folder-open-outline",
      "active": "ios-folder-open"
    }
  },
  "football": {
    "android": {
      "default": "md-football",
      "active": "md-football"
    },
    "ios": {
      "default": "ios-football-outline",
      "active": "ios-football"
    }
  },
  "funnel": {
    "android": {
      "default": "md-funnel",
      "active": "md-funnel"
    },
    "ios": {
      "default": "ios-funnel-outline",
      "active": "ios-funnel"
    }
  },
  "game-controller-a": {
    "android": {
      "default": "md-game-controller-a",
      "active": "md-game-controller-a"
    },
    "ios": {
      "default": "ios-game-controller-a-outline",
      "active": "ios-game-controller-a"
    }
  },
  "game-controller-b": {
    "android": {
      "default": "md-game-controller-b",
      "active": "md-game-controller-b"
    },
    "ios": {
      "default": "ios-game-controller-b-outline",
      "active": "ios-game-controller-b"
    }
  },
  "git-branch": {
    "android": {
      "default": "md-git-branch",
      "active": "md-git-branch"
    },
    "ios": {
      "default": "ios-git-branch-outline",
      "active": "ios-git-branch"
    }
  },
  "git-commit": {
    "android": {
      "default": "md-git-commit",
      "active": "md-git-commit"
    },
    "ios": {
      "default": "ios-git-commit-outline",
      "active": "ios-git-commit"
    }
  },
  "git-merge": {
    "android": {
      "default": "md-git-merge",
      "active": "md-git-merge"
    },
    "ios": {
      "default": "ios-git-merge-outline",
      "active": "ios-git-merge"
    }
  },
  "git-compare": {
    "android": {
      "default": "md-git-compare",
      "active": "md-git-compare"
    },
    "ios": {
      "default": "ios-git-compare-outline",
      "active": "ios-git-compare"
    }
  },
  "git-network": {
    "android": {
      "default": "md-git-network",
      "active": "md-git-network"
    },
    "ios": {
      "default": "ios-git-network-outline",
      "active": "ios-git-network"
    }
  },
  "git-pull-request": {
    "android": {
      "default": "md-git-pull-request",
      "active": "md-git-pull-request"
    },
    "ios": {
      "default": "ios-git-pull-request-outline",
      "active": "ios-git-pull-request"
    }
  },
  "glasses": {
    "android": {
      "default": "md-glasses",
      "active": "md-glasses"
    },
    "ios": {
      "default": "ios-glasses-outline",
      "active": "ios-glasses"
    }
  },
  "globe": {
    "android": {
      "default": "md-globe",
      "active": "md-globe"
    },
    "ios": {
      "default": "ios-globe-outline",
      "active": "ios-globe"
    }
  },
  "grid": {
    "android": {
      "default": "md-grid",
      "active": "md-grid"
    },
    "ios": {
      "default": "ios-grid-outline",
      "active": "ios-grid"
    }
  },
  "hammer": {
    "android": {
      "default": "md-hammer",
      "active": "md-hammer"
    },
    "ios": {
      "default": "ios-hammer-outline",
      "active": "ios-hammer"
    }
  },
  "hand": {
    "android": {
      "default": "md-hand",
      "active": "md-hand"
    },
    "ios": {
      "default": "ios-hand-outline",
      "active": "ios-hand"
    }
  },
  "headset": {
    "android": {
      "default": "md-headset",
      "active": "md-headset"
    },
    "ios": {
      "default": "ios-headset-outline",
      "active": "ios-headset"
    }
  },
  "heart": {
    "android": {
      "default": "md-heart-outline",
      "active": "md-heart"
    },
    "ios": {
      "default": "ios-heart-outline",
      "active": "ios-heart"
    }
  },
  "happy": {
    "android": {
      "default": "md-happy",
      "active": "md-happy"
    },
    "ios": {
      "default": "ios-happy-outline",
      "active": "ios-happy"
    }
  },
  "help": {
    "android": {
      "default": "md-help",
      "active": "md-help"
    },
    "ios": {
      "default": "ios-help-outline",
      "active": "ios-help"
    }
  },
  "help-buoy": {
    "android": {
      "default": "md-help-buoy",
      "active": "md-help-buoy"
    },
    "ios": {
      "default": "ios-help-buoy-outline",
      "active": "ios-help-buoy"
    }
  },
  "help-circle": {
    "android": {
      "default": "md-help-circle",
      "active": "md-help-circle"
    },
    "ios": {
      "default": "ios-help-circle-outline",
      "active": "ios-help-circle"
    }
  },
  "home": {
    "android": {
      "default": "md-home",
      "active": "md-home"
    },
    "ios": {
      "default": "ios-home-outline",
      "active": "ios-home"
    }
  },
  "ice-cream": {
    "android": {
      "default": "md-ice-cream",
      "active": "md-ice-cream"
    },
    "ios": {
      "default": "ios-ice-cream-outline",
      "active": "ios-ice-cream"
    }
  },
  "image": {
    "android": {
      "default": "md-image",
      "active": "md-image"
    },
    "ios": {
      "default": "ios-image-outline",
      "active": "ios-image"
    }
  },
  "images": {
    "android": {
      "default": "md-images",
      "active": "md-images"
    },
    "ios": {
      "default": "ios-images-outline",
      "active": "ios-images"
    }
  },
  "infinite": {
    "android": {
      "default": "md-infinite",
      "active": "md-infinite"
    },
    "ios": {
      "default": "ios-infinite-outline",
      "active": "ios-infinite"
    }
  },
  "information": {
    "android": {
      "default": "md-information",
      "active": "md-information"
    },
    "ios": {
      "default": "ios-information-outline",
      "active": "ios-information"
    }
  },
  "information-circle": {
    "android": {
      "default": "md-information-circle",
      "active": "md-information-circle"
    },
    "ios": {
      "default": "ios-information-circle-outline",
      "active": "ios-information-circle"
    }
  },
  "ionic": {
    "android": {
      "default": "md-ionic",
      "active": "md-ionic"
    },
    "ios": {
      "default": "ios-ionic-outline",
      "active": "ios-ionic"
    }
  },
  "ionitron": {
    "android": {
      "default": "md-ionitron",
      "active": "md-ionitron"
    },
    "ios": {
      "default": "ios-ionitron-outline",
      "active": "ios-ionitron"
    }
  },
  "jet": {
    "android": {
      "default": "md-jet",
      "active": "md-jet"
    },
    "ios": {
      "default": "ios-jet-outline",
      "active": "ios-jet"
    }
  },
  "key": {
    "android": {
      "default": "md-key",
      "active": "md-key"
    },
    "ios": {
      "default": "ios-key-outline",
      "active": "ios-key"
    }
  },
  "keypad": {
    "android": {
      "default": "md-keypad",
      "active": "md-keypad"
    },
    "ios": {
      "default": "ios-keypad-outline",
      "active": "ios-keypad"
    }
  },
  "laptop": {
    "android": {
      "default": "md-laptop",
      "active": "md-laptop"
    },
    "ios": {
      "default": "ios-laptop-outline",
      "active": "ios-laptop"
    }
  },
  "leaf": {
    "android": {
      "default": "md-leaf",
      "active": "md-leaf"
    },
    "ios": {
      "default": "ios-leaf-outline",
      "active": "ios-leaf"
    }
  },
  "link": {
    "android": {
      "default": "md-link",
      "active": "md-link"
    },
    "ios": {
      "default": "ios-link-outline",
      "active": "ios-link"
    }
  },
  "list": {
    "android": {
      "default": "md-list",
      "active": "md-list"
    },
    "ios": {
      "default": "ios-list-outline",
      "active": "ios-list"
    }
  },
  "list-box": {
    "android": {
      "default": "md-list-box",
      "active": "md-list-box"
    },
    "ios": {
      "default": "ios-list-box-outline",
      "active": "ios-list-box"
    }
  },
  "locate": {
    "android": {
      "default": "md-locate",
      "active": "md-locate"
    },
    "ios": {
      "default": "ios-locate-outline",
      "active": "ios-locate"
    }
  },
  "lock": {
    "android": {
      "default": "md-lock",
      "active": "md-lock"
    },
    "ios": {
      "default": "ios-lock-outline",
      "active": "ios-lock"
    }
  },
  "log-in": {
    "android": {
      "default": "md-log-in",
      "active": "md-log-in"
    },
    "ios": {
      "default": "ios-log-in-outline",
      "active": "ios-log-in"
    }
  },
  "log-out": {
    "android": {
      "default": "md-log-out",
      "active": "md-log-out"
    },
    "ios": {
      "default": "ios-log-out-outline",
      "active": "ios-log-out"
    }
  },
  "magnet": {
    "android": {
      "default": "md-magnet",
      "active": "md-magnet"
    },
    "ios": {
      "default": "ios-magnet-outline",
      "active": "ios-magnet"
    }
  },
  "mail": {
    "android": {
      "default": "md-mail",
      "active": "md-mail"
    },
    "ios": {
      "default": "ios-mail-outline",
      "active": "ios-mail"
    }
  },
  "mail-open": {
    "android": {
      "default": "md-mail-open",
      "active": "md-mail-open"
    },
    "ios": {
      "default": "ios-mail-open-outline",
      "active": "ios-mail-open"
    }
  },
  "male": {
    "android": {
      "default": "md-male",
      "active": "md-male"
    },
    "ios": {
      "default": "ios-male-outline",
      "active": "ios-male"
    }
  },
  "man": {
    "android": {
      "default": "md-man",
      "active": "md-man"
    },
    "ios": {
      "default": "ios-man-outline",
      "active": "ios-man"
    }
  },
  "map": {
    "android": {
      "default": "md-map",
      "active": "md-map"
    },
    "ios": {
      "default": "ios-map-outline",
      "active": "ios-map"
    }
  },
  "medal": {
    "android": {
      "default": "md-medal",
      "active": "md-medal"
    },
    "ios": {
      "default": "ios-medal-outline",
      "active": "ios-medal"
    }
  },
  "medical": {
    "android": {
      "default": "md-medical",
      "active": "md-medical"
    },
    "ios": {
      "default": "ios-medical-outline",
      "active": "ios-medical"
    }
  },
  "medkit": {
    "android": {
      "default": "md-medkit",
      "active": "md-medkit"
    },
    "ios": {
      "default": "ios-medkit-outline",
      "active": "ios-medkit"
    }
  },
  "megaphone": {
    "android": {
      "default": "md-megaphone",
      "active": "md-megaphone"
    },
    "ios": {
      "default": "ios-megaphone-outline",
      "active": "ios-megaphone"
    }
  },
  "menu": {
    "android": {
      "default": "md-menu",
      "active": "md-menu"
    },
    "ios": {
      "default": "ios-menu-outline",
      "active": "ios-menu"
    }
  },
  "mic": {
    "android": {
      "default": "md-mic",
      "active": "md-mic"
    },
    "ios": {
      "default": "ios-mic-outline",
      "active": "ios-mic"
    }
  },
  "mic-off": {
    "android": {
      "default": "md-mic-off",
      "active": "md-mic-off"
    },
    "ios": {
      "default": "ios-mic-off-outline",
      "active": "ios-mic-off"
    }
  },
  "microphone": {
    "android": {
      "default": "md-microphone",
      "active": "md-microphone"
    },
    "ios": {
      "default": "ios-microphone-outline",
      "active": "ios-microphone"
    }
  },
  "moon": {
    "android": {
      "default": "md-moon",
      "active": "md-moon"
    },
    "ios": {
      "default": "ios-moon-outline",
      "active": "ios-moon"
    }
  },
  "more": {
    "android": {
      "default": "md-more",
      "active": "md-more"
    },
    "ios": {
      "default": "ios-more-outline",
      "active": "ios-more"
    }
  },
  "move": {
    "android": {
      "default": "md-move",
      "active": "md-move"
    },
    "ios": {
      "default": "ios-move-outline",
      "active": "ios-move"
    }
  },
  "musical-note": {
    "android": {
      "default": "md-musical-note",
      "active": "md-musical-note"
    },
    "ios": {
      "default": "ios-musical-note-outline",
      "active": "ios-musical-note"
    }
  },
  "musical-notes": {
    "android": {
      "default": "md-musical-notes",
      "active": "md-musical-notes"
    },
    "ios": {
      "default": "ios-musical-notes-outline",
      "active": "ios-musical-notes"
    }
  },
  "navigate": {
    "android": {
      "default": "md-navigate",
      "active": "md-navigate"
    },
    "ios": {
      "default": "ios-navigate-outline",
      "active": "ios-navigate"
    }
  },
  "no-smoking": {
    "android": {
      "default": "md-no-smoking",
      "active": "md-no-smoking"
    },
    "ios": {
      "default": "ios-no-smoking-outline",
      "active": "ios-no-smoking"
    }
  },
  "notifications": {
    "android": {
      "default": "md-notifications-outline",
      "active": "md-notifications"
    },
    "ios": {
      "default": "ios-notifications-outline",
      "active": "ios-notifications"
    }
  },
  "notifications-off": {
    "android": {
      "default": "md-notifications-off",
      "active": "md-notifications-off"
    },
    "ios": {
      "default": "ios-notifications-off-outline",
      "active": "ios-notifications-off"
    }
  },
  "nuclear": {
    "android": {
      "default": "md-nuclear",
      "active": "md-nuclear"
    },
    "ios": {
      "default": "ios-nuclear-outline",
      "active": "ios-nuclear"
    }
  },
  "nutrition": {
    "android": {
      "default": "md-nutrition",
      "active": "md-nutrition"
    },
    "ios": {
      "default": "ios-nutrition-outline",
      "active": "ios-nutrition"
    }
  },
  "open": {
    "android": {
      "default": "md-open",
      "active": "md-open"
    },
    "ios": {
      "default": "ios-open-outline",
      "active": "ios-open"
    }
  },
  "options": {
    "android": {
      "default": "md-options",
      "active": "md-options"
    },
    "ios": {
      "default": "ios-options-outline",
      "active": "ios-options"
    }
  },
  "outlet": {
    "android": {
      "default": "md-outlet",
      "active": "md-outlet"
    },
    "ios": {
      "default": "ios-outlet-outline",
      "active": "ios-outlet"
    }
  },
  "paper": {
    "android": {
      "default": "md-paper",
      "active": "md-paper"
    },
    "ios": {
      "default": "ios-paper-outline",
      "active": "ios-paper"
    }
  },
  "paper-plane": {
    "android": {
      "default": "md-paper-plane",
      "active": "md-paper-plane"
    },
    "ios": {
      "default": "ios-paper-plane-outline",
      "active": "ios-paper-plane"
    }
  },
  "partly-sunny": {
    "android": {
      "default": "md-partly-sunny",
      "active": "md-partly-sunny"
    },
    "ios": {
      "default": "ios-partly-sunny-outline",
      "active": "ios-partly-sunny"
    }
  },
  "pause": {
    "android": {
      "default": "md-pause",
      "active": "md-pause"
    },
    "ios": {
      "default": "ios-pause-outline",
      "active": "ios-pause"
    }
  },
  "paw": {
    "android": {
      "default": "md-paw",
      "active": "md-paw"
    },
    "ios": {
      "default": "ios-paw-outline",
      "active": "ios-paw"
    }
  },
  "people": {
    "android": {
      "default": "md-people",
      "active": "md-people"
    },
    "ios": {
      "default": "ios-people-outline",
      "active": "ios-people"
    }
  },
  "person": {
    "android": {
      "default": "md-person",
      "active": "md-person"
    },
    "ios": {
      "default": "ios-person-outline",
      "active": "ios-person"
    }
  },
  "person-add": {
    "android": {
      "default": "md-person-add",
      "active": "md-person-add"
    },
    "ios": {
      "default": "ios-person-add-outline",
      "active": "ios-person-add"
    }
  },
  "phone-landscape": {
    "android": {
      "default": "md-phone-landscape",
      "active": "md-phone-landscape"
    },
    "ios": {
      "default": "ios-phone-landscape-outline",
      "active": "ios-phone-landscape"
    }
  },
  "phone-portrait": {
    "android": {
      "default": "md-phone-portrait",
      "active": "md-phone-portrait"
    },
    "ios": {
      "default": "ios-phone-portrait-outline",
      "active": "ios-phone-portrait"
    }
  },
  "photos": {
    "android": {
      "default": "md-photos",
      "active": "md-photos"
    },
    "ios": {
      "default": "ios-photos-outline",
      "active": "ios-photos"
    }
  },
  "pie": {
    "android": {
      "default": "md-pie",
      "active": "md-pie"
    },
    "ios": {
      "default": "ios-pie-outline",
      "active": "ios-pie"
    }
  },
  "pin": {
    "android": {
      "default": "md-pin",
      "active": "md-pin"
    },
    "ios": {
      "default": "ios-pin-outline",
      "active": "ios-pin"
    }
  },
  "pint": {
    "android": {
      "default": "md-pint",
      "active": "md-pint"
    },
    "ios": {
      "default": "ios-pint-outline",
      "active": "ios-pint"
    }
  },
  "pizza": {
    "android": {
      "default": "md-pizza",
      "active": "md-pizza"
    },
    "ios": {
      "default": "ios-pizza-outline",
      "active": "ios-pizza"
    }
  },
  "plane": {
    "android": {
      "default": "md-plane",
      "active": "md-plane"
    },
    "ios": {
      "default": "ios-plane-outline",
      "active": "ios-plane"
    }
  },
  "planet": {
    "android": {
      "default": "md-planet",
      "active": "md-planet"
    },
    "ios": {
      "default": "ios-planet-outline",
      "active": "ios-planet"
    }
  },
  "play": {
    "android": {
      "default": "md-play",
      "active": "md-play"
    },
    "ios": {
      "default": "ios-play-outline",
      "active": "ios-play"
    }
  },
  "podium": {
    "android": {
      "default": "md-podium",
      "active": "md-podium"
    },
    "ios": {
      "default": "ios-podium-outline",
      "active": "ios-podium"
    }
  },
  "power": {
    "android": {
      "default": "md-power",
      "active": "md-power"
    },
    "ios": {
      "default": "ios-power-outline",
      "active": "ios-power"
    }
  },
  "pricetag": {
    "android": {
      "default": "md-pricetag",
      "active": "md-pricetag"
    },
    "ios": {
      "default": "ios-pricetag-outline",
      "active": "ios-pricetag"
    }
  },
  "pricetags": {
    "android": {
      "default": "md-pricetags",
      "active": "md-pricetags"
    },
    "ios": {
      "default": "ios-pricetags-outline",
      "active": "ios-pricetags"
    }
  },
  "print": {
    "android": {
      "default": "md-print",
      "active": "md-print"
    },
    "ios": {
      "default": "ios-print-outline",
      "active": "ios-print"
    }
  },
  "pulse": {
    "android": {
      "default": "md-pulse",
      "active": "md-pulse"
    },
    "ios": {
      "default": "ios-pulse-outline",
      "active": "ios-pulse"
    }
  },
  "qr-scanner": {
    "android": {
      "default": "md-qr-scanner",
      "active": "md-qr-scanner"
    },
    "ios": {
      "default": "ios-qr-scanner-outline",
      "active": "ios-qr-scanner"
    }
  },
  "quote": {
    "android": {
      "default": "md-quote",
      "active": "md-quote"
    },
    "ios": {
      "default": "ios-quote-outline",
      "active": "ios-quote"
    }
  },
  "radio": {
    "android": {
      "default": "md-radio",
      "active": "md-radio"
    },
    "ios": {
      "default": "ios-radio-outline",
      "active": "ios-radio"
    }
  },
  "radio-button-off": {
    "android": {
      "default": "md-radio-button-off",
      "active": "md-radio-button-off"
    },
    "ios": {
      "default": "ios-radio-button-off-outline",
      "active": "ios-radio-button-off"
    }
  },
  "radio-button-on": {
    "android": {
      "default": "md-radio-button-on",
      "active": "md-radio-button-on"
    },
    "ios": {
      "default": "ios-radio-button-on-outline",
      "active": "ios-radio-button-on"
    }
  },
  "rainy": {
    "android": {
      "default": "md-rainy",
      "active": "md-rainy"
    },
    "ios": {
      "default": "ios-rainy-outline",
      "active": "ios-rainy"
    }
  },
  "recording": {
    "android": {
      "default": "md-recording",
      "active": "md-recording"
    },
    "ios": {
      "default": "ios-recording-outline",
      "active": "ios-recording"
    }
  },
  "redo": {
    "android": {
      "default": "md-redo",
      "active": "md-redo"
    },
    "ios": {
      "default": "ios-redo-outline",
      "active": "ios-redo"
    }
  },
  "refresh": {
    "android": {
      "default": "md-refresh",
      "active": "md-refresh"
    },
    "ios": {
      "default": "ios-refresh-outline",
      "active": "ios-refresh"
    }
  },
  "remove": {
    "android": {
      "default": "md-remove",
      "active": "md-remove"
    },
    "ios": {
      "default": "ios-remove-outline",
      "active": "ios-remove"
    }
  },
  "remove-circle": {
    "android": {
      "default": "md-remove-circle",
      "active": "md-remove-circle"
    },
    "ios": {
      "default": "ios-remove-circle-outline",
      "active": "ios-remove-circle"
    }
  },
  "reorder": {
    "android": {
      "default": "md-reorder",
      "active": "md-reorder"
    },
    "ios": {
      "default": "ios-reorder-outline",
      "active": "ios-reorder"
    }
  },
  "repeat": {
    "android": {
      "default": "md-repeat",
      "active": "md-repeat"
    },
    "ios": {
      "default": "ios-repeat-outline",
      "active": "ios-repeat"
    }
  },
  "resize": {
    "android": {
      "default": "md-resize",
      "active": "md-resize"
    },
    "ios": {
      "default": "ios-resize-outline",
      "active": "ios-resize"
    }
  },
  "restaurant": {
    "android": {
      "default": "md-restaurant",
      "active": "md-restaurant"
    },
    "ios": {
      "default": "ios-restaurant-outline",
      "active": "ios-restaurant"
    }
  },
  "return-left": {
    "android": {
      "default": "md-return-left",
      "active": "md-return-left"
    },
    "ios": {
      "default": "ios-return-left-outline",
      "active": "ios-return-left"
    }
  },
  "return-right": {
    "android": {
      "default": "md-return-right",
      "active": "md-return-right"
    },
    "ios": {
      "default": "ios-return-right-outline",
      "active": "ios-return-right"
    }
  },
  "reverse-camera": {
    "android": {
      "default": "md-reverse-camera",
      "active": "md-reverse-camera"
    },
    "ios": {
      "default": "ios-reverse-camera-outline",
      "active": "ios-reverse-camera"
    }
  },
  "rewind": {
    "android": {
      "default": "md-rewind",
      "active": "md-rewind"
    },
    "ios": {
      "default": "ios-rewind-outline",
      "active": "ios-rewind"
    }
  },
  "ribbon": {
    "android": {
      "default": "md-ribbon",
      "active": "md-ribbon"
    },
    "ios": {
      "default": "ios-ribbon-outline",
      "active": "ios-ribbon"
    }
  },
  "rose": {
    "android": {
      "default": "md-rose",
      "active": "md-rose"
    },
    "ios": {
      "default": "ios-rose-outline",
      "active": "ios-rose"
    }
  },
  "sad": {
    "android": {
      "default": "md-sad",
      "active": "md-sad"
    },
    "ios": {
      "default": "ios-sad-outline",
      "active": "ios-sad"
    }
  },
  "school": {
    "android": {
      "default": "md-school",
      "active": "md-school"
    },
    "ios": {
      "default": "ios-school-outline",
      "active": "ios-school"
    }
  },
  "search": {
    "android": {
      "default": "md-search",
      "active": "md-search"
    },
    "ios": {
      "default": "ios-search-outline",
      "active": "ios-search"
    }
  },
  "send": {
    "android": {
      "default": "md-send",
      "active": "md-send"
    },
    "ios": {
      "default": "ios-send-outline",
      "active": "ios-send"
    }
  },
  "settings": {
    "android": {
      "default": "md-settings",
      "active": "md-settings"
    },
    "ios": {
      "default": "ios-settings-outline",
      "active": "ios-settings"
    }
  },
  "share": {
    "android": {
      "default": "md-share",
      "active": "md-share"
    },
    "ios": {
      "default": "ios-share-outline",
      "active": "ios-share"
    }
  },
  "shirt": {
    "android": {
      "default": "md-shirt",
      "active": "md-shirt"
    },
    "ios": {
      "default": "ios-shirt-outline",
      "active": "ios-shirt"
    }
  },
  "shuffle": {
    "android": {
      "default": "md-shuffle",
      "active": "md-shuffle"
    },
    "ios": {
      "default": "ios-shuffle-outline",
      "active": "ios-shuffle"
    }
  },
  "skip-backward": {
    "android": {
      "default": "md-skip-backward",
      "active": "md-skip-backward"
    },
    "ios": {
      "default": "ios-skip-backward-outline",
      "active": "ios-skip-backward"
    }
  },
  "skip-forward": {
    "android": {
      "default": "md-skip-forward",
      "active": "md-skip-forward"
    },
    "ios": {
      "default": "ios-skip-forward-outline",
      "active": "ios-skip-forward"
    }
  },
  "snow": {
    "android": {
      "default": "md-snow",
      "active": "md-snow"
    },
    "ios": {
      "default": "ios-snow-outline",
      "active": "ios-snow"
    }
  },
  "speedometer": {
    "android": {
      "default": "md-speedometer",
      "active": "md-speedometer"
    },
    "ios": {
      "default": "ios-speedometer-outline",
      "active": "ios-speedometer"
    }
  },
  "square": {
    "android": {
      "default": "md-square-outline",
      "active": "md-square"
    },
    "ios": {
      "default": "ios-square-outline",
      "active": "ios-square"
    }
  },
  "star": {
    "android": {
      "default": "md-star-outline",
      "active": "md-star"
    },
    "ios": {
      "default": "ios-star-outline",
      "active": "ios-star"
    }
  },
  "star-half": {
    "android": {
      "default": "md-star-half",
      "active": "md-star-half"
    },
    "ios": {
      "default": "ios-star-half-outline",
      "active": "ios-star-half"
    }
  },
  "stats": {
    "android": {
      "default": "md-stats",
      "active": "md-stats"
    },
    "ios": {
      "default": "ios-stats-outline",
      "active": "ios-stats"
    }
  },
  "stopwatch": {
    "android": {
      "default": "md-stopwatch",
      "active": "md-stopwatch"
    },
    "ios": {
      "default": "ios-stopwatch-outline",
      "active": "ios-stopwatch"
    }
  },
  "subway": {
    "android": {
      "default": "md-subway",
      "active": "md-subway"
    },
    "ios": {
      "default": "ios-subway-outline",
      "active": "ios-subway"
    }
  },
  "sunny": {
    "android": {
      "default": "md-sunny",
      "active": "md-sunny"
    },
    "ios": {
      "default": "ios-sunny-outline",
      "active": "ios-sunny"
    }
  },
  "swap": {
    "android": {
      "default": "md-swap",
      "active": "md-swap"
    },
    "ios": {
      "default": "ios-swap-outline",
      "active": "ios-swap"
    }
  },
  "switch": {
    "android": {
      "default": "md-switch",
      "active": "md-switch"
    },
    "ios": {
      "default": "ios-switch-outline",
      "active": "ios-switch"
    }
  },
  "sync": {
    "android": {
      "default": "md-sync",
      "active": "md-sync"
    },
    "ios": {
      "default": "ios-sync-outline",
      "active": "ios-sync"
    }
  },
  "tablet-landscape": {
    "android": {
      "default": "md-tablet-landscape",
      "active": "md-tablet-landscape"
    },
    "ios": {
      "default": "ios-tablet-landscape-outline",
      "active": "ios-tablet-landscape"
    }
  },
  "tablet-portrait": {
    "android": {
      "default": "md-tablet-portrait",
      "active": "md-tablet-portrait"
    },
    "ios": {
      "default": "ios-tablet-portrait-outline",
      "active": "ios-tablet-portrait"
    }
  },
  "tennisball": {
    "android": {
      "default": "md-tennisball",
      "active": "md-tennisball"
    },
    "ios": {
      "default": "ios-tennisball-outline",
      "active": "ios-tennisball"
    }
  },
  "text": {
    "android": {
      "default": "md-text",
      "active": "md-text"
    },
    "ios": {
      "default": "ios-text-outline",
      "active": "ios-text"
    }
  },
  "thermometer": {
    "android": {
      "default": "md-thermometer",
      "active": "md-thermometer"
    },
    "ios": {
      "default": "ios-thermometer-outline",
      "active": "ios-thermometer"
    }
  },
  "thumbs-down": {
    "android": {
      "default": "md-thumbs-down",
      "active": "md-thumbs-down"
    },
    "ios": {
      "default": "ios-thumbs-down-outline",
      "active": "ios-thumbs-down"
    }
  },
  "thumbs-up": {
    "android": {
      "default": "md-thumbs-up",
      "active": "md-thumbs-up"
    },
    "ios": {
      "default": "ios-thumbs-up-outline",
      "active": "ios-thumbs-up"
    }
  },
  "thunderstorm": {
    "android": {
      "default": "md-thunderstorm",
      "active": "md-thunderstorm"
    },
    "ios": {
      "default": "ios-thunderstorm-outline",
      "active": "ios-thunderstorm"
    }
  },
  "time": {
    "android": {
      "default": "md-time",
      "active": "md-time"
    },
    "ios": {
      "default": "ios-time-outline",
      "active": "ios-time"
    }
  },
  "timer": {
    "android": {
      "default": "md-timer",
      "active": "md-timer"
    },
    "ios": {
      "default": "ios-timer-outline",
      "active": "ios-timer"
    }
  },
  "train": {
    "android": {
      "default": "md-train",
      "active": "md-train"
    },
    "ios": {
      "default": "ios-train-outline",
      "active": "ios-train"
    }
  },
  "transgender": {
    "android": {
      "default": "md-transgender",
      "active": "md-transgender"
    },
    "ios": {
      "default": "ios-transgender-outline",
      "active": "ios-transgender"
    }
  },
  "trash": {
    "android": {
      "default": "md-trash",
      "active": "md-trash"
    },
    "ios": {
      "default": "ios-trash-outline",
      "active": "ios-trash"
    }
  },
  "trending-down": {
    "android": {
      "default": "md-trending-down",
      "active": "md-trending-down"
    },
    "ios": {
      "default": "ios-trending-down-outline",
      "active": "ios-trending-down"
    }
  },
  "trending-up": {
    "android": {
      "default": "md-trending-up",
      "active": "md-trending-up"
    },
    "ios": {
      "default": "ios-trending-up-outline",
      "active": "ios-trending-up"
    }
  },
  "trophy": {
    "android": {
      "default": "md-trophy",
      "active": "md-trophy"
    },
    "ios": {
      "default": "ios-trophy-outline",
      "active": "ios-trophy"
    }
  },
  "umbrella": {
    "android": {
      "default": "md-umbrella",
      "active": "md-umbrella"
    },
    "ios": {
      "default": "ios-umbrella-outline",
      "active": "ios-umbrella"
    }
  },
  "undo": {
    "android": {
      "default": "md-undo",
      "active": "md-undo"
    },
    "ios": {
      "default": "ios-undo-outline",
      "active": "ios-undo"
    }
  },
  "unlock": {
    "android": {
      "default": "md-unlock",
      "active": "md-unlock"
    },
    "ios": {
      "default": "ios-unlock-outline",
      "active": "ios-unlock"
    }
  },
  "videocam": {
    "android": {
      "default": "md-videocam",
      "active": "md-videocam"
    },
    "ios": {
      "default": "ios-videocam-outline",
      "active": "ios-videocam"
    }
  },
  "volume-down": {
    "android": {
      "default": "md-volume-down",
      "active": "md-volume-down"
    },
    "ios": {
      "default": "ios-volume-down-outline",
      "active": "ios-volume-down"
    }
  },
  "volume-up": {
    "android": {
      "default": "md-volume-up",
      "active": "md-volume-up"
    },
    "ios": {
      "default": "ios-volume-up-outline",
      "active": "ios-volume-up"
    }
  },
  "volume-mute": {
    "android": {
      "default": "md-volume-mute",
      "active": "md-volume-mute"
    },
    "ios": {
      "default": "ios-volume-mute-outline",
      "active": "ios-volume-mute"
    }
  },
  "volume-off": {
    "android": {
      "default": "md-volume-off",
      "active": "md-volume-off"
    },
    "ios": {
      "default": "ios-volume-off-outline",
      "active": "ios-volume-off"
    }
  },
  "walk": {
    "android": {
      "default": "md-walk",
      "active": "md-walk"
    },
    "ios": {
      "default": "ios-walk-outline",
      "active": "ios-walk"
    }
  },
  "warning": {
    "android": {
      "default": "md-warning",
      "active": "md-warning"
    },
    "ios": {
      "default": "ios-warning-outline",
      "active": "ios-warning"
    }
  },
  "watch": {
    "android": {
      "default": "md-watch",
      "active": "md-watch"
    },
    "ios": {
      "default": "ios-watch-outline",
      "active": "ios-watch"
    }
  },
  "water": {
    "android": {
      "default": "md-water",
      "active": "md-water"
    },
    "ios": {
      "default": "ios-water-outline",
      "active": "ios-water"
    }
  },
  "wifi": {
    "android": {
      "default": "md-wifi",
      "active": "md-wifi"
    },
    "ios": {
      "default": "ios-wifi-outline",
      "active": "ios-wifi"
    }
  },
  "wine": {
    "android": {
      "default": "md-wine",
      "active": "md-wine"
    },
    "ios": {
      "default": "ios-wine-outline",
      "active": "ios-wine"
    }
  },
  "woman": {
    "android": {
      "default": "md-woman",
      "active": "md-woman"
    },
    "ios": {
      "default": "ios-woman-outline",
      "active": "ios-woman"
    }
  }
}