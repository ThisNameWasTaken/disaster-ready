const fetchPost = (url = '', data = {}) => fetch(url, {
    method: "POST",
    mode: "cors", // no-cors, cors, *same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, same-origin, *omit
    headers: {
        "Content-Type": "application/json; charset=utf-8",
    },
    referrer: "no-referrer", // no-referrer, *client
    body: JSON.stringify(data)
}).then(response => response.json());

export default fetchPost;