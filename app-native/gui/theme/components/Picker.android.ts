import variable, { Fonts, Palette }  from '../platform'

export default (variables = variable) => {
  const pickerTheme = {
    ".note": {
      color: variables.colPicker
    },
    width: 90,
    marginRight: -4
  };

  return pickerTheme;
};
