declare namespace MuiView {

  type ClassKey = 'root' 

  type Shape = {
    common: Record<ClassKey, RN.ViewStyle>
    native: {}
    web: ''
    style: RN.ViewStyle
    props: {}
    nativeProps: RN.ViewProperties
    webProps: React.HTMLAttributes<HTMLDivElement>
  }

}