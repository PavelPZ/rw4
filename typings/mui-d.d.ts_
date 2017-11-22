
declare namespace Mui {

  type StyleRulesCallback<TRules extends StyleRules = StyleRules> = (theme: Theme) => TRules
  type StyleRules = Record<string, Partial<Style>>

  interface StyledComponentProps<TRules extends StyleRules> {
    classes?: Partial<TRules>;
    innerRef?: React.Ref<any>;
  }

  export interface WithStyles<TRules extends StyleRules> {
    classes: TRules
    theme?: Theme
  }

  export interface WithStylesOptions {
    flip?: boolean;
    withTheme?: boolean;
    name?: string;
  }

  type StandardProps<C, TRules extends StyleRules, Removals extends keyof C = never> =
    & Omit<C & { classes: any }, 'classes' | Removals>
    & StyledComponentProps<TRules>
    & {
      className?: string;
      style?: StyleAll;
    }

  type withStyles = <TRules extends StyleRules>(style: TRules | StyleRulesCallback<TRules>,options?: WithStylesOptions)=> <P>(component: React.ComponentType<P & WithStyles<TRules>>) => React.ComponentType<P & StyledComponentProps<TRules>>
}