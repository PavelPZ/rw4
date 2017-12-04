import { toPlatformSheet } from 'reactx-mui/current/styles/withStyles'

export const sheetCreator = <R extends Mui.Shape>(sheetGetter: Mui.SheetGetter<R>) => (theme: Mui.Theme) => toPlatformSheet(sheetGetter(theme) as Mui.PartialSheet<R>)