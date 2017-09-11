import React from 'react'
import { TextField, Button } from '../gui/react-md'
import { numberConvertors, requiredValidator, intValidator, rangeValidator } from '../../app-common/lib/validate'
import { webEditor } from '../lib/web-validate'

interface IData {
  id: number
  name: string
}

class Editor extends webEditor<IData> {
  render() {
    return <div>
      <TextField {...this.getFieldProps('id') } /><br />
      <TextField {...this.getFieldProps('name') } />
      <Button primary raised onClick={() => this.onSubmit()} >Submit</Button>
    </div>
  }
}

const App: React.SFC = () => <Editor
  data={{ id: 10, name: '' }}
  metaData={{
    id: { convertors: numberConvertors, validators: [intValidator(), rangeValidator(11,15)] },
    name: { validators: [requiredValidator()] }
  }}
  onEdited={data => alert(JSON.stringify(data))} />

export default App