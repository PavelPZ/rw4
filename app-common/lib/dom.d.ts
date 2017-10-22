type ViewProperties = RN.ViewProperties & { web?: React.HTMLAttributes<any>, webStyle?: CSSProperties, ref?: (el: WebNativeCommon.TViewRef) => void }
type TextProperties = RN.TextProperties & { web?: React.HTMLAttributes<any>, webStyle?: CSSProperties, ref?: (el: WebNativeCommon.TTextRef) => void }
