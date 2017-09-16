import variable from '../platform'

export default (variables = variable) => {
  const tabTheme = {
    flex: 1,
    backgroundColor: variables.colTab
  };

  return tabTheme;
};
