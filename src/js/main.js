import './maps';
import { MDCTopAppBar } from '@material/top-app-bar';
import { MDCDrawer } from '@material/drawer';
import { MDCTextField } from '@material/textfield';
import { MDCRipple } from '@material/ripple';
import { MDCList } from '@material/list';
import SmoothScroll from 'smooth-scroll';
import sal from 'sal.js/dist/sal';
import './renderArticles';

document.querySelectorAll('.mdc-button').forEach(button => new MDCRipple(button));

new MDCTextField(document.querySelector('.mdc-text-field'));
//new MDCTabIndicator(document.querySelector('.mdc-tab-indicator'));
new MDCList(document.querySelector('.mdc-list'));

// if ('serviceWorker' in navigator) {
//     window.addEventListener('load', () => navigator.serviceWorker.register('/serviceWorker.js'));
// }

const topAppBar = new MDCTopAppBar(document.querySelector('.mdc-top-app-bar'));
const drawer = new MDCDrawer(document.querySelector('.mdc-drawer'));

new SmoothScroll('a[href*="#"]');

sal();

topAppBar.listen('MDCTopAppBar:nav', () => {
    drawer.open = !drawer.open;
});

fetch('http://localhost:3000/help-requests', {
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        "Content-Type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*"
    },
    referrer: "no-referrer", // no-referrer, *client
})
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));