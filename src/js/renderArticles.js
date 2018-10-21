import getDisastersByCountry from './getDisastersByCountry';
import { html, render } from 'lit-html';

const popularDisasters = document.getElementById('popular-disasters');
// console.log(popularDisasters);

// html`items = ${items.map((i) => `item: ${i}`)}`;

const cardListTemplate = disasters => html`${disasters.map((disaster) => html`
<div class="column is-4-tablet is-3-desktop">
    <div class="mdc-card">
        <div class="mdc-card__media mdc-card__media--square">
            <div class="mdc-card__media-content">
                <h2 class="mdc-card__title"> ${ disaster.title.split(' ').slice(0, 12).join(' ')}</h2>
            </div>
        </div>
        <div class="mdc-card__actions">
            <div class="mdc-card__action-buttons">
                <a href="${disaster.url}" class="mdc-button mdc-card__action mdc-card__action--button">Read more</a>
            </div>
        </div>
    </div>
</div>
`)}`;

// render(cardListTemplate({ title: 'Lorem' }), popularDisasters);

function getSafetyStatus(country = 'Romania') {
    return getDisastersByCountry(country)
        .then(data => { const arr = data.data; return arr.map(el => el.fields); })
        .then(disasters => {
            // console.log(disasters);
            getMostFrequentDisaster(disasters);
            render(cardListTemplate(disasters), popularDisasters);
        });
}

getSafetyStatus();

const searchCountryInput = document.getElementById('country-input');

searchCountryInput.addEventListener('keyup', event => {
    // console.log('keyup');
    if (event.key === 'Enter') {
        // console.log('enter');
        if (!searchCountryInput.value) {
            return;
        }
        // console.log(searchCountryInput.value);
        getSafetyStatus(searchCountryInput.value);
    }
});

const safetyDot = document.querySelector('#dot');

function getMostFrequentDisaster(disasters = []) {
    const disastersFrequencies = [];
    let max = 0;
    let maxIndex = 0;
    let lastDisaster = Infinity;
    const years = 1000 * 60 * 60 * 24 * 365;
    disasters.forEach(disaster => {
        // console.log('disaster', disaster);
        if (disaster.date && disaster.date.original) {
            let currentDisaster = Date.now() - Date.parse(disaster.date.original);
            if (lastDisaster > currentDisaster) {
                lastDisaster = currentDisaster;
            }
        }
        if (disaster.disaster_type) {
            disaster.disaster_type.forEach(disasterType => {
                // console.log('disaster_type: ', disasterType.name);
                if (!disastersFrequencies[disasterType.name]) {
                    disastersFrequencies[disasterType.name] = 0;
                }
                disastersFrequencies[disasterType.name]++;
                if (max < disastersFrequencies[disasterType.name]) {
                    max = disastersFrequencies[disasterType.name];
                    maxIndex = disasterType.name;
                }
            });

            // console.log(disastersFrequencies[maxIndex], maxIndex);
        }
    });


    lastDisaster = Math.floor(lastDisaster / years);
    document.getElementById('map__content__text').innerHTML = `Most frequent disaster: ${maxIndex === 0 ? '' : maxIndex}${maxIndex === 0 ? ' none' : 's'} </br> ${lastDisaster} ${lastDisaster === 1 ? 'year' : 'years'} since last disaster `;

    if (lastDisaster >= 3) {
        safetyDot.classList.add('green');
        safetyDot.classList.remove('orange');
        safetyDot.classList.remove('red');
    } else if (lastDisaster >= 1) {
        safetyDot.classList.remove('green');
        safetyDot.classList.add('orange');
        safetyDot.classList.remove('red');
    } else {
        safetyDot.classList.remove('orange');
        safetyDot.classList.remove('green');
        safetyDot.classList.add('red');
    }

    disastersFrequencies.sort((el1, el2) => el2 - el1)
    return disastersFrequencies;
}