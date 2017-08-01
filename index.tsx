import 'react';
import React from 'react';
import ReactDOM from 'react-dom';

/*Kvuli react-md nainstalovano:
      "prop-types": "npm:prop-types",
      "react-motion": "npm:react-motion",
      "react-prop-types": "npm:react-prop-types",
      "react-transition-group": "npm:react-transition-group@1.1.3", !!! musi byt tato starsi verze
      "resize-observer-polyfill": "npm:resize-observer-polyfill",
*/

import Button from 'react-md/Buttons';
import Paper from 'react-md/Papers';
import Drawer from 'react-md/Drawers';
import { Checkbox, Radio, Switch } from 'react-md/SelectionControls';
import SelectField from 'react-md/SelectFields';

window['process'] = { env: { NODE_ENV: 'development' } }

//import Root from './app-common/snack/react-native';

const Root = () => <div>
  <Button primary raised mini>Hallo world</Button>
  <Paper zDepth={5} style={{ marginTop: '20px', padding: '10px' }}>Hallo world</Paper>
  <Drawer defaultMedia='desktop' overlay visible={false}>
    <h2>Drawer</h2>
  </Drawer>
  <Checkbox id='i1' name='n1' label='XXX' />
  <Radio id='i2' name='n2' label='XXX' />
  <Switch id='i3' name='n3' label='XXX' />
  <SelectField
    id="states"
    label="State"
    placeholder="Select a State"
    menuItems={['sss 1', 'sss 2']}
    itemLabel="name"
    itemValue="abbreviation"
    className="md-cell"
    helpOnFocus
    helpText="Select some state for me"
  />
</div>

export function init() {
  ReactDOM.render(<Root />, document.getElementById('content'));
}


