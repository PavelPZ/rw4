export declare const getColors2: (props: GUI.IColorProps, invert?: boolean) => {
    backgroundColor: any;
    color: any;
};
export declare const getColors: (color: GUI.Colors, shade?: GUI.Shadows) => GUI.IColorPair;
export declare const fillColorToStyle: (color: string, style: {
    color?: string;
}, shadow?: GUI.Shadows) => boolean;
