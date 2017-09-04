﻿import React from 'react'
import { Icon } from '../lib/ionic'

const App = () => <div>

  <table>
    <tbody>
    {allNames.map((idName, idx) => {
      const id = idName[0]
      const name: Ionic.Names = idName[1] as any
      return <tr key={idx}>
        <td key={1}>{id}</td>
        <td key={2}><Icon name={name} active style={{ fontSize: 24, color: 'maroon', paddingLeft: 30 }} /></td>
        <td key={3}><Icon name={name} style={{ fontSize: 24, color: 'maroon', paddingLeft: 30 }} /></td>
        <td key={4}><Icon name={name} OS='android' style={{ fontSize: 24, color: 'maroon', paddingLeft: 30 }} /></td>
      </tr>
    })}
    </tbody>
  </table>

  <div>
    {notNamesIds.map((idName, idx) => {
      const id = idName[0]
      const ids: Ionic.Logos = idName[1] as any
      return <div key={idx} style={{ width: 250, display: 'inline-block' }}>
        <Icon logoId={ids} style={{ fontSize: 24, color: 'maroon'}} /><span style={{ paddingLeft: 10 }}>{id}</span>
      </div>
    })}
  </div>
</div>

export default App

const allNames = [
  ['closedCaptioning', Ionic.Names.closedCaptioning], ['refreshCircle', Ionic.Names.refreshCircle], ['shareAlt', Ionic.Names.shareAlt], ['add', Ionic.Names.add], ['addCircle', Ionic.Names.addCircle], ['alarm', Ionic.Names.alarm], ['albums', Ionic.Names.albums], ['alert', Ionic.Names.alert], ['americanFootball', Ionic.Names.americanFootball], ['analytics', Ionic.Names.analytics], ['aperture', Ionic.Names.aperture], ['apps', Ionic.Names.apps], ['appstore', Ionic.Names.appstore], ['archive', Ionic.Names.archive], ['arrowBack', Ionic.Names.arrowBack], ['arrowDown', Ionic.Names.arrowDown], ['arrowDropdown', Ionic.Names.arrowDropdown], ['arrowDropdownCircle', Ionic.Names.arrowDropdownCircle], ['arrowDropleft', Ionic.Names.arrowDropleft], ['arrowDropleftCircle', Ionic.Names.arrowDropleftCircle], ['arrowDropright', Ionic.Names.arrowDropright], ['arrowDroprightCircle', Ionic.Names.arrowDroprightCircle], ['arrowDropup', Ionic.Names.arrowDropup], ['arrowDropupCircle', Ionic.Names.arrowDropupCircle], ['arrowForward', Ionic.Names.arrowForward], ['arrowRoundBack', Ionic.Names.arrowRoundBack], ['arrowRoundDown', Ionic.Names.arrowRoundDown], ['arrowRoundForward', Ionic.Names.arrowRoundForward], ['arrowRoundUp', Ionic.Names.arrowRoundUp], ['arrowUp', Ionic.Names.arrowUp], ['at', Ionic.Names.at], ['attach', Ionic.Names.attach], ['backspace', Ionic.Names.backspace], ['barcode', Ionic.Names.barcode], ['baseball', Ionic.Names.baseball], ['basket', Ionic.Names.basket], ['basketball', Ionic.Names.basketball], ['batteryCharging', Ionic.Names.batteryCharging], ['batteryDead', Ionic.Names.batteryDead], ['batteryFull', Ionic.Names.batteryFull], ['beaker', Ionic.Names.beaker], ['beer', Ionic.Names.beer], ['bicycle', Ionic.Names.bicycle], ['bluetooth', Ionic.Names.bluetooth], ['boat', Ionic.Names.boat], ['body', Ionic.Names.body], ['bonfire', Ionic.Names.bonfire], ['book', Ionic.Names.book], ['bookmark', Ionic.Names.bookmark], ['bookmarks', Ionic.Names.bookmarks], ['bowtie', Ionic.Names.bowtie], ['briefcase', Ionic.Names.briefcase], ['browsers', Ionic.Names.browsers], ['brush', Ionic.Names.brush], ['bug', Ionic.Names.bug], ['build', Ionic.Names.build], ['bulb', Ionic.Names.bulb], ['bus', Ionic.Names.bus], ['cafe', Ionic.Names.cafe], ['calculator', Ionic.Names.calculator], ['calendar', Ionic.Names.calendar], ['call', Ionic.Names.call], ['camera', Ionic.Names.camera], ['car', Ionic.Names.car], ['card', Ionic.Names.card], ['cart', Ionic.Names.cart], ['cash', Ionic.Names.cash], ['chatboxes', Ionic.Names.chatboxes], ['chatbubbles', Ionic.Names.chatbubbles], ['checkbox', Ionic.Names.checkbox], ['checkmark', Ionic.Names.checkmark], ['checkmarkCircle', Ionic.Names.checkmarkCircle], ['clipboard', Ionic.Names.clipboard], ['clock', Ionic.Names.clock], ['close', Ionic.Names.close], ['closeCircle', Ionic.Names.closeCircle], ['cloud', Ionic.Names.cloud], ['cloudCircle', Ionic.Names.cloudCircle], ['cloudDone', Ionic.Names.cloudDone], ['cloudDownload', Ionic.Names.cloudDownload], ['cloudUpload', Ionic.Names.cloudUpload], ['cloudy', Ionic.Names.cloudy], ['cloudyNight', Ionic.Names.cloudyNight], ['code', Ionic.Names.code], ['codeDownload', Ionic.Names.codeDownload], ['codeWorking', Ionic.Names.codeWorking], ['cog', Ionic.Names.cog], ['colorFill', Ionic.Names.colorFill], ['colorFilter', Ionic.Names.colorFilter], ['colorPalette', Ionic.Names.colorPalette], ['colorWand', Ionic.Names.colorWand], ['compass', Ionic.Names.compass], ['construct', Ionic.Names.construct], ['contact', Ionic.Names.contact], ['contacts', Ionic.Names.contacts], ['contract', Ionic.Names.contract], ['contrast', Ionic.Names.contrast], ['copy', Ionic.Names.copy], ['create', Ionic.Names.create], ['crop', Ionic.Names.crop], ['cube', Ionic.Names.cube], ['cut', Ionic.Names.cut], ['desktop', Ionic.Names.desktop], ['disc', Ionic.Names.disc], ['document', Ionic.Names.document], ['doneAll', Ionic.Names.doneAll], ['download', Ionic.Names.download], ['easel', Ionic.Names.easel], ['egg', Ionic.Names.egg], ['exit', Ionic.Names.exit], ['expand', Ionic.Names.expand], ['eye', Ionic.Names.eye], ['eyeOff', Ionic.Names.eyeOff], ['fastforward', Ionic.Names.fastforward], ['female', Ionic.Names.female], ['filing', Ionic.Names.filing], ['film', Ionic.Names.film], ['fingerPrint', Ionic.Names.fingerPrint], ['flag', Ionic.Names.flag], ['flame', Ionic.Names.flame], ['flash', Ionic.Names.flash], ['flask', Ionic.Names.flask], ['flower', Ionic.Names.flower], ['folder', Ionic.Names.folder], ['folderOpen', Ionic.Names.folderOpen], ['football', Ionic.Names.football], ['funnel', Ionic.Names.funnel], ['gameControllerA', Ionic.Names.gameControllerA], ['gameControllerB', Ionic.Names.gameControllerB], ['gitBranch', Ionic.Names.gitBranch], ['gitCommit', Ionic.Names.gitCommit], ['gitMerge', Ionic.Names.gitMerge], ['gitCompare', Ionic.Names.gitCompare], ['gitNetwork', Ionic.Names.gitNetwork], ['gitPullRequest', Ionic.Names.gitPullRequest], ['glasses', Ionic.Names.glasses], ['globe', Ionic.Names.globe], ['grid', Ionic.Names.grid], ['hammer', Ionic.Names.hammer], ['hand', Ionic.Names.hand], ['headset', Ionic.Names.headset], ['heart', Ionic.Names.heart], ['happy', Ionic.Names.happy], ['help', Ionic.Names.help], ['helpBuoy', Ionic.Names.helpBuoy], ['helpCircle', Ionic.Names.helpCircle], ['home', Ionic.Names.home], ['iceCream', Ionic.Names.iceCream], ['image', Ionic.Names.image], ['images', Ionic.Names.images], ['infinite', Ionic.Names.infinite], ['information', Ionic.Names.information], ['informationCircle', Ionic.Names.informationCircle], ['ionic', Ionic.Names.ionic], ['ionitron', Ionic.Names.ionitron], ['jet', Ionic.Names.jet], ['key', Ionic.Names.key], ['keypad', Ionic.Names.keypad], ['laptop', Ionic.Names.laptop], ['leaf', Ionic.Names.leaf], ['link', Ionic.Names.link], ['list', Ionic.Names.list], ['listBox', Ionic.Names.listBox], ['locate', Ionic.Names.locate], ['lock', Ionic.Names.lock], ['logIn', Ionic.Names.logIn], ['logOut', Ionic.Names.logOut], ['magnet', Ionic.Names.magnet], ['mail', Ionic.Names.mail], ['mailOpen', Ionic.Names.mailOpen], ['male', Ionic.Names.male], ['man', Ionic.Names.man], ['map', Ionic.Names.map], ['medal', Ionic.Names.medal], ['medical', Ionic.Names.medical], ['medkit', Ionic.Names.medkit], ['megaphone', Ionic.Names.megaphone], ['menu', Ionic.Names.menu], ['mic', Ionic.Names.mic], ['micOff', Ionic.Names.micOff], ['microphone', Ionic.Names.microphone], ['moon', Ionic.Names.moon], ['more', Ionic.Names.more], ['move', Ionic.Names.move], ['musicalNote', Ionic.Names.musicalNote], ['musicalNotes', Ionic.Names.musicalNotes], ['navigate', Ionic.Names.navigate], ['noSmoking', Ionic.Names.noSmoking], ['notifications', Ionic.Names.notifications], ['notificationsOff', Ionic.Names.notificationsOff], ['nuclear', Ionic.Names.nuclear], ['nutrition', Ionic.Names.nutrition], ['open', Ionic.Names.open], ['options', Ionic.Names.options], ['outlet', Ionic.Names.outlet], ['paper', Ionic.Names.paper], ['paperPlane', Ionic.Names.paperPlane], ['partlySunny', Ionic.Names.partlySunny], ['pause', Ionic.Names.pause], ['paw', Ionic.Names.paw], ['people', Ionic.Names.people], ['person', Ionic.Names.person], ['personAdd', Ionic.Names.personAdd], ['phoneLandscape', Ionic.Names.phoneLandscape], ['phonePortrait', Ionic.Names.phonePortrait], ['photos', Ionic.Names.photos], ['pie', Ionic.Names.pie], ['pin', Ionic.Names.pin], ['pint', Ionic.Names.pint], ['pizza', Ionic.Names.pizza], ['plane', Ionic.Names.plane], ['planet', Ionic.Names.planet], ['play', Ionic.Names.play], ['podium', Ionic.Names.podium], ['power', Ionic.Names.power], ['pricetag', Ionic.Names.pricetag], ['pricetags', Ionic.Names.pricetags], ['print', Ionic.Names.print], ['pulse', Ionic.Names.pulse], ['qrScanner', Ionic.Names.qrScanner], ['quote', Ionic.Names.quote], ['radio', Ionic.Names.radio], ['radioButtonOff', Ionic.Names.radioButtonOff], ['radioButtonOn', Ionic.Names.radioButtonOn], ['rainy', Ionic.Names.rainy], ['recording', Ionic.Names.recording], ['redo', Ionic.Names.redo], ['refresh', Ionic.Names.refresh], ['remove', Ionic.Names.remove], ['removeCircle', Ionic.Names.removeCircle], ['reorder', Ionic.Names.reorder], ['repeat', Ionic.Names.repeat], ['resize', Ionic.Names.resize], ['restaurant', Ionic.Names.restaurant], ['returnLeft', Ionic.Names.returnLeft], ['returnRight', Ionic.Names.returnRight], ['reverseCamera', Ionic.Names.reverseCamera], ['rewind', Ionic.Names.rewind], ['ribbon', Ionic.Names.ribbon], ['rose', Ionic.Names.rose], ['sad', Ionic.Names.sad], ['school', Ionic.Names.school], ['search', Ionic.Names.search], ['send', Ionic.Names.send], ['settings', Ionic.Names.settings], ['share', Ionic.Names.share], ['shirt', Ionic.Names.shirt], ['shuffle', Ionic.Names.shuffle], ['skipBackward', Ionic.Names.skipBackward], ['skipForward', Ionic.Names.skipForward], ['snow', Ionic.Names.snow], ['speedometer', Ionic.Names.speedometer], ['square', Ionic.Names.square], ['star', Ionic.Names.star], ['starHalf', Ionic.Names.starHalf], ['stats', Ionic.Names.stats], ['stopwatch', Ionic.Names.stopwatch], ['subway', Ionic.Names.subway], ['sunny', Ionic.Names.sunny], ['swap', Ionic.Names.swap], ['switch', Ionic.Names.switch], ['sync', Ionic.Names.sync], ['tabletLandscape', Ionic.Names.tabletLandscape], ['tabletPortrait', Ionic.Names.tabletPortrait], ['tennisball', Ionic.Names.tennisball], ['text', Ionic.Names.text], ['thermometer', Ionic.Names.thermometer], ['thumbsDown', Ionic.Names.thumbsDown], ['thumbsUp', Ionic.Names.thumbsUp], ['thunderstorm', Ionic.Names.thunderstorm], ['time', Ionic.Names.time], ['timer', Ionic.Names.timer], ['train', Ionic.Names.train], ['transgender', Ionic.Names.transgender], ['trash', Ionic.Names.trash], ['trendingDown', Ionic.Names.trendingDown], ['trendingUp', Ionic.Names.trendingUp], ['trophy', Ionic.Names.trophy], ['umbrella', Ionic.Names.umbrella], ['undo', Ionic.Names.undo], ['unlock', Ionic.Names.unlock], ['videocam', Ionic.Names.videocam], ['volumeDown', Ionic.Names.volumeDown], ['volumeUp', Ionic.Names.volumeUp], ['volumeMute', Ionic.Names.volumeMute], ['volumeOff', Ionic.Names.volumeOff], ['walk', Ionic.Names.walk], ['warning', Ionic.Names.warning], ['watch', Ionic.Names.watch], ['water', Ionic.Names.water], ['wifi', Ionic.Names.wifi], ['wine', Ionic.Names.wine], ['woman', Ionic.Names.woman]
]

const notNamesIds = [
  ['logoAndroid', Ionic.Logos.logoAndroid], ['logoAngular', Ionic.Logos.logoAngular], ['logoApple', Ionic.Logos.logoApple], ['logoBitcoin', Ionic.Logos.logoBitcoin], ['logoBuffer', Ionic.Logos.logoBuffer], ['logoChrome', Ionic.Logos.logoChrome], ['logoCodepen', Ionic.Logos.logoCodepen], ['logoCss3', Ionic.Logos.logoCss3], ['logoDesignernews', Ionic.Logos.logoDesignernews], ['logoDribbble', Ionic.Logos.logoDribbble], ['logoDropbox', Ionic.Logos.logoDropbox], ['logoEuro', Ionic.Logos.logoEuro], ['logoFacebook', Ionic.Logos.logoFacebook], ['logoFoursquare', Ionic.Logos.logoFoursquare], ['logoFreebsdDevil', Ionic.Logos.logoFreebsdDevil], ['logoGithub', Ionic.Logos.logoGithub], ['logoGoogle', Ionic.Logos.logoGoogle], ['logoGoogleplus', Ionic.Logos.logoGoogleplus], ['logoHackernews', Ionic.Logos.logoHackernews], ['logoHtml5', Ionic.Logos.logoHtml5], ['logoInstagram', Ionic.Logos.logoInstagram], ['logoJavascript', Ionic.Logos.logoJavascript], ['logoLinkedin', Ionic.Logos.logoLinkedin], ['logoMarkdown', Ionic.Logos.logoMarkdown], ['logoNodejs', Ionic.Logos.logoNodejs], ['logoOctocat', Ionic.Logos.logoOctocat], ['logoPinterest', Ionic.Logos.logoPinterest], ['logoPlaystation', Ionic.Logos.logoPlaystation], ['logoPython', Ionic.Logos.logoPython], ['logoReddit', Ionic.Logos.logoReddit], ['logoRss', Ionic.Logos.logoRss], ['logoSass', Ionic.Logos.logoSass], ['logoSkype', Ionic.Logos.logoSkype], ['logoSnapchat', Ionic.Logos.logoSnapchat], ['logoSteam', Ionic.Logos.logoSteam], ['logoTumblr', Ionic.Logos.logoTumblr], ['logoTux', Ionic.Logos.logoTux], ['logoTwitch', Ionic.Logos.logoTwitch], ['logoTwitter', Ionic.Logos.logoTwitter], ['logoUsd', Ionic.Logos.logoUsd], ['logoVimeo', Ionic.Logos.logoVimeo], ['logoWhatsapp', Ionic.Logos.logoWhatsapp], ['logoWindows', Ionic.Logos.logoWindows], ['logoWordpress', Ionic.Logos.logoWordpress], ['logoXbox', Ionic.Logos.logoXbox], ['logoYahoo', Ionic.Logos.logoYahoo], ['logoYen', Ionic.Logos.logoYen], ['logoYoutube', Ionic.Logos.logoYoutube]
]
