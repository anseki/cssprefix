/*
 * Old APIs: getStyleProp, setStyleValue
 */

import CSSPrefix from './cssprefix.js';
window.getStyleProp = CSSPrefix.getProp;
window.setStyleValue = CSSPrefix.setValue;
export default CSSPrefix;
