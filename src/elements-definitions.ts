import { SwitchBase } from '@material/mwc-switch/deprecated/mwc-switch-base.js';
import { RippleBase } from '@material/mwc-ripple/mwc-ripple-base.js';
import { FormfieldBase } from '@material/mwc-formfield/mwc-formfield-base.js';
import { SelectBase } from '@material/mwc-select/mwc-select-base.js';
import { ListBase } from '@material/mwc-list/mwc-list-base.js';
import { ListItemBase } from '@material/mwc-list/mwc-list-item-base.js';

import { styles as formfieldStyles } from '@material/mwc-formfield/mwc-formfield.css.js';
import { styles as switchStyles } from '@material/mwc-switch/deprecated/mwc-switch.css';
import { styles as rippleStyles } from '@material/mwc-ripple/mwc-ripple.css';
import { styles as selectStyles } from '@material/mwc-select/mwc-select.css';
import { styles as listStyles } from '@material/mwc-list/mwc-list.css';
import { styles as listItemStyles } from '@material/mwc-list/mwc-list-item.css';

export const ELEMENTS_DEFINITIONS = {
  'mwc-formfield': class extends FormfieldBase {
    static get styles() {
      return formfieldStyles;
    }
  },
  'mwc-select': class extends SelectBase {
    static get styles() {
      return selectStyles;
    }
  },
  'mwc-list': class extends ListBase {
    static get styles() {
      return listStyles;
    }
  },
  'mwc-list-item': class extends ListItemBase {
    static get styles() {
      return listItemStyles;
    }
  },
  'mwc-switch': class extends SwitchBase {
    static get styles() {
      return switchStyles;
    }
  },
  'mwc-ripple': class extends RippleBase {
    static get styles() {
      return rippleStyles;
    }
  },
};
