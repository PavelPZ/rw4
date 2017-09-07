import { getTheme } from 'native-base'
import { getColors } from '../../app-common/gui/colors'

export const theme = getTheme()
//const getThemeName = (cls: Theme.Classes, color: GUI.Colors, shadow = GUI.Shadows.S500) => `${cls}-${color}-${shadow}`
const getThemeName = (cls: Theme.Classes, color: GUI.Colors, shadow = GUI.Shadows.S500) => `${cls}_${color}_${shadow}`.replace(' ', '_')

export const initThemes = () => {
  //*** BUTTON
  theme['NativeBase.Button']['.rounded'] = {
    width: 45,
    justifyContent: 'center',
    paddingHorizontal: 0,
    borderRadius: 23, //material.borderRadiusLarge,
    '.large': {
      width: 60,
    },
    '.small': {
      width: 30,
    }
  }
  adjustBtnTheme(GUI.Colors.DeepOrange)
  adjustBtnTheme(GUI.Colors.DeepOrange, GUI.Shadows.S100)
}

export const getBtnTheme = (color: GUI.Colors, shadow = GUI.Shadows.S500) => classes[`btn-${color}-${shadow}`]

const adjustBtnTheme = (color: GUI.Colors, shadow = GUI.Shadows.S500) => {
  try {
    const classId = `btn-${color}-${shadow}`
    let btnClasses = classes[classId]
    if (btnClasses) return btnClasses
    classes[classId] = btnClasses = {}
    const colors = getColors(color, shadow)
    const themes = {}
    const classIds = [Theme.Classes.btn, Theme.Classes.btnBordered, Theme.Classes.btnTransparent]
    classIds.forEach(cls => {
      const name = getThemeName(cls as Theme.Classes, color, shadow)
      btnClasses[cls] = name
      themes['.' + name] = theme['NativeBase.Button']['.' + name] = btnThemes[cls](colors)
    })
    //console.log('adjustBtnTheme: ', JSON.stringify(theme['NativeBase.Button'], null, 2))
    return btnClasses
  } catch (msg) {
    console.error(msg)
    throw msg
  }
}
let classes = {}
const btnThemes = {
  [Theme.Classes.btn]: (colors: Theme.IColors) => ({
    "NativeBase.Text": {
      color: colors.text
    },
    "NativeBase.Icon": {
      color: colors.text
    },
    backgroundColor: colors.color
  }),
  [Theme.Classes.btnBordered]: (colors: Theme.IColors) => ({
    "NativeBase.Text": {
      color: colors.color
    },
    "NativeBase.Icon": {
      color: colors.color
    },
    backgroundColor: null,
    borderColor: colors.color
  }),
  [Theme.Classes.btnTransparent]: (colors: Theme.IColors) => ({
    '.transparent': {
      "NativeBase.Text": {
        color: colors.color
      },
      "NativeBase.Icon": {
        color: colors.color
      },
      backgroundColor: null
    }
  }),
}



