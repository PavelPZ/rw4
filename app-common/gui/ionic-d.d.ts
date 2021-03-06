﻿declare namespace GUI {

  interface IIconProps extends GUI.IColorProps, GUI.IIconPropsLow {
    style?: RN.ViewStyle & RN.TextStyle | (RN.ViewStyle & RN.TextStyle)[]
    reverse?: boolean
    //native?: { inButton?: boolean }
    onPress?: () => void
  }
  
  const enum IonicIcons {
    closedCaptioning = 'closedCaptioning',
    refreshCircle = 'refreshCircle',
    shareAlt = 'shareAlt',
    add = 'add',
    addCircle = 'add-circle',
    alarm = 'alarm',
    albums = 'albums',
    alert = 'alert',
    americanFootball = 'american-football',
    analytics = 'analytics',
    aperture = 'aperture',
    apps = 'apps',
    appstore = 'appstore',
    archive = 'archive',
    arrowBack = 'arrow-back',
    arrowDown = 'arrow-down',
    arrowDropdown = 'arrow-dropdown',
    arrowDropdownCircle = 'arrow-dropdown-circle',
    arrowDropleft = 'arrow-dropleft',
    arrowDropleftCircle = 'arrow-dropleft-circle',
    arrowDropright = 'arrow-dropright',
    arrowDroprightCircle = 'arrow-dropright-circle',
    arrowDropup = 'arrow-dropup',
    arrowDropupCircle = 'arrow-dropup-circle',
    arrowForward = 'arrow-forward',
    arrowRoundBack = 'arrow-round-back',
    arrowRoundDown = 'arrow-round-down',
    arrowRoundForward = 'arrow-round-forward',
    arrowRoundUp = 'arrow-round-up',
    arrowUp = 'arrow-up',
    at = 'at',
    attach = 'attach',
    backspace = 'backspace',
    barcode = 'barcode',
    baseball = 'baseball',
    basket = 'basket',
    basketball = 'basketball',
    batteryCharging = 'battery-charging',
    batteryDead = 'battery-dead',
    batteryFull = 'battery-full',
    beaker = 'beaker',
    beer = 'beer',
    bicycle = 'bicycle',
    bluetooth = 'bluetooth',
    boat = 'boat',
    body = 'body',
    bonfire = 'bonfire',
    book = 'book',
    bookmark = 'bookmark',
    bookmarks = 'bookmarks',
    bowtie = 'bowtie',
    briefcase = 'briefcase',
    browsers = 'browsers',
    brush = 'brush',
    bug = 'bug',
    build = 'build',
    bulb = 'bulb',
    bus = 'bus',
    cafe = 'cafe',
    calculator = 'calculator',
    calendar = 'calendar',
    call = 'call',
    camera = 'camera',
    car = 'car',
    card = 'card',
    cart = 'cart',
    cash = 'cash',
    chatboxes = 'chatboxes',
    chatbubbles = 'chatbubbles',
    checkbox = 'checkbox',
    checkmark = 'checkmark',
    checkmarkCircle = 'checkmark-circle',
    clipboard = 'clipboard',
    clock = 'clock',
    close = 'close',
    closeCircle = 'close-circle',
    cloud = 'cloud',
    cloudCircle = 'cloud-circle',
    cloudDone = 'cloud-done',
    cloudDownload = 'cloud-download',
    cloudUpload = 'cloud-upload',
    cloudy = 'cloudy',
    cloudyNight = 'cloudy-night',
    code = 'code',
    codeDownload = 'code-download',
    codeWorking = 'code-working',
    cog = 'cog',
    colorFill = 'color-fill',
    colorFilter = 'color-filter',
    colorPalette = 'color-palette',
    colorWand = 'color-wand',
    compass = 'compass',
    construct = 'construct',
    contact = 'contact',
    contacts = 'contacts',
    contract = 'contract',
    contrast = 'contrast',
    copy = 'copy',
    create = 'create',
    crop = 'crop',
    cube = 'cube',
    cut = 'cut',
    desktop = 'desktop',
    disc = 'disc',
    document = 'document',
    doneAll = 'done-all',
    download = 'download',
    easel = 'easel',
    egg = 'egg',
    exit = 'exit',
    expand = 'expand',
    eye = 'eye',
    eyeOff = 'eye-off',
    fastforward = 'fastforward',
    female = 'female',
    filing = 'filing',
    film = 'film',
    fingerPrint = 'finger-print',
    flag = 'flag',
    flame = 'flame',
    flash = 'flash',
    flask = 'flask',
    flower = 'flower',
    folder = 'folder',
    folderOpen = 'folder-open',
    football = 'football',
    funnel = 'funnel',
    gameControllerA = 'game-controller-a',
    gameControllerB = 'game-controller-b',
    gitBranch = 'git-branch',
    gitCommit = 'git-commit',
    gitMerge = 'git-merge',
    gitCompare = 'git-compare',
    gitNetwork = 'git-network',
    gitPullRequest = 'git-pull-request',
    glasses = 'glasses',
    globe = 'globe',
    grid = 'grid',
    hammer = 'hammer',
    hand = 'hand',
    headset = 'headset',
    heart = 'heart',
    happy = 'happy',
    help = 'help',
    helpBuoy = 'help-buoy',
    helpCircle = 'help-circle',
    home = 'home',
    iceCream = 'ice-cream',
    image = 'image',
    images = 'images',
    infinite = 'infinite',
    information = 'information',
    informationCircle = 'information-circle',
    ionic = 'ionic',
    ionitron = 'ionitron',
    jet = 'jet',
    key = 'key',
    keypad = 'keypad',
    laptop = 'laptop',
    leaf = 'leaf',
    link = 'link',
    list = 'list',
    listBox = 'list-box',
    locate = 'locate',
    lock = 'lock',
    logIn = 'log-in',
    logOut = 'log-out',
    magnet = 'magnet',
    mail = 'mail',
    mailOpen = 'mail-open',
    male = 'male',
    man = 'man',
    map = 'map',
    medal = 'medal',
    medical = 'medical',
    medkit = 'medkit',
    megaphone = 'megaphone',
    menu = 'menu',
    mic = 'mic',
    micOff = 'mic-off',
    microphone = 'microphone',
    moon = 'moon',
    more = 'more',
    move = 'move',
    musicalNote = 'musical-note',
    musicalNotes = 'musical-notes',
    navigate = 'navigate',
    noSmoking = 'no-smoking',
    notifications = 'notifications',
    notificationsOff = 'notifications-off',
    nuclear = 'nuclear',
    nutrition = 'nutrition',
    open = 'open',
    options = 'options',
    outlet = 'outlet',
    paper = 'paper',
    paperPlane = 'paper-plane',
    partlySunny = 'partly-sunny',
    pause = 'pause',
    paw = 'paw',
    people = 'people',
    person = 'person',
    personAdd = 'person-add',
    phoneLandscape = 'phone-landscape',
    phonePortrait = 'phone-portrait',
    photos = 'photos',
    pie = 'pie',
    pin = 'pin',
    pint = 'pint',
    pizza = 'pizza',
    plane = 'plane',
    planet = 'planet',
    play = 'play',
    podium = 'podium',
    power = 'power',
    pricetag = 'pricetag',
    pricetags = 'pricetags',
    print = 'print',
    pulse = 'pulse',
    qrScanner = 'qr-scanner',
    quote = 'quote',
    radio = 'radio',
    radioButtonOff = 'radio-button-off',
    radioButtonOn = 'radio-button-on',
    rainy = 'rainy',
    recording = 'recording',
    redo = 'redo',
    refresh = 'refresh',
    remove = 'remove',
    removeCircle = 'remove-circle',
    reorder = 'reorder',
    repeat = 'repeat',
    resize = 'resize',
    restaurant = 'restaurant',
    returnLeft = 'return-left',
    returnRight = 'return-right',
    reverseCamera = 'reverse-camera',
    rewind = 'rewind',
    ribbon = 'ribbon',
    rose = 'rose',
    sad = 'sad',
    school = 'school',
    search = 'search',
    send = 'send',
    settings = 'settings',
    share = 'share',
    shirt = 'shirt',
    shuffle = 'shuffle',
    skipBackward = 'skip-backward',
    skipForward = 'skip-forward',
    snow = 'snow',
    speedometer = 'speedometer',
    square = 'square',
    star = 'star',
    starHalf = 'star-half',
    stats = 'stats',
    stopwatch = 'stopwatch',
    subway = 'subway',
    sunny = 'sunny',
    swap = 'swap',
    switch = 'switch',
    sync = 'sync',
    tabletLandscape = 'tablet-landscape',
    tabletPortrait = 'tablet-portrait',
    tennisball = 'tennisball',
    text = 'text',
    thermometer = 'thermometer',
    thumbsDown = 'thumbs-down',
    thumbsUp = 'thumbs-up',
    thunderstorm = 'thunderstorm',
    time = 'time',
    timer = 'timer',
    train = 'train',
    transgender = 'transgender',
    trash = 'trash',
    trendingDown = 'trending-down',
    trendingUp = 'trending-up',
    trophy = 'trophy',
    umbrella = 'umbrella',
    undo = 'undo',
    unlock = 'unlock',
    videocam = 'videocam',
    volumeDown = 'volume-down',
    volumeUp = 'volume-up',
    volumeMute = 'volume-mute',
    volumeOff = 'volume-off',
    walk = 'walk',
    warning = 'warning',
    watch = 'watch',
    water = 'water',
    wifi = 'wifi',
    wine = 'wine',
    woman = 'woman',

    logoAndroid = 'logo-android',
    logoAngular = 'logo-angular',
    logoApple = 'logo-apple',
    logoBitcoin = 'logo-bitcoin',
    logoBuffer = 'logo-buffer',
    logoChrome = 'logo-chrome',
    logoCodepen = 'logo-codepen',
    logoCss3 = 'logo-css3',
    logoDesignernews = 'logo-designernews',
    logoDribbble = 'logo-dribbble',
    logoDropbox = 'logo-dropbox',
    logoEuro = 'logo-euro',
    logoFacebook = 'logo-facebook',
    logoFoursquare = 'logo-foursquare',
    logoFreebsdDevil = 'logo-freebsd-devil',
    logoGithub = 'logo-github',
    logoGoogle = 'logo-google',
    logoGoogleplus = 'logo-googleplus',
    logoHackernews = 'logo-hackernews',
    logoHtml5 = 'logo-html5',
    logoInstagram = 'logo-instagram',
    logoJavascript = 'logo-javascript',
    logoLinkedin = 'logo-linkedin',
    logoMarkdown = 'logo-markdown',
    logoNodejs = 'logo-nodejs',
    logoOctocat = 'logo-octocat',
    logoPinterest = 'logo-pinterest',
    logoPlaystation = 'logo-playstation',
    logoPython = 'logo-python',
    logoReddit = 'logo-reddit',
    logoRss = 'logo-rss',
    logoSass = 'logo-sass',
    logoSkype = 'logo-skype',
    logoSnapchat = 'logo-snapchat',
    logoSteam = 'logo-steam',
    logoTumblr = 'logo-tumblr',
    logoTux = 'logo-tux',
    logoTwitch = 'logo-twitch',
    logoTwitter = 'logo-twitter',
    logoUsd = 'logo-usd',
    logoVimeo = 'logo-vimeo',
    logoWhatsapp = 'logo-whatsapp',
    logoWindows = 'logo-windows',
    logoWordpress = 'logo-wordpress',
    logoXbox = 'logo-xbox',
    logoYahoo = 'logo-yahoo',
    logoYen = 'logo-yen',
    logoYoutube = 'logo-youtube',
  }


  const enum IonicNames {
    closedCaptioning = 'closedCaptioning',
    refreshCircle = 'refreshCircle',
    shareAlt = 'shareAlt',
    add = 'add',
    addCircle = 'add-circle',
    alarm = 'alarm',
    albums = 'albums',
    alert = 'alert',
    americanFootball = 'american-football',
    analytics = 'analytics',
    aperture = 'aperture',
    apps = 'apps',
    appstore = 'appstore',
    archive = 'archive',
    arrowBack = 'arrow-back',
    arrowDown = 'arrow-down',
    arrowDropdown = 'arrow-dropdown',
    arrowDropdownCircle = 'arrow-dropdown-circle',
    arrowDropleft = 'arrow-dropleft',
    arrowDropleftCircle = 'arrow-dropleft-circle',
    arrowDropright = 'arrow-dropright',
    arrowDroprightCircle = 'arrow-dropright-circle',
    arrowDropup = 'arrow-dropup',
    arrowDropupCircle = 'arrow-dropup-circle',
    arrowForward = 'arrow-forward',
    arrowRoundBack = 'arrow-round-back',
    arrowRoundDown = 'arrow-round-down',
    arrowRoundForward = 'arrow-round-forward',
    arrowRoundUp = 'arrow-round-up',
    arrowUp = 'arrow-up',
    at = 'at',
    attach = 'attach',
    backspace = 'backspace',
    barcode = 'barcode',
    baseball = 'baseball',
    basket = 'basket',
    basketball = 'basketball',
    batteryCharging = 'battery-charging',
    batteryDead = 'battery-dead',
    batteryFull = 'battery-full',
    beaker = 'beaker',
    beer = 'beer',
    bicycle = 'bicycle',
    bluetooth = 'bluetooth',
    boat = 'boat',
    body = 'body',
    bonfire = 'bonfire',
    book = 'book',
    bookmark = 'bookmark',
    bookmarks = 'bookmarks',
    bowtie = 'bowtie',
    briefcase = 'briefcase',
    browsers = 'browsers',
    brush = 'brush',
    bug = 'bug',
    build = 'build',
    bulb = 'bulb',
    bus = 'bus',
    cafe = 'cafe',
    calculator = 'calculator',
    calendar = 'calendar',
    call = 'call',
    camera = 'camera',
    car = 'car',
    card = 'card',
    cart = 'cart',
    cash = 'cash',
    chatboxes = 'chatboxes',
    chatbubbles = 'chatbubbles',
    checkbox = 'checkbox',
    checkmark = 'checkmark',
    checkmarkCircle = 'checkmark-circle',
    clipboard = 'clipboard',
    clock = 'clock',
    close = 'close',
    closeCircle = 'close-circle',
    cloud = 'cloud',
    cloudCircle = 'cloud-circle',
    cloudDone = 'cloud-done',
    cloudDownload = 'cloud-download',
    cloudUpload = 'cloud-upload',
    cloudy = 'cloudy',
    cloudyNight = 'cloudy-night',
    code = 'code',
    codeDownload = 'code-download',
    codeWorking = 'code-working',
    cog = 'cog',
    colorFill = 'color-fill',
    colorFilter = 'color-filter',
    colorPalette = 'color-palette',
    colorWand = 'color-wand',
    compass = 'compass',
    construct = 'construct',
    contact = 'contact',
    contacts = 'contacts',
    contract = 'contract',
    contrast = 'contrast',
    copy = 'copy',
    create = 'create',
    crop = 'crop',
    cube = 'cube',
    cut = 'cut',
    desktop = 'desktop',
    disc = 'disc',
    document = 'document',
    doneAll = 'done-all',
    download = 'download',
    easel = 'easel',
    egg = 'egg',
    exit = 'exit',
    expand = 'expand',
    eye = 'eye',
    eyeOff = 'eye-off',
    fastforward = 'fastforward',
    female = 'female',
    filing = 'filing',
    film = 'film',
    fingerPrint = 'finger-print',
    flag = 'flag',
    flame = 'flame',
    flash = 'flash',
    flask = 'flask',
    flower = 'flower',
    folder = 'folder',
    folderOpen = 'folder-open',
    football = 'football',
    funnel = 'funnel',
    gameControllerA = 'game-controller-a',
    gameControllerB = 'game-controller-b',
    gitBranch = 'git-branch',
    gitCommit = 'git-commit',
    gitMerge = 'git-merge',
    gitCompare = 'git-compare',
    gitNetwork = 'git-network',
    gitPullRequest = 'git-pull-request',
    glasses = 'glasses',
    globe = 'globe',
    grid = 'grid',
    hammer = 'hammer',
    hand = 'hand',
    headset = 'headset',
    heart = 'heart',
    happy = 'happy',
    help = 'help',
    helpBuoy = 'help-buoy',
    helpCircle = 'help-circle',
    home = 'home',
    iceCream = 'ice-cream',
    image = 'image',
    images = 'images',
    infinite = 'infinite',
    information = 'information',
    informationCircle = 'information-circle',
    ionic = 'ionic',
    ionitron = 'ionitron',
    jet = 'jet',
    key = 'key',
    keypad = 'keypad',
    laptop = 'laptop',
    leaf = 'leaf',
    link = 'link',
    list = 'list',
    listBox = 'list-box',
    locate = 'locate',
    lock = 'lock',
    logIn = 'log-in',
    logOut = 'log-out',
    magnet = 'magnet',
    mail = 'mail',
    mailOpen = 'mail-open',
    male = 'male',
    man = 'man',
    map = 'map',
    medal = 'medal',
    medical = 'medical',
    medkit = 'medkit',
    megaphone = 'megaphone',
    menu = 'menu',
    mic = 'mic',
    micOff = 'mic-off',
    microphone = 'microphone',
    moon = 'moon',
    more = 'more',
    move = 'move',
    musicalNote = 'musical-note',
    musicalNotes = 'musical-notes',
    navigate = 'navigate',
    noSmoking = 'no-smoking',
    notifications = 'notifications',
    notificationsOff = 'notifications-off',
    nuclear = 'nuclear',
    nutrition = 'nutrition',
    open = 'open',
    options = 'options',
    outlet = 'outlet',
    paper = 'paper',
    paperPlane = 'paper-plane',
    partlySunny = 'partly-sunny',
    pause = 'pause',
    paw = 'paw',
    people = 'people',
    person = 'person',
    personAdd = 'person-add',
    phoneLandscape = 'phone-landscape',
    phonePortrait = 'phone-portrait',
    photos = 'photos',
    pie = 'pie',
    pin = 'pin',
    pint = 'pint',
    pizza = 'pizza',
    plane = 'plane',
    planet = 'planet',
    play = 'play',
    podium = 'podium',
    power = 'power',
    pricetag = 'pricetag',
    pricetags = 'pricetags',
    print = 'print',
    pulse = 'pulse',
    qrScanner = 'qr-scanner',
    quote = 'quote',
    radio = 'radio',
    radioButtonOff = 'radio-button-off',
    radioButtonOn = 'radio-button-on',
    rainy = 'rainy',
    recording = 'recording',
    redo = 'redo',
    refresh = 'refresh',
    remove = 'remove',
    removeCircle = 'remove-circle',
    reorder = 'reorder',
    repeat = 'repeat',
    resize = 'resize',
    restaurant = 'restaurant',
    returnLeft = 'return-left',
    returnRight = 'return-right',
    reverseCamera = 'reverse-camera',
    rewind = 'rewind',
    ribbon = 'ribbon',
    rose = 'rose',
    sad = 'sad',
    school = 'school',
    search = 'search',
    send = 'send',
    settings = 'settings',
    share = 'share',
    shirt = 'shirt',
    shuffle = 'shuffle',
    skipBackward = 'skip-backward',
    skipForward = 'skip-forward',
    snow = 'snow',
    speedometer = 'speedometer',
    square = 'square',
    star = 'star',
    starHalf = 'star-half',
    stats = 'stats',
    stopwatch = 'stopwatch',
    subway = 'subway',
    sunny = 'sunny',
    swap = 'swap',
    switch = 'switch',
    sync = 'sync',
    tabletLandscape = 'tablet-landscape',
    tabletPortrait = 'tablet-portrait',
    tennisball = 'tennisball',
    text = 'text',
    thermometer = 'thermometer',
    thumbsDown = 'thumbs-down',
    thumbsUp = 'thumbs-up',
    thunderstorm = 'thunderstorm',
    time = 'time',
    timer = 'timer',
    train = 'train',
    transgender = 'transgender',
    trash = 'trash',
    trendingDown = 'trending-down',
    trendingUp = 'trending-up',
    trophy = 'trophy',
    umbrella = 'umbrella',
    undo = 'undo',
    unlock = 'unlock',
    videocam = 'videocam',
    volumeDown = 'volume-down',
    volumeUp = 'volume-up',
    volumeMute = 'volume-mute',
    volumeOff = 'volume-off',
    walk = 'walk',
    warning = 'warning',
    watch = 'watch',
    water = 'water',
    wifi = 'wifi',
    wine = 'wine',
    woman = 'woman',
  }

  const enum IonicLogos {
    logoAndroid = 'logo-android',
    logoAngular = 'logo-angular',
    logoApple = 'logo-apple',
    logoBitcoin = 'logo-bitcoin',
    logoBuffer = 'logo-buffer',
    logoChrome = 'logo-chrome',
    logoCodepen = 'logo-codepen',
    logoCss3 = 'logo-css3',
    logoDesignernews = 'logo-designernews',
    logoDribbble = 'logo-dribbble',
    logoDropbox = 'logo-dropbox',
    logoEuro = 'logo-euro',
    logoFacebook = 'logo-facebook',
    logoFoursquare = 'logo-foursquare',
    logoFreebsdDevil = 'logo-freebsd-devil',
    logoGithub = 'logo-github',
    logoGoogle = 'logo-google',
    logoGoogleplus = 'logo-googleplus',
    logoHackernews = 'logo-hackernews',
    logoHtml5 = 'logo-html5',
    logoInstagram = 'logo-instagram',
    logoJavascript = 'logo-javascript',
    logoLinkedin = 'logo-linkedin',
    logoMarkdown = 'logo-markdown',
    logoNodejs = 'logo-nodejs',
    logoOctocat = 'logo-octocat',
    logoPinterest = 'logo-pinterest',
    logoPlaystation = 'logo-playstation',
    logoPython = 'logo-python',
    logoReddit = 'logo-reddit',
    logoRss = 'logo-rss',
    logoSass = 'logo-sass',
    logoSkype = 'logo-skype',
    logoSnapchat = 'logo-snapchat',
    logoSteam = 'logo-steam',
    logoTumblr = 'logo-tumblr',
    logoTux = 'logo-tux',
    logoTwitch = 'logo-twitch',
    logoTwitter = 'logo-twitter',
    logoUsd = 'logo-usd',
    logoVimeo = 'logo-vimeo',
    logoWhatsapp = 'logo-whatsapp',
    logoWindows = 'logo-windows',
    logoWordpress = 'logo-wordpress',
    logoXbox = 'logo-xbox',
    logoYahoo = 'logo-yahoo',
    logoYen = 'logo-yen',
    logoYoutube = 'logo-youtube',
  }
}
