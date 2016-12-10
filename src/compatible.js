/*
 * Old APIs: getStyleProp, setStyleValue
 */

import CSSPrefix from './css-prefix.js';
window.getStyleProp = CSSPrefix.getProp;
window.setStyleValue = CSSPrefix.setValue;
export default CSSPrefix;
