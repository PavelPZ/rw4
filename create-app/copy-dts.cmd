set src=d:\rw\rw4\node_modules\
set dest=d:\rw\rw4\typings\

copy %src%@types\react-native\index.d.ts %dest%react-native.d.ts
copy %src%@types\react-redux\index.d.ts %dest%react-redux.d.ts
copy %src%redux\index.d.ts %dest%redux.d.ts