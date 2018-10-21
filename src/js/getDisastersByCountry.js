import fetchPost from './fetchPost.js';

export default async function getDisastersByCountry(country = 'Romania') {
    return await fetchPost('https://api.reliefweb.int/v1/reports?appname=apidoc', {
        "limit": 100,
        "profile": "full",
        // "preset": "analysis", // adds more items
        "query": {
            "value": "disaster"
        },
        "filter":
        {
            "operator": "AND",
            "conditions": [{
                "field": "primary_country",
                "value": country
            }, {
                "field": "language",
                "value": "english"
            }]
        }
    });
}