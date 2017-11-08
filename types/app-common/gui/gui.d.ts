/// <reference types="react" />
export * from './drawer';
export declare let Button: React.SFC<GUI.IButtonProps>;
export declare let Icon: React.ComponentType<GUI.IIconProps>;
export declare let H1: React.ComponentType<TextProperties>;
export declare let H2: React.ComponentType<TextProperties>;
export declare let H3: React.ComponentType<TextProperties>;
export declare let H4: React.ComponentType<TextProperties>;
export declare let View: React.ComponentType<ViewProperties>;
export declare let Text: React.ComponentType<TextProperties>;
export declare let AnimatedDrawer: React.ComponentClass<GUI.IAnimatedMobileDrawerProps>;
export declare let colorToStyle: {
    [color: string]: GUI.Colors;
};
export declare const initGUI: (pl: IPlatform) => Promise<void>;
export interface IPlatform {
    Button: React.SFC<GUI.IButtonProps>;
    Icon: React.ComponentType<GUI.IIconProps>;
    H1: React.ComponentType<TextProperties>;
    H2: React.ComponentType<TextProperties>;
    H3: React.ComponentType<TextProperties>;
    H4: React.ComponentType<TextProperties>;
    View: React.ComponentType<ViewProperties>;
    AnimatedDrawer: React.ComponentClass<GUI.IAnimatedMobileDrawerProps>;
    Text: React.ComponentType<NativeBase.Text>;
    colorToStyle?: {
        [color: string]: GUI.Colors;
    };
}
