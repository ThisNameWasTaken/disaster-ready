import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCDrawer } from '@material/drawer';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';

import './maps';

document.querySelectorAll('.mdc-button').forEach(button => new MDCRipple(button));

new MDCTextField(document.querySelector('.mdc-text-field'));

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => navigator.serviceWorker.register('/serviceWorker.js'));
// }

const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
const drawer = new MDCDrawer(document.querySelector('.mdc-drawer'));

topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});