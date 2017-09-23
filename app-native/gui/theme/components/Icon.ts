import variable, { Fonts, Palette }  from '../platform'

export default (variables = variable) => {
  const iconTheme = {
    fontSize: variables.iconFontSize,
    color: variables.colIcon
  };

  return iconTheme;
};
