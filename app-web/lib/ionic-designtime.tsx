﻿import React from 'react'
import camelCase from 'lodash/camelCase';
import { iconsMeta } from './ionic'

const App: React.SFC<any> = props => {
  const arr = []
  const arr3 = []
  const nameUsed = {}
  const im = iconsMeta
  for (const p in im) {
    arr.push(`  ${camelCase(p)} = '${p}',`)
    arr3.push(`['${camelCase(p)}', Ionic.Names.${camelCase(p)}]`)
    const meta = im[p]
    nameUsed[meta.ios.active] = true
    nameUsed[meta.ios.default] = true
    nameUsed[meta.android.active] = true
    nameUsed[meta.android.default] = true
  }
  //return <div ref= dangerouslySetInnerHTML={{ __html: x }} />
  const code1 = `
export const enum Names {
${arr.join('\r\n')}
}
`
  const arr4 = CSS.split('\n').filter(s => !!s).map(s => s.split(':before')[0].substr(5)).filter(s => !nameUsed[s])
  const arr2 = arr4.map(s => `  ${camelCase(s)} = '${s}',`)
  const arr5 = arr4.map(p => `['${camelCase(p)}', Ionic.Logos.${camelCase(p)}]`)

  const code2 = `
export const enum Logos {
${arr2.join('\r\n')}
}
`
  const code3 = `
const allNames = [
${arr3.join(', ')}
]
`
  const code4 = `
const notNamesIds = [
${arr5.join(', ')}
]
`

  return <div>
    <textarea key={1} value={code1 + code2 + code3 + code4} />
  </div>
}

export default App

//https://github.com/ionic-team/ionicons/blob/3.0/dist/css/ionicons-core.css
const CSS = `
.ion-ios-add:before { content: "\f102"; }

.ion-ios-add-circle:before { content: "\f101"; }

.ion-ios-add-circle-outline:before { content: "\f100"; }

.ion-ios-add-outline:before { content: "\f102"; }

.ion-ios-alarm:before { content: "\f3c8"; }

.ion-ios-alarm-outline:before { content: "\f3c7"; }

.ion-ios-albums:before { content: "\f3ca"; }

.ion-ios-albums-outline:before { content: "\f3c9"; }

.ion-ios-alert:before { content: "\f104"; }

.ion-ios-alert-outline:before { content: "\f103"; }

.ion-ios-american-football:before { content: "\f106"; }

.ion-ios-american-football-outline:before { content: "\f105"; }

.ion-ios-analytics:before { content: "\f3ce"; }

.ion-ios-analytics-outline:before { content: "\f3cd"; }

.ion-ios-aperture:before { content: "\f108"; }

.ion-ios-aperture-outline:before { content: "\f107"; }

.ion-ios-apps:before { content: "\f10a"; }

.ion-ios-apps-outline:before { content: "\f109"; }

.ion-ios-appstore:before { content: "\f10c"; }

.ion-ios-appstore-outline:before { content: "\f10b"; }

.ion-ios-archive:before { content: "\f10e"; }

.ion-ios-archive-outline:before { content: "\f10d"; }

.ion-ios-arrow-back:before { content: "\f3cf"; }

.ion-ios-arrow-back-outline:before { content: "\f3cf"; }

.ion-ios-arrow-down:before { content: "\f3d0"; }

.ion-ios-arrow-down-outline:before { content: "\f3d0"; }

.ion-ios-arrow-dropdown:before { content: "\f110"; }

.ion-ios-arrow-dropdown-circle:before { content: "\f10f"; }

.ion-ios-arrow-dropdown-circle-outline:before { content: "\f10f"; }

.ion-ios-arrow-dropdown-outline:before { content: "\f110"; }

.ion-ios-arrow-dropleft:before { content: "\f112"; }

.ion-ios-arrow-dropleft-circle:before { content: "\f111"; }

.ion-ios-arrow-dropleft-circle-outline:before { content: "\f111"; }

.ion-ios-arrow-dropleft-outline:before { content: "\f112"; }

.ion-ios-arrow-dropright:before { content: "\f114"; }

.ion-ios-arrow-dropright-circle:before { content: "\f113"; }

.ion-ios-arrow-dropright-circle-outline:before { content: "\f113"; }

.ion-ios-arrow-dropright-outline:before { content: "\f114"; }

.ion-ios-arrow-dropup:before { content: "\f116"; }

.ion-ios-arrow-dropup-circle:before { content: "\f115"; }

.ion-ios-arrow-dropup-circle-outline:before { content: "\f115"; }

.ion-ios-arrow-dropup-outline:before { content: "\f116"; }

.ion-ios-arrow-forward:before { content: "\f3d1"; }

.ion-ios-arrow-forward-outline:before { content: "\f3d1"; }

.ion-ios-arrow-round-back:before { content: "\f117"; }

.ion-ios-arrow-round-back-outline:before { content: "\f117"; }

.ion-ios-arrow-round-down:before { content: "\f118"; }

.ion-ios-arrow-round-down-outline:before { content: "\f118"; }

.ion-ios-arrow-round-forward:before { content: "\f119"; }

.ion-ios-arrow-round-forward-outline:before { content: "\f119"; }

.ion-ios-arrow-round-up:before { content: "\f11a"; }

.ion-ios-arrow-round-up-outline:before { content: "\f11a"; }

.ion-ios-arrow-up:before { content: "\f3d8"; }

.ion-ios-arrow-up-outline:before { content: "\f3d8"; }

.ion-ios-at:before { content: "\f3da"; }

.ion-ios-at-outline:before { content: "\f3d9"; }

.ion-ios-attach:before { content: "\f11b"; }

.ion-ios-attach-outline:before { content: "\f11b"; }

.ion-ios-backspace:before { content: "\f11d"; }

.ion-ios-backspace-outline:before { content: "\f11c"; }

.ion-ios-barcode:before { content: "\f3dc"; }

.ion-ios-barcode-outline:before { content: "\f3db"; }

.ion-ios-baseball:before { content: "\f3de"; }

.ion-ios-baseball-outline:before { content: "\f3dd"; }

.ion-ios-basket:before { content: "\f11f"; }

.ion-ios-basket-outline:before { content: "\f11e"; }

.ion-ios-basketball:before { content: "\f3e0"; }

.ion-ios-basketball-outline:before { content: "\f3df"; }

.ion-ios-battery-charging:before { content: "\f120"; }

.ion-ios-battery-charging-outline:before { content: "\f120"; }

.ion-ios-battery-dead:before { content: "\f121"; }

.ion-ios-battery-dead-outline:before { content: "\f121"; }

.ion-ios-battery-full:before { content: "\f122"; }

.ion-ios-battery-full-outline:before { content: "\f122"; }

.ion-ios-beaker:before { content: "\f124"; }

.ion-ios-beaker-outline:before { content: "\f123"; }

.ion-ios-beer:before { content: "\f126"; }

.ion-ios-beer-outline:before { content: "\f125"; }

.ion-ios-bicycle:before { content: "\f127"; }

.ion-ios-bicycle-outline:before { content: "\f127"; }

.ion-ios-bluetooth:before { content: "\f128"; }

.ion-ios-bluetooth-outline:before { content: "\f128"; }

.ion-ios-boat:before { content: "\f12a"; }

.ion-ios-boat-outline:before { content: "\f129"; }

.ion-ios-body:before { content: "\f3e4"; }

.ion-ios-body-outline:before { content: "\f3e3"; }

.ion-ios-bonfire:before { content: "\f12c"; }

.ion-ios-bonfire-outline:before { content: "\f12b"; }

.ion-ios-book:before { content: "\f3e8"; }

.ion-ios-book-outline:before { content: "\f3e7"; }

.ion-ios-bookmark:before { content: "\f12e"; }

.ion-ios-bookmark-outline:before { content: "\f12d"; }

.ion-ios-bookmarks:before { content: "\f3ea"; }

.ion-ios-bookmarks-outline:before { content: "\f3e9"; }

.ion-ios-bowtie:before { content: "\f130"; }

.ion-ios-bowtie-outline:before { content: "\f12f"; }

.ion-ios-briefcase:before { content: "\f3ee"; }

.ion-ios-briefcase-outline:before { content: "\f3ed"; }

.ion-ios-browsers:before { content: "\f3f0"; }

.ion-ios-browsers-outline:before { content: "\f3ef"; }

.ion-ios-brush:before { content: "\f132"; }

.ion-ios-brush-outline:before { content: "\f131"; }

.ion-ios-bug:before { content: "\f134"; }

.ion-ios-bug-outline:before { content: "\f133"; }

.ion-ios-build:before { content: "\f136"; }

.ion-ios-build-outline:before { content: "\f135"; }

.ion-ios-bulb:before { content: "\f138"; }

.ion-ios-bulb-outline:before { content: "\f137"; }

.ion-ios-bus:before { content: "\f13a"; }

.ion-ios-bus-outline:before { content: "\f139"; }

.ion-ios-cafe:before { content: "\f13c"; }

.ion-ios-cafe-outline:before { content: "\f13b"; }

.ion-ios-calculator:before { content: "\f3f2"; }

.ion-ios-calculator-outline:before { content: "\f3f1"; }

.ion-ios-calendar:before { content: "\f3f4"; }

.ion-ios-calendar-outline:before { content: "\f3f3"; }

.ion-ios-call:before { content: "\f13e"; }

.ion-ios-call-outline:before { content: "\f13d"; }

.ion-ios-camera:before { content: "\f3f6"; }

.ion-ios-camera-outline:before { content: "\f3f5"; }

.ion-ios-car:before { content: "\f140"; }

.ion-ios-car-outline:before { content: "\f13f"; }

.ion-ios-card:before { content: "\f142"; }

.ion-ios-card-outline:before { content: "\f141"; }

.ion-ios-cart:before { content: "\f3f8"; }

.ion-ios-cart-outline:before { content: "\f3f7"; }

.ion-ios-cash:before { content: "\f144"; }

.ion-ios-cash-outline:before { content: "\f143"; }

.ion-ios-chatboxes:before { content: "\f3fa"; }

.ion-ios-chatboxes-outline:before { content: "\f3f9"; }

.ion-ios-chatbubbles:before { content: "\f146"; }

.ion-ios-chatbubbles-outline:before { content: "\f145"; }

.ion-ios-checkbox:before { content: "\f148"; }

.ion-ios-checkbox-outline:before { content: "\f147"; }

.ion-ios-checkmark:before { content: "\f3ff"; }

.ion-ios-checkmark-circle:before { content: "\f14a"; }

.ion-ios-checkmark-circle-outline:before { content: "\f149"; }

.ion-ios-checkmark-outline:before { content: "\f3ff"; }

.ion-ios-clipboard:before { content: "\f14c"; }

.ion-ios-clipboard-outline:before { content: "\f14b"; }

.ion-ios-clock:before { content: "\f403"; }

.ion-ios-clock-outline:before { content: "\f402"; }

.ion-ios-close:before { content: "\f406"; }

.ion-ios-close-circle:before { content: "\f14e"; }

.ion-ios-close-circle-outline:before { content: "\f14d"; }

.ion-ios-close-outline:before { content: "\f406"; }

.ion-ios-closed-captioning:before { content: "\f150"; }

.ion-ios-closed-captioning-outline:before { content: "\f14f"; }

.ion-ios-cloud:before { content: "\f40c"; }

.ion-ios-cloud-circle:before { content: "\f152"; }

.ion-ios-cloud-circle-outline:before { content: "\f151"; }

.ion-ios-cloud-done:before { content: "\f154"; }

.ion-ios-cloud-done-outline:before { content: "\f153"; }

.ion-ios-cloud-download:before { content: "\f408"; }

.ion-ios-cloud-download-outline:before { content: "\f407"; }

.ion-ios-cloud-outline:before { content: "\f409"; }

.ion-ios-cloud-upload:before { content: "\f40b"; }

.ion-ios-cloud-upload-outline:before { content: "\f40a"; }

.ion-ios-cloudy:before { content: "\f410"; }

.ion-ios-cloudy-night:before { content: "\f40e"; }

.ion-ios-cloudy-night-outline:before { content: "\f40d"; }

.ion-ios-cloudy-outline:before { content: "\f40f"; }

.ion-ios-code:before { content: "\f157"; }

.ion-ios-code-download:before { content: "\f155"; }

.ion-ios-code-download-outline:before { content: "\f155"; }

.ion-ios-code-outline:before { content: "\f157"; }

.ion-ios-code-working:before { content: "\f156"; }

.ion-ios-code-working-outline:before { content: "\f156"; }

.ion-ios-cog:before { content: "\f412"; }

.ion-ios-cog-outline:before { content: "\f411"; }

.ion-ios-color-fill:before { content: "\f159"; }

.ion-ios-color-fill-outline:before { content: "\f158"; }

.ion-ios-color-filter:before { content: "\f414"; }

.ion-ios-color-filter-outline:before { content: "\f413"; }

.ion-ios-color-palette:before { content: "\f15b"; }

.ion-ios-color-palette-outline:before { content: "\f15a"; }

.ion-ios-color-wand:before { content: "\f416"; }

.ion-ios-color-wand-outline:before { content: "\f415"; }

.ion-ios-compass:before { content: "\f15d"; }

.ion-ios-compass-outline:before { content: "\f15c"; }

.ion-ios-construct:before { content: "\f15f"; }

.ion-ios-construct-outline:before { content: "\f15e"; }

.ion-ios-contact:before { content: "\f41a"; }

.ion-ios-contact-outline:before { content: "\f419"; }

.ion-ios-contacts:before { content: "\f161"; }

.ion-ios-contacts-outline:before { content: "\f160"; }

.ion-ios-contract:before { content: "\f162"; }

.ion-ios-contract-outline:before { content: "\f162"; }

.ion-ios-contrast:before { content: "\f163"; }

.ion-ios-contrast-outline:before { content: "\f163"; }

.ion-ios-copy:before { content: "\f41c"; }

.ion-ios-copy-outline:before { content: "\f41b"; }

.ion-ios-create:before { content: "\f165"; }

.ion-ios-create-outline:before { content: "\f164"; }

.ion-ios-crop:before { content: "\f41e"; }

.ion-ios-crop-outline:before { content: "\f166"; }

.ion-ios-cube:before { content: "\f168"; }

.ion-ios-cube-outline:before { content: "\f167"; }

.ion-ios-cut:before { content: "\f16a"; }

.ion-ios-cut-outline:before { content: "\f169"; }

.ion-ios-desktop:before { content: "\f16c"; }

.ion-ios-desktop-outline:before { content: "\f16b"; }

.ion-ios-disc:before { content: "\f16e"; }

.ion-ios-disc-outline:before { content: "\f16d"; }

.ion-ios-document:before { content: "\f170"; }

.ion-ios-document-outline:before { content: "\f16f"; }

.ion-ios-done-all:before { content: "\f171"; }

.ion-ios-done-all-outline:before { content: "\f171"; }

.ion-ios-download:before { content: "\f420"; }

.ion-ios-download-outline:before { content: "\f41f"; }

.ion-ios-easel:before { content: "\f173"; }

.ion-ios-easel-outline:before { content: "\f172"; }

.ion-ios-egg:before { content: "\f175"; }

.ion-ios-egg-outline:before { content: "\f174"; }

.ion-ios-exit:before { content: "\f177"; }

.ion-ios-exit-outline:before { content: "\f176"; }

.ion-ios-expand:before { content: "\f178"; }

.ion-ios-expand-outline:before { content: "\f178"; }

.ion-ios-eye:before { content: "\f425"; }

.ion-ios-eye-off:before { content: "\f17a"; }

.ion-ios-eye-off-outline:before { content: "\f179"; }

.ion-ios-eye-outline:before { content: "\f424"; }

.ion-ios-fastforward:before { content: "\f427"; }

.ion-ios-fastforward-outline:before { content: "\f426"; }

.ion-ios-female:before { content: "\f17b"; }

.ion-ios-female-outline:before { content: "\f17b"; }

.ion-ios-filing:before { content: "\f429"; }

.ion-ios-filing-outline:before { content: "\f428"; }

.ion-ios-film:before { content: "\f42b"; }

.ion-ios-film-outline:before { content: "\f42a"; }

.ion-ios-finger-print:before { content: "\f17c"; }

.ion-ios-finger-print-outline:before { content: "\f17c"; }

.ion-ios-flag:before { content: "\f42d"; }

.ion-ios-flag-outline:before { content: "\f42c"; }

.ion-ios-flame:before { content: "\f42f"; }

.ion-ios-flame-outline:before { content: "\f42e"; }

.ion-ios-flash:before { content: "\f17e"; }

.ion-ios-flash-outline:before { content: "\f17d"; }

.ion-ios-flask:before { content: "\f431"; }

.ion-ios-flask-outline:before { content: "\f430"; }

.ion-ios-flower:before { content: "\f433"; }

.ion-ios-flower-outline:before { content: "\f432"; }

.ion-ios-folder:before { content: "\f435"; }

.ion-ios-folder-open:before { content: "\f180"; }

.ion-ios-folder-open-outline:before { content: "\f17f"; }

.ion-ios-folder-outline:before { content: "\f434"; }

.ion-ios-football:before { content: "\f437"; }

.ion-ios-football-outline:before { content: "\f436"; }

.ion-ios-funnel:before { content: "\f182"; }

.ion-ios-funnel-outline:before { content: "\f181"; }

.ion-ios-game-controller-a:before { content: "\f439"; }

.ion-ios-game-controller-a-outline:before { content: "\f438"; }

.ion-ios-game-controller-b:before { content: "\f43b"; }

.ion-ios-game-controller-b-outline:before { content: "\f43a"; }

.ion-ios-git-branch:before { content: "\f183"; }

.ion-ios-git-branch-outline:before { content: "\f183"; }

.ion-ios-git-commit:before { content: "\f184"; }

.ion-ios-git-commit-outline:before { content: "\f184"; }

.ion-ios-git-compare:before { content: "\f185"; }

.ion-ios-git-compare-outline:before { content: "\f185"; }

.ion-ios-git-merge:before { content: "\f186"; }

.ion-ios-git-merge-outline:before { content: "\f186"; }

.ion-ios-git-network:before { content: "\f187"; }

.ion-ios-git-network-outline:before { content: "\f187"; }

.ion-ios-git-pull-request:before { content: "\f188"; }

.ion-ios-git-pull-request-outline:before { content: "\f188"; }

.ion-ios-glasses:before { content: "\f43f"; }

.ion-ios-glasses-outline:before { content: "\f43e"; }

.ion-ios-globe:before { content: "\f18a"; }

.ion-ios-globe-outline:before { content: "\f189"; }

.ion-ios-grid:before { content: "\f18c"; }

.ion-ios-grid-outline:before { content: "\f18b"; }

.ion-ios-hammer:before { content: "\f18e"; }

.ion-ios-hammer-outline:before { content: "\f18d"; }

.ion-ios-hand:before { content: "\f190"; }

.ion-ios-hand-outline:before { content: "\f18f"; }

.ion-ios-happy:before { content: "\f192"; }

.ion-ios-happy-outline:before { content: "\f191"; }

.ion-ios-headset:before { content: "\f194"; }

.ion-ios-headset-outline:before { content: "\f193"; }

.ion-ios-heart:before { content: "\f443"; }

.ion-ios-heart-outline:before { content: "\f442"; }

.ion-ios-help:before { content: "\f446"; }

.ion-ios-help-buoy:before { content: "\f196"; }

.ion-ios-help-buoy-outline:before { content: "\f195"; }

.ion-ios-help-circle:before { content: "\f198"; }

.ion-ios-help-circle-outline:before { content: "\f197"; }

.ion-ios-help-outline:before { content: "\f446"; }

.ion-ios-home:before { content: "\f448"; }

.ion-ios-home-outline:before { content: "\f447"; }

.ion-ios-ice-cream:before { content: "\f19a"; }

.ion-ios-ice-cream-outline:before { content: "\f199"; }

.ion-ios-image:before { content: "\f19c"; }

.ion-ios-image-outline:before { content: "\f19b"; }

.ion-ios-images:before { content: "\f19e"; }

.ion-ios-images-outline:before { content: "\f19d"; }

.ion-ios-infinite:before { content: "\f44a"; }

.ion-ios-infinite-outline:before { content: "\f449"; }

.ion-ios-information:before { content: "\f44d"; }

.ion-ios-information-circle:before { content: "\f1a0"; }

.ion-ios-information-circle-outline:before { content: "\f19f"; }

.ion-ios-information-outline:before { content: "\f44d"; }

.ion-ios-ionic:before { content: "\f1a1"; }

.ion-ios-ionic-outline:before { content: "\f44e"; }

.ion-ios-ionitron:before { content: "\f1a3"; }

.ion-ios-ionitron-outline:before { content: "\f1a2"; }

.ion-ios-jet:before { content: "\f1a5"; }

.ion-ios-jet-outline:before { content: "\f1a4"; }

.ion-ios-key:before { content: "\f1a7"; }

.ion-ios-key-outline:before { content: "\f1a6"; }

.ion-ios-keypad:before { content: "\f450"; }

.ion-ios-keypad-outline:before { content: "\f44f"; }

.ion-ios-laptop:before { content: "\f1a8"; }

.ion-ios-laptop-outline:before { content: "\f1a8"; }

.ion-ios-leaf:before { content: "\f1aa"; }

.ion-ios-leaf-outline:before { content: "\f1a9"; }

.ion-ios-link:before { content: "\f22a"; }

.ion-ios-link-outline:before { content: "\f1ca"; }

.ion-ios-list:before { content: "\f454"; }

.ion-ios-list-box:before { content: "\f1ac"; }

.ion-ios-list-box-outline:before { content: "\f1ab"; }

.ion-ios-list-outline:before { content: "\f454"; }

.ion-ios-locate:before { content: "\f1ae"; }

.ion-ios-locate-outline:before { content: "\f1ad"; }

.ion-ios-lock:before { content: "\f1b0"; }

.ion-ios-lock-outline:before { content: "\f1af"; }

.ion-ios-log-in:before { content: "\f1b1"; }

.ion-ios-log-in-outline:before { content: "\f1b1"; }

.ion-ios-log-out:before { content: "\f1b2"; }

.ion-ios-log-out-outline:before { content: "\f1b2"; }

.ion-ios-magnet:before { content: "\f1b4"; }

.ion-ios-magnet-outline:before { content: "\f1b3"; }

.ion-ios-mail:before { content: "\f1b8"; }

.ion-ios-mail-open:before { content: "\f1b6"; }

.ion-ios-mail-open-outline:before { content: "\f1b5"; }

.ion-ios-mail-outline:before { content: "\f1b7"; }

.ion-ios-male:before { content: "\f1b9"; }

.ion-ios-male-outline:before { content: "\f1b9"; }

.ion-ios-man:before { content: "\f1bb"; }

.ion-ios-man-outline:before { content: "\f1ba"; }

.ion-ios-map:before { content: "\f1bd"; }

.ion-ios-map-outline:before { content: "\f1bc"; }

.ion-ios-medal:before { content: "\f1bf"; }

.ion-ios-medal-outline:before { content: "\f1be"; }

.ion-ios-medical:before { content: "\f45c"; }

.ion-ios-medical-outline:before { content: "\f45b"; }

.ion-ios-medkit:before { content: "\f45e"; }

.ion-ios-medkit-outline:before { content: "\f45d"; }

.ion-ios-megaphone:before { content: "\f1c1"; }

.ion-ios-megaphone-outline:before { content: "\f1c0"; }

.ion-ios-menu:before { content: "\f1c3"; }

.ion-ios-menu-outline:before { content: "\f1c2"; }

.ion-ios-mic:before { content: "\f461"; }

.ion-ios-mic-off:before { content: "\f45f"; }

.ion-ios-mic-off-outline:before { content: "\f1c4"; }

.ion-ios-mic-outline:before { content: "\f460"; }

.ion-ios-microphone:before { content: "\f1c6"; }

.ion-ios-microphone-outline:before { content: "\f1c5"; }

.ion-ios-moon:before { content: "\f468"; }

.ion-ios-moon-outline:before { content: "\f467"; }

.ion-ios-more:before { content: "\f1c8"; }

.ion-ios-more-outline:before { content: "\f1c7"; }

.ion-ios-move:before { content: "\f1cb"; }

.ion-ios-move-outline:before { content: "\f1cb"; }

.ion-ios-musical-note:before { content: "\f46b"; }

.ion-ios-musical-note-outline:before { content: "\f1cc"; }

.ion-ios-musical-notes:before { content: "\f46c"; }

.ion-ios-musical-notes-outline:before { content: "\f1cd"; }

.ion-ios-navigate:before { content: "\f46e"; }

.ion-ios-navigate-outline:before { content: "\f46d"; }

.ion-ios-no-smoking:before { content: "\f1cf"; }

.ion-ios-no-smoking-outline:before { content: "\f1ce"; }

.ion-ios-notifications:before { content: "\f1d3"; }

.ion-ios-notifications-off:before { content: "\f1d1"; }

.ion-ios-notifications-off-outline:before { content: "\f1d0"; }

.ion-ios-notifications-outline:before { content: "\f1d2"; }

.ion-ios-nuclear:before { content: "\f1d5"; }

.ion-ios-nuclear-outline:before { content: "\f1d4"; }

.ion-ios-nutrition:before { content: "\f470"; }

.ion-ios-nutrition-outline:before { content: "\f46f"; }

.ion-ios-open:before { content: "\f1d7"; }

.ion-ios-open-outline:before { content: "\f1d6"; }

.ion-ios-options:before { content: "\f1d9"; }

.ion-ios-options-outline:before { content: "\f1d8"; }

.ion-ios-outlet:before { content: "\f1db"; }

.ion-ios-outlet-outline:before { content: "\f1da"; }

.ion-ios-paper:before { content: "\f472"; }

.ion-ios-paper-outline:before { content: "\f471"; }

.ion-ios-paper-plane:before { content: "\f1dd"; }

.ion-ios-paper-plane-outline:before { content: "\f1dc"; }

.ion-ios-partly-sunny:before { content: "\f1df"; }

.ion-ios-partly-sunny-outline:before { content: "\f1de"; }

.ion-ios-pause:before { content: "\f478"; }

.ion-ios-pause-outline:before { content: "\f477"; }

.ion-ios-paw:before { content: "\f47a"; }

.ion-ios-paw-outline:before { content: "\f479"; }

.ion-ios-people:before { content: "\f47c"; }

.ion-ios-people-outline:before { content: "\f47b"; }

.ion-ios-person:before { content: "\f47e"; }

.ion-ios-person-add:before { content: "\f1e1"; }

.ion-ios-person-add-outline:before { content: "\f1e0"; }

.ion-ios-person-outline:before { content: "\f47d"; }

.ion-ios-phone-landscape:before { content: "\f1e2"; }

.ion-ios-phone-landscape-outline:before { content: "\f1e2"; }

.ion-ios-phone-portrait:before { content: "\f1e3"; }

.ion-ios-phone-portrait-outline:before { content: "\f1e3"; }

.ion-ios-photos:before { content: "\f482"; }

.ion-ios-photos-outline:before { content: "\f481"; }

.ion-ios-pie:before { content: "\f484"; }

.ion-ios-pie-outline:before { content: "\f483"; }

.ion-ios-pin:before { content: "\f1e5"; }

.ion-ios-pin-outline:before { content: "\f1e4"; }

.ion-ios-pint:before { content: "\f486"; }

.ion-ios-pint-outline:before { content: "\f485"; }

.ion-ios-pizza:before { content: "\f1e7"; }

.ion-ios-pizza-outline:before { content: "\f1e6"; }

.ion-ios-plane:before { content: "\f1e9"; }

.ion-ios-plane-outline:before { content: "\f1e8"; }

.ion-ios-planet:before { content: "\f1eb"; }

.ion-ios-planet-outline:before { content: "\f1ea"; }

.ion-ios-play:before { content: "\f488"; }

.ion-ios-play-outline:before { content: "\f487"; }

.ion-ios-podium:before { content: "\f1ed"; }

.ion-ios-podium-outline:before { content: "\f1ec"; }

.ion-ios-power:before { content: "\f1ef"; }

.ion-ios-power-outline:before { content: "\f1ee"; }

.ion-ios-pricetag:before { content: "\f48d"; }

.ion-ios-pricetag-outline:before { content: "\f48c"; }

.ion-ios-pricetags:before { content: "\f48f"; }

.ion-ios-pricetags-outline:before { content: "\f48e"; }

.ion-ios-print:before { content: "\f1f1"; }

.ion-ios-print-outline:before { content: "\f1f0"; }

.ion-ios-pulse:before { content: "\f493"; }

.ion-ios-pulse-outline:before { content: "\f1f2"; }

.ion-ios-qr-scanner:before { content: "\f1f3"; }

.ion-ios-qr-scanner-outline:before { content: "\f1f3"; }

.ion-ios-quote:before { content: "\f1f5"; }

.ion-ios-quote-outline:before { content: "\f1f4"; }

.ion-ios-radio:before { content: "\f1f9"; }

.ion-ios-radio-button-off:before { content: "\f1f6"; }

.ion-ios-radio-button-off-outline:before { content: "\f1f6"; }

.ion-ios-radio-button-on:before { content: "\f1f7"; }

.ion-ios-radio-button-on-outline:before { content: "\f1f7"; }

.ion-ios-radio-outline:before { content: "\f1f8"; }

.ion-ios-rainy:before { content: "\f495"; }

.ion-ios-rainy-outline:before { content: "\f494"; }

.ion-ios-recording:before { content: "\f497"; }

.ion-ios-recording-outline:before { content: "\f496"; }

.ion-ios-redo:before { content: "\f499"; }

.ion-ios-redo-outline:before { content: "\f498"; }

.ion-ios-refresh:before { content: "\f49c"; }

.ion-ios-refresh-circle:before { content: "\f226"; }

.ion-ios-refresh-circle-outline:before { content: "\f224"; }

.ion-ios-refresh-outline:before { content: "\f49c"; }

.ion-ios-remove:before { content: "\f1fc"; }

.ion-ios-remove-circle:before { content: "\f1fb"; }

.ion-ios-remove-circle-outline:before { content: "\f1fa"; }

.ion-ios-remove-outline:before { content: "\f1fc"; }

.ion-ios-reorder:before { content: "\f1fd"; }

.ion-ios-reorder-outline:before { content: "\f1fd"; }

.ion-ios-repeat:before { content: "\f1fe"; }

.ion-ios-repeat-outline:before { content: "\f1fe"; }

.ion-ios-resize:before { content: "\f1ff"; }

.ion-ios-resize-outline:before { content: "\f1ff"; }

.ion-ios-restaurant:before { content: "\f201"; }

.ion-ios-restaurant-outline:before { content: "\f200"; }

.ion-ios-return-left:before { content: "\f202"; }

.ion-ios-return-left-outline:before { content: "\f202"; }

.ion-ios-return-right:before { content: "\f203"; }

.ion-ios-return-right-outline:before { content: "\f203"; }

.ion-ios-reverse-camera:before { content: "\f49f"; }

.ion-ios-reverse-camera-outline:before { content: "\f49e"; }

.ion-ios-rewind:before { content: "\f4a1"; }

.ion-ios-rewind-outline:before { content: "\f4a0"; }

.ion-ios-ribbon:before { content: "\f205"; }

.ion-ios-ribbon-outline:before { content: "\f204"; }

.ion-ios-rose:before { content: "\f4a3"; }

.ion-ios-rose-outline:before { content: "\f4a2"; }

.ion-ios-sad:before { content: "\f207"; }

.ion-ios-sad-outline:before { content: "\f206"; }

.ion-ios-school:before { content: "\f209"; }

.ion-ios-school-outline:before { content: "\f208"; }

.ion-ios-search:before { content: "\f4a5"; }

.ion-ios-search-outline:before { content: "\f20a"; }

.ion-ios-send:before { content: "\f20c"; }

.ion-ios-send-outline:before { content: "\f20b"; }

.ion-ios-settings:before { content: "\f4a7"; }

.ion-ios-settings-outline:before { content: "\f20d"; }

.ion-ios-share:before { content: "\f211"; }

.ion-ios-share-alt:before { content: "\f20f"; }

.ion-ios-share-alt-outline:before { content: "\f20e"; }

.ion-ios-share-outline:before { content: "\f210"; }

.ion-ios-shirt:before { content: "\f213"; }

.ion-ios-shirt-outline:before { content: "\f212"; }

.ion-ios-shuffle:before { content: "\f4a9"; }

.ion-ios-shuffle-outline:before { content: "\f4a9"; }

.ion-ios-skip-backward:before { content: "\f215"; }

.ion-ios-skip-backward-outline:before { content: "\f214"; }

.ion-ios-skip-forward:before { content: "\f217"; }

.ion-ios-skip-forward-outline:before { content: "\f216"; }

.ion-ios-snow:before { content: "\f218"; }

.ion-ios-snow-outline:before { content: "\f22c"; }

.ion-ios-speedometer:before { content: "\f4b0"; }

.ion-ios-speedometer-outline:before { content: "\f4af"; }

.ion-ios-square:before { content: "\f21a"; }

.ion-ios-square-outline:before { content: "\f219"; }

.ion-ios-star:before { content: "\f4b3"; }

.ion-ios-star-half:before { content: "\f4b1"; }

.ion-ios-star-half-outline:before { content: "\f4b1"; }

.ion-ios-star-outline:before { content: "\f4b2"; }

.ion-ios-stats:before { content: "\f21c"; }

.ion-ios-stats-outline:before { content: "\f21b"; }

.ion-ios-stopwatch:before { content: "\f4b5"; }

.ion-ios-stopwatch-outline:before { content: "\f4b4"; }

.ion-ios-subway:before { content: "\f21e"; }

.ion-ios-subway-outline:before { content: "\f21d"; }

.ion-ios-sunny:before { content: "\f4b7"; }

.ion-ios-sunny-outline:before { content: "\f4b6"; }

.ion-ios-swap:before { content: "\f21f"; }

.ion-ios-swap-outline:before { content: "\f21f"; }

.ion-ios-switch:before { content: "\f221"; }

.ion-ios-switch-outline:before { content: "\f220"; }

.ion-ios-sync:before { content: "\f222"; }

.ion-ios-sync-outline:before { content: "\f222"; }

.ion-ios-tablet-landscape:before { content: "\f223"; }

.ion-ios-tablet-landscape-outline:before { content: "\f223"; }

.ion-ios-tablet-portrait:before { content: "\f24e"; }

.ion-ios-tablet-portrait-outline:before { content: "\f24e"; }

.ion-ios-tennisball:before { content: "\f4bb"; }

.ion-ios-tennisball-outline:before { content: "\f4ba"; }

.ion-ios-text:before { content: "\f250"; }

.ion-ios-text-outline:before { content: "\f24f"; }

.ion-ios-thermometer:before { content: "\f252"; }

.ion-ios-thermometer-outline:before { content: "\f251"; }

.ion-ios-thumbs-down:before { content: "\f254"; }

.ion-ios-thumbs-down-outline:before { content: "\f253"; }

.ion-ios-thumbs-up:before { content: "\f256"; }

.ion-ios-thumbs-up-outline:before { content: "\f255"; }

.ion-ios-thunderstorm:before { content: "\f4bd"; }

.ion-ios-thunderstorm-outline:before { content: "\f4bc"; }

.ion-ios-time:before { content: "\f4bf"; }

.ion-ios-time-outline:before { content: "\f4be"; }

.ion-ios-timer:before { content: "\f4c1"; }

.ion-ios-timer-outline:before { content: "\f4c0"; }

.ion-ios-train:before { content: "\f258"; }

.ion-ios-train-outline:before { content: "\f257"; }

.ion-ios-transgender:before { content: "\f259"; }

.ion-ios-transgender-outline:before { content: "\f259"; }

.ion-ios-trash:before { content: "\f4c5"; }

.ion-ios-trash-outline:before { content: "\f4c4"; }

.ion-ios-trending-down:before { content: "\f25a"; }

.ion-ios-trending-down-outline:before { content: "\f25a"; }

.ion-ios-trending-up:before { content: "\f25b"; }

.ion-ios-trending-up-outline:before { content: "\f25b"; }

.ion-ios-trophy:before { content: "\f25d"; }

.ion-ios-trophy-outline:before { content: "\f25c"; }

.ion-ios-umbrella:before { content: "\f25f"; }

.ion-ios-umbrella-outline:before { content: "\f25e"; }

.ion-ios-undo:before { content: "\f4c7"; }

.ion-ios-undo-outline:before { content: "\f4c6"; }

.ion-ios-unlock:before { content: "\f261"; }

.ion-ios-unlock-outline:before { content: "\f260"; }

.ion-ios-videocam:before { content: "\f4cd"; }

.ion-ios-videocam-outline:before { content: "\f4cc"; }

.ion-ios-volume-down:before { content: "\f262"; }

.ion-ios-volume-down-outline:before { content: "\f262"; }

.ion-ios-volume-mute:before { content: "\f263"; }

.ion-ios-volume-mute-outline:before { content: "\f263"; }

.ion-ios-volume-off:before { content: "\f264"; }

.ion-ios-volume-off-outline:before { content: "\f264"; }

.ion-ios-volume-up:before { content: "\f265"; }

.ion-ios-volume-up-outline:before { content: "\f265"; }

.ion-ios-walk:before { content: "\f266"; }

.ion-ios-walk-outline:before { content: "\f266"; }

.ion-ios-warning:before { content: "\f268"; }

.ion-ios-warning-outline:before { content: "\f267"; }

.ion-ios-watch:before { content: "\f269"; }

.ion-ios-watch-outline:before { content: "\f269"; }

.ion-ios-water:before { content: "\f26b"; }

.ion-ios-water-outline:before { content: "\f26a"; }

.ion-ios-wifi:before { content: "\f26d"; }

.ion-ios-wifi-outline:before { content: "\f26c"; }

.ion-ios-wine:before { content: "\f26f"; }

.ion-ios-wine-outline:before { content: "\f26e"; }

.ion-ios-woman:before { content: "\f271"; }

.ion-ios-woman-outline:before { content: "\f270"; }

.ion-logo-android:before { content: "\f225"; }

.ion-logo-angular:before { content: "\f227"; }

.ion-logo-apple:before { content: "\f229"; }

.ion-logo-bitcoin:before { content: "\f22b"; }

.ion-logo-buffer:before { content: "\f22d"; }

.ion-logo-chrome:before { content: "\f22f"; }

.ion-logo-codepen:before { content: "\f230"; }

.ion-logo-css3:before { content: "\f231"; }

.ion-logo-designernews:before { content: "\f232"; }

.ion-logo-dribbble:before { content: "\f233"; }

.ion-logo-dropbox:before { content: "\f234"; }

.ion-logo-euro:before { content: "\f235"; }

.ion-logo-facebook:before { content: "\f236"; }

.ion-logo-foursquare:before { content: "\f237"; }

.ion-logo-freebsd-devil:before { content: "\f238"; }

.ion-logo-github:before { content: "\f239"; }

.ion-logo-google:before { content: "\f23a"; }

.ion-logo-googleplus:before { content: "\f23b"; }

.ion-logo-hackernews:before { content: "\f23c"; }

.ion-logo-html5:before { content: "\f23d"; }

.ion-logo-instagram:before { content: "\f23e"; }

.ion-logo-javascript:before { content: "\f23f"; }

.ion-logo-linkedin:before { content: "\f240"; }

.ion-logo-markdown:before { content: "\f241"; }

.ion-logo-nodejs:before { content: "\f242"; }

.ion-logo-octocat:before { content: "\f243"; }

.ion-logo-pinterest:before { content: "\f244"; }

.ion-logo-playstation:before { content: "\f245"; }

.ion-logo-python:before { content: "\f246"; }

.ion-logo-reddit:before { content: "\f247"; }

.ion-logo-rss:before { content: "\f248"; }

.ion-logo-sass:before { content: "\f249"; }

.ion-logo-skype:before { content: "\f24a"; }

.ion-logo-snapchat:before { content: "\f24b"; }

.ion-logo-steam:before { content: "\f24c"; }

.ion-logo-tumblr:before { content: "\f24d"; }

.ion-logo-tux:before { content: "\f2ae"; }

.ion-logo-twitch:before { content: "\f2af"; }

.ion-logo-twitter:before { content: "\f2b0"; }

.ion-logo-usd:before { content: "\f2b1"; }

.ion-logo-vimeo:before { content: "\f2c4"; }

.ion-logo-whatsapp:before { content: "\f2c5"; }

.ion-logo-windows:before { content: "\f32f"; }

.ion-logo-wordpress:before { content: "\f330"; }

.ion-logo-xbox:before { content: "\f34c"; }

.ion-logo-yahoo:before { content: "\f34d"; }

.ion-logo-yen:before { content: "\f34e"; }

.ion-logo-youtube:before { content: "\f34f"; }

.ion-md-add:before { content: "\f273"; }

.ion-md-add-circle:before { content: "\f272"; }

.ion-md-alarm:before { content: "\f274"; }

.ion-md-albums:before { content: "\f275"; }

.ion-md-alert:before { content: "\f276"; }

.ion-md-american-football:before { content: "\f277"; }

.ion-md-analytics:before { content: "\f278"; }

.ion-md-aperture:before { content: "\f279"; }

.ion-md-apps:before { content: "\f27a"; }

.ion-md-appstore:before { content: "\f27b"; }

.ion-md-archive:before { content: "\f27c"; }

.ion-md-arrow-back:before { content: "\f27d"; }

.ion-md-arrow-down:before { content: "\f27e"; }

.ion-md-arrow-dropdown:before { content: "\f280"; }

.ion-md-arrow-dropdown-circle:before { content: "\f27f"; }

.ion-md-arrow-dropleft:before { content: "\f282"; }

.ion-md-arrow-dropleft-circle:before { content: "\f281"; }

.ion-md-arrow-dropright:before { content: "\f284"; }

.ion-md-arrow-dropright-circle:before { content: "\f283"; }

.ion-md-arrow-dropup:before { content: "\f286"; }

.ion-md-arrow-dropup-circle:before { content: "\f285"; }

.ion-md-arrow-forward:before { content: "\f287"; }

.ion-md-arrow-round-back:before { content: "\f288"; }

.ion-md-arrow-round-down:before { content: "\f289"; }

.ion-md-arrow-round-forward:before { content: "\f28a"; }

.ion-md-arrow-round-up:before { content: "\f28b"; }

.ion-md-arrow-up:before { content: "\f28c"; }

.ion-md-at:before { content: "\f28d"; }

.ion-md-attach:before { content: "\f28e"; }

.ion-md-backspace:before { content: "\f28f"; }

.ion-md-barcode:before { content: "\f290"; }

.ion-md-baseball:before { content: "\f291"; }

.ion-md-basket:before { content: "\f292"; }

.ion-md-basketball:before { content: "\f293"; }

.ion-md-battery-charging:before { content: "\f294"; }

.ion-md-battery-dead:before { content: "\f295"; }

.ion-md-battery-full:before { content: "\f296"; }

.ion-md-beaker:before { content: "\f297"; }

.ion-md-beer:before { content: "\f298"; }

.ion-md-bicycle:before { content: "\f299"; }

.ion-md-bluetooth:before { content: "\f29a"; }

.ion-md-boat:before { content: "\f29b"; }

.ion-md-body:before { content: "\f29c"; }

.ion-md-bonfire:before { content: "\f29d"; }

.ion-md-book:before { content: "\f29e"; }

.ion-md-bookmark:before { content: "\f29f"; }

.ion-md-bookmarks:before { content: "\f2a0"; }

.ion-md-bowtie:before { content: "\f2a1"; }

.ion-md-briefcase:before { content: "\f2a2"; }

.ion-md-browsers:before { content: "\f2a3"; }

.ion-md-brush:before { content: "\f2a4"; }

.ion-md-bug:before { content: "\f2a5"; }

.ion-md-build:before { content: "\f2a6"; }

.ion-md-bulb:before { content: "\f2a7"; }

.ion-md-bus:before { content: "\f2a8"; }

.ion-md-cafe:before { content: "\f2a9"; }

.ion-md-calculator:before { content: "\f2aa"; }

.ion-md-calendar:before { content: "\f2ab"; }

.ion-md-call:before { content: "\f2ac"; }

.ion-md-camera:before { content: "\f2ad"; }

.ion-md-car:before { content: "\f2b2"; }

.ion-md-card:before { content: "\f2b3"; }

.ion-md-cart:before { content: "\f2b4"; }

.ion-md-cash:before { content: "\f2b5"; }

.ion-md-chatboxes:before { content: "\f2b6"; }

.ion-md-chatbubbles:before { content: "\f2b7"; }

.ion-md-checkbox:before { content: "\f2b9"; }

.ion-md-checkbox-outline:before { content: "\f2b8"; }

.ion-md-checkmark:before { content: "\f2bc"; }

.ion-md-checkmark-circle:before { content: "\f2bb"; }

.ion-md-checkmark-circle-outline:before { content: "\f2ba"; }

.ion-md-clipboard:before { content: "\f2bd"; }

.ion-md-clock:before { content: "\f2be"; }

.ion-md-close:before { content: "\f2c0"; }

.ion-md-close-circle:before { content: "\f2bf"; }

.ion-md-closed-captioning:before { content: "\f2c1"; }

.ion-md-cloud:before { content: "\f2c9"; }

.ion-md-cloud-circle:before { content: "\f2c2"; }

.ion-md-cloud-done:before { content: "\f2c3"; }

.ion-md-cloud-download:before { content: "\f2c6"; }

.ion-md-cloud-outline:before { content: "\f2c7"; }

.ion-md-cloud-upload:before { content: "\f2c8"; }

.ion-md-cloudy:before { content: "\f2cb"; }

.ion-md-cloudy-night:before { content: "\f2ca"; }

.ion-md-code:before { content: "\f2ce"; }

.ion-md-code-download:before { content: "\f2cc"; }

.ion-md-code-working:before { content: "\f2cd"; }

.ion-md-cog:before { content: "\f2cf"; }

.ion-md-color-fill:before { content: "\f2d0"; }

.ion-md-color-filter:before { content: "\f2d1"; }

.ion-md-color-palette:before { content: "\f2d2"; }

.ion-md-color-wand:before { content: "\f2d3"; }

.ion-md-compass:before { content: "\f2d4"; }

.ion-md-construct:before { content: "\f2d5"; }

.ion-md-contact:before { content: "\f2d6"; }

.ion-md-contacts:before { content: "\f2d7"; }

.ion-md-contract:before { content: "\f2d8"; }

.ion-md-contrast:before { content: "\f2d9"; }

.ion-md-copy:before { content: "\f2da"; }

.ion-md-create:before { content: "\f2db"; }

.ion-md-crop:before { content: "\f2dc"; }

.ion-md-cube:before { content: "\f2dd"; }

.ion-md-cut:before { content: "\f2de"; }

.ion-md-desktop:before { content: "\f2df"; }

.ion-md-disc:before { content: "\f2e0"; }

.ion-md-document:before { content: "\f2e1"; }

.ion-md-done-all:before { content: "\f2e2"; }

.ion-md-download:before { content: "\f2e3"; }

.ion-md-easel:before { content: "\f2e4"; }

.ion-md-egg:before { content: "\f2e5"; }

.ion-md-exit:before { content: "\f2e6"; }

.ion-md-expand:before { content: "\f2e7"; }

.ion-md-eye:before { content: "\f2e9"; }

.ion-md-eye-off:before { content: "\f2e8"; }

.ion-md-fastforward:before { content: "\f2ea"; }

.ion-md-female:before { content: "\f2eb"; }

.ion-md-filing:before { content: "\f2ec"; }

.ion-md-film:before { content: "\f2ed"; }

.ion-md-finger-print:before { content: "\f2ee"; }

.ion-md-flag:before { content: "\f2ef"; }

.ion-md-flame:before { content: "\f2f0"; }

.ion-md-flash:before { content: "\f2f1"; }

.ion-md-flask:before { content: "\f2f2"; }

.ion-md-flower:before { content: "\f2f3"; }

.ion-md-folder:before { content: "\f2f5"; }

.ion-md-folder-open:before { content: "\f2f4"; }

.ion-md-football:before { content: "\f2f6"; }

.ion-md-funnel:before { content: "\f2f7"; }

.ion-md-game-controller-a:before { content: "\f2f8"; }

.ion-md-game-controller-b:before { content: "\f2f9"; }

.ion-md-git-branch:before { content: "\f2fa"; }

.ion-md-git-commit:before { content: "\f2fb"; }

.ion-md-git-compare:before { content: "\f2fc"; }

.ion-md-git-merge:before { content: "\f2fd"; }

.ion-md-git-network:before { content: "\f2fe"; }

.ion-md-git-pull-request:before { content: "\f2ff"; }

.ion-md-glasses:before { content: "\f300"; }

.ion-md-globe:before { content: "\f301"; }

.ion-md-grid:before { content: "\f302"; }

.ion-md-hammer:before { content: "\f303"; }

.ion-md-hand:before { content: "\f304"; }

.ion-md-happy:before { content: "\f305"; }

.ion-md-headset:before { content: "\f306"; }

.ion-md-heart:before { content: "\f308"; }

.ion-md-heart-outline:before { content: "\f307"; }

.ion-md-help:before { content: "\f30b"; }

.ion-md-help-buoy:before { content: "\f309"; }

.ion-md-help-circle:before { content: "\f30a"; }

.ion-md-home:before { content: "\f30c"; }

.ion-md-ice-cream:before { content: "\f30d"; }

.ion-md-image:before { content: "\f30e"; }

.ion-md-images:before { content: "\f30f"; }

.ion-md-infinite:before { content: "\f310"; }

.ion-md-information:before { content: "\f312"; }

.ion-md-information-circle:before { content: "\f311"; }

.ion-md-ionic:before { content: "\f313"; }

.ion-md-ionitron:before { content: "\f314"; }

.ion-md-jet:before { content: "\f315"; }

.ion-md-key:before { content: "\f316"; }

.ion-md-keypad:before { content: "\f317"; }

.ion-md-laptop:before { content: "\f318"; }

.ion-md-leaf:before { content: "\f319"; }

.ion-md-link:before { content: "\f22e"; }

.ion-md-list:before { content: "\f31b"; }

.ion-md-list-box:before { content: "\f31a"; }

.ion-md-locate:before { content: "\f31c"; }

.ion-md-lock:before { content: "\f31d"; }

.ion-md-log-in:before { content: "\f31e"; }

.ion-md-log-out:before { content: "\f31f"; }

.ion-md-magnet:before { content: "\f320"; }

.ion-md-mail:before { content: "\f322"; }

.ion-md-mail-open:before { content: "\f321"; }

.ion-md-male:before { content: "\f323"; }

.ion-md-man:before { content: "\f324"; }

.ion-md-map:before { content: "\f325"; }

.ion-md-medal:before { content: "\f326"; }

.ion-md-medical:before { content: "\f327"; }

.ion-md-medkit:before { content: "\f328"; }

.ion-md-megaphone:before { content: "\f329"; }

.ion-md-menu:before { content: "\f32a"; }

.ion-md-mic:before { content: "\f32c"; }

.ion-md-mic-off:before { content: "\f32b"; }

.ion-md-microphone:before { content: "\f32d"; }

.ion-md-moon:before { content: "\f32e"; }

.ion-md-more:before { content: "\f1c9"; }

.ion-md-move:before { content: "\f331"; }

.ion-md-musical-note:before { content: "\f332"; }

.ion-md-musical-notes:before { content: "\f333"; }

.ion-md-navigate:before { content: "\f334"; }

.ion-md-no-smoking:before { content: "\f335"; }

.ion-md-notifications:before { content: "\f338"; }

.ion-md-notifications-off:before { content: "\f336"; }

.ion-md-notifications-outline:before { content: "\f337"; }

.ion-md-nuclear:before { content: "\f339"; }

.ion-md-nutrition:before { content: "\f33a"; }

.ion-md-open:before { content: "\f33b"; }

.ion-md-options:before { content: "\f33c"; }

.ion-md-outlet:before { content: "\f33d"; }

.ion-md-paper:before { content: "\f33f"; }

.ion-md-paper-plane:before { content: "\f33e"; }

.ion-md-partly-sunny:before { content: "\f340"; }

.ion-md-pause:before { content: "\f341"; }

.ion-md-paw:before { content: "\f342"; }

.ion-md-people:before { content: "\f343"; }

.ion-md-person:before { content: "\f345"; }

.ion-md-person-add:before { content: "\f344"; }

.ion-md-phone-landscape:before { content: "\f346"; }

.ion-md-phone-portrait:before { content: "\f347"; }

.ion-md-photos:before { content: "\f348"; }

.ion-md-pie:before { content: "\f349"; }

.ion-md-pin:before { content: "\f34a"; }

.ion-md-pint:before { content: "\f34b"; }

.ion-md-pizza:before { content: "\f354"; }

.ion-md-plane:before { content: "\f355"; }

.ion-md-planet:before { content: "\f356"; }

.ion-md-play:before { content: "\f357"; }

.ion-md-podium:before { content: "\f358"; }

.ion-md-power:before { content: "\f359"; }

.ion-md-pricetag:before { content: "\f35a"; }

.ion-md-pricetags:before { content: "\f35b"; }

.ion-md-print:before { content: "\f35c"; }

.ion-md-pulse:before { content: "\f35d"; }

.ion-md-qr-scanner:before { content: "\f35e"; }

.ion-md-quote:before { content: "\f35f"; }

.ion-md-radio:before { content: "\f362"; }

.ion-md-radio-button-off:before { content: "\f360"; }

.ion-md-radio-button-on:before { content: "\f361"; }

.ion-md-rainy:before { content: "\f363"; }

.ion-md-recording:before { content: "\f364"; }

.ion-md-redo:before { content: "\f365"; }

.ion-md-refresh:before { content: "\f366"; }

.ion-md-refresh-circle:before { content: "\f228"; }

.ion-md-remove:before { content: "\f368"; }

.ion-md-remove-circle:before { content: "\f367"; }

.ion-md-reorder:before { content: "\f369"; }

.ion-md-repeat:before { content: "\f36a"; }

.ion-md-resize:before { content: "\f36b"; }

.ion-md-restaurant:before { content: "\f36c"; }

.ion-md-return-left:before { content: "\f36d"; }

.ion-md-return-right:before { content: "\f36e"; }

.ion-md-reverse-camera:before { content: "\f36f"; }

.ion-md-rewind:before { content: "\f370"; }

.ion-md-ribbon:before { content: "\f371"; }

.ion-md-rose:before { content: "\f372"; }

.ion-md-sad:before { content: "\f373"; }

.ion-md-school:before { content: "\f374"; }

.ion-md-search:before { content: "\f375"; }

.ion-md-send:before { content: "\f376"; }

.ion-md-settings:before { content: "\f377"; }

.ion-md-share:before { content: "\f379"; }

.ion-md-share-alt:before { content: "\f378"; }

.ion-md-shirt:before { content: "\f37a"; }

.ion-md-shuffle:before { content: "\f37b"; }

.ion-md-skip-backward:before { content: "\f37c"; }

.ion-md-skip-forward:before { content: "\f37d"; }

.ion-md-snow:before { content: "\f37e"; }

.ion-md-speedometer:before { content: "\f37f"; }

.ion-md-square:before { content: "\f381"; }

.ion-md-square-outline:before { content: "\f380"; }

.ion-md-star:before { content: "\f384"; }

.ion-md-star-half:before { content: "\f382"; }

.ion-md-star-outline:before { content: "\f383"; }

.ion-md-stats:before { content: "\f385"; }

.ion-md-stopwatch:before { content: "\f386"; }

.ion-md-subway:before { content: "\f387"; }

.ion-md-sunny:before { content: "\f388"; }

.ion-md-swap:before { content: "\f389"; }

.ion-md-switch:before { content: "\f38a"; }

.ion-md-sync:before { content: "\f38b"; }

.ion-md-tablet-landscape:before { content: "\f38c"; }

.ion-md-tablet-portrait:before { content: "\f38d"; }

.ion-md-tennisball:before { content: "\f38e"; }

.ion-md-text:before { content: "\f38f"; }

.ion-md-thermometer:before { content: "\f390"; }

.ion-md-thumbs-down:before { content: "\f391"; }

.ion-md-thumbs-up:before { content: "\f392"; }

.ion-md-thunderstorm:before { content: "\f393"; }

.ion-md-time:before { content: "\f394"; }

.ion-md-timer:before { content: "\f395"; }

.ion-md-train:before { content: "\f396"; }

.ion-md-transgender:before { content: "\f397"; }

.ion-md-trash:before { content: "\f398"; }

.ion-md-trending-down:before { content: "\f399"; }

.ion-md-trending-up:before { content: "\f39a"; }

.ion-md-trophy:before { content: "\f39b"; }

.ion-md-umbrella:before { content: "\f39c"; }

.ion-md-undo:before { content: "\f39d"; }

.ion-md-unlock:before { content: "\f39e"; }

.ion-md-videocam:before { content: "\f39f"; }

.ion-md-volume-down:before { content: "\f3a0"; }

.ion-md-volume-mute:before { content: "\f3a1"; }

.ion-md-volume-off:before { content: "\f3a2"; }

.ion-md-volume-up:before { content: "\f3a3"; }

.ion-md-walk:before { content: "\f3a4"; }

.ion-md-warning:before { content: "\f3a5"; }

.ion-md-watch:before { content: "\f3a6"; }

.ion-md-water:before { content: "\f3a7"; }

.ion-md-wifi:before { content: "\f3a8"; }

.ion-md-wine:before { content: "\f3a9"; }

.ion-md-woman:before { content: "\f3aa"; }

`
